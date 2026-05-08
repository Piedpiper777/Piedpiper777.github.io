# 秋招前100天刷题与英语听说训练计划

一个用于展示和管理秋招学习计划的网站。

## 功能

- 📅 **训练计划展示**：按阶段和周查看详细的学习计划
- 📝 **学习记录**：记录每周的学习笔记

## 技术栈

- React + Vite
- CSS3

## 快速开始

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建生产版本

```bash
npm run build
```

### 部署到 GitHub Pages

每次推送代码到 `main` 分支，GitHub Actions 会自动部署到 `gh-pages` 分支。

手动部署：
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

## 在线访问

https://piedpiper777.github.io

## 项目结构

```
.
├── src/
│   ├── components/      # React 组件
│   │   ├── PlanView.jsx    # 计划展示视图
│   │   ├── WeekDetail.jsx  # 周详情组件
│   │   └── NotesView.jsx   # 学习记录视图
│   ├── data/
│   │   └── planData.js     # 100天计划数据
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 样式文件
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json         # 项目配置
```
