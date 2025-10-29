# Database Setup Guide

## Quick Setup

1. **Login to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Create and setup the database:**
   ```sql
   SOURCE database/project.sql;
   ```

3. **Load sample data (optional):**
   ```sql
   SOURCE database/sample_data.sql;
   ```

## Manual Setup

### Step 1: Create Database
```sql
CREATE DATABASE library_management;
USE library_management;
```

### Step 2: Create Tables

The schema includes:
- `members` - Library member information
- `books` - Book catalog
- `loans` - Book lending records
- `reservations` - Book reservations
- `fines` - Overdue fines

### Step 3: Create Triggers

Two triggers are automatically created:
- `book_issue_trigger` - Decrements available_copies on book issue
- `book_return_trigger` - Increments available_copies and calculates fines on return

### Step 4: Create Stored Procedures

Three procedures are created:
- `issue_book(member_id, book_id, due_days)` - Issue a book
- `return_book(loan_id)` - Return a book
- `register_member(name, email, phone, address)` - Register new member

### Step 5: Create Views

- `loan_summary` - Comprehensive loan information with member and book details

## Verification

```sql
-- Check tables
SHOW TABLES;

-- Check triggers
SHOW TRIGGERS;

-- Check procedures
SHOW PROCEDURE STATUS WHERE Db = 'library_management';

-- Check views
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

## Reset Database

To completely reset the database:

```bash
mysql -u root -p < database/drop_tables.sql
mysql -u root -p < database/project.sql
```

## Sample Queries

```sql
-- View all books
SELECT * FROM books;

-- View all members
SELECT * FROM members;

-- View active loans
SELECT * FROM loan_summary WHERE return_date IS NULL;

-- View unpaid fines
SELECT * FROM fines WHERE paid = FALSE;
```
