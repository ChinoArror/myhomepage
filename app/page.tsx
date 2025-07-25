'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Mail, Twitter, Search, Filter, Star, Home as HomeIcon, Code, LinkIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import toolsData from '../data/tools.json'

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  url: string
  tags: string[]
  featured: boolean
}

interface FriendLink {
  name: string
  url: string
  icon: string
}

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [friendLinks, setFriendLinks] = useState<FriendLink[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [showFeatured, setShowFeatured] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    setTools(toolsData.tools)
    setFriendLinks(toolsData.friendLinks)
  }, [])

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === '' || tool.tags.includes(selectedTag)
    const matchesFeatured = !showFeatured || tool.featured
    return matchesSearch && matchesTag && matchesFeatured
  })

  const allTags = Array.from(new Set(tools.flatMap(tool => tool.tags)))

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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-container mx-auto flex justify-between items-center">
          <Link href="/" className="text-h3 font-bold text-text-primary hover:text-accent-primary transition-colors">
            Aryuki's Tools
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-body text-accent-primary font-medium">
              <Plus className="w-4 h-4" />
              Tools
            </Link>
            <Link href="/home" className="text-body text-text-secondary hover:text-accent-primary transition-colors">
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link href="/opensource" className="text-body text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1">
              <Code className="w-4 h-4" />
              Open Source
            </Link>
            <Link href="/link" className="text-body text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              Links
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-br from-background-primary to-background-secondary py-20 px-6"
        style={{ y }}
      >
        <div className="max-w-container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1,   y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-h1 font-bold text-text-primary mb-6">
              Aryuki's <span className="text-accent-primary">Tools</span>
            </h1>
            <p className="text-h3 text-text-secondary mb-8 max-w-2xl mx-auto">
              探索我部署的各种 工具，让技术为生活带来更多可能
            </p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {friendLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background-secondary rounded-large border border-border-primary hover:border-accent-primary transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{link.icon}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const positions = [
              { left: '10%', top: '20%' },
              { left: '80%', top: '15%' },
              { left: '15%', top: '70%' },
              { left: '75%', top: '80%' },
              { left: '50%', top: '30%' },
              { left: '30%', top: '60%' }
            ];
            const durations = [4, 5, 4.5, 5.5, 4.2, 4.8];
            
            return (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-accent-primary-subtle rounded-full opacity-20"
                style={{
                  left: positions[i].left,
                  top: positions[i].top,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: durations[i],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </motion.section>

      {/* Tools Section */}
      <section className="py-16 px-6">
        <div className="max-w-container mx-auto">
          {/* Search and Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索工具..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary border border-border-primary rounded-large focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
              
              <div className="flex gap-3 items-center">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 bg-background-secondary border border-border-primary rounded-large focus:outline-none focus:border-accent-primary transition-colors"
                >
                  <option value="">所有标签</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => setShowFeatured(!showFeatured)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-large transition-all duration-300 ${
                    showFeatured 
                      ? 'bg-accent-primary text-white' 
                      : 'bg-background-secondary border border-border-primary hover:border-accent-primary'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  精选
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                className="tool-card group relative"
              >
                <motion.a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-6 bg-background-secondary rounded-large border border-border-primary hover:border-accent-primary transition-all duration-300 relative z-10 h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex-shrink-0">
                        <img 
                          src={tool.icon} 
                          alt={`${tool.name} icon`}
                          className="w-full h-full object-contain rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                            if (nextSibling) {
                              nextSibling.style.display = 'block';
                            }
                          }}
                        />
                        <div className="w-8 h-8 bg-accent-primary-subtle rounded flex items-center justify-center text-accent-primary font-bold text-sm" style={{display: 'none'}}>
                          {tool.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-h3 font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                          {tool.name}
                        </h3>
                        {tool.featured && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-accent-primary fill-current" />
                            <span className="text-tiny text-accent-primary">精选</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-text-tertiary group-hover:text-accent-primary transition-colors" />
                  </div>
                  
                  <p className="text-body text-text-secondary mb-4 line-clamp-2 flex-grow">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tool.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-tiny bg-accent-primary-subtle text-accent-primary rounded-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-h3 text-text-secondary mb-2">没有找到匹配的工具</h3>
              <p className="text-body text-text-tertiary">尝试调整搜索条件或清除筛选器</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-secondary border-t border-border-primary py-12 px-6">
        <div className="max-w-container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-body text-text-secondary mb-4">
              Made by Aryuki
            </p>
            <p className="text-small text-text-tertiary">
              © 2025 Aryuki. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}