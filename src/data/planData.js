export const planData = {
  title: "秋招前100天刷题与英语听说训练计划",
  startDate: "2026-05-11",
  endDate: "2026-08-18",
  totalDays: 100,
  goals: {
    algorithm: [
      "新题：160–200 道",
      "复刷：100–140 次",
      "总练习量：260–340 次",
      "LeetCode Hot 100 一轮",
      "代码随想录核心专题一轮",
      "高频错题二刷/三刷",
      "2–4 套企业笔试模拟"
    ],
    english: [
      "每天听力输入：15–30 分钟",
      "每天口语输出：10–20 分钟",
      "英文自我介绍 1 分钟版",
      "英文项目介绍 2 分钟版",
      "20–30 个 AI/ML/LLM 面试常见英文问答",
      "10 次以上录音复盘",
      "3–5 次英文模拟面试/自问自答"
    ]
  },
  stages: [
    {
      id: 1,
      name: "阶段 1：基础高频题型与编码手感恢复",
      days: "Day 1–28",
      dateRange: "2026-05-11 至 2026-06-07",
      coreGoal: "恢复编码手感，完成基础高频专题"
    },
    {
      id: 2,
      name: "阶段 2：回溯、贪心、动态规划攻坚",
      days: "Day 29–56",
      dateRange: "2026-06-08 至 2026-07-05",
      coreGoal: "攻克回溯、贪心、动态规划"
    },
    {
      id: 3,
      name: "阶段 3：图论、二分、堆与综合训练",
      days: "Day 57–84",
      dateRange: "2026-07-06 至 2026-08-02",
      coreGoal: "补齐图论、二分、堆、TopK，进入综合训练"
    },
    {
      id: 4,
      name: "阶段 4：高频复刷、笔试模拟、面试输出",
      days: "Day 85–100",
      dateRange: "2026-08-03 至 2026-08-18",
      coreGoal: "高频复刷、限时训练、企业笔试模拟"
    }
  ],
  weeks: [
    {
      id: 1,
      stageId: 1,
      title: "Week 1：数组、哈希、双指针入门",
      goals: [
        "恢复 Python/Java/C++ 编码手感",
        "熟悉常见数组与哈希题",
        "建立题解记录格式"
      ],
      problems: [
        "两数之和",
        "三数之和",
        "移动零",
        "盛最多水的容器",
        "最长连续序列",
        "合并区间",
        "旋转数组"
      ],
      targets: {
        newProblems: "10–14 道",
        reviewProblems: "4–6 道"
      },
      englishGoal: "完成英文自我介绍初稿：本硕背景、研究方向、求职方向、技术关键词（Industrial AI, LLM, AI Agent, RAG, computer vision, PHM）"
    },
    {
      id: 2,
      stageId: 1,
      title: "Week 2：滑动窗口、前缀和、字符串基础",
      goals: [
        "掌握连续子数组/子串类问题",
        "掌握前缀和 + 哈希表模板"
      ],
      problems: [
        "无重复字符的最长子串",
        "长度最小的子数组",
        "找到字符串中所有字母异位词",
        "和为 K 的子数组",
        "最小覆盖子串",
        "乘积小于 K 的子数组"
      ],
      targets: {
        newProblems: "10–14 道",
        reviewProblems: "6–8 道"
      },
      englishGoal: "每天听 15–30 分钟英文技术内容；开始练 1 分钟英文自我介绍；本周录音至少 2 次"
    },
    {
      id: 3,
      stageId: 1,
      title: "Week 3：链表、栈、队列",
      goals: [
        "掌握链表指针操作",
        "掌握栈/队列基础模板"
      ],
      problems: [
        "反转链表",
        "删除倒数第 N 个节点",
        "环形链表",
        "合并两个有序链表",
        "两数相加",
        "有效括号",
        "最小栈",
        "字符串解码"
      ],
      targets: {
        newProblems: "10–12 道",
        reviewProblems: "6–8 道"
      },
      englishGoal: "准备 2 分钟英文项目介绍框架：Problem、Method、My contribution、Result"
    },
    {
      id: 4,
      stageId: 1,
      title: "Week 4：二叉树、DFS、BFS",
      goals: [
        "掌握递归和迭代遍历",
        "掌握树上 DFS/BFS",
        "建立递归边界意识"
      ],
      problems: [
        "二叉树前中后序遍历",
        "层序遍历",
        "最大深度",
        "对称二叉树",
        "翻转二叉树",
        "路径总和",
        "二叉树直径",
        "最近公共祖先",
        "验证二叉搜索树"
      ],
      targets: {
        newProblems: "12–16 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "能够用英文解释一个项目：What problem did you solve? What methods did you use? What was your contribution? What challenges did you meet?"
    },
    {
      id: 5,
      stageId: 2,
      title: "Week 5：回溯",
      goals: [
        "掌握排列、组合、子集、分割四类问题",
        "固化 backtracking 模板"
      ],
      problems: [
        "全排列",
        "全排列 II",
        "子集",
        "子集 II",
        "组合",
        "组合总和",
        "组合总和 II",
        "电话号码的字母组合",
        "分割回文串",
        "单词搜索",
        "N 皇后"
      ],
      targets: {
        newProblems: "12–15 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "开始练外企常见英文问题：Tell me about yourself. Why are you interested in this role? Could you introduce one of your projects?"
    },
    {
      id: 6,
      stageId: 2,
      title: "Week 6：贪心、区间问题、单调栈",
      goals: [
        "掌握局部最优到全局最优的表达方式",
        "掌握区间排序问题",
        "加强单调栈"
      ],
      problems: [
        "跳跃游戏",
        "跳跃游戏 II",
        "买卖股票",
        "加油站",
        "分发糖果",
        "划分字母区间",
        "无重叠区间",
        "用最少数量的箭引爆气球",
        "每日温度",
        "柱状图中最大的矩形"
      ],
      targets: {
        newProblems: "12–15 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "用英文解释一个算法题：My idea is... The key observation is... The time complexity is... The space complexity is..."
    },
    {
      id: 7,
      stageId: 2,
      title: "Week 7：动态规划 I：一维 DP 与路径 DP",
      goals: [
        "掌握 dp 数组含义、初始化、状态转移、遍历顺序",
        "不追求难题，先建立 DP 基础框架"
      ],
      problems: [
        "爬楼梯",
        "打家劫舍",
        "最大子数组和",
        "买卖股票系列",
        "不同路径",
        "最小路径和",
        "整数拆分"
      ],
      targets: {
        newProblems: "10–14 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "继续英文项目介绍；本周录音至少 2 次；目标：减少明显卡顿"
    },
    {
      id: 8,
      stageId: 2,
      title: "Week 8：动态规划 II：背包、子序列、字符串 DP",
      goals: [
        "掌握 0/1 背包、完全背包",
        "掌握子序列类 DP",
        "形成 DP 复盘模板"
      ],
      problems: [
        "分割等和子集",
        "目标和",
        "零钱兑换",
        "完全平方数",
        "最长递增子序列",
        "最长公共子序列",
        "编辑距离",
        "回文子串",
        "最长回文子序列"
      ],
      targets: {
        newProblems: "12–16 道",
        reviewProblems: "10–12 道"
      },
      englishGoal: "准备 AI/ML/LLM 高频英文术语表达：overfitting、generalization、embedding、retrieval、hallucination、fine-tuning、inference、deployment、evaluation"
    },
    {
      id: 9,
      stageId: 3,
      title: "Week 9：图论、BFS、DFS、并查集",
      goals: [
        "掌握矩阵图、邻接表、BFS/DFS",
        "掌握并查集基本写法",
        "能处理连通性问题"
      ],
      problems: [
        "岛屿数量",
        "岛屿最大面积",
        "腐烂的橘子",
        "被围绕的区域",
        "克隆图",
        "省份数量",
        "冗余连接",
        "课程表"
      ],
      targets: {
        newProblems: "12–15 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "用英文解释 RAG / Agent / Industrial AI 中的一个概念；每次控制在 1–2 分钟"
    },
    {
      id: 10,
      stageId: 3,
      title: "Week 10：拓扑排序、最短路基础、二分",
      goals: [
        "掌握拓扑排序",
        "了解 Dijkstra 基础写法",
        "掌握标准二分与二分答案"
      ],
      problems: [
        "课程表 II",
        "网络延迟时间",
        "最小基因变化",
        "单词接龙",
        "搜索旋转排序数组",
        "寻找峰值",
        "在排序数组中查找元素的第一个和最后一个位置",
        "二分答案类题"
      ],
      targets: {
        newProblems: "10–14 道",
        reviewProblems: "8–10 道"
      },
      englishGoal: "准备外企常见行为面试回答：teamwork、conflict、pressure、failure、learning experience"
    },
    {
      id: 11,
      stageId: 3,
      title: "Week 11：堆、TopK、排序、综合题",
      goals: [
        "掌握优先队列",
        "掌握 TopK 问题",
        "开始混合专题训练"
      ],
      problems: [
        "前 K 个高频元素",
        "数组中的第 K 个最大元素",
        "合并 K 个升序链表",
        "数据流中的中位数",
        "任务调度器",
        "根据身高重建队列",
        "字符串解码",
        "LRU 缓存"
      ],
      targets: {
        newProblems: "10–14 道",
        reviewProblems: "10–12 道"
      },
      englishGoal: "进行第一次完整英文自我介绍 + 项目介绍录音：1 分钟自我介绍、2 分钟项目介绍"
    },
    {
      id: 12,
      stageId: 3,
      title: "Week 12：Hot 100 查漏补缺",
      goals: [
        "把 Hot 100 中尚未做过的题补齐",
        "把错题按专题归档",
        "开始限时训练"
      ],
      problems: [],
      targets: {
        newProblems: "8–12 道",
        reviewProblems: "12–16 道",
        timedTraining: "2 次"
      },
      englishGoal: "进行一次英文 mock interview：自我介绍、项目介绍、2 个行为问题、1 个技术问题",
      notes: "限时训练标准：Easy 10–15 分钟，Medium 常规题 25–35 分钟，Medium 偏难题 40–50 分钟，Hard 只做经典题"
    },
    {
      id: 13,
      stageId: 4,
      title: "Week 13：高频错题复刷",
      goals: [
        "不再大规模开新题",
        "重点复刷错题、高频题、模板题",
        "所有核心模板必须能独立写出"
      ],
      problems: [
        "滑动窗口",
        "前缀和",
        "链表",
        "单调栈",
        "二叉树 DFS/BFS",
        "回溯",
        "DP",
        "图论",
        "二分",
        "堆"
      ],
      targets: {
        newProblems: "4–8 道",
        reviewProblems: "18–24 道",
        timedTraining: "2 次"
      },
      englishGoal: "完成英文自我介绍最终版；完成英文项目介绍最终版；每个版本控制在自然、不卡顿、不背稿的状态"
    },
    {
      id: 14,
      stageId: 4,
      title: "Week 14 + 最后 2 天：笔试模拟与外企英语强化",
      goals: [
        "模拟真实笔试",
        "查漏补缺",
        "保持题感",
        "加强外企英文沟通稳定性"
      ],
      problems: [],
      targets: {
        mockExams: "2–4 套",
        reviewProblems: "20–30 道",
        englishMock: "2–3 次"
      },
      englishGoal: "Day 92–94：企业真题模拟 + 错题整理；Day 95–97：Hot 100 高频题复刷；Day 98–99：英文自我介绍、项目介绍、行为问题模拟；Day 100：轻量复盘，不再高强度开新题"
    }
  ]
}
