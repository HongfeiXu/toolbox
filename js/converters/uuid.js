// UUID 生成器

const UUIDGenerator = {
    // 生成单个 UUID v4
    generateV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // 生成多个 UUID
    generateMultiple(count) {
        const uuids = [];
        count = Math.max(1, Math.min(count, 100)); // 限制在 1-100 之间
        for (let i = 0; i < count; i++) {
            uuids.push(this.generateV4());
        }
        return uuids;
    }
};

// 在 DOM 加载完成后初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const uuidCount = document.getElementById('uuidCount');
    const uuidOutput = document.getElementById('uuidOutput');
    const generateUuidBtn = document.getElementById('generateUuidBtn');

    // 生成 UUID
    generateUuidBtn.addEventListener('click', () => {
        const count = parseInt(uuidCount.value);
        if (isNaN(count) || count < 1) {
            uuidCount.value = 1;
            return;
        }

        const uuids = UUIDGenerator.generateMultiple(count);
        uuidOutput.value = uuids.join('\n');
    });

    // 初始生成一个 UUID
    const uuids = UUIDGenerator.generateMultiple(1);
    uuidOutput.value = uuids[0];
});
