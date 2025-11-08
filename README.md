# 工具箱 🛠️

一个本地工具集合网页，提供常用的转换和计算功能。所有操作在客户端完成，无需服务器支持。

**在线访问**：https://HongfeiXu.github.io/toolbox/

## ✨ 功能特性

### 🎨 核心功能
1. **色值转换** - HEX ↔ RGB ↔ HSL，交互式取色盘
2. **时间戳转换** - 秒/毫秒时间戳 ↔ 日期时间互转
3. **单位转换** - 存储单位（B/KB/MB/GB/TB）+ 人类可读格式

### 💻 开发者工具
4. **JSON 格式化** - 美化、压缩、验证 JSON
5. **Base64 编码/解码** - 文本 ↔ Base64 互转，UTF-8 支持
6. **UUID 生成器** - 快速生成 UUID v4，支持批量生成
7. **字数统计** - 统计字符、单词、行数
8. **URL 编码/解码** - 处理特殊字符

## 🚀 快速开始

### 在线使用
直接访问：https://HongfeiXu.github.io/toolbox/

### 本地运行
```bash
# 克隆仓库
git clone https://github.com/HongfeiXu/toolbox.git
cd toolbox

# 使用 Python 启动本地服务器（推荐）
python -m http.server 8000

# 或使用 Node.js
npx http-server

# 浏览器访问 http://localhost:8000
```

## 🎨 功能亮点

- **暗黑模式**：支持亮色/暗色/自动三种模式，自动跟随系统设置
- **Tab 持久化**：刷新页面后自动恢复上次访问的工具
- **一键复制**：所有结果支持一键复制到剪贴板
- **实时转换**：输入即时显示结果
- **响应式设计**：适配各种屏幕尺寸

## 📁 项目结构

```
project_0/
├── index.html              # 主页面
├── css/
│   └── style.css           # 全局样式（含暗黑模式）
├── js/
│   ├── app.js              # 主应用逻辑（Tab、复制）
│   ├── theme.js            # 主题管理
│   └── converters/         # 转换器模块
│       ├── color.js        # 色值转换
│       ├── timestamp.js    # 时间戳转换
│       ├── units.js        # 单位转换
│       ├── json.js         # JSON 格式化
│       ├── base64.js       # Base64 编码
│       ├── uuid.js         # UUID 生成器
│       ├── wordcount.js    # 字数统计
│       └── url.js          # URL 编码
└── tests/
    └── converters.test.js  # 单元测试
```

## 💡 技术栈

- **前端**：纯 HTML/CSS/JavaScript（零依赖）
- **部署**：GitHub Pages
- **测试**：原生 JavaScript 单元测试

## 📝 使用说明

### 色值转换
- 支持 HEX、RGB、HSL 三种格式互转
- 交互式取色盘，拖拽选择颜色
- 实时颜色预览

### 时间戳转换
- 支持秒级和毫秒级时间戳
- 日期时间选择器
- 一键获取当前时间戳

### 单位转换
- 存储单位：B、KB、MB、GB、TB
- 自动显示人类可读格式（如 "1.5 GB"）

### JSON 格式化
- 美化：格式化 JSON 字符串
- 压缩：移除所有空白字符
- 验证：检查 JSON 格式是否正确

### Base64 编码/解码
- 支持 UTF-8 编码
- 自动处理中文等特殊字符

### UUID 生成器
- 生成标准 UUID v4
- 支持批量生成（1-100 个）

### 字数统计
- 统计字符数、单词数、行数
- 实时更新

### URL 编码/解码
- URL 编码：将特殊字符转换为 URL 安全格式
- URL 解码：还原编码后的 URL

---

**GitHub**：https://github.com/HongfeiXu/toolbox
