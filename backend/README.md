# Library Management System - Backend API

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials

3. Set up the database:
   - Run `database/project.sql` to create schema
   - Run `database/sample_data.sql` for test data

4. Start the server:
```bash
npm start
```

## API Endpoints

### Books
- `GET /books` - Get all books
- `POST /books` - Add a new book

### Members
- `GET /members` - Get all members
- `POST /register` - Register a new member

### Loans
- `GET /loans` - Get all loans
- `GET /loan-summary` - Get detailed loan summary
- `POST /issue` - Issue a book to member
- `POST /return` - Return a book

### Reservations
- `GET /reservations` - Get all reservations
- `POST /reservations` - Create a reservation

### Fines
- `GET /fines` - Get all fines
- `PUT /fines/:fine_id/pay` - Mark fine as paid
