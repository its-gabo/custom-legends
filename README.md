# ⚔️ Custom Legends

Track, analyze, and improve your League of Legends custom game performance with detailed statistics.

<br />

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with TypeScript
- **Authentication:** Better Auth with email/password
- **Database:** PostgreSQL with Drizzle ORM
- **API:** tRPC for type-safe APIs
- **Styling:** Tailwind CSS
- **Package Manager:** Bun

<br />

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22.6.0 or higher)
- [Bun](https://bun.sh/) (latest version)
- [Docker](https://docker.com/)

<br />

## 🔧 Installation
### 1. Clone the repository

```bash
git clone https://github.com/its-gabo/custom-legends.git
cd custom-legends
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the database with Docker

```bash
docker-compose up -d
```

### 4. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

 ```env
# Drizzle
DATABASE_URL="postgresql://postgres:custom-legends-password@localhost:5432/custom-legends"

# BetterAuth
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your_generated_secret"
```

### 5. Set up the database schema

```bash
bun run db:migrate
```

### 6. Start the development server

```bash
bun run dev
```

### 7. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000)

<br />

## 📁 Project Structure

```
custom-legends/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Better Auth routes
│   │   │   └── trpc/       # tRPC API routes
│   │   ├── _components/    # Shared components
│   │   └── page.tsx        # Home page
│   ├── server/             # Server-side code
│   │   ├── api/           # tRPC routers
│   │   │   └── routers/   # API route handlers
│   │   ├── db/            # Database configuration
│   │   │   ├── schema.ts  # Main schema
│   │   │   └── auth.schema.ts # Auth tables
│   │   └── lib/           # Server utilities
│   │       └── auth.ts    # Better Auth config
│   ├── lib/               # Shared utilities
│   ├── styles/            # Global styles
│   └── trpc/              # tRPC client configuration
├── public/                # Static assets
├── drizzle.config.ts      # Drizzle ORM configuration
└── package.json
```
