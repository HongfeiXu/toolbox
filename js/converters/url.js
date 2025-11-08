// URL 编码/解码工具

const URLConverter = {
    // URL 编码
    encode(text) {
        try {
            return encodeURIComponent(text);
        } catch (error) {
            throw new Error('编码失败: ' + error.message);
        }
    },

    // URL 解码
    decode(encodedText) {
        try {
            return decodeURIComponent(encodedText);
        } catch (error) {
            throw new Error('解码失败: ' + error.message);
        }
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const urlOutput = document.getElementById('urlOutput');
    const urlStatus = document.getElementById('urlStatus');
    const encodeBtn = document.getElementById('urlEncodeBtn');
    const decodeBtn = document.getElementById('urlDecodeBtn');

    // 显示状态消息的函数
    const showStatus = (message, type) => {
        urlStatus.textContent = message;
        urlStatus.className = 'status-message ' + type;
    };

    // 清除状态消息
    const clearStatus = () => {
        urlStatus.textContent = '';
        urlStatus.className = 'status-message';
    };

    // 编码按钮
    encodeBtn.addEventListener('click', () => {
        const input = urlInput.value;
        if (!input) {
            showStatus('请输入内容', 'error');
            urlOutput.value = '';
            return;
        }

        try {
            const encoded = URLConverter.encode(input);
            urlOutput.value = encoded;
            showStatus('✓ URL 编码成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            urlOutput.value = '';
        }
    });

    // 解码按钮
    decodeBtn.addEventListener('click', () => {
        const input = urlInput.value;
        if (!input) {
            showStatus('请输入内容', 'error');
            urlOutput.value = '';
            return;
        }

        try {
            const decoded = URLConverter.decode(input);
            urlOutput.value = decoded;
            showStatus('✓ URL 解码成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            urlOutput.value = '';
        }
    });

    // 监听输入变化，清除状态消息
    urlInput.addEventListener('input', () => {
        clearStatus();
    });
});
