# Automated Repository Statistics System

This system automatically fetches and displays GitHub repository statistics on the website.

## Features

- **Daily Updates**: Runs automatically every day at 5:40 PM Cuba time (21:40 UTC)
- **Repository Information**: Shows size, stars, forks, and description for each repository
- **Language Statistics**: Displays programming language breakdown across all repositories
- **Responsive UI**: Clean, modern interface with tabbed navigation

## How It Works

1. **GitHub Actions Workflow** (`.github/workflows/update-repo-stats.yml`):
   - Scheduled to run daily at 5:40 PM Cuba time
   - Can also be triggered manually from the Actions tab
   - Runs the Python script to fetch data
   - Commits updated statistics back to the repository

2. **Python Script** (`scripts/fetch_repo_stats.py`):
   - Fetches all repositories for the VIRUSGAMING64 user
   - Retrieves size and language information for each repository
   - Calculates overall language statistics
   - Saves data to `data/repo-stats.json`

3. **Web Interface**:
   - **Repository Tab**: Shows all repositories with detailed information
   - **Languages Tab**: Displays visual breakdown of programming languages used
   - Automatically loads data when the page loads

## Manual Trigger

To manually update the statistics:

1. Go to the **Actions** tab in GitHub
2. Select **Update Repository Statistics** workflow
3. Click **Run workflow**
4. Wait for the workflow to complete
5. The website will automatically show the updated data

## Data Format

The statistics are stored in `data/repo-stats.json` with the following structure:

```json
{
  "last_updated": "ISO timestamp",
  "total_repositories": 3,
  "overall_languages": {
    "JavaScript": 45.5,
    "Python": 30.2,
    ...
  },
  "repositories": [
    {
      "name": "repo-name",
      "description": "...",
      "size_kb": 1024,
      "size_formatted": "1.0 MB",
      "languages": { ... },
      "stars": 5,
      "forks": 2,
      ...
    }
  ]
}
```

## Development

To test locally:

```bash
# Install dependencies
pip install requests

# Set GitHub token
export GITHUB_TOKEN=your_token_here

# Run the script
python scripts/fetch_repo_stats.py

# Start local server
python -m http.server 8000

# Visit http://localhost:8000
```
