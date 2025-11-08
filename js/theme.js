// 主题切换管理

const ThemeManager = {
    // 配置
    STORAGE_KEY: 'theme-preference',
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',

    // 初始化主题系统
    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.watchSystemTheme();
    },

    // 设置事件监听
    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        const themeMenu = document.getElementById('themeMenu');
        const themeOptions = document.querySelectorAll('.theme-option');

        // 主菜单切换
        themeToggle.addEventListener('click', () => {
            themeMenu.classList.toggle('show');
        });

        // 关闭菜单（点击外部）
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-switcher')) {
                themeMenu.classList.remove('show');
            }
        });

        // 主题选项点击
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                this.setTheme(theme);
                themeMenu.classList.remove('show');
            });
        });
    },

    // 加载保存的主题
    loadTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || this.AUTO;
        this.setTheme(savedTheme);
    },

    // 设置主题
    setTheme(theme) {
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateTheme();
    },

    // 更新主题
    updateTheme() {
        const preference = localStorage.getItem(this.STORAGE_KEY) || this.AUTO;
        let activeTheme = preference;

        // 如果是自动模式，检测系统偏好
        if (preference === this.AUTO) {
            activeTheme = this.getSystemTheme();
        }

        // 应用主题
        if (activeTheme === this.DARK) {
            document.documentElement.setAttribute('data-theme', this.DARK);
            this.updateToggleButton('☀️');
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.updateToggleButton('🌙');
        }

        // 更新菜单中的 active 状态
        this.updateMenuState(preference);
    },

    // 获取系统主题偏好
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return this.DARK;
        }
        return this.LIGHT;
    },

    // 监听系统主题变化
    watchSystemTheme() {
        if (!window.matchMedia) return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // 监听系统主题变化
        darkModeQuery.addEventListener('change', () => {
            const preference = localStorage.getItem(this.STORAGE_KEY) || this.AUTO;
            if (preference === this.AUTO) {
                this.updateTheme();
            }
        });
    },

    // 更新切换按钮的图标
    updateToggleButton(icon) {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = icon;
    },

    // 更新菜单中的 active 状态
    updateMenuState(activePreference) {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const theme = option.getAttribute('data-theme');
            if (theme === activePreference) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
};

// 在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
