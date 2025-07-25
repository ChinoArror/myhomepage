'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Link as LinkIcon, Plus, Heart, HomeIcon, Code } from 'lucide-react'
import Link from 'next/link'

interface FriendLink {
  id: string
  name: string
  description: string
  url: string
  icon: string
  category: string
}

export default function LinkPage() {
  const [friendLinks, setFriendLinks] = useState<FriendLink[]>([
    {
      id: '1',
      name: 'GitHub',
      description: '全球最大的代码托管平台',
      url: 'https://github.com',
      icon: 'https://github.com/favicon.ico',
      category: '开发工具'
    },
    {
      id: '2',
      name: 'Vercel',
      description: '现代化的前端部署平台',
      url: 'https://vercel.com',
      icon: 'https://vercel.com/favicon.ico',
      category: '部署平台'
    },
    {
      id: '3',
      name: 'Next.js',
      description: 'React 全栈开发框架',
      url: 'https://nextjs.org',
      icon: 'https://nextjs.org/favicon.ico',
      category: '开发框架'
    },
    {
      id: '4',
      name: 'Tailwind CSS',
      description: '实用优先的 CSS 框架',
      url: 'https://tailwindcss.com',
      icon: 'https://tailwindcss.com/favicon.ico',
      category: 'CSS框架'
    },
    {
      id: '5',
      name: 'Framer Motion',
      description: 'React 动画库',
      url: 'https://www.framer.com/motion',
      icon: 'https://www.framer.com/favicon.ico',
      category: '动画库'
    },
    {
      id: '6',
      name: 'TypeScript',
      description: 'JavaScript 的超集',
      url: 'https://www.typescriptlang.org',
      icon: 'https://www.typescriptlang.org/favicon.ico',
      category: '编程语言'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLinks = friendLinks.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || link.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(friendLinks.map(link => link.category)))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
              <Plus className="w-5 h-5"/>
              Tools
            </Link>
            <Link href="/home" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <HomeIcon className="w-5 h-5"/>
              Home
            </Link>
            <Link href="/opensource" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <Code className="w-5 h-5"/>
              Open Source
            </Link>
            <Link href="/link" className="text-body text-accent-primary font-medium">
              <LinkIcon className="w-5 h-5"/>
              Links
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <LinkIcon className="w-12 h-12 text-text-primary" />
            <h1 className="text-h1 font-bold text-text-primary">
              友情链接
            </h1>
          </div>
          <p className="text-h3 text-text-secondary mb-8 max-w-2xl mx-auto">
            这里收录了一些优秀的网站和工具，希望对你有所帮助
          </p>
          <div className="flex items-center justify-center gap-2 text-body text-text-tertiary">
            <Heart className="w-5 h-5 text-red-500" />
            <span>感谢这些优秀的项目和平台</span>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="搜索友链..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-background-secondary border border-border-primary rounded-large focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            
            <div className="flex gap-3 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-background-secondary border border-border-primary rounded-large focus:outline-none focus:border-accent-primary transition-colors"
              >
                <option value="">所有分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Links Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {friendLinks.length}
            </div>
            <div className="text-body text-text-secondary">友情链接</div>
          </div>
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">📂</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {categories.length}
            </div>
            <div className="text-body text-text-secondary">分类数量</div>
          </div>
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {filteredLinks.length}
            </div>
            <div className="text-body text-text-secondary">当前显示</div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredLinks.map((link) => (
            <motion.div
              key={link.id}
              variants={itemVariants}
              className="group"
            >
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 bg-background-secondary rounded-large border border-border-primary hover:border-accent-primary transition-all duration-300 h-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 flex-shrink-0">
                      <img 
                        src={link.icon} 
                        alt={`${link.name} icon`}
                        className="w-full h-full object-contain rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'block';
                          }
                        }}
                      />
                      <div className="w-8 h-8 bg-accent-primary-subtle rounded flex items-center justify-center text-accent-primary font-bold text-sm" style={{display: 'none'}}>
                        {link.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-h3 font-medium text-text-primary group-hover:text-accent-primary transition-colors truncate">
                        {link.name}
                      </h3>
                      <span className="text-tiny text-accent-primary bg-accent-primary-subtle px-2 py-1 rounded-small">
                        {link.category}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-accent-primary transition-colors flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-body text-text-secondary mb-4 line-clamp-3 flex-grow">
                  {link.description}
                </p>
                
                <div className="text-small text-text-tertiary mt-auto">
                  点击访问 →
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {filteredLinks.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-h3 text-text-secondary mb-2">没有找到匹配的友链</h3>
            <p className="text-body text-text-tertiary">尝试调整搜索条件或清除筛选器</p>
          </motion.div>
        )}

        {/* Add Link Section */}
        <motion.div
          className="text-center mt-16 pt-12 border-t border-border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-background-secondary rounded-large p-8 border border-border-primary">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plus className="w-6 h-6 text-accent-primary" />
              <h3 className="text-h3 font-bold text-text-primary">申请友链</h3>
            </div>
            <p className="text-body text-text-secondary mb-6 max-w-2xl mx-auto">
              如果你有优秀的网站或项目，欢迎申请友情链接交换。请确保你的网站内容健康、更新活跃。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
              <div className="text-small text-text-secondary">
                <strong className="text-text-primary">申请要求：</strong>
                <ul className="mt-2 space-y-1">
                  <li>• 网站内容健康向上</li>
                  <li>• 定期更新维护</li>
                  <li>• 访问速度良好</li>
                  <li>• 支持HTTPS</li>
                </ul>
              </div>
              <div className="text-small text-text-secondary">
                <strong className="text-text-primary">提供信息：</strong>
                <ul className="mt-2 space-y-1">
                  <li>• 网站名称</li>
                  <li>• 网站描述</li>
                  <li>• 网站链接</li>
                  <li>• 网站图标URL</li>
                </ul>
              </div>
            </div>
            <a
              href="mailto:me@idoubi.cc?subject=友链申请&body=网站名称：%0A网站描述：%0A网站链接：%0A网站图标：%0A"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-large hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              申请友链
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}