// 主应用逻辑

document.addEventListener('DOMContentLoaded', () => {
    // === Tab 切换逻辑 ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');

            // 移除所有活跃状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 添加活跃状态到点击的按钮和对应的内容
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

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
