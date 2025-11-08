// 单位转换工具

const UnitConverter = {
    // 存储单位转换（全转为字节）
    storage: {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    },

    // 通用转换函数
    convert(value, fromUnit, toUnit, unitMap) {
        if (!value || isNaN(value)) return '';

        const numValue = parseFloat(value);
        const baseValue = numValue * unitMap[fromUnit];
        const result = baseValue / unitMap[toUnit];

        // 根据结果大小决定小数位数
        if (result === 0) return '0';
        if (Math.abs(result) < 0.01 || Math.abs(result) > 1000000) {
            return result.toExponential(6);
        }
        return result.toFixed(6).replace(/\.?0+$/, '');
    },

    // 存储单位转换
    convertStorage(value, from, to) {
        return this.convert(value, from, to, this.storage);
    },

    // 转换为人类可读格式
    formatHumanReadable(value, fromUnit) {
        if (!value || isNaN(value)) return '';

        // 首先转换为字节
        const bytes = parseFloat(value) * this.storage[fromUnit];

        // 定义单位数组（从小到大）
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const unitValues = [1, 1024, 1024 * 1024, 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024];

        // 找到最合适的单位（让数值在 1-1024 之间）
        let selectedUnit = 'B';
        let selectedValue = bytes;

        for (let i = units.length - 1; i >= 0; i--) {
            if (bytes >= unitValues[i]) {
                selectedUnit = units[i];
                selectedValue = bytes / unitValues[i];
                break;
            }
        }

        // 格式化数值
        let formattedValue;
        if (selectedValue === 0) {
            formattedValue = '0';
        } else if (selectedValue >= 100) {
            // 大于等于 100，不显示小数
            formattedValue = Math.round(selectedValue).toString();
        } else if (selectedValue >= 10) {
            // 10-100 之间，保留 1 位小数
            formattedValue = selectedValue.toFixed(1);
        } else {
            // 小于 10，保留 2 位小数
            formattedValue = selectedValue.toFixed(2);
        }

        // 移除末尾的 .0
        formattedValue = formattedValue.replace(/\.0+$/, '');

        return `${formattedValue} ${selectedUnit}`;
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 存储单位转换
    const storageValue = document.getElementById('storageValue');
    const storageFrom = document.getElementById('storageFrom');
    const storageTo = document.getElementById('storageTo');
    const storageResult = document.getElementById('storageResult');
    const storageHumanReadable = document.getElementById('storageHumanReadable');

    const updateStorage = () => {
        if (storageValue.value) {
            // 常规转换结果
            storageResult.value = UnitConverter.convertStorage(
                storageValue.value,
                storageFrom.value,
                storageTo.value
            );
            // 人类可读格式
            storageHumanReadable.value = UnitConverter.formatHumanReadable(
                storageValue.value,
                storageFrom.value
            );
        } else {
            storageResult.value = '';
            storageHumanReadable.value = '';
        }
    };

    storageValue.addEventListener('input', updateStorage);
    storageFrom.addEventListener('change', updateStorage);
    storageTo.addEventListener('change', updateStorage);
});
