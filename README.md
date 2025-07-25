# Aryuki's Homepage - 个人主页与工具展示平台

一个现代化的个人主页网站，集成了工具展示、GitHub贡献可视化、开源项目展示和友情链接等功能。基于Next.js 14和React 18构建，具有优美的动画效果和交互体验。

## ✨ 主要功能

### 🛠️ 工具展示平台
- **智能搜索** - 支持工具名称和描述的实时搜索
- **标签筛选** - 按技术栈和功能分类浏览工具
- **精选推荐** - 突出展示重要和优质工具
- **响应式卡片** - 美观的工具卡片设计，支持悬停效果
- **外链跳转** - 一键访问各种在线工具和服务

### 📊 GitHub 贡献可视化
- **贡献热力图** - 类似GitHub的365天贡献活动可视化
- **多类型统计** - 统计commits、issues、PR、releases等多种贡献类型
- **实时数据** - 通过GitHub API获取最新的贡献数据
- **交互式图表** - 支持悬停查看具体日期的贡献详情
- **优雅降级** - API失败时显示模拟数据确保功能可用

### 🚀 开源项目展示
- **仓库列表** - 自动获取GitHub公开仓库信息
- **项目统计** - 显示星标数、分叉数、观察者数等关键指标
- **语言标识** - 彩色标签显示项目主要编程语言
- **更新时间** - 显示项目最后更新时间
- **直达链接** - 快速跳转到GitHub仓库页面

### 🔗 友情链接管理
- **分类展示** - 按技术类型分类展示友情链接
- **搜索功能** - 支持链接名称和描述搜索
- **图标展示** - 美观的网站图标和描述信息
- **申请入口** - 提供友链申请邮箱联系方式

## 🎨 设计特色

- **现代化UI** - 采用扁平化设计风格，简洁美观
- **响应式布局** - 完美适配桌面端、平板和移动设备
- **流畅动画** - 基于Framer Motion的滚动动画和页面转场
- **深色模式** - 支持明暗主题切换（通过CSS变量实现）
- **渐变背景** - 优雅的渐变色背景设计
- **悬停效果** - 丰富的交互反馈和微动画

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - 使用最新的App Router架构
- **React 18** - 现代化的React开发
- **TypeScript** - 类型安全的JavaScript超集

### 样式与UI
- **Tailwind CSS** - 实用优先的CSS框架
- **Framer Motion** - 强大的React动画库
- **Lucide React** - 美观的SVG图标库
- **CSS Variables** - 支持主题切换的设计系统

### 数据与API
- **GitHub API** - 获取仓库和贡献数据
- **JSON数据文件** - 工具和友链配置
- **客户端状态管理** - React Hooks

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS后处理器
- **Autoprefixer** - 自动添加CSS前缀

### 部署平台
- **Vercel** - 推荐的部署平台
- **静态导出** - 支持其他静态托管服务

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm run start
```

## ⚙️ 自定义配置

### 工具数据配置

编辑 `data/tools.json` 文件来管理工具和友链：

```json
{
  "tools": [
    {
      "id": "unique-id",           // 唯一标识符
      "name": "工具名称",          // 工具名称
      "description": "工具描述",   // 详细描述
      "icon": "🔧",              // 图标（支持emoji或URL）
      "url": "https://example.com", // 工具链接
      "tags": ["标签1", "标签2"],   // 分类标签
      "featured": true            // 是否为精选工具
    }
  ],
  "friendLinks": [
    {
      "name": "链接名称",          // 友链名称
      "url": "https://example.com", // 友链地址
      "icon": "🔗"               // 友链图标
    }
  ]
}
```

### GitHub配置

在 `app/home/page.tsx` 中配置GitHub相关信息：

```typescript
// 修改GitHub用户名
const username = "your-github-username"

// 配置GitHub访问令牌（可选，用于提高API限制）
const accessToken = process.env.GITHUB_TOKEN
```

### 个人信息配置

更新以下文件中的个人信息：
- `data/tools.json` - friendLinks部分
- `app/link/page.tsx` - 友链申请邮箱
- `README.md` - 作者信息

### 样式自定义

- **全局样式**: `app/globals.css` - CSS变量和基础样式
- **Tailwind配置**: `tailwind.config.js` - 自定义颜色和尺寸
- **设计系统**: `ui.json` - 颜色调色板和组件配置
- **组件样式**: 直接在组件中使用Tailwind类名

## 🚀 部署指南

### Vercel部署（推荐）

1. 将代码推送到GitHub仓库
2. 在[Vercel](https://vercel.com)中导入项目
3. 配置环境变量（可选）
4. 自动部署完成

### 其他部署平台

#### Netlify
```bash
npm run build
# 上传 .next 文件夹到Netlify
```

#### 静态导出
```bash
# 在 next.config.js 中添加
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

npm run build
# 部署 out 文件夹到任何静态托管服务
```

### 环境变量配置

创建 `.env.local` 文件或在部署平台配置：

```bash
# GitHub API访问令牌（可选，用于提高API限制）
GITHUB_TOKEN=your_github_token

# 网站基础URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# GitHub用户名（如果需要动态配置）
NEXT_PUBLIC_GITHUB_USERNAME=your-username
```

> **注意**: GitHub API有访问限制，配置`GITHUB_TOKEN`可以提高限制。在GitHub Settings > Developer settings > Personal access tokens中创建。

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式和CSS变量
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 主页 - 工具展示
│   ├── home/              # 个人主页
│   │   └── page.tsx       # GitHub贡献图表和个人信息
│   ├── opensource/        # 开源项目页面
│   │   └── page.tsx       # GitHub仓库展示
│   └── link/              # 友情链接页面
│       └── page.tsx       # 友链展示和申请
├── data/                  # 数据配置文件
│   └── tools.json         # 工具数据和友链配置
├── public/                # 静态资源
│   ├── icon.svg           # 网站图标
│   ├── favicon.ico        # 浏览器图标
│   └── manifest.json      # PWA配置
├── ui.json                # 设计系统配置
├── package.json           # 项目依赖和脚本
├── tailwind.config.js     # Tailwind CSS配置
├── tsconfig.json          # TypeScript配置
├── next.config.js         # Next.js配置
└── README.md              # 项目文档
```

### 页面说明

- **主页 (`/`)** - 工具展示平台，支持搜索、筛选和分类浏览
- **个人主页 (`/home`)** - GitHub贡献热力图、实时时间显示和个人信息
- **开源项目 (`/opensource`)** - GitHub仓库列表，包含项目统计和语言标识
- **友情链接 (`/link`)** - 友链展示和分类，提供申请联系方式

## 🌐 浏览器支持

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |

## 🔧 开发说明

### 性能优化
- 使用Next.js的图片优化功能
- 实现了组件懒加载
- GitHub API数据缓存
- CSS-in-JS优化

### 可访问性
- 支持键盘导航
- 语义化HTML结构
- 适当的ARIA标签
- 颜色对比度符合WCAG标准

### SEO优化
- 动态生成meta标签
- 结构化数据标记
- 优化的页面标题和描述
- 响应式图片处理

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证 - 查看LICENSE文件了解详情

## 👨‍💻 作者

**Aryuki** - 全栈开发者

- 📧 邮箱: [yysy.rhy@gmail.com](mailto:yysy.rhy@gmail.com)
- 🐙 GitHub: [@ChinoArror](https://github.com/ChinoArror)
- 🐦 Blog: [@Aryuki](https://dog.yukies.top)

## 🙏 致谢

感谢以下开源项目和服务：
- [Next.js](https://nextjs.org/) - React全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide](https://lucide.dev/) - 图标库
- [GitHub API](https://docs.github.com/en/rest) - 数据源
- [Vercel](https://vercel.com/) - 部署平台

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！

🔗 [在线预览](https://tool.aryuki.com) | 📖 [项目文档](https://github.com/ChinoArror/myhomepage)