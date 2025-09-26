# Real Estate Platform Additional API Documentation

This document provides sample **cURL requests** for testing the new APIs: **SavedSearch**, **SearchAnalytics**, and **Recommendations**.

---

## SavedSearch API

**Base URL:** `http://localhost:5000/api/saved-search`

### 1. Create Saved Search

```bash
curl -X POST http://localhost:5000/api/saved-search \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {JWT_TOKEN}" \
-d '{
  "query": { "propertyType": "Apartment", "minPrice": 500000 },
  "frequency": "Weekly"
}'
```

### 2. Get Saved Searches (User Only)

```bash
curl -X GET http://localhost:5000/api/saved-search \
-H "Authorization: Bearer {JWT_TOKEN}"
```

### 3. Delete Saved Search

```bash
curl -X DELETE http://localhost:5000/api/saved-search/{SEARCH_ID} \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

## SearchAnalytics API

**Base URL:** `http://localhost:5000/api/search-analytics`

### 1. Record a Search

```bash
curl -X POST http://localhost:5000/api/search-analytics \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {JWT_TOKEN}" \
-d '{
  "query": "luxury apartment",
  "filters": { "city": "Mumbai", "maxPrice": 10000000 },
  "resultCount": 25
}'
```

### 2. List All Search Records (Admin Only)

```bash
curl -X GET http://localhost:5000/api/search-analytics \
-H "Authorization: Bearer {JWT_TOKEN}"
```

---

## Recommendation API

**Base URL:** `http://localhost:5000/api/recommendation`

### 1. Generate Recommendations for a Property

```bash
curl -X POST http://localhost:5000/api/recommendation/{PROPERTY_ID} \
-H "Authorization: Bearer {JWT_TOKEN}"
```

### 2. Get Recommendations for a Property

```bash
curl -X GET http://localhost:5000/api/recommendation/{PROPERTY_ID} \
-H "Authorization: Bearer {JWT_TOKEN}"
```
