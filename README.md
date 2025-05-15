# SvelteKit + Supabase Template

A starter template for building applications with SvelteKit and Supabase for authentication and database.

## Features

- SvelteKit (latest version)
- Tailwind CSS for styling
- Supabase for authentication
- Social login (GitHub, Google)
- Protected routes
- Type-safe environment variables
- Session management

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- A Supabase account and project

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```
PUBLIC_SUPABASE_URL=your-supabase-project-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
PUBLIC_SITE_URL=http://localhost:5173
```

You can find these values in your Supabase project dashboard under Settings > API.

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

5. Visit `http://localhost:5173` to see your application running.

## Supabase Setup

1. Create a new project in Supabase
2. Set up authentication providers in Authentication > Settings:
   - Enable Email/Password sign-in
   - Set up social providers as needed (GitHub, Google, etc.)
   - Add your app's URL to the redirect URLs (e.g., `http://localhost:5173/auth/callback`)
3. Create a `profiles` table for user data (optional):

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read any profile
CREATE POLICY "Anyone can read profiles" ON public.profiles
  FOR SELECT USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

## Project Structure

- `/src/routes` - SvelteKit routes
- `/src/lib/components` - Reusable components
- `/src/lib/stores` - Svelte stores for state management
- `/src/lib/supabase.ts` - Supabase client setup

## Authentication Flow

This template includes:

- Sign in with email/password
- Sign in with social providers (GitHub, Google)
- Protected routes with server-side validation
- User profile display

## Deployment

This template can be deployed on any platform that supports SvelteKit, such as:

- Vercel
- Netlify
- Cloudflare Pages
- Railway
- Fly.io

Make sure to set up your environment variables in your deployment platform.

## License

MIT
