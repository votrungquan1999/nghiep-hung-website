# Nghiep Hung Website

A modern, multilingual website for Nghiep Hung - a professional air duct system company specializing in industrial and residential ventilation solutions. Built with Next.js 15, TypeScript, and MongoDB.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

## 🌟 Features

### Public Website
- **Multilingual Support** - Vietnamese and English content
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean, professional design with dark/light theme support
- **Product Showcase** - Dynamic product gallery with image management
- **Service Information** - Comprehensive service offerings
- **Project Portfolio** - Showcase of completed projects
- **Contact Integration** - Contact forms and company information
- **SEO Optimized** - Server-side rendering and meta tags

### Admin Panel
- **Secure Authentication** - Google OAuth with Better Auth
- **Product Management** - CRUD operations for air duct products
- **Image Management** - AWS S3 integration for product images
- **Service Management** - Update company services and offerings
- **Project Management** - Showcase completed projects
- **Contact Management** - Update contact details and social media
- **Role-based Access** - Admin-only access with email whitelist

### Technical Features
- **Server Components** - Optimized performance with React Server Components
- **Database Integration** - MongoDB with typed collections
- **File Upload** - AWS S3 integration for image storage
- **Form Handling** - React Hook Form with Zod validation
- **State Management** - Custom context providers and reducers
- **Code Quality** - Biome for linting and formatting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Google OAuth credentials
- AWS S3 bucket (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nghiep-hung-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```bash
   # Database
   MONGODB_URI=mongodb://localhost:27017/nghiep-hung-website
   
   # Authentication
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Admin Access
   ADMIN_EMAILS=admin@example.com,your-email@gmail.com
   
   # AWS S3
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET_NAME=your-bucket-name
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Better Auth** - Authentication library
- **AWS S3** - File storage

### Development
- **Biome** - Linting and formatting
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run biome:check  # Run Biome checks
npm run biome:format # Format code with Biome
npm run biome:fix    # Fix code issues with Biome
```

## 🔐 Admin Setup

The admin panel requires Google OAuth setup. See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed instructions.

### Quick Admin Setup

1. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **MongoDB Setup**
   - Use local MongoDB or MongoDB Atlas
   - Update `MONGODB_URI` in `.env.local`

3. **Admin Access**
   - Add your email to `ADMIN_EMAILS` in `.env.local`
   - Access admin panel at `/admin`

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Connect to your Git repository

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Update URLs to production domain

3. **Deploy**
   - Automatic deployment on push to main branch
   - Manual deployment available

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Features Overview

### Public Website
- **Homepage** - Hero section with company introduction
- **Products** - Air duct product catalog with images
- **Services** - Company service offerings
- **Projects** - Portfolio of completed projects
- **About** - Company information and history
- **Contact** - Contact form and company details

### Admin Panel
- **Dashboard** - Overview of all management sections
- **Products** - Add, edit, delete products with image management
- **Services** - Manage service offerings
- **Projects** - Showcase completed projects
- **Contact** - Update contact information and social media

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Nghiep Hung Company.

## 📞 Support

For support and questions:
- Email: votrungquan99@gmail.com
- Website: [Company Website]
- Phone: [Phone Number]

---

**Built with ❤️ for Nghiep Hung - Professional Air Duct Systems**