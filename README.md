# 🍼 Baby Feeding Tracker

![CI Status](https://github.com/username/baby-feeding-tracker/workflows/CI/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern and responsive web application for tracking your baby's feeding schedule. Built with React, TypeScript, and Tailwind CSS following development best practices.

## ✨ Features

- 📱 **Mobile-first**: Optimized for mobile devices
- 🎨 **Modern UI**: Clean design with soft gradients and pastel colors
- 🧪 **Fully tested**: 100% test coverage with Vitest
- ⚡ **Fast**: Built with Vite for rapid development
- 🔧 **TypeScript**: Static typing for enhanced robustness
- 📐 **Responsive**: Works perfectly on mobile, tablet, and desktop
- ♿ **Accessible**: Meets web accessibility standards

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/username/baby-feeding-tracker.git
cd baby-feeding-tracker

# Install dependencies
pnpm install

# Run in development mode
pnpm run dev
```

## 📜 Available Scripts

```bash
# Development
pnpm run dev          # Development server
pnpm run dev:host     # Server accessible from local network

# Testing
pnpm run test         # Run tests
pnpm run test:ui      # Tests with visual interface
pnpm run test:watch   # Tests in watch mode

# Build
pnpm run build        # Production build
pnpm run preview      # Preview the build

# Code quality
pnpm run lint         # Run linter
pnpm run lint:fix     # Auto-fix linting issues
```

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite 7
- **Testing**: Vitest + Testing Library
- **CI/CD**: GitHub Actions
- **Linting**: ESLint

## 🧪 Testing

The project follows **Test-Driven Development (TDD)** with 100% coverage:

```bash
# Run all tests
pnpm test

# Tests in watch mode during development
pnpm run test:watch

# Generate coverage report
pnpm run test:coverage
```

## 🚀 Deployment

The project is configured for automatic deployment:

1. **Development**: Every push to `develop` runs tests
2. **Production**: Every merge to `main` creates a production build
3. **CI/CD**: GitHub Actions automatically runs tests, linting, and build

## 📱 Mobile Optimizations

- **Optimized viewport** for mobile devices
- **Touch targets** minimum 44px following Apple guidelines
- **Zoom prevention** on inputs
- **Safe area support** (notches)
- **Enhanced touch interactions**
- **Floating Action Button** on mobile

## 🎨 Design System

- **Primary colors**: Soft pink (`#fdf2f8`) to soft blue (`#eff6ff`)
- **Typography**: System fonts for better performance
- **Spacing**: Tailwind-based system (4px, 8px, 16px, etc.)
- **Borders**: Consistent radius (8px, 12px, 16px)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

We follow the practices defined in `DEVELOPMENT_GUIDELINES.md`:

- ✅ Always use `pnpm` instead of `npm`
- ✅ Pair Programming with TDD
- ✅ Lean and Extreme Programming practices
- ✅ Mandatory PR Code Review
- ✅ Tests must pass before commit

## 📄 License

This project is under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Feeding registration functionality
- [ ] Charts and statistics
- [ ] Push notifications
- [ ] Offline mode/PWA
- [ ] Data export
- [ ] Multi-user/family support

---

🧑‍💻 **Built with ❤️ following modern development best practices**
