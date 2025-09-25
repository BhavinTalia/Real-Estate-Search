# Real Estate Search Service

A backend-only project providing a searchable, geo-aware service for property listings. Includes analytics, alerts, and recommendations. Designed for scalability using Node.js, Express, MongoDB and Elasticsearch.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Testing](#testing)
- [Development](#development)
- [Project Planner](#project-planner)
- [License](#license)

---

## Features
- CRUD endpoints for properties and users
- JWT-based authentication
- Geo-search and distance filters
- Aggregations and analytics APIs
- Notifications & alerts
- Dockerized for local development
- CI/CD with GitHub Actions
- Full test coverage with Jest & Supertest

---

## Tech Stack
- **Node.js** + **Express.js** (REST API)
- **MongoDB** (primary datastore)
- **Elasticsearch** (search & aggregations)
- **Docker** / **Docker Compose** (local dev & Elasticsearch)
- **Jest + Supertest** (testing)
- **Winston / Pino** (logging)
- **Swagger / OpenAPI** (API docs)
- **Redis** (optional caching & rate limiting)

---

## Project Structure

```text
project-root/
├─ service/ (express app)
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ models/        # Mongoose models
│  │  ├─ services/      # ES & DB indexing services
│  │  ├─ repositories/  # MongoDB access
│  │  ├─ jobs/          # background indexers / workers
│  │  ├─ utils/
│  │  └─ app.js
│  ├─ tests/
│  └─ package.json
├─ infra/
│  ├─ docker-compose.yml
│  ├─ elastic/ (ES config)
│  └─ k8s/ (optional)
├─ scripts/ (db seeders, migrations)
├─ docs/ (api & design)
└─ README.md
