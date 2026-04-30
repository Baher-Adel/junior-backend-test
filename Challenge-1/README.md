# Challenge 1: Product Inventory REST API

REST API built with **Node.js**, **Express**, **MongoDB** (Mongoose), **Express Validator**, and **JWT** authentication. Admin-only routes protect product create, update, and delete operations; listing and reading products require a valid token.

## Prerequisites

- **Node.js** 18 or newer (LTS recommended)
- **npm** (bundled with Node.js)
- A **MongoDB** instance you can connect to (local [MongoDB Community](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Install step by step

### 1. Go to the Challenge 1 folder

From the repository root:

```bash
cd Challenge-1
```

### 2. Install dependencies

```bash
npm install
```

This installs runtime packages (Express, Mongoose, JWT, bcrypt, express-validator, etc.) and dev tools (ESLint, Prettier, nodemon, morgan).

### 3. Configure environment variables

Create a `.env` file in `Challenge-1` (do not commit real secrets to git).

**Option A — copy the example file:**

```bash
cp .env.example .env
```

**Option B — create `.env` manually** with at least:

| Variable         | Description |
|------------------|-------------|
| `MONGODB_URI`    | MongoDB connection string (required). Example: `mongodb://127.0.0.1:27017/inventory` or your Atlas SRV URI with database name. |
| `JWT_SECRET`     | Long random string used to sign tokens (**required** for login). |
| `JWT_EXPIRES_IN` | Token lifetime passed to `jsonwebtoken`, e.g. `1h` (set in `.env.example`; omitting it can affect expiry behavior). |
| `PORT`           | HTTP port (optional; default **3000**). |
| `NODE_ENV`       | Set to `development` to enable request logging with morgan. |
| `SALT_ROUNDS`    | bcrypt cost factor (optional; defaults to **10** if unset or invalid). |

Replace any placeholder values in `.env` with your own MongoDB URI and a strong `JWT_SECRET`.

### 4. Seed default users (recommended)

The API expects users in MongoDB for login. Seed script creates two accounts (see `scripts/seed.js` for emails and passwords):

```bash
npm run seed
```

Default test accounts after seeding:

- **Admin** — `admin@inventory.test` (use password from `SEED_USERS` in `scripts/seed.js`)
- **User** — `user@inventory.test` (same file for password)

Only the **admin** role can `POST`, `PUT`, and `DELETE` products.

### 5. Start the server

**Production-style (no auto-restart):**

```bash
npm start
```

**Development (auto-restart on file changes):**

```bash
npm run dev
```

You should see a MongoDB connection message and `Server listening on port <PORT>` (default **3000**).

## Postman

- **Import locally:** [`Fekra Junior Backend.postman_collection.json`](Fekra%20Junior%20Backend.postman_collection.json) — set collection variable **`base`** (e.g. `http://localhost:3000`).
- **Fork in Postman:** [Job assessment — Postman collection](https://www.postman.com/shahendoshbahoshatha/workspace/job-assessment/collection/18340173-6981d531-aae3-4723-b2ea-41ec3e7754ac?action=share&source=copy-link&creator=18340173)
- **Request/response reference** derived from that JSON: [POSTMAN_COLLECTION.md](POSTMAN_COLLECTION.md)

## API overview

Base URL: `http://localhost:<PORT>` (default `http://localhost:3000`).

| Method | Path | Auth | Notes |
|--------|------|------|--------|
| `POST` | `/auth/login` | No | Body: `{ "email", "password" }`. Returns JWT. |
| `POST` | `/products` | Yes, **admin** | Create product. Validated body: `name`, optional `category`, `price`, `quantity`. |
| `GET` | `/products` | Yes | List products. Query: `page`, `limit` (default limit **10**). |
| `GET` | `/products/:id` | Yes | Single product by MongoDB ObjectId. |
| `PUT` | `/products/:id` | Yes, **admin** | Update product (same validation rules as create). |
| `DELETE` | `/products/:id` | Yes, **admin** | Delete product. |

Send `Authorization: Bearer <token>` on protected routes.

## Optional: lint and format

```bash
npm run lint
npm run lint:fix
npm run format
```

## Troubleshooting

- **`Missing MONGODB_URI`** when running `npm run seed` — add `MONGODB_URI` to `.env`.
- **Connection refused / timeout** — confirm MongoDB is running and the URI includes the correct host, port, and database name.
- **401 / 403 on products** — log in first; admin routes need a token for an **admin** user.

For the full challenge specification (business rules and validation details), see the main [README.md](../README.md) in the repository root.
