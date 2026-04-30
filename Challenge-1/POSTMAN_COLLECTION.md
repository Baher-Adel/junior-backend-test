# API reference (from Postman collection)

This document mirrors the requests defined in [`Fekra Junior Backend.postman_collection.json`](Fekra%20Junior%20Backend.postman_collection.json) (collection **Fekra Junior Backend**, Postman schema v2.1).

## Import and base URL

1. In Postman, **Import** the file `Fekra Junior Backend.postman_collection.json`.
2. Open the collection **Variables** tab and set **`base`** to your API origin (no trailing slash), for example `http://localhost:3000`.

The collection uses `{{base}}` in every URL.

## Authentication flow

| Folder | Auth |
|--------|------|
| **Auth** | None (public). |
| **Product** | **Bearer token** at folder level. The collection references Postman Vault placeholders (`{{vault:authorization-secret}}`). Replace with a real JWT or wire a **Tests** script on **Login** that saves `pm.collectionVariables.set("token", json.token)` and point Bearer to `{{token}}`. |

Typical flow:

1. Run **Auth → Login** (admin or user).
2. Copy the `token` from the JSON response (or automate with a script).
3. Set the Product folder’s Bearer token (or collection variable) to that value.
4. Call **Product** requests.

**Roles:** `POST`, `PUT`, and `DELETE` on `/products` require an **admin** JWT. `GET /products` and `GET /products/:id` require any valid authenticated user.

---

## Auth

### Login

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `{{base}}/auth/login` |
| **Headers** | `Content-Type: application/json` (body type raw JSON) |
| **Body** | See below |

**Default body in collection (non-admin user):**

```json
{
  "email": "user@inventory.test",
  "password": "UserPass1!"
}
```

**Saved example in collection (admin):**

```json
{
  "email": "admin@inventory.test",
  "password": "AdminPass1!"
}
```

Passwords match the seed script (`scripts/seed.js`) if you ran `npm run seed`.

**Example success:** HTTP **200**, body shape:

```json
{
  "token": "<JWT>"
}
```

---

## Product

All requests below use the **Product** folder Bearer auth unless you override per-request.

### getAll

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `{{base}}/products` |
| **Query (optional)** | `limit`, `page` |

**Example in collection:** `GET {{base}}/products?limit=5&page=1`

**Example success:** HTTP **200**, JSON array of product objects.

**Saved examples in collection:**

- Plain `GET /products` returning a non-empty array.
- `GET /products?limit=5&page=1` returning `[]` (illustrates pagination / empty page).

---

### getByID

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `{{base}}/products/:id` |

**Example in collection:** `GET {{base}}/products/69f25ed654eeb6f704da438e`

Replace `:id` with a real MongoDB **ObjectId** from your database (e.g. from **getAll** or **create**).

**Example success:** HTTP **200**, single product object.

---

### create

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `{{base}}/products` |
| **Auth** | **Admin** Bearer token |
| **Body** | `application/json` |

**Example body in collection:**

```json
{
  "name": "Product1",
  "price": 3,
  "quantity": 0
}
```

`category` is optional in the API; add it as a string if needed.

**Example success:** HTTP **201**, created product including `_id`, `createdAt`, `updatedAt`.

---

### update

| | |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{base}}/products/:id` |
| **Auth** | **Admin** Bearer token |
| **Body** | `application/json` |

**Example in collection:** `PUT {{base}}/products/69f25fa754eeb6f704da438f`

**Example body:**

```json
{
  "name": "Product2",
  "price": 1,
  "quantity": 0
}
```

**Example success:** HTTP **200**, updated product document.

---

### delete

| | |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{base}}/products/:id` |
| **Auth** | **Admin** Bearer token |

**Example in collection:** `DELETE {{base}}/products/69f25ed654eeb6f704da438e`

**Example success:** HTTP **204** (no body), per API design.

The collection’s **delete** request has no saved example response in the file; behavior is still as above.

---

## Quick reference table

| Folder | Name | Method | Path |
|--------|------|--------|------|
| Auth | Login | `POST` | `/auth/login` |
| Product | getAll | `GET` | `/products` |
| Product | getByID | `GET` | `/products/:id` |
| Product | create | `POST` | `/products` |
| Product | update | `PUT` | `/products/:id` |
| Product | delete | `DELETE` | `/products/:id` |

---

## Product JSON shape (from saved examples)

Fields returned or accepted align with the challenge schema:

- `_id` — MongoDB id (string)
- `name` — string  
- `category` — string (optional on create/update if omitted)
- `price` — number  
- `quantity` — number  
- `createdAt`, `updatedAt` — ISO date strings  
- `__v` — Mongoose version key  

---

## Links

- **Local collection file:** [`Fekra Junior Backend.postman_collection.json`](Fekra%20Junior%20Backend.postman_collection.json)  
- **Postman collection link (import / fork in cloud):** [Job assessment — Postman collection](https://www.postman.com/shahendoshbahoshatha/workspace/job-assessment/collection/18340173-6981d531-aae3-4723-b2ea-41ec3e7754ac?action=share&source=copy-link&creator=18340173)  
- **Collection link from JSON metadata:** [Open in Postman](https://go.postman.co/collection/18340173-6981d531-aae3-4723-b2ea-41ec3e7754ac?source=collection_link)

For environment setup and running the server, see [README.md](README.md).
