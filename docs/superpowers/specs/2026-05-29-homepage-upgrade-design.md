# 个人主页升级设计文档

## 概述

将现有以刷题计划为核心的个人主页，升级为功能更完整的个人主页，新增关于我、博客分类、LeetCode 数据统计、学习日记四大模块。

## 技术方案

**方案 A：直接扩展现有 React SPA**
- 保持 React 18 + Vite + hash 路由
- 无新框架依赖，部署流程不变
- 在现有组件架构上新增页面和功能

## 导航与路由

### 顶部导航栏

| 导航项 | 路由 | 说明 |
|--------|------|------|
| 首页 | `#/` | 个人简介卡片 + 最近动态 |
| 关于我 | `#/about` | 个人介绍、技术栈、社交链接 |
| 博客 | `#/blog` | 文章列表 + 分类筛选 |
| 学习日记 | `#/diary` | 每日学习记录时间线 |
| 刷题记录 | `#/leetcode` | LeetCode 数据统计 |
| 训练计划 | `#/plan` | 保留现有的100天计划 |

### 侧边栏

- 博客页：分类侧边栏（文献解读、vibe coding产品、思考感悟等）
- 学习日记页：按月份分组

## 模块设计

### 模块 1：关于我页面 (`#/about`)

**布局**：单栏居中，简洁信息卡片

**内容结构**：
- 头像
- 名字 + 一句话简介/座右铭
- 自我介绍段落
- 技术栈标签云/徽章（Python, JavaScript, React, FastAPI, CadQuery 等）
- 社交媒体图标链接（GitHub, Email, LinkedIn 等）

**数据来源**：`src/data/aboutData.js`（静态配置文件）

### 模块 2：博客分类系统

**分类字段**：在 Markdown frontmatter 中添加 `category` 字段

```yaml
---
title: "文章标题"
date: 2026-05-20
tags: [tag1, tag2]
category: "vibe-coding"
summary: "..."
---
```

**预设分类**：

| 分类名 | slug | 说明 |
|--------|------|------|
| 文献解读 | `paper-review` | 论文阅读笔记 |
| Vibe Coding 产品 | `vibe-coding` | AI编程工具体验 |
| 思考感悟 | `thoughts` | 个人思考/学习心得 |
| 技术笔记 | `tech-notes` | 技术知识记录 |
| 未分类 | `uncategorized` | 默认分类 |

**UI 变化**：
- 博客页面左侧新增分类侧边栏，点击分类筛选文章
- 文章卡片新增分类标签（彩色徽章）
- 侧边栏显示每个分类的文章数量

**构建脚本改动**：`generate-blog.mjs` 需要提取 `category` 字段并生成分类索引

### 模块 3：LeetCode 刷题记录 (`#/leetcode`)

**数据来源**：LeetCode GraphQL API（公开接口，无需登录）

API 端点：`https://leetcode.com/graphql`

获取的数据：
- 用户提交统计（总提交数、通过数、各难度通过数）
- 最近提交记录
- 已解决题目列表

**页面布局**：
- 用户名显示
- 三列统计卡片（Easy / Medium / Hard 通过数）
- 总计题目数和提交次数
- 难度分布进度条
- 最近提交记录列表（日期、题目、状态）
- 知识点标签统计

**实现方式**：
- 前端直接调用 LeetCode GraphQL API（CORS 已开放）
- 用户名配置在 `src/data/config.js` 中
- 数据缓存在 localStorage， TTL 24小时自动刷新
- 备选：如果 LeetCode API 有 CORS 限制，使用 Vite proxy 代理

**GraphQL 查询示例**：

```graphql
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
  recentAcSubmissionList(username: $username, limit: 10) {
    title
    timestamp
  }
}
```

### 模块 4：学习日记 (`#/diary`)

**格式**：Markdown 文件，存放在 `diary/` 目录

**文件命名**：`YYYY-MM-DD.md`

**Frontmatter**：
```yaml
---
title: "2026-05-29 学习日记"
date: 2026-05-29
tags: [LeetCode, 论文阅读, CAD]
---
```

**正文**：自由格式 Markdown，记录当天学了什么

**页面布局**：
- 按月份分组的时间线
- 每天一个卡片，显示日期、内容摘要、标签
- 点击展开查看完整内容

**构建脚本**：扩展 `generate-blog.mjs` 同时处理 `diary/` 目录，生成 `diary-index.json` 和 `diary-content.json`

**与博客的区别**：
- 博客：有标题、摘要、分类，适合正式文章
- 学习日记：按日期组织，更像是每日记录/流水账

## 新增文件清单

### 数据文件
- `src/data/aboutData.js` — 关于我页面数据
- `src/data/config.js` — 全局配置（LeetCode 用户名等）
- `src/data/categoryData.js` — 博客分类定义

### 组件文件
- `src/components/AboutView.jsx` — 关于我页面
- `src/components/DiaryView.jsx` — 学习日记容器
- `src/components/DiaryList.jsx` — 日记列表（按月分组）
- `src/components/DiaryDetail.jsx` — 日记详情
- `src/components/LeetcodeView.jsx` — LeetCode 统计页面
- `src/components/LeetcodeStats.jsx` — 统计卡片组件
- `src/components/LeetcodeSubmissions.jsx` — 最近提交列表
- `src/components/blog/CategorySidebar.jsx` — 博客分类侧边栏

### 内容目录
- `diary/` — 学习日记 Markdown 文件

### 修改文件
- `src/App.jsx` — 新增路由和导航
- `src/index.css` — 新增页面样式
- `scripts/generate-blog.mjs` — 扩展支持分类和日记

## 样式规范

遵循现有 `DESIGN.md` 设计系统：
- 主色调：blue-600
- 字体：系统字体栈
- 间距：基于 4px 网格
- 圆角：8px（卡片），12px（大容器）
- 阴影：sm/md/lg 三级

## 部署

保持现有 GitHub Pages 部署流程不变：
1. `npm run build` 生成 `dist/`
2. 复制 `dist/` 内容到仓库根目录
3. 推送到 `gh-pages` 分支
