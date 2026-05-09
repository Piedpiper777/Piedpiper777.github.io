# 秋招前100天刷题与英语听说训练计划

一个用于展示和管理秋招学习计划的网站。

## 功能

- 📅 **训练计划展示**：按阶段和周查看详细的学习计划
- 📝 **博客系统**：基于 Markdown 的学习笔记/博客（标签、搜索、目录、上一篇/下一篇、RSS）

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

### 博客写作

1. 在 `posts/` 下新增文章：`YYYY-MM-DD-slug.md`
2. 使用 frontmatter：

```md
---
title: "文章标题"
date: "2026-05-20"
tags: ["tag1", "tag2"]
summary: "一句话摘要"
draft: false
---
```

3. 执行构建（会自动生成索引与 RSS）：

```bash
npm run build
```

生成文件：
- `src/.generated/posts-index.json`
- `src/.generated/posts-content.json`
- `public/rss.xml`（构建后复制到 `dist/rss.xml`）

### 预置模板

可直接复制 `posts/templates/` 下模板开始写作：
- `week-review-template.md`：周复盘
- `problem-note-template.md`：一道题一个笔记（解题步骤 + 心得）
- `topic-summary-template.md`：专题总结模板

### 部署到 GitHub Pages

当前仓库采用 `gh-pages` 分支直接托管静态文件。更新后可手动部署：
```bash
npm run build
# PowerShell: 将构建产物同步到仓库根目录后再提交
Copy-Item dist\index.html index.html -Force
Remove-Item assets -Recurse -Force
Copy-Item dist\assets assets -Recurse -Force
Copy-Item dist\rss.xml rss.xml -Force
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
│   │   └── blog/           # 博客组件
│   ├── data/
│   │   ├── planData.js     # 100天计划数据
│   │   └── blogRuntime.js  # 博客运行时数据
│   ├── .generated/         # 构建生成的博客索引
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 样式文件
├── posts/               # Markdown 博客文章
├── scripts/
│   └── generate-blog.mjs   # 博客构建脚本
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json         # 项目配置
```
