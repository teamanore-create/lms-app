# BIM Academy - Complete Setup Guide

This guide will walk you through setting up the BIM & Autodesk Training Platform from scratch.

## Prerequisites

- **Node.js**: 18.17.0 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **PostgreSQL**: 14+ database instance
- **Git**: For version control (optional but recommended)

## Step-by-Step Setup

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd bim-academy

# Or extract the ZIP file and navigate to the directory
cd bim-academy
```

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

```bash
# On macOS with Homebrew
brew install postgresql@14
brew services start postgresql@14

# On Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create database and user
psql -U postgres
CREATE DATABASE bim_academy;
CREATE USER bim_user WITH PASSWORD 'your_secure_password';
ALTER ROLE bim_user SET client_encoding TO 'utf8';
ALTER ROLE bim_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE bim_user SET default_transaction_deferrable TO on;
ALTER ROLE bim_user SET default_transaction_deferrable TO off;
ALTER ROLE bim_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE bim_academy TO bim_user;
\q
```

#### Option B: Managed PostgreSQL Service

- **Neon**: https://console.neon.tech
- **AWS RDS**: https://console.aws.amazon.com/rds
- **DigitalOcean**: https://www.digitalocean.com/products/managed-databases
- **Supabase**: https://supabase.com

### Step 4: Configure Environment Variables

Create `.env.local` file in the project root:

```bash
# Copy the example
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# PostgreSQL Connection String
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://bim_user:your_secure_password@localhost:5432/bim_academy"

# Generate a secure random secret
# Command: openssl rand -base64 32
BETTER_AUTH_SECRET="your-generated-secret-here"

# Optional: Better Auth URL (auto-detected if not set)
BETTER_AUTH_URL="http://localhost:3000"

# Node environment
NODE_ENV="development"
```

#### Generate BETTER_AUTH_SECRET

```bash
# On macOS/Linux
openssl rand -base64 32

# Output example:
# x8Kj9pL2mN4vQ6sR8tU1wX3yZ5aB7cD9eF1gH3iJ5kL7mN9oP1qR3sT5uV7wX9y

# Copy the output and paste it into .env.local
```

### Step 5: Database Schema Setup

Push the Prisma schema to your PostgreSQL database:

```bash
pnpm db:push
```

This will:
- Create all required tables (users, sessions, courses, enrollments, testimonials)
- Set up indexes and relationships
- Enable necessary extensions

### Step 6: Seed Sample Data

Populate the database with sample courses and testimonials:

```bash
pnpm db:seed
```

This creates:
- 6 sample courses (Revit, AutoCAD, Civil 3D, etc.)
- 5 testimonials from satisfied students
- Test data for exploration

### Step 7: Verify Prisma Client

Generate Prisma client files:

```bash
pnpm prisma generate
```

### Step 8: Start Development Server

```bash
pnpm dev
```

Output:
```
▲ Next.js 16.0.0
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.5s
```

### Step 9: Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

## Testing the Application

### 1. Test Public Pages

- Home page: http://localhost:3000
- Courses: http://localhost:3000/courses
- About: http://localhost:3000/about
- Consultancy: http://localhost:3000/consultancy
- Contact: http://localhost:3000/contact

### 2. Test Authentication

**Sign Up**
- Go to http://localhost:3000/sign-up
- Fill in email (e.g., `user@example.com`), password, and name
- Click "Create Account"
- You'll be redirected to the dashboard

**Sign In**
- Go to http://localhost:3000/sign-in
- Use the email and password from sign-up
- Click "Sign In"

**Sign Out**
- Visit http://localhost:3000/profile
- Click "Sign Out" button

### 3. Test Protected Routes

These routes require authentication:
- Dashboard: http://localhost:3000/dashboard
- Profile: http://localhost:3000/profile

Try accessing them without logging in - you'll be redirected to sign-in.

### 4. Test Course Features

- Browse courses on http://localhost:3000/courses
- Click on any course to view details
- After sign-up, click "Enroll Now" to enroll
- Track progress in the dashboard

## Database Management

### View Database

```bash
# Connect to database
psql -U bim_user -d bim_academy -h localhost

# List tables
\dt

# Query users
SELECT id, email, name FROM "User" LIMIT 5;

# Query courses
SELECT id, title, category FROM "Course";

# Exit
\q
```

### Reset Database

**Warning**: This deletes all data!

```bash
pnpm prisma db push --force-reset
pnpm db:seed
```

### Backup Database

```bash
# PostgreSQL backup
pg_dump -U bim_user -d bim_academy > backup.sql

# Restore from backup
psql -U bim_user -d bim_academy < backup.sql
```

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
pnpm dev -- -p 3001
```

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solutions:
1. Verify PostgreSQL is running: `brew services list`
2. Check DATABASE_URL format
3. Verify credentials are correct
4. Check firewall/network settings

### Prisma Client Error

```
Error: @prisma/client did not initialize yet
```

Solution:
```bash
pnpm prisma generate
rm -rf node_modules/.prisma
pnpm install
```

### Authentication Not Working

```
Error: BETTER_AUTH_SECRET is not set
```

Solution:
1. Check `.env.local` has BETTER_AUTH_SECRET
2. Regenerate: `openssl rand -base64 32`
3. Update `.env.local`
4. Restart dev server

## Development Tips

### View Database in GUI

Install and use DBeaver or pgAdmin:

```bash
# DBeaver (macOS)
brew install dbeaver-community

# pgAdmin (Web-based)
# Docker: docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=admin@example.com' -e 'PGADMIN_DEFAULT_PASSWORD=admin' dpage/pgadmin4
```

### Useful Commands

```bash
# Type checking
pnpm build

# Linting
pnpm lint

# Run Prisma Studio (GUI)
pnpm prisma studio

# View database migrations
pnpm prisma migrate status
```

### Code Structure

- **Pages**: `app/[page]/page.tsx`
- **Components**: `components/[name].tsx`
- **Server Actions**: `lib/actions.ts`
- **Database**: `lib/db.ts`
- **Auth**: `lib/auth.ts` and `lib/auth-client.ts`

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or link existing project
vercel link
vercel deploy --prod
```

### Environment Variables on Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `BETTER_AUTH_SECRET`: Generate new secure secret

### Build for Production

```bash
pnpm build
pnpm start
```

## Next Steps

1. **Customize Branding**: Update colors in `app/globals.css`
2. **Add More Courses**: Use Prisma Studio or create via admin panel
3. **Setup Email**: Integrate email service for notifications
4. **Add Payment**: Integrate Stripe for course purchases
5. **Analytics**: Add Google Analytics or Vercel Analytics

## Support

- **Documentation**: See README.md
- **TypeScript**: Check `types/index.ts` for type definitions
- **Database Schema**: Check `prisma/schema.prisma`
- **Issues**: Create an issue in the repository

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Start dev | `pnpm dev` |
| Build | `pnpm build` |
| Push schema | `pnpm db:push` |
| Seed data | `pnpm db:seed` |
| DB Studio | `pnpm prisma studio` |
| Type check | `pnpm build` |
| Lint | `pnpm lint` |

Enjoy building with BIM Academy!
