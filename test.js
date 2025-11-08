// ========================================
// 工具箱项目 - 核心逻辑测试脚本
// ========================================

// 颜色转换器测试
const ColorConverter = {
    hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    },

    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    },

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
    }
};

// 时间戳转换器
const TimestampConverter = {
    secondsToDate(seconds) {
        return new Date(seconds * 1000);
    },
    msToDate(ms) {
        return new Date(parseInt(ms));
    },
    dateToSeconds(date) {
        return Math.floor(date.getTime() / 1000);
    },
    dateToMs(date) {
        return date.getTime();
    },
    isValidSeconds(str) {
        const num = parseInt(str);
        return !isNaN(num) && num >= 0 && num < 100000000000;
    }
};

// 单位转换器
const UnitConverter = {
    storage: {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    },
    length: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001
    },
    weight: {
        g: 1,
        kg: 1000,
        mg: 0.001,
        t: 1000000
    },
    convert(value, fromUnit, toUnit, unitMap) {
        if (!value || isNaN(value)) return '';
        const numValue = parseFloat(value);
        const baseValue = numValue * unitMap[fromUnit];
        const result = baseValue / unitMap[toUnit];
        if (result === 0) return '0';
        if (Math.abs(result) < 0.01 || Math.abs(result) > 1000000) {
            return result.toExponential(6);
        }
        return result.toFixed(6).replace(/\.?0+$/, '');
    },
    convertStorage(value, from, to) {
        return this.convert(value, from, to, this.storage);
    },
    convertLength(value, from, to) {
        return this.convert(value, from, to, this.length);
    },
    convertWeight(value, from, to) {
        return this.convert(value, from, to, this.weight);
    }
};

// JSON 格式化器
const JsonFormatter = {
    format(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            return JSON.stringify(parsed, null, 2);
        } catch (error) {
            throw new Error('JSON 格式错误: ' + error.message);
        }
    },
    compress(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            return JSON.stringify(parsed);
        } catch (error) {
            throw new Error('JSON 格式错误: ' + error.message);
        }
    },
    validate(jsonStr) {
        try {
            JSON.parse(jsonStr);
            return { valid: true, message: '✓ JSON 格式正确' };
        } catch (error) {
            return { valid: false, message: '✗ JSON 格式错误: ' + error.message };
        }
    }
};

// Base64 转换器
const Base64Converter = {
    encode(text) {
        try {
            const utf8Bytes = Buffer.from(text, 'utf8');
            return utf8Bytes.toString('base64');
        } catch (error) {
            throw new Error('编码失败: ' + error.message);
        }
    },
    decode(base64Str) {
        try {
            return Buffer.from(base64Str, 'base64').toString('utf8');
        } catch (error) {
            throw new Error('解码失败: ' + error.message);
        }
    },
    isValidBase64(str) {
        try {
            if (typeof str !== 'string') return false;
            const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
            if (!base64Regex.test(str)) return false;
            Buffer.from(str, 'base64');
            return true;
        } catch (error) {
            return false;
        }
    }
};

// UUID 生成器
const UUIDGenerator = {
    generateV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    generateMultiple(count) {
        const uuids = [];
        count = Math.max(1, Math.min(count, 100));
        for (let i = 0; i < count; i++) {
            uuids.push(this.generateV4());
        }
        return uuids;
    }
};

// 字数统计
const WordCounter = {
    countChars(text) {
        return text.length;
    },
    countCharsNoSpace(text) {
        return text.replace(/\s/g, '').length;
    },
    countWords(text) {
        const trimmed = text.trim();
        if (trimmed === '') return 0;
        return trimmed.split(/\s+/).length;
    },
    countLines(text) {
        if (text === '') return 0;
        return text.split('\n').length;
    },
    analyze(text) {
        return {
            chars: this.countChars(text),
            charsNoSpace: this.countCharsNoSpace(text),
            words: this.countWords(text),
            lines: this.countLines(text)
        };
    }
};

// URL 转换器
const URLConverter = {
    encode(text) {
        try {
            return encodeURIComponent(text);
        } catch (error) {
            throw new Error('编码失败: ' + error.message);
        }
    },
    decode(encodedText) {
        try {
            return decodeURIComponent(encodedText);
        } catch (error) {
            throw new Error('解码失败: ' + error.message);
        }
    }
};

// ========================================
// 测试框架
// ========================================

class TestSuite {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    run() {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`✓ 测试套件: ${this.name}`);
        console.log(`${'='.repeat(50)}\n`);

        this.tests.forEach((test, index) => {
            try {
                test.fn();
                this.passed++;
                console.log(`  ✓ ${index + 1}. ${test.name}`);
            } catch (error) {
                this.failed++;
                console.log(`  ✗ ${index + 1}. ${test.name}`);
                console.log(`     错误: ${error.message}`);
            }
        });

        console.log(`\n${'─'.repeat(50)}`);
        console.log(`结果: ${this.passed} 通过, ${this.failed} 失败`);
        console.log(`${'─'.repeat(50)}\n`);

        return this.failed === 0;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}\n  期望: ${expected}\n  实际: ${actual}`);
    }
}

function assertDeepEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${message}\n  期望: ${JSON.stringify(expected)}\n  实际: ${JSON.stringify(actual)}`);
    }
}

// ========================================
// 测试用例
// ========================================

// 1. 颜色转换测试
const colorTests = new TestSuite('颜色转换器');

colorTests.test('HEX 转 RGB - #FF5733', () => {
    const rgb = ColorConverter.hexToRgb('#FF5733');
    assertDeepEqual(rgb, { r: 255, g: 87, b: 51 }, 'HEX 转 RGB 失败');
});

colorTests.test('RGB 转 HEX - rgb(255, 87, 51)', () => {
    const hex = ColorConverter.rgbToHex(255, 87, 51);
    assertEqual(hex.toUpperCase(), '#FF5733', 'RGB 转 HEX 失败');
});

colorTests.test('RGB 转 HSL - rgb(255, 0, 0)', () => {
    const hsl = ColorConverter.rgbToHsl(255, 0, 0);
    assertDeepEqual(hsl, { h: 0, s: 100, l: 50 }, 'RGB 转 HSL 失败');
});

colorTests.test('HSL 转 RGB - hsl(0, 100%, 50%)', () => {
    const rgb = ColorConverter.hslToRgb(0, 100, 50);
    assertDeepEqual(rgb, { r: 255, g: 0, b: 0 }, 'HSL 转 RGB 失败');
});

colorTests.test('HEX 转 RGB 转 HSL 的完整链', () => {
    const hex = '#00FF00';
    const rgb = ColorConverter.hexToRgb(hex);
    const hsl = ColorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
    assertEqual(hsl.h, 120, '绿色色相应该是 120°');
    assertEqual(hsl.s, 100, '绿色饱和度应该是 100%');
});

// 2. 时间戳转换测试
const timestampTests = new TestSuite('时间戳转换器');

timestampTests.test('秒级时间戳转日期', () => {
    const date = TimestampConverter.secondsToDate(1699430400);
    assertEqual(date.getFullYear(), 2023, '年份应该是 2023');
});

timestampTests.test('毫秒级时间戳转日期', () => {
    const date = TimestampConverter.msToDate(1699430400000);
    assertEqual(date.getFullYear(), 2023, '年份应该是 2023');
});

timestampTests.test('日期转秒级时间戳', () => {
    const date = new Date('2023-11-08T00:00:00');
    const seconds = TimestampConverter.dateToSeconds(date);
    assertEqual(typeof seconds, 'number', '应该返回数字');
    assertEqual(seconds > 0, true, '时间戳应该大于 0');
});

timestampTests.test('验证秒级时间戳', () => {
    assertEqual(TimestampConverter.isValidSeconds('1699430400'), true, '有效的秒级时间戳');
    assertEqual(TimestampConverter.isValidSeconds('abc'), false, '无效的秒级时间戳');
});

// 3. 单位转换测试
const unitTests = new TestSuite('单位转换器');

unitTests.test('存储单位: 1024 B 转 KB', () => {
    const result = UnitConverter.convertStorage(1024, 'B', 'KB');
    assertEqual(result, '1', '1024 B 应该等于 1 KB');
});

unitTests.test('存储单位: 1 GB 转 MB', () => {
    const result = UnitConverter.convertStorage(1, 'GB', 'MB');
    assertEqual(result, '1024', '1 GB 应该等于 1024 MB');
});

unitTests.test('长度单位: 1000 m 转 km', () => {
    const result = UnitConverter.convertLength(1000, 'm', 'km');
    assertEqual(result, '1', '1000 m 应该等于 1 km');
});

unitTests.test('重量单位: 1000 g 转 kg', () => {
    const result = UnitConverter.convertWeight(1000, 'g', 'kg');
    assertEqual(result, '1', '1000 g 应该等于 1 kg');
});

// 4. JSON 格式化测试
const jsonTests = new TestSuite('JSON 格式化器');

jsonTests.test('JSON 美化', () => {
    const json = '{"key":"value","number":123}';
    const formatted = JsonFormatter.format(json);
    assertEqual(formatted.includes('\n'), true, '美化后应该包含换行');
    assertEqual(formatted.includes('"key"'), true, '美化后应该保留 key');
});

jsonTests.test('JSON 压缩', () => {
    const json = '{\n  "key": "value"\n}';
    const compressed = JsonFormatter.compress(json);
    assertEqual(compressed.includes('\n'), false, '压缩后不应该有换行');
    assertEqual(compressed, '{"key":"value"}', '压缩结果应该正确');
});

jsonTests.test('JSON 验证 - 有效的 JSON', () => {
    const result = JsonFormatter.validate('{"key":"value"}');
    assertEqual(result.valid, true, '有效的 JSON 应该通过验证');
});

jsonTests.test('JSON 验证 - 无效的 JSON', () => {
    const result = JsonFormatter.validate('{invalid json}');
    assertEqual(result.valid, false, '无效的 JSON 应该验证失败');
});

// 5. Base64 编码测试
const base64Tests = new TestSuite('Base64 编码/解码器');

base64Tests.test('Base64 编码 - 英文文本', () => {
    const encoded = Base64Converter.encode('hello');
    assertEqual(encoded, 'aGVsbG8=', 'hello 的 Base64 编码应该是 aGVsbG8=');
});

base64Tests.test('Base64 解码 - 英文文本', () => {
    const decoded = Base64Converter.decode('aGVsbG8=');
    assertEqual(decoded, 'hello', 'aGVsbG8= 应该解码为 hello');
});

base64Tests.test('Base64 编码 - 中文文本', () => {
    const encoded = Base64Converter.encode('你好');
    assertEqual(typeof encoded, 'string', '中文编码应该返回字符串');
    assertEqual(encoded.length > 0, true, '编码结果不应该为空');
});

base64Tests.test('Base64 编码/解码往返', () => {
    const original = '测试文本 123';
    const encoded = Base64Converter.encode(original);
    const decoded = Base64Converter.decode(encoded);
    assertEqual(decoded, original, '往返编码应该得到原始文本');
});

base64Tests.test('Base64 验证 - 有效的编码', () => {
    assertEqual(Base64Converter.isValidBase64('aGVsbG8='), true, '有效的 Base64');
});

base64Tests.test('Base64 验证 - 无效的编码', () => {
    assertEqual(Base64Converter.isValidBase64('!!!'), false, '无效的 Base64');
});

// 6. UUID 生成测试
const uuidTests = new TestSuite('UUID 生成器');

uuidTests.test('生成单个 UUID', () => {
    const uuid = UUIDGenerator.generateV4();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertEqual(uuidRegex.test(uuid), true, 'UUID 格式应该正确');
});

uuidTests.test('生成多个 UUID', () => {
    const uuids = UUIDGenerator.generateMultiple(5);
    assertEqual(uuids.length, 5, '应该生成 5 个 UUID');
    const uniqueUuids = new Set(uuids);
    assertEqual(uniqueUuids.size, 5, '每个 UUID 应该是唯一的');
});

uuidTests.test('UUID 生成限制', () => {
    const uuids = UUIDGenerator.generateMultiple(200);
    assertEqual(uuids.length, 100, '生成数量应该限制在 100');
});

// 7. 字数统计测试
const wordcountTests = new TestSuite('字数统计器');

wordcountTests.test('统计字符数', () => {
    const count = WordCounter.countChars('hello');
    assertEqual(count, 5, '字符数应该是 5');
});

wordcountTests.test('统计不含空格的字符数', () => {
    const count = WordCounter.countCharsNoSpace('hello world');
    assertEqual(count, 10, '不含空格的字符数应该是 10');
});

wordcountTests.test('统计单词数', () => {
    const count = WordCounter.countWords('hello world test');
    assertEqual(count, 3, '单词数应该是 3');
});

wordcountTests.test('统计行数', () => {
    const count = WordCounter.countLines('line1\nline2\nline3');
    assertEqual(count, 3, '行数应该是 3');
});

wordcountTests.test('完整分析', () => {
    const text = 'hello world';
    const stats = WordCounter.analyze(text);
    assertEqual(stats.chars, 11, '字符数应该是 11');
    assertEqual(stats.charsNoSpace, 10, '不含空格字符数应该是 10');
    assertEqual(stats.words, 2, '单词数应该是 2');
});

// 8. URL 编码测试
const urlTests = new TestSuite('URL 编码/解码器');

urlTests.test('URL 编码 - 英文文本', () => {
    const encoded = URLConverter.encode('hello world');
    assertEqual(encoded, 'hello%20world', '空格应该编码为 %20');
});

urlTests.test('URL 编码 - 特殊字符', () => {
    const encoded = URLConverter.encode('?&=');
    assertEqual(encoded, '%3F%26%3D', '特殊字符应该正确编码');
});

urlTests.test('URL 解码', () => {
    const decoded = URLConverter.decode('hello%20world');
    assertEqual(decoded, 'hello world', '应该正确解码');
});

urlTests.test('URL 编码/解码往返', () => {
    const original = '你好 world!';
    const encoded = URLConverter.encode(original);
    const decoded = URLConverter.decode(encoded);
    assertEqual(decoded, original, '往返编码应该得到原始文本');
});

// ========================================
// 运行所有测试
// ========================================

const suites = [
    colorTests,
    timestampTests,
    unitTests,
    jsonTests,
    base64Tests,
    uuidTests,
    wordcountTests,
    urlTests
];

let allPassed = true;
suites.forEach(suite => {
    if (!suite.run()) {
        allPassed = false;
    }
});

// 总结
console.log(`${'='.repeat(50)}`);
if (allPassed) {
    console.log('✓ 所有测试均已通过！');
} else {
    console.log('✗ 有些测试失败，请检查上面的错误信息');
}
console.log(`${'='.repeat(50)}\n`);

process.exit(allPassed ? 0 : 1);
