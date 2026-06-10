// js/theme-items.js

class ThemeManager {
    static themes = {
        'default': { primary: '#667eea', secondary: '#764ba2', background: '#f4f7f6' },
        'theme_ocean': { primary: '#4facfe', secondary: '#00f2fe', background: '#e0f7fa' },
    };

    static applyTheme(themeId) {
        const theme = this.themes[themeId] || this.themes['default'];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--bg-color', theme.background);
        
        // Lưu local hoặc database tùy logic hệ thống của bạn
        localStorage.setItem('active_theme', themeId);
    }
}