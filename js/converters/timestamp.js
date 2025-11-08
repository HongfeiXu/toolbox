// 时间戳转换工具

const TimestampConverter = {
    // 时间戳（秒）转日期对象
    secondsToDate(seconds) {
        return new Date(seconds * 1000);
    },

    // 时间戳（毫秒）转日期对象
    msToDate(ms) {
        return new Date(parseInt(ms));
    },

    // 日期对象转时间戳（秒）
    dateToSeconds(date) {
        return Math.floor(date.getTime() / 1000);
    },

    // 日期对象转时间戳（毫秒）
    dateToMs(date) {
        return date.getTime();
    },

    // 将日期转换为 ISO 字符串（本地时间）
    dateToDatetimeLocal(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },

    // 从 datetime-local 格式转换为日期对象
    datetimeLocalToDate(datetimeStr) {
        // datetime-local 格式：YYYY-MM-DDTHH:mm:ss
        return new Date(datetimeStr);
    },

    // 获取当前时间戳
    getNow() {
        return {
            seconds: Math.floor(Date.now() / 1000),
            ms: Date.now()
        };
    },

    // 验证时间戳（秒）
    isValidSeconds(str) {
        const num = parseInt(str);
        return !isNaN(num) && num >= 0 && num < 100000000000; // 允许到 2286 年
    },

    // 验证时间戳（毫秒）
    isValidMs(str) {
        const num = parseInt(str);
        return !isNaN(num) && num >= 0 && num < 100000000000000; // 允许到 2286 年
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const secondInput = document.getElementById('timestampSecond');
    const msInput = document.getElementById('timestampMs');
    const datetimeInput = document.getElementById('datetimeInput');
    const nowBtn = document.getElementById('nowBtn');

    // 秒级时间戳变化时的处理
    const updateFromSeconds = () => {
        const secondStr = secondInput.value.trim();
        if (!secondStr) {
            msInput.value = '';
            datetimeInput.value = '';
            return;
        }

        if (TimestampConverter.isValidSeconds(secondStr)) {
            const date = TimestampConverter.secondsToDate(parseInt(secondStr));
            msInput.value = TimestampConverter.dateToMs(date);
            datetimeInput.value = TimestampConverter.dateToDatetimeLocal(date);
        }
    };

    // 毫秒级时间戳变化时的处理
    const updateFromMs = () => {
        const msStr = msInput.value.trim();
        if (!msStr) {
            secondInput.value = '';
            datetimeInput.value = '';
            return;
        }

        if (TimestampConverter.isValidMs(msStr)) {
            const date = TimestampConverter.msToDate(msStr);
            secondInput.value = TimestampConverter.dateToSeconds(date);
            datetimeInput.value = TimestampConverter.dateToDatetimeLocal(date);
        }
    };

    // 日期时间变化时的处理
    const updateFromDatetime = () => {
        const datetimeStr = datetimeInput.value.trim();
        if (!datetimeStr) {
            secondInput.value = '';
            msInput.value = '';
            return;
        }

        const date = TimestampConverter.datetimeLocalToDate(datetimeStr);
        if (!isNaN(date.getTime())) {
            secondInput.value = TimestampConverter.dateToSeconds(date);
            msInput.value = TimestampConverter.dateToMs(date);
        } else {
            secondInput.value = '';
            msInput.value = '';
        }
    };

    // 监听输入变化 - 每个字段独立处理
    secondInput.addEventListener('input', updateFromSeconds);
    msInput.addEventListener('input', updateFromMs);
    // datetime-local 需要同时监听 input 和 change 事件
    // input: 实时捕捉用户输入
    // change: 捕捉日期选择器的选择
    datetimeInput.addEventListener('input', updateFromDatetime);
    datetimeInput.addEventListener('change', updateFromDatetime);

    // "获取当前时间戳" 按钮点击事件
    nowBtn.addEventListener('click', () => {
        const now = TimestampConverter.getNow();
        secondInput.value = now.seconds;
        msInput.value = now.ms;
        datetimeInput.value = TimestampConverter.dateToDatetimeLocal(new Date());
    });
});
