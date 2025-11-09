# Vue 3 Clean Architecture - Setup Instructions

## Quick Start

Run these commands in order:

1. **Create project structure and install dependencies:**
   ```bash
   setup-vue-project.bat
   ```

2. **Copy all source files:**
   ```bash
   create-files.bat
   ```

3. **Navigate to project and start development:**
   ```bash
   cd vue-clean-architecture
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## What You Get

A fully functional Vue 3 application with:
- ✅ Clean Architecture (Domain, Data, Presentation layers)
- ✅ Pinia store for state management
- ✅ Vue Router with multiple pages
- ✅ Example User management feature
- ✅ API integration (using JSONPlaceholder)
- ✅ Responsive UI components

## Project Architecture

### Core Layer (Domain)
- `entities/` - Business entities (User.js)
- `usecases/` - Use cases (GetUsersUseCase, CreateUserUseCase)
- `repositories/` - Repository interfaces (UserRepository)

### Data Layer
- `models/` - DTOs (UserModel)
- `datasources/` - API clients (ApiDataSource)
- `repositories/` - Repository implementations (UserRepositoryImpl)

### Presentation Layer
- `views/` - Page components (HomeView, UsersView)
- `components/` - Reusable components (UserCard)
- `stores/` - Pinia stores (userStore)
- `router/` - Vue Router config

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Demo

The Users page demonstrates:
- Fetching data from API via use cases
- Adding new users
- State management with Pinia
- Component composition
- Error handling
- Loading states

Enjoy coding with Clean Architecture! 🎉
