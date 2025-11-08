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

    // 统一的转换处理函数
    const updateTimestamp = () => {
        const secondStr = secondInput.value.trim();
        const msStr = msInput.value.trim();
        const datetimeStr = datetimeInput.value.trim();

        try {
            if (secondStr && TimestampConverter.isValidSeconds(secondStr)) {
                // 秒级时间戳输入有效
                const date = TimestampConverter.secondsToDate(parseInt(secondStr));
                msInput.value = TimestampConverter.dateToMs(date);
                datetimeInput.value = TimestampConverter.dateToDatetimeLocal(date);
            } else if (msStr && TimestampConverter.isValidMs(msStr)) {
                // 毫秒级时间戳输入有效
                const date = TimestampConverter.msToDate(msStr);
                secondInput.value = TimestampConverter.dateToSeconds(date);
                datetimeInput.value = TimestampConverter.dateToDatetimeLocal(date);
            } else if (datetimeStr) {
                // 日期时间输入有效
                const date = TimestampConverter.datetimeLocalToDate(datetimeStr);
                if (!isNaN(date.getTime())) {
                    secondInput.value = TimestampConverter.dateToSeconds(date);
                    msInput.value = TimestampConverter.dateToMs(date);
                } else {
                    secondInput.value = '';
                    msInput.value = '';
                }
            }
        } catch (error) {
            // 输入格式不正确，清除其他字段
            if (document.activeElement === secondInput && !TimestampConverter.isValidSeconds(secondStr)) {
                msInput.value = '';
                datetimeInput.value = '';
            } else if (document.activeElement === msInput && !TimestampConverter.isValidMs(msStr)) {
                secondInput.value = '';
                datetimeInput.value = '';
            } else if (document.activeElement === datetimeInput && !datetimeStr) {
                secondInput.value = '';
                msInput.value = '';
            }
        }
    };

    // 监听输入变化
    secondInput.addEventListener('input', updateTimestamp);
    msInput.addEventListener('input', updateTimestamp);
    datetimeInput.addEventListener('change', updateTimestamp);

    // "获取当前时间戳" 按钮点击事件
    nowBtn.addEventListener('click', () => {
        const now = TimestampConverter.getNow();
        secondInput.value = now.seconds;
        msInput.value = now.ms;
        datetimeInput.value = TimestampConverter.dateToDatetimeLocal(new Date());
    });
});
