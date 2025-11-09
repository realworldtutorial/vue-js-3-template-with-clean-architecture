# Vue Clean Architecture with Express.js API

A full-stack application demonstrating Clean Architecture principles with Vue.js 3 frontend and Express.js backend API, featuring JWT authentication and comprehensive user management.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles, separating concerns into distinct layers:

### Frontend (Vue.js)
- **Core Layer**: Business logic and domain entities
  - `entities/`: Domain models (User, Auth)
  - `repositories/`: Repository interfaces
  - `usecases/`: Business logic use cases (Login, Register, CRUD operations)

- **Data Layer**: Data management and external communication
  - `datasources/`: API communication (ApiDataSource)
  - `models/`: Data transfer objects (UserModel, AuthModel)
  - `repositories/`: Repository implementations (AuthRepositoryImpl, UserRepositoryImpl)

- **Presentation Layer**: UI and user interaction
  - `views/`: Page components (Home, Login, Register, Users)
  - `components/`: Reusable UI components (NavBar, UserCard)
  - `stores/`: Pinia state management (auth, user stores)
  - `router/`: Vue Router configuration

### Backend (Express.js)
- `config/`: Application configuration
- `models/`: Data models with in-memory database
- `controllers/`: Request handlers (auth, user controllers)
- `routes/`: API route definitions (auth, user routes)
- `middleware/`: Authentication, validation, error handling
- `utils/`: Helper functions (JWT, password hashing)

## ✨ Features

- 🔐 **JWT Authentication**: Secure user registration and login system
- 👥 **User Management**: Complete CRUD operations with validation
- 📦 **State Management**: Pinia stores for auth and user states
- 🛣️ **Routing**: Protected routes with navigation guards
- 🎨 **Modern UI**: Responsive components with Vue 3
- ✅ **Input Validation**: Both client and server-side validation
- 🔒 **Security**: Bcrypt password hashing and JWT token management
- 📝 **Error Handling**: Comprehensive error handling middleware
- 🔄 **Clean Architecture**: Strict separation of concerns

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

You need to run both the backend server and frontend application:

1. **Start the Backend Server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the Frontend Application** (Terminal 2)
   ```bash
   npm run dev
   ```
   The Vue app will start on `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (requires authentication)
  - Header: `Authorization: Bearer <token>`

- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user (with optional password)
- `PUT /api/users/:id` - Update user (requires authentication)
- `DELETE /api/users/:id` - Delete user (requires authentication)

## 🔒 Authentication Flow

1. **Registration**: User submits registration form → Backend validates and creates user → Returns JWT token → Frontend stores token in localStorage
2. **Login**: User submits login credentials → Backend verifies credentials → Returns JWT token → Frontend stores token
3. **Authenticated Requests**: Frontend includes token in Authorization header → Backend validates token → Processes request
4. **Logout**: Frontend removes token from localStorage

## 📁 Project Structure

```
vue-clean-architecture/
├── src/
│   ├── core/                    # Business logic layer
│   │   ├── entities/            # Domain models
│   │   ├── repositories/        # Repository interfaces
│   │   └── usecases/            # Business use cases
│   ├── data/                    # Data layer
│   │   ├── datasources/         # API communication
│   │   ├── models/              # Data models
│   │   └── repositories/        # Repository implementations
│   ├── presentation/            # Presentation layer
│   │   ├── components/          # Vue components
│   │   ├── views/               # Page views
│   │   ├── stores/              # Pinia stores
│   │   └── router/              # Vue Router
│   ├── assets/                  # Static assets
│   ├── App.vue                  # Root component
│   └── main.js                  # App entry point
├── server/                      # Express.js backend
│   ├── src/
│   │   ├── config/              # Configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── middleware/          # Middleware functions
│   │   ├── models/              # Data models
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Utility functions
│   │   └── server.js            # Server entry point
│   ├── .env                     # Environment variables
│   └── package.json             # Server dependencies
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🔧 Configuration

### Backend Configuration

Edit `server/.env` to configure:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:5173
```

**Important**: Change `JWT_SECRET` to a random secure string in production!

## 🎯 Key Implementation Details

### Authentication Flow
1. **Registration**:
   - Client-side validation
   - Server validates input
   - Password hashing with bcrypt
   - JWT token generation
   - User creation in database

2. **Login**:
   - Email/password validation
   - Credential verification
   - JWT token generation
   - Client-side token storage

3. **Protected Routes**:
   - JWT verification middleware
   - Role-based access control
   - Token expiration handling

### User Management
- **CRUD Operations**:
  - Create: With validation and optional password
  - Read: List all users and get by ID
  - Update: Partial updates with validation
  - Delete: With proper authorization

### Error Handling
- Comprehensive error middleware
- Structured error responses
- Client-side error presentation
- Validation error handling

## 📝 Code Comments

Every file in this project includes detailed comments explaining:
- Purpose of the file
- Function descriptions and parameters
- Business logic reasoning
- Important implementation details

## 🛠️ Technologies Used

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Pinia**: State management
- **Vue Router**: Official router for Vue.js
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server

### Backend
- **Express.js**: Web application framework
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt.js**: Password hashing
- **Express Validator**: Input validation
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variable management

## 📖 Learning Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Commands

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `cd server && npm run dev` - Start backend development server
- `cd server && npm start` - Start backend production server

## 🤝 Contributing

This is a demonstration project for learning Clean Architecture. Feel free to fork and experiment!

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author

Created as an educational example of Clean Architecture implementation with Vue.js and Express.js.

