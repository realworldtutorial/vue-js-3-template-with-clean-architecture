# Vue 3 Clean Architecture Template with Express Backend

This template provides a full-stack application structure following Clean Architecture principles, featuring a Vue.js 3 frontend and Express.js backend with JWT authentication.

## Project Structure

```
vue-clean-architecture/
├── src/                       # Frontend Application
│   ├── core/                  # Domain Layer (Business Logic)
│   │   ├── entities/         # Business entities (User, Auth)
│   │   ├── usecases/        # Application use cases (Login, Register, CRUD)
│   │   └── repositories/    # Repository interfaces (User, Auth)
│   ├── data/                 # Data Layer
│   │   ├── repositories/    # Repository implementations
│   │   ├── datasources/     # API client implementation
│   │   └── models/          # Data transfer objects
│   ├── presentation/         # Presentation Layer
│   │   ├── views/           # Pages (Home, Login, Register, Users)
│   │   ├── components/      # UI components (NavBar, UserCard)
│   │   ├── stores/          # Pinia stores (auth, user)
│   │   └── router/          # Vue Router with guards
│   └── main.js              # Application entry point
├── server/                   # Backend Application
│   ├── src/
│   │   ├── config/         # Server configuration
│   │   ├── controllers/    # Request handlers (auth, users)
│   │   ├── middleware/     # Auth, validation, errors
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # JWT, password hashing
│   │   └── server.js      # Server entry point
│   └── package.json
├── public/                  # Static assets
├── index.html
├── vite.config.js
└── package.json
```

## Setup Instructions

1. Run `setup-vue-project.bat` to create the project structure
2. Copy template files to the vue-clean-architecture folder
3. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```
4. Create `server/.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=http://localhost:5173
   ```
5. Start the application:
   ```bash
   # Terminal 1: Start backend
   cd server
   npm run dev

   # Terminal 2: Start frontend
   npm run dev
   ```

## Architecture Overview

### 1. Frontend Layers

#### Core (Domain Layer)
- **Entities**: 
  - `User.js`: User domain entity
  - `Auth.js`: Authentication entity
- **Use Cases**: 
  - Authentication: Login, Register, Logout
  - User Management: Create, Read, Update, Delete
- **Repository Interfaces**: Define data access contracts

#### Data Layer
- **Repository Implementations**: API integration
- **Data Sources**: REST API client with Axios
- **Models**: Data transfer objects with validation

#### Presentation Layer
- **Views**: Route-level components with business logic
- **Components**: Reusable UI elements
- **Stores**: State management with Pinia
- **Router**: Route guards and navigation

### 2. Backend Structure

#### API Layer
- **Controllers**: Handle HTTP requests
- **Routes**: Define API endpoints
- **Middleware**: Auth, validation, error handling

#### Core Features
- JWT authentication
- Password encryption
- Input validation
- Error handling
- CORS support

## Key Features

### Authentication
- 🔐 Secure JWT-based authentication
- 🔑 Password hashing with bcrypt
- 🚫 Protected routes with middleware
- 🔄 Token management and refresh

### User Management
- 📋 Complete CRUD operations
- ✅ Input validation on both ends
- 🔍 User search and filtering
- 🔒 Role-based access control

### Development Features
- 🏗️ Clean Architecture pattern
- 🎯 Dependency injection
- 🔄 State management with Pinia
- 📝 Comprehensive error handling

## Data Flow Example

1. User submits login form
2. View dispatches login action to auth store
3. Store calls LoginUserUseCase
4. UseCase calls AuthRepository interface
5. AuthRepositoryImpl makes API request
6. Server validates and returns JWT
7. Token stored and user redirected

## Available Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
cd server
npm run dev      # Start development server
npm start        # Start production server
```

## Template Files
All .template files contain boilerplate code that will be copied to the project structure during setup. This ensures a consistent and clean architecture implementation.
