# Vue 3 Clean Architecture Project

This project follows Clean Architecture principles with clear separation of concerns.

## Project Structure

```
vue-clean-architecture/
├── src/
│   ├── core/                    # Domain Layer (Business Logic)
│   │   ├── entities/           # Business entities
│   │   ├── usecases/          # Application use cases
│   │   └── repositories/      # Repository interfaces
│   ├── data/                   # Data Layer
│   │   ├── repositories/      # Repository implementations
│   │   ├── datasources/       # API clients, local storage
│   │   └── models/            # Data models/DTOs
│   ├── presentation/           # Presentation Layer
│   │   ├── views/             # Page components
│   │   ├── components/        # Reusable UI components
│   │   ├── stores/            # Pinia stores
│   │   └── router/            # Vue Router configuration
│   └── main.js                # Application entry point
├── public/                     # Static assets
├── index.html
├── vite.config.js
└── package.json
```

## Setup Instructions

1. Run `setup-vue-project.bat` to create the project structure and install dependencies
2. Copy all template files to the vue-clean-architecture folder
3. Run `npm run dev` to start development server

## Clean Architecture Layers

### 1. Core (Domain Layer)
- **Entities**: Pure business objects with no framework dependencies
- **Use Cases**: Application-specific business rules
- **Repository Interfaces**: Contracts for data access

### 2. Data Layer
- **Repository Implementations**: Concrete implementations of repository interfaces
- **Data Sources**: API clients, LocalStorage adapters, etc.
- **Models**: DTOs for external data transformation

### 3. Presentation Layer
- **Views**: Page-level components
- **Components**: Reusable UI components
- **Stores**: Pinia stores that use use cases
- **Router**: Vue Router configuration

## Dependency Rule

Dependencies point inward:
- Presentation → Core
- Data → Core
- Core has NO dependencies on outer layers

## Example Flow

1. User interacts with View
2. View dispatches action to Store
3. Store calls Use Case
4. Use Case uses Repository Interface
5. Repository Implementation (Data Layer) fetches data
6. Data flows back through layers

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
