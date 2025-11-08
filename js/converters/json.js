// JSON 格式化工具

const JsonFormatter = {
    // 美化 JSON（格式化）
    format(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            throw new Error('JSON 格式错误: ' + error.message);
        }
    },

    // 压缩 JSON
    compress(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            return JSON.stringify(parsed);
        } catch (error) {
            throw new Error('JSON 格式错误: ' + error.message);
        }
    },

    // 验证 JSON
    validate(jsonStr) {
        try {
            JSON.parse(jsonStr);
            return { valid: true, message: '✓ JSON 格式正确' };
        } catch (error) {
            return { valid: false, message: '✗ JSON 格式错误: ' + error.message };
        }
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const jsonStatus = document.getElementById('jsonStatus');
    const formatBtn = document.getElementById('jsonFormatBtn');
    const compressBtn = document.getElementById('jsonCompressBtn');
    const validateBtn = document.getElementById('jsonValidateBtn');

    // 显示状态消息的函数
    const showStatus = (message, type) => {
        jsonStatus.textContent = message;
        jsonStatus.className = 'status-message ' + type;
    };

    // 清除状态消息
    const clearStatus = () => {
        jsonStatus.textContent = '';
        jsonStatus.className = 'status-message';
    };

    // 美化按钮
    formatBtn.addEventListener('click', () => {
        const input = jsonInput.value.trim();
        if (!input) {
            showStatus('请输入 JSON 内容', 'error');
            jsonOutput.value = '';
            return;
        }

        try {
            const formatted = JsonFormatter.format(input);
            jsonOutput.value = formatted;
            showStatus('✓ JSON 美化成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            jsonOutput.value = '';
        }
    });

    // 压缩按钮
    compressBtn.addEventListener('click', () => {
        const input = jsonInput.value.trim();
        if (!input) {
            showStatus('请输入 JSON 内容', 'error');
            jsonOutput.value = '';
            return;
        }

        try {
            const compressed = JsonFormatter.compress(input);
            jsonOutput.value = compressed;
            showStatus('✓ JSON 压缩成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            jsonOutput.value = '';
        }
    });

    // 验证按钮
    validateBtn.addEventListener('click', () => {
        const input = jsonInput.value.trim();
        if (!input) {
            showStatus('请输入 JSON 内容', 'error');
            jsonOutput.value = '';
            return;
        }

        const result = JsonFormatter.validate(input);
        if (result.valid) {
            showStatus(result.message, 'success');
            jsonOutput.value = '';
        } else {
            showStatus(result.message, 'error');
            jsonOutput.value = '';
        }
    });

    // 监听输入变化，清除状态消息
    jsonInput.addEventListener('input', () => {
        clearStatus();
    });
});
