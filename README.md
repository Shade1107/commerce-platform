# Commerce Platform

A commerce platform for small retail businesses. It has a customer storefront and an admin dashboard.

> **Status: MVP in development**
>
> The React frontend is a working prototype. It uses mock data.
> The ASP.NET Core backend is not started.
> This project is not ready for production.

## Overview

Commerce Platform explores the core workflows of a small online shop.

- **Customer storefront:** Customers browse products, view details, fill a cart, and place an order. Guest checkout is used. No account is needed.
- **Admin dashboard:** Staff manage products, categories, inventory, orders, and customers.

## Current state

The frontend runs on mock data. No backend is connected yet.

**Storefront**
- Home page with featured products and categories
- Product list with search, category filter, and sorting
- Product details with variants
- Cart with quantity updates and item removal (saved in the browser)
- Guest checkout with phone number and delivery address
- Order confirmation page

**Admin dashboard (`/admin`)**
- Dashboard with sales and order statistics
- Product, category, inventory, order, and customer pages

Admin changes are kept in memory. They reset when the page reloads.

The admin area has no login. This is intentional. Authentication and authorization will come with the ASP.NET Core API.

## Technology stack

| Layer | Technology | Status |
|---|---|---|
| Frontend | React, TypeScript, Vite | Current |
| Styling | Tailwind CSS | Current |
| Routing | React Router | Current |
| Backend | C# / ASP.NET Core Web API | Planned |
| Database | PostgreSQL | Planned |
| ORM | Entity Framework Core | Planned |
| Version control | Git / GitHub | Current |

## Project structure

```text
commerce-platform/
├── backend/
│   └── Commerce.Api/
├── frontend/
│   └── src/
│       ├── components/   Reusable UI parts
│       ├── context/      Cart state
│       ├── data/         Mock data
│       ├── layouts/      Storefront and admin layouts
│       ├── lib/          Helpers and formatters
│       ├── pages/        Storefront and admin pages
│       └── types/        Shared TypeScript types
├── docs/
├── .gitignore
└── README.md
```

- `backend/` holds the ASP.NET Core API. Work has not started.
- `frontend/` holds the React application.
- `docs/` holds requirements and technical notes.

## Design decisions

- **Guest checkout.** The MVP needs no customer accounts.
- **Mock data behind a clear seam.** Pages read data from `src/data/`. To connect the API, replace these imports with API calls.
- **Separate layouts.** The storefront and the admin dashboard have their own layouts.
- **Few dependencies.** The frontend uses React, React Router, and Tailwind CSS only.

## Getting started (frontend)

You need Node.js 20 or later.

```bash
cd frontend
npm install
npm run dev
```

Open the URL that Vite prints in the terminal. The storefront is at `/`. The admin demo is at `/admin`.

To create a production build:

```bash
npm run build
```

## Roadmap

- [x] Repository and project structure
- [x] Frontend prototype: storefront and admin dashboard (mock data)
- [ ] Database design and entity modeling
- [ ] Core API with ASP.NET Core and Entity Framework Core
- [ ] Connect the frontend to the API
- [ ] Authentication and authorization
- [ ] Testing
- [ ] Deployment and documentation

## Development goals

- Apply object-oriented principles in C#.
- Build RESTful APIs with ASP.NET Core.
- Model relationships and run migrations with Entity Framework Core.
- Keep a maintainable React and TypeScript frontend.
- Document technical decisions as the project grows.

## Project Purpose

This project is developed as a public GitHub portfolio project to showcase my development work while sharpening my C# and ASP.NET Core skills through practical full-stack development.

It also serves as an opportunity to explore React, TypeScript, database design, RESTful API development, and real-world retail workflows.

## Contributions

This is an independent portfolio project. The code and documentation may change as the MVP grows.