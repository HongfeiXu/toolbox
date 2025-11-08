// 色值转换工具

const ColorConverter = {
    // HEX 到 RGB
    hexToRgb(hex) {
        // 移除 # 符号
        hex = hex.replace(/^#/, '');

        // 处理 3 位 HEX (#fff -> #ffffff)
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
    },

    // RGB 到 HEX
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    },

    // RGB 字符串解析
    parseRgb(rgbStr) {
        const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return null;
    },

    // RGB 对象到字符串
    rgbToString(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    },

    // RGB 到 HSL
    rgbToHsl(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },

    // HSL 到 RGB
    hslToRgb(h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },

    // HSL 字符串解析
    parseHsl(hslStr) {
        const match = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (match) {
            return {
                h: parseInt(match[1]),
                s: parseInt(match[2]),
                l: parseInt(match[3])
            };
        }
        return null;
    },

    // HSL 对象到字符串
    hslToString(h, s, l) {
        return `hsl(${h}, ${s}%, ${l}%)`;
    },

    // 验证 HEX
    isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    },

    // 验证 RGB
    isValidRgb(rgbStr) {
        return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(rgbStr);
    },

    // 验证 HSL
    isValidHsl(hslStr) {
        return /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(hslStr);
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const hexInput = document.getElementById('colorHex');
    const rgbInput = document.getElementById('colorRgb');
    const hslInput = document.getElementById('colorHsl');
    const preview = document.getElementById('colorPreview');

    // 转换并更新其他字段
    const convertFromHex = (hex) => {
        if (!ColorConverter.isValidHex(hex)) return false;
        const { r, g, b } = ColorConverter.hexToRgb(hex);
        const { h, s, l } = ColorConverter.rgbToHsl(r, g, b);
        rgbInput.value = ColorConverter.rgbToString(r, g, b);
        hslInput.value = ColorConverter.hslToString(h, s, l);
        preview.style.backgroundColor = hex;
        return true;
    };

    const convertFromRgb = (rgb) => {
        if (!ColorConverter.isValidRgb(rgb)) return false;
        const parsed = ColorConverter.parseRgb(rgb);
        if (!parsed) return false;
        const { h, s, l } = ColorConverter.rgbToHsl(parsed.r, parsed.g, parsed.b);
        hexInput.value = ColorConverter.rgbToHex(parsed.r, parsed.g, parsed.b);
        hslInput.value = ColorConverter.hslToString(h, s, l);
        preview.style.backgroundColor = rgb;
        return true;
    };

    const convertFromHsl = (hsl) => {
        if (!ColorConverter.isValidHsl(hsl)) return false;
        const parsed = ColorConverter.parseHsl(hsl);
        if (!parsed) return false;
        const { r, g, b } = ColorConverter.hslToRgb(parsed.h, parsed.s, parsed.l);
        hexInput.value = ColorConverter.rgbToHex(r, g, b);
        rgbInput.value = ColorConverter.rgbToString(r, g, b);
        preview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        return true;
    };

    // 错误提示元素
    const hexError = document.getElementById('hexError');
    const rgbError = document.getElementById('rgbError');
    const hslError = document.getElementById('hslError');

    // 清除错误提示
    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    };

    // 显示错误提示
    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        errorElement.textContent = '❌ ' + message;
    };

    // 根据色值更新取色盘位置
    const updatePickerPositionFromColor = () => {
        const hslValue = hslInput.value.trim();
        if (!hslValue) return;

        const match = hslValue.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match) return;

        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = parseInt(match[3]);

        // 更新色相滑块
        hueSlider.value = h;
        updatePickerBackground(h);

        // 计算光标位置（相对于父元素）
        const width = colorPickerWrapper.offsetWidth;
        const height = colorPickerWrapper.offsetHeight;
        const x = (s / 100) * width;
        const y = ((100 - l) / 100) * height;

        // 更新光标位置
        colorCursor.style.left = x + 'px';
        colorCursor.style.top = y + 'px';
    };

    // 验证 HEX 输入
    const validateAndUpdateHex = () => {
        const hex = hexInput.value.trim();
        if (!hex) {
            clearError(hexInput, hexError);
            return;
        }

        if (!ColorConverter.isValidHex(hex)) {
            showError(hexInput, hexError, 'HEX 格式错误，应为 #RRGGBB（如 #FF5733）');
            return;
        }

        clearError(hexInput, hexError);
        convertFromHex(hex);
        updatePickerPositionFromColor();
    };

    hexInput.addEventListener('blur', validateAndUpdateHex);

    hexInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateAndUpdateHex();
        }
    });

    // 验证 RGB 输入
    const validateAndUpdateRgb = () => {
        const rgb = rgbInput.value.trim();
        if (!rgb) {
            clearError(rgbInput, rgbError);
            return;
        }

        if (!ColorConverter.isValidRgb(rgb)) {
            showError(rgbInput, rgbError, 'RGB 格式错误，应为 rgb(R, G, B)（如 rgb(255, 87, 51)）');
            return;
        }

        clearError(rgbInput, rgbError);
        convertFromRgb(rgb);
        updatePickerPositionFromColor();
    };

    rgbInput.addEventListener('blur', validateAndUpdateRgb);

    rgbInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateAndUpdateRgb();
        }
    });

    // 验证 HSL 输入
    const validateAndUpdateHsl = () => {
        const hsl = hslInput.value.trim();
        if (!hsl) {
            clearError(hslInput, hslError);
            return;
        }

        if (!ColorConverter.isValidHsl(hsl)) {
            showError(hslInput, hslError, 'HSL 格式错误，应为 hsl(H, S%, L%)（如 hsl(10, 100%, 60%)）');
            return;
        }

        clearError(hslInput, hslError);
        convertFromHsl(hsl);
        updatePickerPositionFromColor();
    };

    hslInput.addEventListener('blur', validateAndUpdateHsl);

    hslInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateAndUpdateHsl();
        }
    });

    // 初始化时设置一个默认颜色
    hexInput.value = '#000000';
    convertFromHex('#000000');

    // ===== 取色盘功能 =====
    const colorPickerWrapper = document.getElementById('colorGradient').parentElement;
    const colorCursor = document.getElementById('colorCursor');
    const hueSlider = document.getElementById('hueSlider');

    let isDragging = false;

    // 更新取色盘背景（根据色相）
    const updatePickerBackground = (hue) => {
        colorPickerWrapper.style.background = `
            linear-gradient(to bottom, white, transparent 50%, black),
            linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))
        `;
    };

    // 从取色盘位置计算颜色对象
    const getColorFromPickerPosition = (event) => {
        const rect = colorPickerWrapper.getBoundingClientRect();

        // 使用 offsetWidth/offsetHeight 保证一致性
        const width = colorPickerWrapper.offsetWidth;
        const height = colorPickerWrapper.offsetHeight;

        const x = Math.max(0, Math.min(event.clientX - rect.left, width));
        const y = Math.max(0, Math.min(event.clientY - rect.top, height));

        const saturation = Math.round((x / width) * 100);
        const lightness = Math.round(100 - (y / height) * 100);
        const hue = parseInt(hueSlider.value);

        return { x, y, hue, saturation, lightness };
    };

    // 更新颜色（拖动时实时更新所有内容）
    const updateColorFromPicker = (event) => {
        const { x, y, hue, saturation, lightness } = getColorFromPickerPosition(event);

        // 更新光标位置
        colorCursor.style.left = x + 'px';
        colorCursor.style.top = y + 'px';

        // 转换并更新所有色值输入框和预览框
        const { r, g, b } = ColorConverter.hslToRgb(hue, saturation, lightness);
        hexInput.value = ColorConverter.rgbToHex(r, g, b);
        rgbInput.value = ColorConverter.rgbToString(r, g, b);
        hslInput.value = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        preview.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        // 清除所有错误提示
        clearError(hexInput, hexError);
        clearError(rgbInput, rgbError);
        clearError(hslInput, hslError);
    };

    // 鼠标按下 - 开始拖动并立即更新
    colorPickerWrapper.addEventListener('mousedown', (event) => {
        isDragging = true;
        updateColorFromPicker(event);
    });

    // 鼠标移动 - 拖动时实时更新颜色
    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        // 检查鼠标是否还在取色盘范围内
        const rect = colorPickerWrapper.getBoundingClientRect();
        const isInPicker =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (isInPicker) {
            updateColorFromPicker(event);
        }
    });

    // 鼠标松开 - 结束拖动
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
    });

    // 色相滑块变化 - 确认颜色（更新输入框）
    hueSlider.addEventListener('input', () => {
        const hue = parseInt(hueSlider.value);
        updatePickerBackground(hue);

        // 获取当前光标位置（相对位置）
        const x = parseInt(colorCursor.style.left) || 0;
        const y = parseInt(colorCursor.style.top) || 0;
        const width = colorPickerWrapper.offsetWidth;
        const height = colorPickerWrapper.offsetHeight;

        // 计算当前的饱和度和亮度
        const saturation = Math.round((x / width) * 100);
        const lightness = Math.round(100 - (y / height) * 100);

        // 更新色值输入框
        const { r, g, b } = ColorConverter.hslToRgb(hue, saturation, lightness);
        hexInput.value = ColorConverter.rgbToHex(r, g, b);
        rgbInput.value = ColorConverter.rgbToString(r, g, b);
        hslInput.value = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        preview.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    // 初始化取色盘背景和光标位置
    updatePickerBackground(0);
    updatePickerPositionFromColor();

    // 清除所有错误提示
    clearError(hexInput, hexError);
    clearError(rgbInput, rgbError);
    clearError(hslInput, hslError);
});
