# User Management API Documentation

Base URL: `http://localhost:5000/api/user`

This document provides sample cURL requests to test all CRUD operations for the User API.

---

## 1. Create User (Register)

**Endpoint:** `POST /api/user`

```bash
curl -X POST http://localhost:5000/api/user \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}'
```

---

## 2. Login User (Generate JWT)

**Endpoint:** `POST /api/user/login`

```bash
curl -X POST http://localhost:5000/api/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

*Response example:*

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

> Save the token for authenticated routes.

---

## 3. Logout User (Optional)

**Endpoint:** `POST /api/user/logout`

```bash
curl -X POST http://localhost:5000/api/user/logout
```

---

## 4. List All Users (Admin Only)

**Endpoint:** `GET /api/user`

```bash
curl -X GET http://localhost:5000/api/user \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

## 5. Get User by ID (Admin Only)

**Endpoint:** `GET /api/user/:id`

```bash
curl -X GET http://localhost:5000/api/user/{USER_ID} \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

## 6. Update User (Admin Only)

**Endpoint:** `PUT /api/user/:id`

```bash
curl -X PUT http://localhost:5000/api/user/{USER_ID} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {JWT_TOKEN}" \
-d '{
  "name": "John Updated",
  "role": "admin"
}'
```

---

## 7. Delete User (Admin Only)

**Endpoint:** `DELETE /api/user/:id`

```bash
curl -X DELETE http://localhost:5000/api/user/{USER_ID} \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

## 8. Get User Logged in Profile (User Only)

**Endpoint:** `DELETE /api/user/me`

```bash
curl -X GET http://localhost:5000/api/user/me \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

### Notes

1. Make sure your Express server is running:

```bash
cd service
npm install
npm run dev
```

2. Replace `{JWT_TOKEN}` with the token returned from the login route.
3. Replace `{USER_ID}` with the actual user ID.
4. Admin-only routes require a user with `role: "admin"`.
