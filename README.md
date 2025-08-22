# Angular Webapp - DSP Project

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Project Overview

A complete Angular web application featuring:
- ✅ User authentication (login/register)
- ✅ Protected routes with AuthGuard
- ✅ User profile management with editing capabilities
- ✅ Account deletion functionality
- ✅ Dark/Light theme toggle
- ✅ Toast notifications system
- ✅ Responsive design
- ✅ Modern Angular architecture with standalone components

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Development Servers

1. Start the backend server:
```bash
cd backend
npm start
```
Backend runs on `http://localhost:3000`

2. Start the Angular development server:
```bash
ng serve
```
Frontend runs on `http://localhost:4200`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Project Architecture

```
src/app/
├── components/          # Reusable UI components
│   ├── header/         # Navigation header
│   ├── footer/         # Site footer
│   ├── toast/          # Notification system
│   └── theme-toggle/   # Dark/Light mode toggle
├── pages/              # Application pages/views
│   ├── home/           # Landing page
│   ├── login/          # Authentication
│   ├── register/       # User registration
│   ├── profile/        # User profile management
│   ├── about/          # About page
│   └── contact/        # Contact page
├── services/           # Business logic services
│   ├── auth.service    # Authentication & user management
│   ├── theme.service   # Theme management
│   └── toast.service   # Notification service
├── guards/             # Route protection
├── interceptors/       # HTTP interceptors
├── interfaces/         # TypeScript interfaces
├── models/             # Data models
├── utils/              # Utility functions
└── constants/          # Application constants
```

## Features

### Authentication System
- User registration with validation
- Secure login with JWT tokens
- Protected routes using AuthGuard
- Automatic token injection via HTTP interceptor

### User Management
- Profile viewing and editing
- Password change functionality
- Account deletion with confirmation
- Persistent user sessions

### UI/UX Features
- Responsive design for all devices
- Dark/Light theme toggle with persistence
- Toast notifications for user feedback
- Modern Angular standalone components

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/account` - Delete user account

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Testing

To execute unit tests:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
