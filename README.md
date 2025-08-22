# Angular Countries Explorer

A modern web application built with Angular 18 and Node.js, featuring comprehensive user management, dynamic theming, and country exploration capabilities.

## Project Overview

This application demonstrates advanced Angular concepts including user context management, authentication, and dynamic UI theming. Built as part of a Digital School of Paris development project, it showcases industry-standard practices and modern web development patterns.

### Key Features

- Complete user authentication system with JWT tokens
- Dynamic user context management across the application
- Real-time theme switching with localStorage persistence
- Comprehensive user profile management
- Responsive design with modern UI components
- Toast notification system with theme-aware styling
- Country exploration with API integration
- Secure route protection and authorization

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository and install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Database Setup

The application uses PostgreSQL with Sequelize ORM. You need to:

1. Install PostgreSQL on your system
2. Create a database named `users_db`
3. Ensure PostgreSQL is running with default credentials:
   - Username: `postgres`
   - Password: `postgres`
   - Port: `5432`
   - Host: `localhost`

The database tables will be automatically created when you start the backend server.

### Development Servers

1. Start the backend API server:
```bash
cd backend/src
node server.js
```
Backend runs on `http://localhost:3000`

2. Start the Angular development server:
```bash
ng serve
```
Frontend runs on `http://localhost:4200`

## Project Architecture

```
src/app/
├── components/          # Reusable UI components
│   ├── header/         # Dynamic navigation with user context
│   ├── footer/         # Site footer with social links
│   ├── toast/          # Theme-aware notification system
│   ├── theme-toggle/   # Dark/Light mode toggle component
│   ├── main-content/   # Landing page content
│   └── countries-list/ # Country exploration component
├── pages/              # Application pages/views
│   ├── home/           # Landing page with country explorer
│   ├── login/          # User authentication
│   ├── register/       # User registration with validation
│   ├── profile/        # User profile management
│   ├── about/          # About page
│   └── contact/        # Contact page
├── services/           # Business logic services
│   ├── auth.service    # Authentication & user management
│   ├── user-context.service # User context management
│   ├── theme.service   # Theme management with persistence
│   └── toast.service   # Notification service
├── guards/             # Route protection
├── interfaces/         # TypeScript interfaces
└── constants/          # Application constants
```

## Core Features

### User Context Management
- **UserContextService**: Centralized user state management using RxJS BehaviorSubject
- Real-time user information sharing across all components
- Automatic context initialization on application startup
- Observable-based reactive updates throughout the application

### Authentication & Security
- JWT-based authentication with secure token storage
- User registration with comprehensive validation
- Protected routes using Angular Guards
- Automatic session persistence with localStorage
- Secure logout with complete session cleanup
- Email uniqueness validation at backend level

### Dynamic Theme System
- **ThemeService**: Complete dark/light mode implementation
- Real-time theme switching with CSS custom properties
- Persistent theme preferences using localStorage
- System preference detection and automatic application
- Theme-aware component styling across the entire application

### User Profile Management
- Comprehensive profile editing capabilities
- Secure password change functionality
- Email field protection for security compliance
- Account deletion with confirmation workflow
- Real-time profile updates reflected in navigation

### UI/UX Excellence
- Responsive design optimized for all device sizes
- Toast notification system with theme-aware styling
- Dynamic navigation bar with user context integration
- Modern Angular standalone component architecture
- Smooth animations and transitions throughout the interface

### Country Explorer
- Integration with REST Countries API
- Local data fallback for offline functionality
- Advanced filtering and search capabilities
- Responsive country card layouts

## Technical Implementation

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration with validation
- `POST /api/auth/login` - User authentication

#### User Management  
- `PUT /api/users/profile` - Update user profile information
- `DELETE /api/users/account` - Delete user account

### Database Configuration

The backend connects to PostgreSQL using these default settings:
- Database URL: `postgres://postgres:postgres@localhost:5432/users_db`
- No environment variables required for development
- Database connection configured in `backend/src/config/db.config.js`

### Technology Stack

#### Frontend
- Angular 18 with standalone components
- TypeScript for type safety
- RxJS for reactive programming
- CSS custom properties for theming
- Angular Router for navigation
- Angular Forms for validation

#### Backend
- Node.js with Express framework
- PostgreSQL database with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Development Workflow

### Building for Production

To build the project for production:

```bash
ng build --configuration production
```

This will compile and optimize your project, storing the build artifacts in the `dist/` directory.

### Testing

To execute unit tests:

```bash
ng test
```

To run end-to-end tests:

```bash
ng e2e
```

### Code Quality

To lint the codebase:

```bash
ng lint
```

## Project Highlights

This application demonstrates several advanced Angular concepts and best practices:

1. **Service-Based Architecture**: Centralized business logic in dedicated services
2. **Reactive Programming**: Extensive use of RxJS observables for state management
3. **Component Communication**: Efficient data flow using services and observables
4. **Modern Angular Patterns**: Standalone components and dependency injection
5. **Security Best Practices**: JWT authentication and route protection
6. **User Experience**: Theme persistence and responsive design
7. **Code Organization**: Clean separation of concerns and modular structure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Digital School of Paris curriculum and is intended for educational purposes.