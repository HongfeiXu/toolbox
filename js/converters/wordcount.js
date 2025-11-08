// 字数统计工具

const WordCounter = {
    // 统计字符数
    countChars(text) {
        return text.length;
    },

    // 统计字数（不含空格）
    countCharsNoSpace(text) {
        return text.replace(/\s/g, '').length;
    },

    // 统计单词数
    countWords(text) {
        // 移除多余空白，按空白分割
        const trimmed = text.trim();
        if (trimmed === '') return 0;
        return trimmed.split(/\s+/).length;
    },

    // 统计行数
    countLines(text) {
        if (text === '') return 0;
        return text.split('\n').length;
    },

    // 统计所有信息
    analyze(text) {
        return {
            chars: this.countChars(text),
            charsNoSpace: this.countCharsNoSpace(text),
            words: this.countWords(text),
            lines: this.countLines(text)
        };
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const wordcountInput = document.getElementById('wordcountInput');
    const charCountEl = document.getElementById('charCount');
    const charCountNoSpaceEl = document.getElementById('charCountNoSpace');
    const wordCountEl = document.getElementById('wordCount');
    const lineCountEl = document.getElementById('lineCount');

    // 更新统计结果
    const updateStats = () => {
        const text = wordcountInput.value;
        const stats = WordCounter.analyze(text);

        charCountEl.textContent = stats.chars;
        charCountNoSpaceEl.textContent = stats.charsNoSpace;
        wordCountEl.textContent = stats.words;
        lineCountEl.textContent = stats.lines;
    };

    // 监听输入变化
    wordcountInput.addEventListener('input', updateStats);

    // 初始化
    updateStats();
});
