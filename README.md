# BIM & Autodesk Training Platform

A modern, full-stack training platform for BIM, Revit, AutoCAD, and Autodesk tools. Built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **User Authentication**: Secure email/password authentication with Better Auth
- **Course Management**: Browse, search, and enroll in professional BIM courses
- **Student Dashboard**: Track course progress, view enrollments, and manage profile
- **Responsive Design**: Mobile-first, fully responsive interface
- **Real-time Updates**: Live course data and progress tracking
- **Professional UI**: Premium design with Framer Motion animations
- **Consultancy Services**: Information about professional consulting
- **Contact Management**: Multi-channel contact system

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth (email + password)
- **Validation**: Zod for form validation
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ (pnpm is preferred)
- PostgreSQL 14+ database
- Environment variables set up

## Installation

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bim_academy"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

To generate `BETTER_AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Database Setup

Push the Prisma schema to your database:

```bash
pnpm db:push
```

### 4. Seed Sample Data

Populate the database with sample courses and testimonials:

```bash
pnpm db:seed
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── page.tsx                    # Home page
├── about/                      # About page
├── courses/                    # Courses listing & details
│   ├── page.tsx              # All courses
│   └── [id]/                 # Course detail page
├── consultancy/              # Consultancy services
├── contact/                  # Contact form
├── dashboard/                # Protected: Student dashboard
├── profile/                  # Protected: User profile
├── sign-in/                  # Authentication
├── sign-up/                  # Authentication
└── api/auth/                 # Better Auth routes

components/
├── navbar.tsx                # Navigation header
├── footer.tsx                # Footer
├── course-card.tsx           # Course preview card
├── testimonial-card.tsx      # Testimonial display
├── enrollment-card.tsx       # Dashboard enrollment card
├── auth-form.tsx             # Login/signup form
├── enroll-button.tsx         # Course enrollment
├── animated-button.tsx       # Animated CTA button
├── modal.tsx                 # Modal/dialog component
├── toast.tsx                 # Notification toast
└── skeleton.tsx              # Loading skeletons

lib/
├── db.ts                     # Prisma client
├── auth.ts                   # Better Auth config
├── auth-client.ts            # Client-side auth
├── actions.ts                # Server actions
└── animations.ts             # Framer Motion variants

prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Sample data

types/
└── index.ts                  # TypeScript definitions
```

## Key Pages

### Public Pages
- **Home** (`/`): Landing page with hero, features, and top courses
- **Courses** (`/courses`): Browse all courses with filtering
- **Course Detail** (`/courses/[id]`): Full course information
- **About** (`/about`): Company information
- **Consultancy** (`/consultancy`): Consulting services
- **Contact** (`/contact`): Contact form

### Protected Pages (Require Login)
- **Dashboard** (`/dashboard`): Student learning dashboard
- **Profile** (`/profile`): User settings and profile management

### Auth Pages
- **Sign In** (`/sign-in`): Login page
- **Sign Up** (`/sign-up`): Registration page

## API Routes

- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session

## Database Schema

### Users
- id, email, password (hashed), name
- Sessions for authentication tracking

### Courses
- id, title, description, category, level, duration
- price, instructor, image, rating

### Enrollments
- User course enrollments with progress tracking
- Status: enrolled, completed, dropped

### Testimonials
- Client feedback and reviews

## Server Actions

All database operations use server actions for security:

- `getCourses()` - Fetch all courses
- `getCourseById(id)` - Get single course
- `enrollCourse(courseId)` - Enroll user in course
- `getEnrollments()` - Get user's enrollments
- `updateProgress(enrollmentId, progress)` - Update course progress
- `getTestimonials()` - Fetch testimonials

## Authentication Flow

1. User signs up with email/password
2. Better Auth creates secure session
3. Session stored in httpOnly cookie
4. Protected routes check session validity
5. Unauthorized users redirected to sign-in

## Styling

- Design tokens defined in `app/globals.css`
- Color palette: Primary (Blue), Accent (Teal), Neutrals
- Tailwind v4 with semantic tokens
- Responsive breakpoints: sm, md, lg

## Performance

- Next.js Image optimization
- Framer Motion animations with GPU acceleration
- Prisma query optimization
- Server-side rendering for public pages
- Client-side rendering for interactive components

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, contact: support@bim-academy.com
