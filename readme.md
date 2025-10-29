# 📚 Library Management System

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MySQL](https://img.shields.io/badge/mysql-%3E%3D8.0-orange)
![React](https://img.shields.io/badge/react-19.1.1-blue)

A comprehensive, full-stack library management system built with modern web technologies for efficient library operations management.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Database Schema](#-database-schema)

</div>

---

## 📋 Overview

The **Library Management System** is a professional-grade application designed to streamline library operations including book cataloging, member management, loan tracking, reservation handling, and fine management. Built with a robust three-tier architecture, it provides a seamless user experience with real-time data synchronization and automated business logic.

### Purpose

This system addresses the fundamental challenges faced by libraries in managing their operations:

- **Efficient Cataloging**: Organize and track thousands of books with detailed metadata
- **Member Management**: Maintain comprehensive member records with contact information
- **Loan Automation**: Automate the book issue and return process with due date tracking
- **Reservation System**: Allow members to reserve books that are currently unavailable
- **Fine Management**: Automatically calculate and track fines for overdue books
- **Data Integrity**: Enforce business rules through database triggers and constraints

---

## ✨ Features

### 📖 Book Management
- Add new books with complete metadata (title, author, publisher, ISBN, year)
- Track total and available copies in real-time
- Automatic inventory updates upon issue/return
- Search and filter capabilities

### 👥 Member Management
- Register new members with contact details
- Track membership dates
- View member loan history
- Email validation and unique constraints

### 🔄 Loan Operations
- Issue books to members with customizable due dates
- Return books with automatic fine calculation
- Track active and completed loans
- Comprehensive loan summary view with member and book details

### 📌 Reservation System
- Create reservations for unavailable books
- Automatic status updates (Active/Completed/Cancelled)
- Priority handling for reserved books upon return

### 💰 Fine Management
- Automatic fine generation for late returns (₹5 per day)
- Track paid/unpaid status
- One-click fine payment processing
- Fine calculation via database triggers

### 🎯 Business Logic Automation
- **Triggers**: Automatically update book availability on issue/return
- **Stored Procedures**: Encapsulate complex business operations
- **Views**: Simplified loan summary with joined data
- **Constraints**: Ensure data integrity (valid dates, copy counts)

---

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Fast, minimalist web framework
- **MySQL2** - MySQL client with Promise support
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Database
- **MySQL 8.0+** - Relational database management system
- **Triggers** - Automated business logic
- **Stored Procedures** - Encapsulated operations
- **Views** - Simplified data access
- **Constraints** - Data integrity enforcement

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/PrabhjotSinghUbhi/library-management-system.git
cd library-management-system
```

### Step 2: Database Setup

1. **Create the database and schema:**

```bash
mysql -u root -p < database/project.sql
```

2. **Load sample data (optional):**

```bash
mysql -u root -p < database/sample_data.sql
```

3. **Verify installation:**

```bash
mysql -u root -p -e "USE library_management; SHOW TABLES;"
```

### Step 3: Backend Setup

1. **Navigate to backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=library_management
PORT=5000
```

4. **Start the backend server:**

```bash
npm start
```

The server will start at `http://localhost:5000`

### Step 4: Frontend Setup

1. **Navigate to client directory:**

```bash
cd ../client
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## 🚀 Usage

### Running the Full Application

1. **Start MySQL service:**
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. **Start backend server** (from backend directory):
   ```bash
   npm start
   ```

3. **Start frontend client** (from client directory):
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Basic Workflow

1. **Register Members**: Add library members through the Members tab
2. **Add Books**: Catalog books in the Books tab
3. **Issue Books**: Use the Issue tab to lend books to members
4. **Return Books**: Process returns through the Return tab
5. **Manage Reservations**: Create and track book reservations
6. **Handle Fines**: View and process fine payments in the Fines tab

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Books

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/books` | Get all books | - |
| POST | `/books` | Add new book | `{ title, author, publisher, year_published, isbn, total_copies }` |

#### Members

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/members` | Get all members | - |
| POST | `/register` | Register member | `{ name, email, phone, address }` |

#### Loans

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/loans` | Get all loans | - |
| GET | `/loan-summary` | Get loan details with member/book info | - |
| POST | `/issue` | Issue book to member | `{ member_id, book_id, due_days }` |
| POST | `/return` | Return book | `{ loan_id }` |

#### Reservations

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/reservations` | Get all reservations | - |
| POST | `/reservations` | Create reservation | `{ member_id, book_id }` |

#### Fines

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/fines` | Get all fines | - |
| PUT | `/fines/:fine_id/pay` | Mark fine as paid | - |

### Example Requests

#### Issue a Book
```bash
curl -X POST http://localhost:5000/issue \
  -H "Content-Type: application/json" \
  -d '{
    "member_id": 1,
    "book_id": 2,
    "due_days": 14
  }'
```

#### Add a Book
```bash
curl -X POST http://localhost:5000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "publisher": "Prentice Hall",
    "year_published": 2008,
    "isbn": "9780132350884",
    "total_copies": 3
  }'
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
Members (1) ──┬──< (N) Loans (N) >──┬── (1) Books
              │                      │
              └──< (N) Reservations (N) >──┘
                   
Loans (1) ──< (1) Fines
```

### Tables

#### `members`
| Column | Type | Constraints |
|--------|------|-------------|
| member_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| phone | VARCHAR(15) | |
| address | VARCHAR(255) | |
| membership_date | DATE | DEFAULT CURRENT_DATE |

#### `books`
| Column | Type | Constraints |
|--------|------|-------------|
| book_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| title | VARCHAR(150) | NOT NULL |
| author | VARCHAR(100) | |
| publisher | VARCHAR(100) | |
| year_published | YEAR | |
| isbn | VARCHAR(20) | UNIQUE |
| total_copies | INT | DEFAULT 1 |
| available_copies | INT | DEFAULT 1, CHECK >= 0 |

#### `loans`
| Column | Type | Constraints |
|--------|------|-------------|
| loan_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| member_id | INT | FOREIGN KEY → members |
| book_id | INT | FOREIGN KEY → books |
| issue_date | DATE | DEFAULT CURRENT_DATE |
| due_date | DATE | CHECK > issue_date |
| return_date | DATE | |

#### `reservations`
| Column | Type | Constraints |
|--------|------|-------------|
| reservation_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| member_id | INT | FOREIGN KEY → members |
| book_id | INT | FOREIGN KEY → books |
| reservation_date | DATE | DEFAULT CURRENT_DATE |
| status | ENUM | 'Active', 'Completed', 'Cancelled' |

#### `fines`
| Column | Type | Constraints |
|--------|------|-------------|
| fine_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| loan_id | INT | FOREIGN KEY → loans |
| amount | DECIMAL(6,2) | DEFAULT 0.00 |
| paid | BOOLEAN | DEFAULT FALSE |

### Database Features

#### Triggers

1. **book_issue_trigger**: Decrements `available_copies` when a book is issued
2. **book_return_trigger**: Increments `available_copies` and calculates fines on return

#### Stored Procedures

1. **issue_book(member_id, book_id, due_days)**: Issues a book with validation
2. **return_book(loan_id)**: Marks a book as returned
3. **register_member(name, email, phone, address)**: Registers a new member

#### Views

1. **loan_summary**: Comprehensive view joining loans, members, books, and fines

---

## 🔒 Business Rules & Constraints

1. **Book Availability**: Cannot issue a book if `available_copies = 0`
2. **Copy Validation**: `available_copies` must be ≤ `total_copies` and ≥ 0
3. **Date Validation**: `due_date` must be greater than `issue_date`
4. **Email Uniqueness**: Each member must have a unique email
5. **ISBN Uniqueness**: Each book must have a unique ISBN
6. **Fine Calculation**: ₹5 per day for overdue books (calculated automatically)
7. **Reservation Priority**: Reserved books are marked as 'Completed' when issued

---

## 📁 Project Structure

```
library-management-system/
├── backend/
│   ├── db.js                 # Database connection pool
│   ├── server.js             # Express server and API routes
│   ├── package.json          # Backend dependencies
│   ├── .env.example          # Environment variables template
│   ├── .gitignore            # Git ignore patterns
│   └── README.md             # Backend documentation
│
├── client/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── eslint.config.js      # ESLint configuration
│   └── README.md             # Frontend documentation
│
├── database/
│   ├── project.sql           # Database schema and objects
│   ├── sample_data.sql       # Sample data for testing
│   └── drop_tables.sql       # Cleanup script
│
└── README.md                 # This file
```

---

## 🧪 Testing

### Manual Testing

1. **Test Book Management:**
   - Add books with various metadata
   - Verify availability tracking
   - Test duplicate ISBN rejection

2. **Test Member Registration:**
   - Register members with complete information
   - Verify email uniqueness constraint
   - Check membership date auto-assignment

3. **Test Loan Operations:**
   - Issue books to members
   - Verify available copies decrement
   - Return books on time (no fine)
   - Return books late (fine generated)

4. **Test Reservations:**
   - Create reservations for unavailable books
   - Issue reserved books
   - Verify status changes to 'Completed'

5. **Test Fine Management:**
   - Generate fines through late returns
   - Mark fines as paid
   - Verify fine calculation (₹5/day)

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost          # MySQL host
DB_USER=root              # MySQL username
DB_PASSWORD=password      # MySQL password
DB_NAME=library_management # Database name

# Server Configuration
PORT=5000                 # Backend server port
```

### Customization

#### Change Fine Rate

Edit the trigger in `database/project.sql`:

```sql
-- Change 5.00 to your desired rate per day
INSERT INTO fines (loan_id, amount)
VALUES (NEW.loan_id, DATEDIFF(NEW.return_date, NEW.due_date) * 5.00);
```

#### Change Default Loan Duration

Update in the frontend `src/App.jsx`:

```javascript
const [issueForm, setIssueForm] = useState({
  member_id: '', 
  book_id: '', 
  due_days: 14  // Change this default value
});
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running and credentials in `.env` are correct

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` or kill the process using port 5000

**3. CORS Error in Frontend**
```
Access to fetch has been blocked by CORS policy
```
**Solution**: Verify backend CORS middleware is enabled and frontend API_BASE URL is correct

**4. Foreign Key Constraint Error**
```
Cannot add or update a child row: a foreign key constraint fails
```
**Solution**: Ensure referenced members/books exist before creating loans/reservations

---

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

#### Frontend
```bash
cd client
npm run build
# Serve the dist/ folder with a static server
```

### Deployment Platforms

- **Backend**: Heroku, Railway, Render, AWS EC2
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: AWS RDS, PlanetScale, Railway MySQL

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Prabhjot Singh Ubhi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Prabhjot Singh Ubhi**

- GitHub: [@PrabhjotSinghUbhi](https://github.com/PrabhjotSinghUbhi)

---

## 🙏 Acknowledgments

- Built as a DBMS project demonstrating real-world database design and implementation
- Inspired by modern library management requirements
- Uses industry-standard technologies and best practices

---

## 📞 Support

For issues, questions, or contributions:

1. Open an issue on [GitHub Issues](https://github.com/PrabhjotSinghUbhi/library-management-system/issues)
2. Submit a pull request for improvements
3. Contact the author through GitHub

---

<div align="center">

**Made with ❤️ using React, Express, and MySQL**

⭐ Star this repository if you find it helpful!

</div>
