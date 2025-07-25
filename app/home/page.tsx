'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Calendar, Activity,HomeIcon, Code, Plus,LinkIcon } from 'lucide-react'
import Link from 'next/link'

// GitHub贡献图表组件
interface ContributionData {
  [date: string]: number;
}

interface GitHubChartProps {
  username: string;
  accessToken: string;
}

function GitHubChart({ username, accessToken }: GitHubChartProps) {
  const [contributions, setContributions] = useState<ContributionData>({});
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
        const events = await response.json();

        // 提取贡献数据 - 统计所有类型的贡献活动
        const contributionData: ContributionData = {};
        events.forEach((event: any) => {
          // 统计各种类型的贡献活动
          const contributionTypes = [
            'PushEvent',           // 代码提交
            'CreateEvent',         // 创建仓库/分支/标签
            'DeleteEvent',         // 删除分支/标签
            'ForkEvent',           // Fork仓库
            'IssuesEvent',         // Issues相关活动
            'IssueCommentEvent',   // Issue评论
            'PullRequestEvent',    // Pull Request
            'PullRequestReviewEvent', // PR审查
            'PullRequestReviewCommentEvent', // PR审查评论
            'WatchEvent',          // Star仓库
            'ReleaseEvent',        // 发布版本
            'PublicEvent',         // 公开仓库
            'MemberEvent',         // 成员管理
            'CommitCommentEvent',  // 提交评论
            'GollumEvent'          // Wiki编辑
          ];
          
          if (contributionTypes.includes(event.type)) {
            const date = event.created_at.split("T")[0];
            contributionData[date] = (contributionData[date] || 0) + 1;
          }
        });

        setContributions(contributionData);
      } catch (error) {
        console.error("获取GitHub数据时出错:", error);
        // 如果API调用失败，生成一些模拟数据用于展示
        const mockData: ContributionData = {};
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          mockData[dateStr] = Math.floor(Math.random() * 5);
        }
        setContributions(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [username, accessToken]);

  // 生成过去一年的日期网格
  const generateDateGrid = () => {
    const grid = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // 过去365天

    // 调整到周日开始
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    for (let week = 0; week < 53; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = contributions[dateStr] || 0;
        
        weekData.push({
          date: dateStr,
          count,
          displayDate: currentDate.toLocaleDateString('zh-CN')
        });
      }
      grid.push(weekData);
    }
    return grid;
  };

  // 根据贡献次数获取颜色
  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count <= 4) return 'bg-green-300 dark:bg-green-700';
    if (count <= 6) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
        <span className="ml-2 text-text-secondary">加载GitHub数据中...</span>
      </div>
    );
  }

  const dateGrid = generateDateGrid();

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1 p-4">
          {dateGrid.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 ${
                    getContributionColor(day.count)
                  }`}
                  onMouseEnter={() => setHoveredDate(`${day.displayDate}: ${day.count} 次贡献`)}
                   onMouseLeave={() => setHoveredDate(null)}
                   title={`${day.displayDate}: ${day.count} 次贡献`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* 悬停提示 */}
      {hoveredDate && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
          {hoveredDate}
        </div>
      )}
      
      {/* 图例 */}
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-secondary">
        <span>少</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
        </div>
        <span>多</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-container mx-auto flex justify-between items-center">
          <Link href="/" className="text-h3 font-bold text-text-primary hover:text-accent-primary transition-colors">
            Aryuki's Tools
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <Plus className="w-5 h-5" />
              Tools
            </Link>
            <Link href="/home" className="text-body text-accent-primary font-medium">
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>
            <Link href="/opensource" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <Code className="w-5 h-5" />
              Open Source
            </Link>
            <Link href="/link" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <LinkIcon className="w-5 h-5" />
              Links
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        className="max-w-container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <div className="text-8xl mb-6">👋</div>
          <h1 className="text-h1 font-bold text-text-primary mb-4">
            Hi，我是 <span className="text-accent-primary">Aryuki</span>
          </h1>
          <p className="text-h3 text-text-secondary mb-6">
            欢迎来到我的个人主页！
          </p>
          <div className="flex items-center justify-center gap-2 text-body text-text-tertiary">
            <Calendar className="w-5 h-5" />
            <span>当前时间：{currentTime}</span>
          </div>
        </motion.div>

        {/* About Me Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 mb-16"
          variants={itemVariants}
        >
          <div className="bg-background-secondary rounded-large p-8 border border-border-primary">
            <h2 className="text-h2 font-bold text-text-primary mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              关于我
            </h2>
            <p className="text-body text-text-secondary leading-relaxed mb-4">
              菜鸟一枚
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              在这里你可以找到我部署的各种工具，
              希望它们能为你带来便利。
            </p>
          </div>

          <div className="bg-background-secondary rounded-large p-8 border border-border-primary">
            <h2 className="text-h2 font-bold text-text-primary mb-4 flex items-center gap-3">
              <span className="text-3xl">💡</span>
              技能专长
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                'React/Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Node.js',
                'Python',
                'AI/ML',
                'Web开发',
                '工具开发'
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="px-3 py-2 bg-accent-primary-subtle text-accent-primary rounded-medium text-small text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* GitHub Activity Section */}
        <motion.div
          className="bg-background-secondary rounded-large p-8 border border-border-primary"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-8 h-8 text-text-primary" />
            <h2 className="text-h2 font-bold text-text-primary">
              GitHub 活动
            </h2>
            <Activity className="w-6 h-6 text-accent-primary" />
          </div>
          
          <div className="text-center">
            <p className="text-body text-text-secondary mb-6">
              我的GitHub提交活动图表
            </p>
            
            {/* GitHub Contribution Graph */}
            <div className="bg-background-primary rounded-large p-6 border border-border-primary">
              <GitHubChart 
                username="ChinoArror" 
                accessToken="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" 
              />
            </div>
            
            <div className="mt-6">
              <a
                href="https://github.com/ChinoArror"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-large hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-5 h-5" />
                访问我的 GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-h2 font-bold text-text-primary mb-8">
            快速导航
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-background-secondary border border-border-primary rounded-large hover:border-accent-primary transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">🛠️</span>
              <span className="text-body text-text-primary">工具展示</span>
            </Link>
            <Link
              href="/opensource"
              className="flex items-center gap-2 px-6 py-3 bg-background-secondary border border-border-primary rounded-large hover:border-accent-primary transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">📦</span>
              <span className="text-body text-text-primary">开源项目</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}