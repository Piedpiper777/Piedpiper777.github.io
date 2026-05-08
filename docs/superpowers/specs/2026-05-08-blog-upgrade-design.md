# 博客功能升级设计（完整博客版）

## 1. 问题与目标
当前站点“学习记录”基于 `localStorage`，仅本地可见，缺少可发布、可索引、可归档的博客能力。  
本次升级目标是在 GitHub Pages 纯静态约束下，提供可长期维护的博客系统：

- Markdown 文件驱动内容管理
- 文章列表与详情页
- 标签筛选与全文搜索（前端）
- 文章目录（TOC）
- 上一篇/下一篇导航
- RSS 订阅输出

## 2. 范围
### In Scope
- 用“博客”替换现有“学习记录”导航与页面
- 新增 `posts/` 文章目录（命名规则：`YYYY-MM-DD-slug.md`）
- 构建时生成文章索引与 `rss.xml`
- 前端路由与页面改造（列表 + 详情）
- 搜索、标签、TOC、上一篇/下一篇
- README 文档更新

### Out of Scope
- 在线后台写作与云端编辑
- 评论系统
- 多作者权限系统

## 3. 信息架构与路由
为避免 GitHub Pages 刷新 404，使用 Hash 路由：

- `#/plan`：训练计划（保留）
- `#/blog`：博客列表
- `#/blog/:slug`：文章详情

导航调整：
- “📅 训练计划”
- “📝 博客”

## 4. 内容模型
文章文件位置：

- `posts/YYYY-MM-DD-slug.md`

Frontmatter 约束（必填除 `draft`）：

- `title: string`
- `date: YYYY-MM-DD`
- `tags: string[]`
- `summary: string`
- `draft?: boolean`（默认 false）

示例：

```md
---
title: "Week 1 复盘：数组与双指针"
date: "2026-05-12"
tags: ["algorithm", "week1", "review"]
summary: "记录本周题型、易错点和复盘方法。"
draft: false
---

# 正文
...
```

`slug` 从文件名末段获得（去掉日期前缀）。

## 5. 构建期内容管线
在 Vite 构建中新增内容生成步骤（Node 脚本）：

1. 扫描 `posts/*.md`
2. 解析 frontmatter 与正文
3. frontmatter 校验（缺字段或格式错误 => 构建失败）
4. 生成派生数据：
   - `src/.generated/posts-index.json`（列表/搜索/归档用）
   - `src/.generated/posts-content.json`（详情正文与 TOC）
   - `public/rss.xml`

### 生成字段（索引）
- `slug`
- `title`
- `date`
- `tags`
- `summary`
- `excerpt`（正文片段）
- `wordCount`

### 草稿处理
- `draft: true` 的文章不进入索引、不进 RSS、不在前端可见。

## 6. 前端组件设计
新增核心组件：

- `BlogView`：博客列表容器
- `BlogList`：文章卡片、标签过滤、归档展示
- `BlogSearch`：关键词搜索输入与结果高亮
- `PostDetail`：文章详情渲染
- `TableOfContents`：标题锚点目录
- `PostPager`：上一篇/下一篇导航

替换/调整：
- `App.jsx`：移除 `NotesView`，接入博客路由与组件

## 7. 渲染与交互
Markdown 渲染策略：
- 构建期解析 Markdown 为 HTML（避免运行时解析成本）
- 详情页直接渲染安全 HTML（仅来自仓库受控内容）

TOC 生成：
- 构建期提取 `h2/h3`，保存锚点列表
- 详情页右侧/上方展示 TOC，点击跳转

上一篇/下一篇：
- 按 `date desc` 排序后的相邻文章计算

## 8. 搜索方案
采用前端 Fuse.js 模糊搜索，数据源为构建期索引：

- 检索字段：`title`、`summary`、`tags`、`excerpt`
- 列表页顶部搜索框实时过滤
- 与标签筛选可叠加

## 9. RSS 方案
构建时生成 `public/rss.xml`（最近 50 篇非草稿）：

- `<title>`：站点标题
- `<link>`：`https://piedpiper777.github.io/#/blog/:slug`
- `<description>`：summary
- `<pubDate>`：文章日期

## 10. 错误处理与边界
- frontmatter 缺失或格式错误：构建报错并中止
- 无文章：列表页显示空状态
- 无匹配搜索结果：显示无结果提示
- slug 冲突：构建报错并中止
- 详情页 slug 不存在：显示“文章不存在”页

## 11. 测试与验证
- 本地构建应成功并产出：
  - `dist` 静态站点
  - `dist/rss.xml`
- 列表、详情、搜索、标签、TOC、上一篇/下一篇可用
- 草稿文章不出现在页面与 RSS
- GitHub Pages 部署后路由与资源可访问

## 12. 实施顺序
1. 加入内容管线脚本与依赖
2. 新增 `posts/` 与示例文章
3. 改造 `App.jsx` 导航与路由
4. 实现博客列表与详情组件
5. 接入搜索、TOC、上一篇/下一篇
6. 生成 RSS 并更新 README
7. 构建与线上验证
