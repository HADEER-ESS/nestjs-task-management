# Task Management API

A REST API for managing tasks with user authentication, built with **NestJS**, **TypeORM**, and **PostgreSQL**. Built while following the *NestJS Zero to Hero* course, and deployed to the cloud.

## Live Demo

**Base URL:** [https://YOUR-SUGA-URL](https://1baky97o8j90-production-v7wgm2ja.us-central1.suga.run)

> The root path `/` returns a success message: `Application build successfully`. Use the endpoints below, for example, with Postman.

## Tech Stack

- [NestJS](https://nestjs.com/) (TypeScript)
- TypeORM
- PostgreSQL, hosted on [Neon](https://neon.com)
- JWT authentication
- Deployed on [Suga](https://suga.app)
- pnpm

## API Endpoints

### Auth

| Method | Endpoint       | Description                      |
|--------|----------------|----------------------------------|
| POST   | `/auth/signup` | Create a new user                |
| POST   | `/auth/signin` | Sign in and receive a JWT token  |

### Tasks (require `Authorization: Bearer <token>`)

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/tasks`             | Get your tasks (supports filtering)  |
| GET    | `/tasks/:id`         | Get a task by ID                     |
| POST   | `/tasks`             | Create a task                        |
| PATCH  | `/tasks/:id/status`  | Update a task's status               |
| DELETE | `/tasks/:id`         | Delete a task                        |

### Example requests

```bash
# Sign up
curl -X POST https://YOUR-SUGA-URL/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "Test1234!"}'

# Sign in (returns an access token)
curl -X POST https://YOUR-SUGA-URL/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "Test1234!"}'

# Get tasks
curl https://YOUR-SUGA-URL/tasks \
  -H "Authorization: Bearer <accessToken>"
```

## Run Locally

### Prerequisites

- Node.js 18+
- pnpm
- A PostgreSQL database (local, or a free one from Neon)

### Setup

```bash
git clone https://github.com/HADEER-ESS/nestjs-task-management.git
cd nestjs-task-management
pnpm install
```

Create an environment file (do **not** commit it) with:

```env
STAGE=dev
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=task-management
JWT_SECRET=your_secret
```

### Run

```bash
# development (watch mode)
pnpm run start:dev

# production build
pnpm run build
pnpm run start:prod
```

### Tests

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

## Deployment

The app is deployed on **Suga**, with the database on **Neon**.

1. Push the code to GitHub and connect the repository to a Suga project.
2. Set these environment variables in Suga: `STAGE=prod`, `PORT=3000`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `JWT_SECRET`.
3. Set the service port to `3000` in the networking settings.
4. Generate a public URL in Public Networking.

Notes:

- `start:prod` runs `node dist/main` (no `cross-env`), because production installs only runtime dependencies.
- The Neon database requires SSL, so TypeORM is configured with `ssl` enabled when `STAGE=prod`.
- Secrets live only in Suga's environment variables, never in the repository.

## Author

**Hadeer Essam** · [GitHub](https://github.com/HADEER-ESS)

## The project used in the Android Todo Application
[TODO-Android-Native](https://github.com/HADEER-ESS/Todo_Android_Jetpack_Compose)
