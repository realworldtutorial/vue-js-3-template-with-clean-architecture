# Vue Clean Architecture - Express.js API Server

This is the backend API server for the Vue Clean Architecture project, built with Express.js.

## Features

- User Registration and Login
- JWT Authentication
- User Management APIs
- CORS enabled for Vue frontend
- Input validation
- Error handling middleware

## Installation

```bash
npm install
```

## Configuration

Edit the `.env` file to configure:
- Server port
- JWT secret key
- CORS origin

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```
