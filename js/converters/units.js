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

    // 长度单位转换（全转为米）
    length: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001
    },

    // 重量单位转换（全转为克）
    weight: {
        g: 1,
        kg: 1000,
        mg: 0.001,
        t: 1000000
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

    // 长度单位转换
    convertLength(value, from, to) {
        return this.convert(value, from, to, this.length);
    },

    // 重量单位转换
    convertWeight(value, from, to) {
        return this.convert(value, from, to, this.weight);
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

    // 长度单位转换
    const lengthValue = document.getElementById('lengthValue');
    const lengthFrom = document.getElementById('lengthFrom');
    const lengthTo = document.getElementById('lengthTo');
    const lengthResult = document.getElementById('lengthResult');

    const updateLength = () => {
        if (lengthValue.value) {
            lengthResult.value = UnitConverter.convertLength(
                lengthValue.value,
                lengthFrom.value,
                lengthTo.value
            );
        } else {
            lengthResult.value = '';
        }
    };

    lengthValue.addEventListener('input', updateLength);
    lengthFrom.addEventListener('change', updateLength);
    lengthTo.addEventListener('change', updateLength);

    // 重量单位转换
    const weightValue = document.getElementById('weightValue');
    const weightFrom = document.getElementById('weightFrom');
    const weightTo = document.getElementById('weightTo');
    const weightResult = document.getElementById('weightResult');

    const updateWeight = () => {
        if (weightValue.value) {
            weightResult.value = UnitConverter.convertWeight(
                weightValue.value,
                weightFrom.value,
                weightTo.value
            );
        } else {
            weightResult.value = '';
        }
    };

    weightValue.addEventListener('input', updateWeight);
    weightFrom.addEventListener('change', updateWeight);
    weightTo.addEventListener('change', updateWeight);
});
