#!/usr/bin/env python3
"""
Fetch GitHub repository statistics and generate a JSON file with the data.
This script retrieves information about all repositories for a GitHub user,
including repository size and programming language breakdown.
"""

import os
import json
import requests
from datetime import datetime


def get_github_token():
    """Get GitHub token from environment variable."""
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        raise ValueError("GITHUB_TOKEN environment variable not set")
    return token


def fetch_user_repositories(username, token):
    """Fetch all repositories for a given GitHub user."""
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    repos = []
    page = 1
    per_page = 100
    
    while True:
        url = f'https://api.github.com/users/{username}/repos'
        params = {'page': page, 'per_page': per_page, 'type': 'all'}
        
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        page_repos = response.json()
        if not page_repos:
            break
            
        repos.extend(page_repos)
        page += 1
        
    return repos


def fetch_repository_languages(owner, repo_name, token):
    """Fetch programming languages used in a repository."""
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    url = f'https://api.github.com/repos/{owner}/{repo_name}/languages'
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching languages for {repo_name}: {e}")
        return {}


def calculate_language_percentages(languages):
    """Calculate percentage for each language."""
    total_bytes = sum(languages.values())
    if total_bytes == 0:
        return {}
    
    percentages = {}
    for lang, bytes_count in languages.items():
        percentages[lang] = round((bytes_count / total_bytes) * 100, 2)
    
    return percentages


def format_size(size_kb):
    """Format repository size in a human-readable format."""
    if size_kb < 1024:
        return f"{size_kb} KB"
    elif size_kb < 1024 * 1024:
        return f"{round(size_kb / 1024, 2)} MB"
    else:
        return f"{round(size_kb / (1024 * 1024), 2)} GB"


def main():
    """Main function to fetch and save repository statistics."""
    username = 'VIRUSGAMING64'  # GitHub username
    token = get_github_token()
    
    print(f"Fetching repositories for user: {username}")
    repos = fetch_user_repositories(username, token)
    print(f"Found {len(repos)} repositories")
    
    repo_stats = []
    
    for repo in repos:
        print(f"Processing: {repo['name']}")
        
        # Fetch language statistics
        languages = fetch_repository_languages(username, repo['name'], token)
        language_percentages = calculate_language_percentages(languages)
        
        repo_info = {
            'name': repo['name'],
            'full_name': repo['full_name'],
            'description': repo.get('description', 'No description'),
            'url': repo['html_url'],
            'size_kb': repo['size'],
            'size_formatted': format_size(repo['size']),
            'languages': language_percentages,
            'updated_at': repo['updated_at'],
            'created_at': repo['created_at'],
            'stars': repo['stargazers_count'],
            'forks': repo['forks_count'],
            'is_fork': repo['fork'],
            'is_private': repo['private']
        }
        
        repo_stats.append(repo_info)
    
    # Sort repositories by name
    repo_stats.sort(key=lambda x: x['name'].lower())
    
    # Calculate overall language statistics across all repos
    overall_languages = {}
    for repo in repo_stats:
        for lang, percentage in repo['languages'].items():
            if lang not in overall_languages:
                overall_languages[lang] = 0
            overall_languages[lang] += percentage
    
    # Normalize overall percentages
    total_percentage = sum(overall_languages.values())
    if total_percentage > 0:
        overall_languages = {
            lang: round((count / total_percentage) * 100, 2)
            for lang, count in overall_languages.items()
        }
    
    # Sort languages by percentage
    overall_languages = dict(sorted(overall_languages.items(), 
                                   key=lambda x: x[1], 
                                   reverse=True))
    
    # Create the final data structure
    data = {
        'last_updated': datetime.utcnow().isoformat() + 'Z',
        'total_repositories': len(repo_stats),
        'overall_languages': overall_languages,
        'repositories': repo_stats
    }
    
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    
    # Save to JSON file
    output_path = 'data/repo-stats.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nStatistics saved to {output_path}")
    print(f"Total repositories: {len(repo_stats)}")
    print(f"Overall language breakdown: {overall_languages}")


if __name__ == '__main__':
    main()
