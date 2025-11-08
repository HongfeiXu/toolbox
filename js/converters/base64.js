// Base64 编码/解码工具

const Base64Converter = {
    // Base64 编码
    encode(text) {
        try {
            // 使用 btoa 进行编码，但需要先处理 UTF-8
            const utf8Bytes = new TextEncoder().encode(text);
            let binary = '';
            for (let i = 0; i < utf8Bytes.length; i++) {
                binary += String.fromCharCode(utf8Bytes[i]);
            }
            return btoa(binary);
        } catch (error) {
            throw new Error('编码失败: ' + error.message);
        }
    },

    // Base64 解码
    decode(base64Str) {
        try {
            // 使用 atob 进行解码
            const binary = atob(base64Str);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            return new TextDecoder().decode(bytes);
        } catch (error) {
            throw new Error('解码失败: ' + error.message);
        }
    },

    // 验证是否为有效的 Base64
    isValidBase64(str) {
        try {
            if (typeof str !== 'string') return false;

            // Base64 字符集
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
            if (!base64Regex.test(str)) return false;

            // 尝试解码
            atob(str);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const base64Input = document.getElementById('base64Input');
    const base64Output = document.getElementById('base64Output');
    const base64Status = document.getElementById('base64Status');
    const encodeBtn = document.getElementById('base64EncodeBtn');
    const decodeBtn = document.getElementById('base64DecodeBtn');

    // 显示状态消息的函数
    const showStatus = (message, type) => {
        base64Status.textContent = message;
        base64Status.className = 'status-message ' + type;
    };

    // 清除状态消息
    const clearStatus = () => {
        base64Status.textContent = '';
        base64Status.className = 'status-message';
    };

    // 编码按钮
    encodeBtn.addEventListener('click', () => {
        const input = base64Input.value;
        if (!input) {
            showStatus('请输入文本内容', 'error');
            base64Output.value = '';
            return;
        }

        try {
            const encoded = Base64Converter.encode(input);
            base64Output.value = encoded;
            showStatus('✓ Base64 编码成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            base64Output.value = '';
        }
    });

    // 解码按钮
    decodeBtn.addEventListener('click', () => {
        const input = base64Input.value.trim();
        if (!input) {
            showStatus('请输入 Base64 编码', 'error');
            base64Output.value = '';
            return;
        }

        // 检查是否为有效的 Base64
        if (!Base64Converter.isValidBase64(input)) {
            showStatus('✗ Base64 格式无效', 'error');
            base64Output.value = '';
            return;
        }

        try {
            const decoded = Base64Converter.decode(input);
            base64Output.value = decoded;
            showStatus('✓ Base64 解码成功', 'success');
        } catch (error) {
            showStatus(error.message, 'error');
            base64Output.value = '';
        }
    });

    // 监听输入变化，清除状态消息
    base64Input.addEventListener('input', () => {
        clearStatus();
    });
});
