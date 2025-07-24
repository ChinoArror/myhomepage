# Idoubi's Tools - AI工具集合

一个现代化的响应式网站，用于展示AI工具和应用程序。基于Next.js和React构建，具有优美的动画效果和交互体验。

## 特性

- 🎨 **现代化设计** - 扁平化风格，简洁美观
- 📱 **响应式布局** - 完美适配手机端和电脑端
- ✨ **丰富动画** - 滚动动画、悬停效果、页面转场
- 🔍 **智能搜索** - 支持工具名称和描述搜索
- 🏷️ **标签筛选** - 按标签分类浏览工具
- ⭐ **精选功能** - 突出展示重要工具
- 🚀 **高性能** - 基于Next.js，优化加载速度
- 🎯 **SEO友好** - 完整的元数据和结构化数据

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI库**: React 18
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **语言**: TypeScript
- **部署**: Vercel

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

## 自定义配置

### 修改工具数据

编辑 `data/tools.json` 文件来添加、修改或删除工具：

```json
{
  "tools": [
    {
      "id": "unique-id",
      "name": "工具名称",
      "description": "工具描述",
      "icon": "🔧",
      "url": "https://example.com",
      "tags": ["标签1", "标签2"],
      "featured": true
    }
  ],
  "friendLinks": [
    {
      "name": "链接名称",
      "url": "https://example.com",
      "icon": "🔗"
    }
  ]
}
```

### 修改设计系统

设计系统配置在 `ui.json` 文件中，包含：
- 颜色调色板
- 字体设置
- 布局参数
- 组件样式

### 自定义样式

- 全局样式：`app/globals.css`
- Tailwind配置：`tailwind.config.js`
- 组件样式：直接在组件中使用Tailwind类名

## 部署到Vercel

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量（如需要）
4. 部署完成

### 环境变量

如果需要配置环境变量，在Vercel项目设置中添加：

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── data/                  # 数据文件
│   └── tools.json         # 工具和友链数据
├── public/                # 静态资源
│   ├── icon.svg           # 网站图标
│   ├── favicon.ico        # 浏览器图标
│   └── manifest.json      # PWA配置
├── ui.json                # 设计系统配置
├── package.json           # 项目依赖
├── tailwind.config.js     # Tailwind配置
├── tsconfig.json          # TypeScript配置
└── next.config.js         # Next.js配置
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 作者

**Idoubi** - [me@idoubi.cc](mailto:me@idoubi.cc)

- GitHub: [@idoubi](https://github.com/idoubi)
- Twitter: [@idoubi](https://twitter.com/idoubi)

---

如果这个项目对你有帮助，请给个⭐️支持一下！