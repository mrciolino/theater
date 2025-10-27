# Kati Fortune - Acting Portfolio Website

A modern, responsive portfolio website built for actress Kati Fortune, showcasing theatrical performances, career highlights, and professional information with stunning animations and interactive elements.

## ✨ Features

- **Dynamic Hero Section** - Rotating featured performances with smooth transitions
- **Interactive Portfolio** - Clickable performance cards with detailed modal views
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme** - Seamless theme switching with animated transitions
- **Custom Cursor** - Unique multi-layered cursor animation (desktop only)
- **Loading Screen** - Cinematic loading experience with animated theater stage
- **Resume Modal** - Integrated PDF viewer with download functionality
- **Contact Form** - Professional contact form with validation
- **Smooth Animations** - Motion-powered transitions throughout the site

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: TailwindCSS 4.x with custom CSS variables
- **Animations**: Motion (Framer Motion) for smooth animations
- **UI Components**: Custom components built with Radix UI primitives
- **Build Tool**: Vite for fast development and building
- **Icons**: Custom SVG icons with Lucide React
- **Theme System**: Context-based dark/light mode switching

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── button-group.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── separator.tsx
│   ├── about.tsx              # About section component
│   ├── contact.tsx            # Contact form component
│   ├── custom-cursor.tsx      # Custom animated cursor
│   ├── footer.tsx             # Footer with tech stack
│   ├── header.tsx             # Navigation header
│   ├── hero.tsx               # Main hero section
│   ├── icons.tsx              # Custom SVG icon components
│   ├── loading_screen.tsx     # Animated loading screen
│   ├── modal.tsx              # Performance detail modal
│   ├── mode-toggle.tsx        # Theme switcher component
│   ├── resume-modal.tsx       # Resume viewer modal
│   └── theme-provider.tsx     # Theme context provider
├── data/
│   └── resume.pdf             # Resume file
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main app component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kati_fortune
   npm i
   npm run dev
   ```

### Performance Data

Update the performance data in [`src/components/hero.tsx`](src/components/hero.tsx):

```typescript
const featuredShows = [
  {
    title: "Your Show Title",
    description: "Show description",
    image: "/path-to-image.jpg",
    category: "Drama",
    year: "2024",
    role: "Lead"
  }
  // Add more shows
];
```

### Resume

Replace the resume file in [`src/data/resume.pdf`](src/data/resume.pdf) with your own PDF.

## 📱 Component Overview

### Key Components

- **[`Header`](src/components/header.tsx)** - Responsive navigation with smooth scrolling
- **[`Hero`](src/components/hero.tsx)** - Featured performances carousel with portfolio grid
- **[`About`](src/components/about.tsx)** - Professional information and resume access
- **[`Contact`](src/components/contact.tsx)** - Contact form with validation
- **[`PerformanceModal`](src/components/modal.tsx)** - Detailed performance information
- **[`CustomCursor`](src/components/custom-cursor.tsx)** - Animated cursor (desktop only)
- **[`ModeToggle`](src/components/mode-toggle.tsx)** - Animated theme switcher

### UI Components

Built with Radix UI primitives and styled with TailwindCSS:
- [`Button`](src/components/ui/button.tsx) - Versatile button component
- [`DropdownMenu`](src/components/ui/dropdown-menu.tsx) - Accessible dropdown menus
- [`Separator`](src/components/ui/separator.tsx) - Visual separators

## 🎭 Features Deep Dive

### Animations

- **Motion-powered**: Smooth page transitions and micro-interactions
- **Performance optimized**: Hardware-accelerated animations
- **Accessibility-friendly**: Respects `prefers-reduced-motion`

### Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Large tap targets and gesture support
- **Adaptive UI**: Different layouts for mobile/desktop

### Theme System

- **System preference detection**: Automatically matches OS theme
- **Persistent**: Remembers user preference across sessions
- **Smooth transitions**: Animated theme switching

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. If you'd like to suggest improvements or report issues, please reach out directly.

---

**Built with ❤️ using React, Motion, Vite, and TypeScript**