# PortalGate Backend

Backend API for PortalGate, a residential management platform built with Laravel 12.

The backend provides the REST API used by the web application and is responsible for authentication, authorization, business logic, data validation and database management.

## Technology Stack

* Laravel 12
* PHP
* MySQL
* Laravel Sanctum
* Laravel Reverb
* WebSockets
* Eloquent ORM
* REST API

## Main Features

The API includes functionality for:

* Authentication
* Users and residents
* Apartments
* Payments
* Maintenance records
* Payment types and reasons
* Reports
* Vehicles
* Community events
* Real-time chat

## Authentication

Authentication is implemented using Laravel Sanctum.

Authenticated requests use the user's access token to access protected API endpoints.

The backend also distinguishes between administrators and regular residents, allowing different resources and actions depending on the user's role.

For example, residents can access their own apartment and payment information without having access to the complete administration endpoints.

## API Structure

The API is organized around RESTful resources.

Main resources include:

```text
/auth
/users
/residents
/apartments
/payments
/payment-types
/payment-reasons
/reports
/cars
/events
/my-payments
```

The `/my-payments` endpoint was implemented specifically for authenticated residents so that they can retrieve payments associated with their own apartment instead of accessing the complete payment collection.

## Database

The application uses MySQL as its relational database.

Main entities include:

```text
users
people
apartments
apartment_people
roles
payments
payment_types
payment_reasons
maintenance
reports
cars
events
messages
```

Relationships are managed through Laravel Eloquent models and migrations.

The `apartment_people` relationship connects people with apartments and also stores information such as their role and resident status.

## Real-Time Chat

The community chat uses Laravel Reverb and WebSockets.

Messages are persisted in the database and broadcast to connected clients so administrators and residents can communicate in real time.

## Validation and Authorization

Request validation is handled through Laravel Form Requests and controller-level authorization rules.

The API also validates relationships and prevents users from accessing information that does not belong to them.

For example, resident payment queries are filtered using the authenticated user's associated apartment.

## Local Installation

Clone the repository:

```bash
git clone <repository-url>
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure the database connection in `.env`.

Run migrations:

```bash
php artisan migrate
```

If seeders are configured for the project, run:

```bash
php artisan db:seed
```

Start the Laravel development server:

```bash
php artisan serve
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

## Environment Variables

The main environment variables include:

```env
APP_NAME=PortalGate
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Do not commit the `.env` file or production credentials to the repository.

## Deployment

The backend is intended to be deployed as a Laravel application on Railway.

The deployment requires configuring the production environment variables, database connection and application key.

Railway supports deploying Laravel applications directly from a GitHub repository and can provide a public domain for the application.

Database migrations should be executed in the production environment before using the application.

## Development

Run the application locally with:

```bash
php artisan serve
```

For real-time functionality, Laravel Reverb must also be running according to the project's configured broadcasting setup.

## Status

The backend functionality for the current version of PortalGate has been implemented and tested locally.

The next step is production deployment and connecting the deployed API with the frontend.
