'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'

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
            Idoubi's Tools
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              工具展示
            </Link>
            <Link href="/home" className="text-body text-accent-primary font-medium">
              主页
            </Link>
            <Link href="/opensource" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              开源项目
            </Link>
            <Link href="/link" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              友情链接
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
            你好，我是 <span className="text-accent-primary">Idoubi</span>
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
              我是一名热爱技术的开发者，专注于AI工具开发和前端技术。
              喜欢探索新技术，创造有趣且实用的应用。
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              在这里你可以找到我开发的各种工具和项目，
              希望它们能为你的工作和生活带来便利。
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
              <img
                src="https://ghchart.rshah.org/ChinoArror"
                alt="GitHub Contribution Chart"
                className="w-full max-w-4xl mx-auto rounded-medium"
                style={{ filter: 'brightness(1.1) contrast(1.1)' }}
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