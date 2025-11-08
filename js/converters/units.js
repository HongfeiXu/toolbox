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
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 存储单位转换
    const storageValue = document.getElementById('storageValue');
    const storageFrom = document.getElementById('storageFrom');
    const storageTo = document.getElementById('storageTo');
    const storageResult = document.getElementById('storageResult');

    const updateStorage = () => {
        if (storageValue.value) {
            storageResult.value = UnitConverter.convertStorage(
                storageValue.value,
                storageFrom.value,
                storageTo.value
            );
        } else {
            storageResult.value = '';
        }
    };

    storageValue.addEventListener('input', updateStorage);
    storageFrom.addEventListener('change', updateStorage);
    storageTo.addEventListener('change', updateStorage);
});
