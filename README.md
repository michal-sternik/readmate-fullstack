# ReadMate

**Built with React + NestJS + PostgreSQL (TypeScript)**

This is a fullstack application which allows user to browse throught Google Books API books, and then store them in private "bookshelves". It provides plesant UI with statistics and calendar screen to display the data in user friendly format.
<br><br> **Link**: **https://readmate.me**


## Features

- User registration and login with JWT-based authentication  
- Role-based access structure (secure endpoints)  
- CRUD operations for books
- Friendly UI with custom component designs - statistics, calendar and various book screens
- Data validation form validation in frontend and using DTOs in backend
- Normalised Database to avoid redundancy

## Authentication

User without token can only "browse" books.
Authentication is handled using JWT tokens. Users must log in to receive a token which is required to access protected routes (like creating or editing books). Passwords are securely hashed and validated.

## Hosting & SSL
The application is securely accessible via HTTPS thanks to a free SSL certificate issued by PositiveSSL.
It is hosted using a free domain and certificate management service provided by *Namecheap* as part of the [GitHub Student Developer Pack](https://education.github.com/pack).

## How to run locally with Docker


### 1. Clone the repository

```bash
git clone https://github.com/your-username/nestjs-blog-api.git
cd nestjs-blog-api
```

### 2. Create your `.env` file

Copy the example environment config:

```bash
cp .env.example .env
```

Then open `.env` and update the values if needed

### 3.Adjust docker-compose.yml file

Adjust docker compose file if needed - it is set to download docker images created by github actions.


### 4. Run the app

```bash
docker-compose up --build
```


