# Personal Finance Tracker - Backend Server

A robust REST API server for tracking personal finances, built with Express.js, TypeScript, and PostgreSQL with Prisma ORM.

## Features

- **User Authentication**: Secure sign-up and login system with JWT authentication
- **Transaction Management**: Create, read, update, and delete financial transactions
- **Categories**: Organize transactions by categories
- **User Data Protection**: JWT-based authentication and middleware protection

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **API Handling**: RESTful architecture

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
   JWT_SECRET="your-secret-key"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   ```

4. Set up the database
   ```
   npx prisma migrate dev
   ```

5. Build the project
   ```
   npm run build
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm run build
npm run start
```

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user
  - Body: `{ name, email, password }`

- **POST /api/auth/login**: Log in an existing user
  - Body: `{ email, password }`

- **GET /api/auth/logout**: Log out the current user

### Transactions

All transaction endpoints require authentication (JWT token in cookie)

- **GET /api/transactions**: Get all transactions for the logged-in user
  - Optional query parameters for filtering and pagination

- **POST /api/transactions**: Create a new transaction
  - Body: `{ type, amount, category, note, date }`

- **GET /api/transactions/:id**: Get a specific transaction

- **PUT /api/transactions/:id**: Update a specific transaction
  - Body: `{ type, amount, category, note, date }`

- **DELETE /api/transactions/:id**: Delete a specific transaction

## Database Schema

### User
- `user_id` (Primary Key): Integer, Auto-increment
- `name`: String
- `email`: String, Unique
- `password`: String (hashed)
- `createdAt`: DateTime

### Transaction
- `t_id` (Primary Key): Integer, Auto-increment
- `user_id` (Foreign Key): Integer
- `type`: String (income, expense)
- `amount`: Float
- `category`: String
- `note`: String (optional)
- `date`: DateTime
- `createdAt`: DateTime

## License

ISC

---

*Built with ❤️ for better personal finance management*