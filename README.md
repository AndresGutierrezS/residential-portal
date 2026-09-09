# PortalGate

PortalGate is a residential management platform designed to centralize the administration of residential communities and provide residents with a simple way to manage and consult information related to their unit.

The project was developed as a full-stack application using React and Laravel, with separate interfaces for administrators and residents.

## Overview

PortalGate allows residential administrators to manage the main operations of a community, while residents can access information related to their apartment, payments, events and communication with the administration.

The application was built with a focus on clear separation between frontend and backend, role-based access, reusable components and a practical user experience.

The user interfaces were designed in Figma and then implemented using React, Tailwind CSS and shadcn/ui.

## Main Features

### Administration

* Resident management
* Apartment and unit management
* Payment management
* Maintenance tracking
* Vehicle management
* Community events
* Reports
* Administrative dashboard
* Community chat
* Authentication and access control

### Residents

* Resident dashboard
* Apartment information
* Payment history
* Maintenance status
* Upcoming community events
* Communication with administration through chat

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* TanStack Query
* Axios
* Zustand
* Lucide React

### Backend

* Laravel 12
* PHP
* Laravel Sanctum
* MySQL
* REST API
* Laravel Reverb
* WebSockets

### Design

- Figma

### Development

* Git
* GitHub
* Postman
* Docker
* WSL / Ubuntu

## Project Structure

The project is organized into separate frontend and backend applications:

```text
PortalGate/
├── frontend/
│   └── React + TypeScript application
│
├── backend/
│   └── Laravel REST API
│
└── README.md
```

Each application has its own README with installation and deployment instructions.

## Architecture

The frontend communicates with the Laravel backend through a REST API.

Authentication is handled by Laravel Sanctum, while the frontend manages authentication state and API communication through dedicated stores, actions and hooks.

The backend is responsible for business logic, authorization, data validation and persistence.

Real-time communication is handled through Laravel Reverb and WebSockets for the community chat.

## Development Status

The main application functionality has been completed and tested locally.

The current version includes the administration module, resident experience, authentication, payments, reports, vehicles, events and real-time chat.

The next step is deploying the frontend and backend to production environments.

## Deployment

The planned deployment architecture is:

```text
React / Vite
      │
      ▼
GitHub Pages
      │
      │ REST API
      ▼
Laravel 12
      │
      ▼
Railway
      │
      ▼
MySQL
```

GitHub Pages is used for the static React frontend, while Laravel is deployed separately as the backend API.

## Purpose

PortalGate was developed as a full-stack software project to apply practical concepts such as REST APIs, authentication, relational databases, state management, real-time communication and frontend component architecture in a complete application.

## Author

Andres Gutiérrez
