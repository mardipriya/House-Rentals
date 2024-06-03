# Lease Management Application

## Overview

The Lease Management Application is a comprehensive solution designed to streamline and manage lease-related activities. This application allows users to apply for apartments, manage lease payments, and track transaction details. Built with a React frontend and Node.js backend, it provides a user-friendly interface and robust backend services.

## Features

- User authentication and authorization
- Apartment application management
- Apply Lease
- Different User Roles
- Find and Track Status of Application
- Users can view infomration about their lease
- Users can raise complaints
- Lease payment management
- Transaction tracking and history
- Secure payment processing
- User-friendly interface

## Technologies Used

- **Frontend:**
  - React
  - Material-UI

- **Backend:**
  - Node.js
  - Express
  - MongoDB

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB

### Installation

1. **Clone the repositories:**

    ```bash
    git clone https://github.com/Hrithik/house-rentals.git
    cd lease-management
    ```

2. **Install dependencies:**

    For the backend:

    ```bash
    npm install
    ```

    For the frontend:

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=3001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

    The backend server should now be running on `http://localhost:3001`.

2. **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start
    ```

    The frontend development server should now be running on `http://localhost:3000`.

## API Endpoints

### User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

### Payments

- `GET /api/payments/:userId` - Get all payments for a user
- `PUT /api/updatePayment/:id` - Update payment status and transaction ID

### Example

To update a payment:

```http
PUT /api/updatePayment/:id
Content-Type: application/json

{
  "status": "Paid",
  "transactionId": "TX1234"
}
```

## Folder Structure

Backend is available at https://github.com/srinivastherapati/LeaseManagement]

