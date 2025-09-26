# Real Estate Search API Documentation

Base URL: `http://localhost:5000/api/property`

This document provides sample cURL requests to test all CRUD operations for the Property API.

---

## 1. Create Property

**Endpoint:** `POST /api/property`

**Description:** Create a new property.

```bash
curl -X POST http://localhost:5000/api/property \
-H "Content-Type: application/json" \
-d '{
  "title": "Luxurious 2BHK Condo",
  "description": "A modern 2-bedroom condominium with panoramic city views, premium interiors, and top-notch facilities.",
  "propertyType": "Condominium",
  "price": 5500000,
  "size": {
    "length": 45,
    "width": 35
  },
  "location": {
    "HouseNo": "B-105",
    "landmark": "Opposite Central Park",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "co_ordinates": [72.8777, 19.0760]
  },
  "amenities": [
    "Rooftop Terrace",
    "Gym",
    "Parking",
    "Swimming Pool",
    "Security Guard"
  ],
  "images": [
    "https://example.com/images/property3.jpg",
    "https://example.com/images/property4.jpg"
  ]
}
'
```

---

## 2. List All Properties

**Endpoint:** `GET /api/property`

**Description:** Get a list of all properties. Optional query filters: `propertyType`, `minPrice`, `maxPrice`, `location`.

```bash
# List all properties
curl -X GET "http://localhost:5000/api/property"

# List filtered properties
curl -X GET "http://localhost:5000/api/property?propertyType=apartment&minPrice=50000&location=New York"
```

---

## 3. Get Property by ID

**Endpoint:** `GET /api/property/:id`

**Description:** Get a single property by its ID. Replace `{PROPERTY_ID}` with the actual `_id` of the property.

```bash
curl -X GET http://localhost:5000/api/property/{PROPERTY_ID}
```

---

## 4. Update Property

**Endpoint:** `PUT /api/property/:id`

**Description:** Update an existing property by its ID. Replace `{PROPERTY_ID}` with the property `_id`.

```bash
curl -X PUT http://localhost:5000/api/property/{PROPERTY_ID} \
-H "Content-Type: application/json" \
-d '{
  "price": 160000,
  "size": 1250
}'
```

---

## 5. Delete Property

**Endpoint:** `DELETE /api/property/:id`

**Description:** Delete a property by its ID. Replace `{PROPERTY_ID}` with the property `_id`.

```bash
curl -X DELETE http://localhost:5000/api/property/{PROPERTY_ID}
```

---

### Notes:

1. Make sure your Express server is running:

```bash
cd service
npm install
npm run dev
```

2. Replace `{PROPERTY_ID}` with the actual property ID returned in the create response.
3. You can combine query filters in **List All Properties** for more advanced search.
