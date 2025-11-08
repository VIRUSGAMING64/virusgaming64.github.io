<div align="center">

# 🎮 VIRUSGAMING64 Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success?style=for-the-badge&logo=github)](https://virusgaming64.github.io)
[![Auto Update](https://img.shields.io/badge/Auto%20Update-Daily-blue?style=for-the-badge&logo=github-actions)](https://github.com/VIRUSGAMING64/virusgaming64.github.io/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A dynamic GitHub portfolio showcasing projects, statistics, and coding journey**

[🌐 Live Demo](https://virusgaming64.github.io) | [📊 View Stats](https://virusgaming64.github.io) | [🐛 Report Bug](https://github.com/VIRUSGAMING64/virusgaming64.github.io/issues)

</div>

---

## 📖 About This Project 🌟

Welcome to my interactive GitHub portfolio! 👋 This website is a living showcase of my coding projects and development journey. 🚀 It automatically updates daily with the latest repository statistics, programming language usage, and project information directly from my GitHub profile.

Built with vanilla JavaScript, HTML, and CSS 💪, this portfolio demonstrates clean code practices, API integration, and automation through GitHub Actions. The site features a modern, responsive design with animated backgrounds ✨ and an intuitive tabbed interface.

### ✨ Key Features

- 🔄 **Automated Daily Updates** - Repository statistics refresh automatically every day at 5:40 PM Cuba time (21:40 UTC)
- 📊 **Real-Time Repository Stats** - Displays size, stars, forks, and descriptions for all repositories
- 💻 **Language Analytics** - Visual breakdown of programming languages used across projects
- 🎨 **Modern UI/UX** - Clean, responsive interface with animated particle background
- 📱 **Mobile Friendly** - Fully responsive design that works on all devices
- ⚡ **Fast & Lightweight** - No heavy frameworks, just pure vanilla JavaScript
- 🔍 **Searchable & Organized** - Easy-to-navigate tabbed layout for repositories and languages

---

## 🚀 Live Demo 🌐

Visit the live website: **[virusgaming64.github.io](https://virusgaming64.github.io)** 👈

The site features:
- **📦 Repos Tab**: Browse all my GitHub repositories with detailed information 📚
- **💻 Languages Tab**: See the programming languages I work with and their usage percentages 📈

---

## 🛠️ Technical Architecture ⚙️

### How It Works 🔧

This portfolio uses a three-component automated system: 🎯

#### 1. 🤖 GitHub Actions Workflow
Located in `.github/workflows/update-repo-stats.yml`:
- Runs automatically on a daily schedule (21:40 UTC)
- Can be manually triggered from the Actions tab
- Executes the Python data fetcher
- Commits updated statistics back to the repository
- Triggers automatic deployment to GitHub Pages

#### 2. 🐍 Python Data Fetcher
Script: `scripts/fetch_repo_stats.py`
- Connects to GitHub API to fetch repository data
- Retrieves comprehensive information for each repository
- Calculates aggregate language statistics
- Generates formatted size metrics (KB, MB, GB)
- Saves structured data to `data/repo-stats.json`

#### 3. 🌐 Interactive Web Interface
Files: `index.html`, `src/main.js`, `src/main.css`
- Loads and displays repository statistics dynamically
- Renders animated particle background for visual appeal
- Provides tabbed navigation between different views
- Updates in real-time when new data is available
- Fully responsive across desktop and mobile devices

### Data Structure 📋

Repository statistics are stored in `data/repo-stats.json`: 💾

```json
{
  "last_updated": "2025-11-08T21:40:00Z",
  "total_repositories": 15,
  "overall_languages": {
    "JavaScript": 45.5,
    "Python": 30.2,
    "HTML": 15.3,
    "CSS": 9.0
  },
  "repositories": [
    {
      "name": "awesome-project",
      "description": "An amazing project description",
      "size_kb": 2048,
      "size_formatted": "2.0 MB",
      "languages": {
        "JavaScript": 70.5,
        "HTML": 20.0,
        "CSS": 9.5
      },
      "stars": 10,
      "forks": 3,
      "html_url": "https://github.com/VIRUSGAMING64/awesome-project",
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-11-08T15:20:00Z"
    }
  ]
}
```

---

## 💻 Local Development 🔨

Want to run this project locally or contribute? Follow these steps: 👇

### Prerequisites ✅

- 🐍 Python 3.7 or higher
- 🔑 A GitHub Personal Access Token (for fetching repository data)
- 🌐 A modern web browser
- 📚 Basic knowledge of HTML, CSS, and JavaScript

### Setup Instructions 📝

1. **Clone the repository** 📥
   ```bash
   git clone https://github.com/VIRUSGAMING64/virusgaming64.github.io.git
   cd virusgaming64.github.io
   ```

2. **Install Python dependencies** 📦
   ```bash
   pip install requests
   ```

3. **Set up your GitHub token** 🔐
   ```bash
   # Linux/Mac
   export GITHUB_TOKEN=your_personal_access_token_here
   
   # Windows (PowerShell)
   $env:GITHUB_TOKEN="your_personal_access_token_here"
   ```

4. **Fetch repository statistics** 📊
   ```bash
   python scripts/fetch_repo_stats.py
   ```

5. **Start a local web server** 🚀
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use any other local server like Live Server in VS Code
   ```

6. **Open your browser** 🌐
   Navigate to `http://localhost:8000` 👀

### Manual Statistics Update 🔄

To manually update the repository statistics: ⚡

1. Navigate to the **[Actions](https://github.com/VIRUSGAMING64/virusgaming64.github.io/actions)** tab 🎬
2. Select the **"Update Repository Statistics"** workflow 📋
3. Click **"Run workflow"** button ▶️
4. Select the branch (usually `main`) 🌿
5. Click **"Run workflow"** to confirm ✔️
6. Wait for the workflow to complete (usually takes 30-60 seconds) ⏱️
7. Refresh the website to see updated statistics 🔃

---

## 🤝 Contributing 💡

Contributions, issues, and feature requests are welcome! 🎉 Feel free to check the [issues page](https://github.com/VIRUSGAMING64/virusgaming64.github.io/issues). 🐛

### How to Contribute 🌟

1. 🍴 Fork the project
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎁 Open a Pull Request

---

## 📝 License 📜

This project is open source and available under the [MIT License](LICENSE). ⚖️

---

## 📬 Contact 💬

**VIRUSGAMING64** 👨‍💻 - [@VIRUSGAMING64](https://github.com/VIRUSGAMING64)

Project Link: 🔗 [https://github.com/VIRUSGAMING64/virusgaming64.github.io](https://github.com/VIRUSGAMING64/virusgaming64.github.io)

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ and ☕ by VIRUSGAMING64

🎮 Happy Coding! 💻

</div>
