# Chinmay Singh - Personal Portfolio

A minimal, clean personal portfolio website built with Jekyll. Showcase your projects, skills, and professional journey with a simple, elegant design.

## 🚀 Features

- **Minimal Design**: Clean, professional layout with focus on content
- **Responsive**: Fully responsive design that works on all devices
- **Fast Loading**: Optimized for performance and speed
- **Blog Integration**: Built-in blog with recent posts on homepage
- **Project Showcase**: Simple project listings
- **Contact Information**: Direct contact links
- **Mobile-First**: Optimized for mobile devices
- **Clean Typography**: Inter font for excellent readability

## 📁 Project Structure

```
SinghChinmayy/
├── _config.yml              # Site configuration
├── _layouts/
│   └── default.html         # Main layout template
├── _posts/                  # Blog posts
├── assets/
│   └── css/
│       └── style.css        # Custom styles
├── index.markdown           # Homepage with recent blog posts
├── about.markdown           # About page
├── projects.markdown        # Projects page
├── blog.markdown            # Blog page
├── contact.markdown         # Contact page
├── Gemfile                  # Ruby dependencies
└── README.md               # This file
```

## 🛠️ Technologies Used

- **Jekyll**: Static site generator
- **HTML5/CSS3**: Modern web standards
- **Google Fonts**: Inter font for typography
- **GitHub Pages**: Hosting (optional)

## 🚀 Getting Started

### Prerequisites

- Ruby (2.4 or higher)
- RubyGems
- Bundler

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SinghChinmayy/SinghChinmayy.git
   cd SinghChinmayy
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

## 📝 Customization

### 1. Update Personal Information

Edit `_config.yml` to update your personal information:

```yaml
title: "Your Name"
email: "your.email@example.com"
description: "Your professional description"
author: "Your Name"
name: "Your Name"
url: "https://yourdomain.com"
social:
  github: "your-github-username"
  linkedin: "your-linkedin-username"
  email: "your.email@example.com"
```

### 2. Add Your Projects

Edit `projects.markdown` to showcase your work:

```markdown
## Project Name

Project description with technologies used.

**Technologies**: React, Node.js, MongoDB
```

### 3. Write Blog Posts

Create new blog posts in `_posts/` with the format `YYYY-MM-DD-title.markdown`:

```markdown
---
layout: post
title: "Your Blog Post Title"
date: 2024-07-15 10:00:00 +0530
categories: [Category]
tags: [tag1, tag2]
author: Your Name
description: "Post description"
---

Your blog content here...
```

### 4. Update Skills

Edit the skills section in `index.markdown` and `about.markdown` to reflect your expertise.

## 🎨 Design Philosophy

This portfolio follows a minimal design approach:

- **Clean Layout**: Focus on content over decoration
- **Readable Typography**: Inter font for excellent readability
- **Consistent Spacing**: Proper margins and padding
- **Mobile-First**: Responsive design optimized for mobile
- **Fast Loading**: Minimal CSS and no unnecessary scripts

## 📱 Responsive Design

The site is fully responsive and includes:

- Mobile-first design approach
- Responsive navigation
- Flexible content layout
- Optimized typography for all screen sizes
- Touch-friendly interactions

## 🔧 Configuration

### Jekyll Configuration

Key settings in `_config.yml`:

```yaml
# Site settings
title: "Your Name"
description: "Your professional description"
url: "https://yourdomain.com"

# Plugins
plugins:
  - jekyll-feed

# Defaults
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Your Name"
```

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Domain

1. Add your domain to `_config.yml`:
   ```yaml
   url: "https://yourdomain.com"
   ```

2. Create a `CNAME` file in the root with your domain:
   ```
   yourdomain.com
   ```

3. Configure DNS settings with your domain provider

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`

## 📊 Performance Features

The site is optimized for performance:

- Minimal CSS with essential styles only
- No unnecessary JavaScript
- Fast loading times
- Mobile-optimized
- Clean HTML structure

## 🎯 Key Features

### Homepage
- Personal introduction
- Skills and learning areas
- Project highlights
- Recent blog posts section

### About Page
- Personal story and journey
- Education and experience
- Values and approach

### Projects Page
- Simple project listings
- Technology tags
- Clean descriptions

### Blog
- Recent posts on homepage
- Full blog page with all posts
- Clean typography

### Contact
- Direct contact links
- Social media profiles
- Simple, accessible design

## 🔧 Development

### Local Development

```bash
# Start development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### File Structure

- `_layouts/default.html`: Main layout template
- `assets/css/style.css`: Custom styles
- `index.markdown`: Homepage content
- `_posts/`: Blog posts directory
- `_config.yml`: Site configuration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any issues or have suggestions, please open an issue or submit a pull request.

---

**Built with ❤️ using Jekyll** 