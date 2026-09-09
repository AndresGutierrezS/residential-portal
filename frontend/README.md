# PortalGate Frontend

Frontend application for PortalGate, a residential management platform built with React and TypeScript.

The application provides separate experiences for administrators and residents and communicates with the PortalGate Laravel API through HTTP requests.

## Technology Stack

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

## Design

The application's interfaces were designed in Figma and implemented using reusable React components with Tailwind CSS and shadcn/ui.

## Main Features

### Administration

* Dashboard
* Resident management
* Apartment management
* Payment management
* Reports
* Vehicle management
* Event management
* Community chat

### Residents

* Resident dashboard
* Apartment information
* Payment history
* Maintenance information
* Upcoming events
* Community chat

## Frontend Architecture

The project uses a feature-oriented structure to keep API logic, state management and UI components separated.

A simplified structure is:

```text
src/
├── admin/
│   ├── apartments/
│   ├── payments/
│   ├── reports/
│   ├── residents/
│   ├── vehicles/
│   └── events/
│
├── auth/
│
├── chat/
│
├── resident/
│   ├── components/
│   └── pages/
│
├── components/
│
├── api/
│
└── router/
```

API requests are handled through dedicated actions and hooks, while reusable UI elements are kept separate from business logic.

## State Management

Zustand is used for authentication-related client state.

TanStack Query is used for server state, including:

* API requests
* Loading states
* Error states
* Cache management
* Query invalidation after mutations

## API Communication

Axios is configured through a centralized API client.

The frontend communicates with the Laravel backend using REST endpoints.

The backend URL is configured through environment variables.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production, this value must point to the deployed Laravel API.

## Local Installation

Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the environment:

```bash
cp .env.example .env
```

Set the backend API URL:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Start the development server:

```bash
npm run dev
```

## Production Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The frontend is a Vite application and can be deployed as a static site.

The planned production environment is GitHub Pages using GitHub Actions.

Vite officially supports deploying Vite applications to GitHub Pages through a GitHub Actions workflow.

The production API URL must be configured through the GitHub Actions environment or repository configuration.

## Environment Variables

Example:

```env
VITE_API_URL=https://your-api-domain.com/api
```

Never commit environment files containing private credentials.

## Status

The frontend functionality for the current version of PortalGate has been completed and tested locally.

The remaining step is deploying the application and connecting it to the production Laravel API.
