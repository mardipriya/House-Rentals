# 🏠 House Rentals - Modern Rental Platform

A comprehensive, modern house rental application built with React and Material-UI, featuring advanced search, user authentication, and a modular architecture.

## ✨ Features

### 🎯 Core Features
- **Advanced Property Search** - Multi-criteria search with filters for bedrooms, price range, amenities, and location
- **User Authentication** - Secure login/logout with session management
- **Property Listings** - Beautiful property cards with detailed information
- **Responsive Design** - Mobile-first design that works on all devices
- **Real-time Notifications** - In-app notification system for updates and alerts

### 🏗️ Architecture Improvements
- **Modular Structure** - Organized codebase with clear separation of concerns
- **Custom Hooks** - Reusable logic for authentication, apartments, and notifications
- **Service Layer** - Centralized API calls with error handling
- **Error Boundaries** - Graceful error handling throughout the application
- **Context API** - Global state management for auth and notifications

### 🎨 UI/UX Enhancements
- **Material-UI Theme** - Consistent design system with custom theming
- **Loading States** - Smooth loading indicators and skeleton screens
- **Animations** - Fade-in effects and smooth transitions
- **Modern Cards** - Enhanced property cards with hover effects
- **Search Bar** - Advanced search with autocomplete and filters

### 🔧 Technical Features
- **Protected Routes** - Route protection based on authentication status
- **Form Validation** - Comprehensive form validation and error handling
- **API Integration** - RESTful API integration with axios
- **Performance Optimization** - React.memo, useMemo, and useCallback usage
- **Code Quality** - ESLint and Prettier for code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd house-rentals
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── ApartmentCard.js
│   │   ├── ErrorBoundary.js
│   │   ├── LoadingSpinner.js
│   │   ├── NotificationSystem.js
│   │   └── SearchBar.js
│   ├── Header.js
│   ├── Footer.js
│   ├── MainPage.js
│   ├── HomePage.js
│   └── ...               # Other page components
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   ├── useApartments.js
│   └── useNotifications.js
├── services/             # API services
│   ├── apartmentService.js
│   └── complaintService.js
├── utils/                # Utility functions
│   └── formatters.js
├── constants.js
└── App.js
```

## 🎯 Key Components

### Custom Hooks

#### `useAuth`
Manages authentication state and provides login/logout functionality.

```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

#### `useApartments`
Handles apartment data fetching, filtering, and state management.

```javascript
const { apartments, loading, error, updateFilters } = useApartments();
```

#### `useNotifications`
Manages in-app notifications with different types and auto-dismissal.

```javascript
const { addNotification, notifications, unreadCount } = useNotifications();
```

### Service Layer

#### `apartmentService`
Centralized API calls for apartment-related operations.

```javascript
import { apartmentService } from '../services/apartmentService';

// Get all available apartments
const apartments = await apartmentService.getAvailableApartments();

// Get apartment by ID
const apartment = await apartmentService.getApartmentById(id);
```

### Common Components

#### `ApartmentCard`
Reusable property card component with modern design.

```javascript
<ApartmentCard
  apartment={apartment}
  onClick={() => handleClick(apartment.id)}
  onApplyNow={() => handleApply(apartment)}
/>
```

#### `SearchBar`
Advanced search component with filters and autocomplete.

```javascript
<SearchBar
  onSearch={handleSearch}
  onFiltersChange={handleFiltersChange}
  placeholder="Search apartments..."
/>
```

## 🎨 Theming

The application uses Material-UI theming with custom colors and component overrides:

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
  },
});
```

## 🔐 Authentication

The app implements a complete authentication system:

- **Login/Logout** - Secure authentication with session management
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Session Persistence** - User sessions persist across browser sessions
- **Route Guards** - Public and protected route components

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-First** - Designed for mobile devices first
- **Breakpoint System** - Uses Material-UI's responsive breakpoints
- **Touch-Friendly** - Optimized for touch interactions
- **Progressive Enhancement** - Enhanced features on larger screens

## 🚀 Performance Optimizations

- **React.memo** - Prevents unnecessary re-renders
- **useMemo/useCallback** - Optimizes expensive calculations and callbacks
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Optimized images with fallbacks
- **Debounced Search** - Prevents excessive API calls

## 🧪 Testing

The application includes:

- **Unit Tests** - Component and utility function tests
- **Integration Tests** - API integration tests
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 📦 Dependencies

### Core Dependencies
- **React 18** - Latest React with hooks and concurrent features
- **Material-UI 5** - Modern UI component library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls

### Development Dependencies
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Testing Library** - React testing utilities

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

### API Configuration
The application expects a RESTful API with the following endpoints:

- `GET /api/apartments/available` - Get available apartments
- `GET /api/apartments/:id` - Get apartment details
- `POST /api/login` - User authentication
- `POST /api/register` - User registration

SCREENSHOTS

<img width="420" height="688" alt="image" src="https://github.com/user-attachments/assets/182edbf3-e79d-4159-86ac-ae0bb4d38974" />
<img width="433" height="621" alt="image" src="https://github.com/user-attachments/assets/6fa542e5-7663-405b-b352-916cabbc9898" />
<img width="598" height="684" alt="image" src="https://github.com/user-attachments/assets/b33b8b36-34d9-4344-b1a3-d23d8f97103b" />



