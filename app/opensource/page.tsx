'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, Eye, Calendar, Code } from 'lucide-react'
import Link from 'next/link'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  created_at: string
  updated_at: string
  topics: string[]
}

export default function OpenSourcePage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ChinoArror/repos?sort=updated&per_page=20')
        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }
        const data = await response.json()
        setRepositories(data)
      } catch (err) {
        setError('无法加载GitHub仓库数据')
        console.error('Error fetching repositories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C': '#555555',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Vue': '#2c3e50',
      'React': '#61dafb',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'PHP': '#4F5D95'
    }
    return colors[language || ''] || '#8b949e'
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
            <Link href="/home" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              主页
            </Link>
            <Link href="/opensource" className="text-body text-accent-primary font-medium">
              开源项目
            </Link>
            <Link href="/link" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              友情链接
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
            <Github className="w-12 h-12 text-text-primary" />
            <h1 className="text-h1 font-bold text-text-primary">
              开源项目
            </h1>
          </div>
          <p className="text-h3 text-text-secondary mb-8 max-w-2xl mx-auto">
            这里展示我在GitHub上的开源项目和代码仓库
          </p>
          <a
            href="https://github.com/ChinoArror"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-large hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            访问我的 GitHub 主页
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Repository Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {repositories.length}
            </div>
            <div className="text-body text-text-secondary">公开仓库</div>
          </div>
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
            </div>
            <div className="text-body text-text-secondary">总星标数</div>
          </div>
          <div className="bg-background-secondary rounded-large p-6 border border-border-primary text-center">
            <div className="text-3xl mb-2">🍴</div>
            <div className="text-h2 font-bold text-accent-primary mb-1">
              {repositories.reduce((sum, repo) => sum + repo.forks_count, 0)}
            </div>
            <div className="text-body text-text-secondary">总分叉数</div>
          </div>
        </motion.div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-body text-text-secondary">加载中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-h3 text-text-secondary mb-2">加载失败</h3>
            <p className="text-body text-text-tertiary">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                variants={itemVariants}
                className="group"
              >
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-background-secondary rounded-large border border-border-primary hover:border-accent-primary transition-all duration-300 h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Code className="w-5 h-5 text-text-primary flex-shrink-0" />
                      <h3 className="text-h3 font-medium text-text-primary group-hover:text-accent-primary transition-colors truncate">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-accent-primary transition-colors flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-body text-text-secondary mb-4 line-clamp-3 min-h-[4.5rem]">
                    {repo.description || '暂无描述'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-small text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        ></div>
                        <span className="text-small text-text-secondary">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-tiny text-text-tertiary">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-tiny bg-accent-primary-subtle text-accent-primary rounded-small"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-1 text-tiny bg-background-primary text-text-tertiary rounded-small">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="text-center mt-16 pt-12 border-t border-border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-body text-text-secondary mb-4">
            更多项目请访问我的 GitHub 主页
          </p>
          <a
            href="https://github.com/ChinoArror"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-primary hover:underline"
          >
            <Github className="w-4 h-4" />
            github.com/ChinoArror
          </a>
        </motion.div>
      </div>
    </div>
  )
}