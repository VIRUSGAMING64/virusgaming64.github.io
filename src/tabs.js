// Tab navigation functionality

let currentTab = null;

// Show a specific tab and hide others
function showTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        currentTab = tabId;
    }
    
    // On mobile, hide the menu after selecting a tab
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.add('mobile-hidden');
        }
        updateToggleIcon();
    }
}

// Toggle mobile menu visibility
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('mobile-hidden');
        updateToggleIcon();
    }
}

// Update the toggle icon based on sidebar state
function updateToggleIcon() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');
    if (sidebar && toggleIcon) {
        if (sidebar.classList.contains('mobile-hidden')) {
            toggleIcon.textContent = '☰';
        } else {
            toggleIcon.textContent = '✕';
        }
    }
}

// Initialize toggle button event listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mobile-menu-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMobileMenu);
    }
});

// Make functions globally accessible
window.showTab = showTab;
window.toggleMobileMenu = toggleMobileMenu;
window.updateToggleIcon = updateToggleIcon;
