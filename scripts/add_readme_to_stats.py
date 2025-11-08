#!/usr/bin/env python3
"""
Add README content to existing repo-stats.json file by fetching from GitHub.
"""

import json
import requests
import sys

def fetch_readme(owner, repo_name):
    """Fetch README content from a repository using raw GitHub URLs."""
    # Try common README file names
    readme_names = ['README.md', 'README.MD', 'Readme.md', 'readme.md', 'README', 'README.txt']
    
    for readme_name in readme_names:
        url = f'https://raw.githubusercontent.com/{owner}/{repo_name}/main/{readme_name}'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.text
        except Exception:
            pass
        
        # Try master branch
        url = f'https://raw.githubusercontent.com/{owner}/{repo_name}/master/{readme_name}'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.text
        except Exception:
            pass
    
    return None

def main():
    # Load existing data
    with open('data/repo-stats.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add README to each repository
    for repo in data['repositories']:
        print(f"Fetching README for {repo['name']}...")
        readme = fetch_readme('VIRUSGAMING64', repo['name'])
        repo['readme'] = readme
        if readme:
            print(f"  ✓ README found ({len(readme)} characters)")
        else:
            print(f"  ✗ No README")
    
    # Save updated data
    with open('data/repo-stats.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("\nUpdated repo-stats.json with README content")

if __name__ == '__main__':
    main()
