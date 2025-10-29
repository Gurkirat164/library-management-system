import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// GET REQUESTS (READ OPERATIONS)
// ================================

// Test route
app.get("/", (req, res) => {
      res.send("📚 Library Management System Backend Running...");
});

// Get all books
app.get("/books", async (req, res) => {
      console.log("GET /books - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM books");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all loans
app.get("/loans", async (req, res) => {
      console.log("GET /loans - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM loans");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get loan summary view
app.get("/loan-summary", async (req, res) => {
      console.log("GET /loan-summary - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM loan_summary");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all members
app.get("/members", async (req, res) => {
      console.log("GET /members - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM members");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all reservations
app.get("/reservations", async (req, res) => {
      console.log("GET /reservations - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM reservations");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all fines
app.get("/fines", async (req, res) => {
      console.log("GET /fines - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM fines");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// =================================
// POST REQUESTS (CREATE OPERATIONS)
// =================================

// Add new book
app.post("/books", async (req, res) => {
      console.log("POST /books - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const title = req.body?.title || req.query?.title;
      const author = req.body?.author || req.query?.author;
      const publisher = req.body?.publisher || req.query?.publisher;
      const year_published = req.body?.year_published || req.query?.year_published;
      const isbn = req.body?.isbn || req.query?.isbn;
      const total_copies = req.body?.total_copies || req.query?.total_copies || 1;
      const available_copies = req.body?.available_copies || req.query?.available_copies || total_copies;
      
      console.log("Final values:", { title, author, publisher, year_published, isbn, total_copies, available_copies });
      try {
            const [result] = await pool.query(
                  "INSERT INTO books (title, author, publisher, year_published, isbn, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [title, author, publisher, year_published, isbn, total_copies, available_copies]
            );
            res.json({ message: "Book added", book_id: result.insertId });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Add new reservation
app.post("/reservations", async (req, res) => {
      console.log("POST /reservations - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const member_id = req.body?.member_id || req.query?.member_id;
      const book_id = req.body?.book_id || req.query?.book_id;
      const status = req.body?.status || req.query?.status || 'Active';
      
      console.log("Final values:", { member_id, book_id, status });
      try {
            const [result] = await pool.query(
                  "INSERT INTO reservations (member_id, book_id, status) VALUES (?, ?, ?)",
                  [member_id, book_id, status]
            );
            res.json({ message: "Reservation added", reservation_id: result.insertId });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Issue book via stored procedure
app.post("/issue", async (req, res) => {
      console.log("POST /issue - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const member_id = req.body?.member_id || req.query?.member_id;
      const book_id = req.body?.book_id || req.query?.book_id;
      const due_days = req.body?.due_days || req.query?.due_days;
      
      console.log("Final values:", { member_id, book_id, due_days });
      try {
            const [rows] = await pool.query("CALL issue_book(?, ?, ?)", [
                  member_id,
                  book_id,
                  due_days,
            ]);
            res.json(rows[0]); // Returns message from procedure
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error issuing book" });
      }
});

// Return book via stored procedure
app.post("/return", async (req, res) => {
      console.log("POST /return - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const loan_id = req.body?.loan_id || req.query?.loan_id;
      
      console.log("Final values:", { loan_id });
      try {
            const [rows] = await pool.query("CALL return_book(?)", [loan_id]);
            res.json({ message: "Book returned successfully", loan_id });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error returning book" });
      }
});

// Register member via stored procedure
app.post("/register", async (req, res) => {
      console.log("POST /register - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const name = req.body?.name || req.query?.name;
      const email = req.body?.email || req.query?.email;
      const phone = req.body?.phone || req.query?.phone;
      const address = req.body?.address || req.query?.address;
      
      console.log("Final values:", { name, email, phone, address });
      try {
            const [rows] = await pool.query("CALL register_member(?, ?, ?, ?)", [
                  name, email, phone, address
            ]);
            res.json({ message: "Member registered successfully" });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error registering member" });
      }
});

// ================================
// PUT REQUESTS (UPDATE OPERATIONS)
// ================================

// Update fine payment status
app.put("/fines/:fine_id/pay", async (req, res) => {
      console.log("PUT /fines/:fine_id/pay - Processing request...");
      console.log("Params:", req.params);
      
      const fine_id = req.params.fine_id;
      
      console.log("Final values:", { fine_id });
      try {
            const [result] = await pool.query(
                  "UPDATE fines SET paid = TRUE WHERE fine_id = ?",
                  [fine_id]
            );
            res.json({ message: "Fine marked as paid", fine_id });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Update book details
app.put("/books/:book_id", async (req, res) => {
      console.log("PUT /books/:book_id - Processing request...");
      console.log("Params:", req.params);
      console.log("Body data:", req.body);
      
      const book_id = req.params.book_id;
      const { title, author, publisher, year_published, isbn, total_copies } = req.body;
      
      console.log("Final values:", { book_id, title, author, publisher, year_published, isbn, total_copies });
      try {
            // First, get the current total_copies to calculate the difference
            const [currentBook] = await pool.query(
                  "SELECT total_copies, available_copies FROM books WHERE book_id = ?",
                  [book_id]
            );
            
            if (currentBook.length === 0) {
                  return res.status(404).json({ error: "Book not found" });
            }
            
            const oldTotalCopies = currentBook[0].total_copies;
            const currentAvailableCopies = currentBook[0].available_copies;
            const newTotalCopies = parseInt(total_copies);
            
            // Calculate the difference in total copies
            const copyDifference = newTotalCopies - oldTotalCopies;
            
            // Calculate new available copies
            let newAvailableCopies = currentAvailableCopies;
            if (copyDifference > 0) {
                  // If total copies increased, add the difference to available copies
                  newAvailableCopies = currentAvailableCopies + copyDifference;
            } else if (copyDifference < 0) {
                  // If total copies decreased, reduce available copies but not below 0
                  // and not below (total_copies - currently_borrowed)
                  const currentlyBorrowed = oldTotalCopies - currentAvailableCopies;
                  const maxPossibleAvailable = newTotalCopies - currentlyBorrowed;
                  newAvailableCopies = Math.max(0, Math.min(currentAvailableCopies, maxPossibleAvailable));
            }
            
            console.log("Copy calculation:", {
                  oldTotalCopies,
                  newTotalCopies,
                  copyDifference,
                  currentAvailableCopies,
                  newAvailableCopies
            });
            
            // Update the book with new values
            const [result] = await pool.query(
                  "UPDATE books SET title = ?, author = ?, publisher = ?, year_published = ?, isbn = ?, total_copies = ?, available_copies = ? WHERE book_id = ?",
                  [title, author, publisher, year_published, isbn, newTotalCopies, newAvailableCopies, book_id]
            );
            
            res.json({ 
                  message: "Book updated successfully", 
                  book_id,
                  copyDifference,
                  newAvailableCopies 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Update member details
app.put("/members/:member_id", async (req, res) => {
      console.log("PUT /members/:member_id - Processing request...");
      console.log("Params:", req.params);
      console.log("Body data:", req.body);
      
      const member_id = req.params.member_id;
      const { name, email, phone, address } = req.body;
      
      console.log("Final values:", { member_id, name, email, phone, address });
      try {
            const [result] = await pool.query(
                  "UPDATE members SET name = ?, email = ?, phone = ?, address = ? WHERE member_id = ?",
                  [name, email, phone, address, member_id]
            );
            if (result.affectedRows === 0) {
                  return res.status(404).json({ error: "Member not found" });
            }
            res.json({ message: "Member updated successfully", member_id });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Update reservation status
app.put("/reservations/:reservation_id/status", async (req, res) => {
      console.log("PUT /reservations/:reservation_id/status - Processing request...");
      console.log("Params:", req.params);
      console.log("Body data:", req.body);
      
      const reservation_id = req.params.reservation_id;
      const { status } = req.body;
      
      // Validate status
      const validStatuses = ['Active', 'Completed', 'Cancelled'];
      if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status. Must be 'Active', 'Completed', or 'Cancelled'" });
      }
      
      console.log("Final values:", { reservation_id, status });
      try {
            const [result] = await pool.query(
                  "UPDATE reservations SET status = ? WHERE reservation_id = ?",
                  [status, reservation_id]
            );
            
            if (result.affectedRows === 0) {
                  return res.status(404).json({ error: "Reservation not found" });
            }
            
            res.json({ message: "Reservation status updated successfully", reservation_id, status });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
