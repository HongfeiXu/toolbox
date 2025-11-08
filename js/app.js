// 主应用逻辑

document.addEventListener('DOMContentLoaded', () => {
    // === Tab 切换逻辑 ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const TAB_STORAGE_KEY = 'active-tab';

    // 切换到指定的 tab
    const switchTab = (tabName) => {
        // 移除所有活跃状态
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // 添加活跃状态到对应的按钮和内容
        const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(tabName);

        if (targetBtn && targetContent) {
            targetBtn.classList.add('active');
            targetContent.classList.add('active');
            // 保存到 localStorage
            localStorage.setItem(TAB_STORAGE_KEY, tabName);
        }
    };

    // 监听 tab 按钮点击
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // 页面加载时恢复上次激活的 tab
    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);
    if (savedTab) {
        switchTab(savedTab);
    }
    // 如果没有保存的 tab，默认已经在 HTML 中设置了第一个 tab 为 active

    // === 复制功能 ===
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement && targetElement.value) {
                // 使用 Clipboard API 复制
                navigator.clipboard.writeText(targetElement.value)
                    .then(() => {
                        // 显示复制成功的反馈
                        const originalText = btn.textContent;
                        btn.textContent = '已复制!';
                        btn.style.backgroundColor = '#4CAF50';
                        btn.style.color = '#fff';

                        // 2 秒后恢复原样
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                        }, 2000);
                    })
                    .catch(() => {
                        // 如果 Clipboard API 不可用，使用备用方案
                        fallbackCopy(targetElement.value);
                    });
            }
        });
    });

    // 备用复制方案（对于不支持 Clipboard API 的浏览器）
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // === 页面初始化 ===
    console.log('工具箱已加载');
});
