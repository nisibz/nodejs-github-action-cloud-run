# Node.js Cloud Run Template

TypeScript-based Node.js application with Docker and Google Cloud Run CI/CD pipeline.

## Features

- 🐳 Multi-stage Docker builds (development & production)
- 🔄 GitHub Actions CI/CD for Cloud Run deployments
- ⚙️ Environment configuration management
- 🔥 Live reload with Nodemon in development
- 📦 TypeScript support

## Prerequisites

- Node.js 20+
- Docker 24+
- Google Cloud account (for deployment)

## Quick Start

```bash
git clone https://github.com/nisibz/nodejs-github-action-cloud-run.git
cd nodejs-github-action-cloud-run
npm install
cp .env.example .env
```

## Development

**Local development:**

```bash
npm run dev  # Starts server with Nodemon (via ts-node)
```

**Docker development (Dockerfile):**

```bash
docker-compose up --build
```

- Base image: `node:20-alpine`
- Auto-installs dependencies from `package*.json`
- Live reload via mounted volume
- Port mapping: 3000:3000

## API Endpoints (src/server.ts)

**Health Check**

```typescript
app.get("/", (_req: Request, res: Response): void => {
  res.sendStatus(200);
});
```

- Method: `GET`
- Path: `/`
- Response: HTTP 200 status

## Production Deployment

**Docker Build (Dockerfile.prod):**

```bash
docker build -f Dockerfile.prod -t your-image-name .
```

- 3-stage build (deps → builder → runner)
- Dedicated non-root user (UID 1001)
- Optimized production dependencies
- TypeScript compilation

## CI/CD Pipeline (.github/workflows/cicd.yml)

**Trigger Deployment:**

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

**Pipeline Stages:**

1. Build production Docker image
2. Push to Artifact Registry
3. Deploy to Cloud Run with:
   - Automatic traffic migration
   - Revision creation
   - Asia Southeast 1 region
