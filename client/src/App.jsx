import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [fines, setFines] = useState([]);
  const [loanSummary, setLoanSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [bookForm, setBookForm] = useState({
    title: '', author: '', publisher: '', year_published: '', isbn: '', total_copies: 1
  });
  const [memberForm, setMemberForm] = useState({
    name: '', email: '', phone: '', address: ''
  });
  const [issueForm, setIssueForm] = useState({
    member_id: '', book_id: '', due_days: 14
  });
  const [returnForm, setReturnForm] = useState({
    loan_id: ''
  });
  const [reservationForm, setReservationForm] = useState({
    member_id: '', book_id: ''
  });

  // Fetch data functions
  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/members`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      setError('Failed to fetch members');
    }
  };

  const fetchLoans = async () => {
    try {
      const res = await fetch(`${API_BASE}/loans`);
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      setError('Failed to fetch loans');
    }
  };

  const fetchLoanSummary = async () => {
    try {
      const res = await fetch(`${API_BASE}/loan-summary`);
      const data = await res.json();
      setLoanSummary(data);
    } catch (err) {
      setError('Failed to fetch loan summary');
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API_BASE}/reservations`);
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      setError('Failed to fetch reservations');
    }
  };

  const fetchFines = async () => {
    try {
      const res = await fetch(`${API_BASE}/fines`);
      const data = await res.json();
      setFines(data);
    } catch (err) {
      setError('Failed to fetch fines');
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchLoans();
    fetchLoanSummary();
    fetchReservations();
    fetchFines();
  }, []);

  // Submit handlers
  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookForm, available_copies: bookForm.total_copies })
      });
      if (res.ok) {
        setSuccess('Book added successfully!');
        setBookForm({ title: '', author: '', publisher: '', year_published: '', isbn: '', total_copies: 1 });
        fetchBooks();
      }
    } catch (err) {
      setError('Failed to add book');
    }
    setLoading(false);
  };

  const handleRegisterMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm)
      });
      if (res.ok) {
        setSuccess('Member registered successfully!');
        setMemberForm({ name: '', email: '', phone: '', address: '' });
        fetchMembers();
      }
    } catch (err) {
      setError('Failed to register member');
    }
    setLoading(false);
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueForm)
      });
      if (res.ok) {
        setSuccess('Book issued successfully!');
        setIssueForm({ member_id: '', book_id: '', due_days: 14 });
        fetchBooks();
        fetchLoans();
        fetchLoanSummary();
      }
    } catch (err) {
      setError('Failed to issue book');
    }
    setLoading(false);
  };

  const handleReturnBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(returnForm)
      });
      if (res.ok) {
        setSuccess('Book returned successfully!');
        setReturnForm({ loan_id: '' });
        fetchBooks();
        fetchLoans();
        fetchLoanSummary();
        fetchFines();
      }
    } catch (err) {
      setError('Failed to return book');
    }
    setLoading(false);
  };

  const handleAddReservation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationForm)
      });
      if (res.ok) {
        setSuccess('Reservation created successfully!');
        setReservationForm({ member_id: '', book_id: '' });
        fetchReservations();
      }
    } catch (err) {
      setError('Failed to create reservation');
    }
    setLoading(false);
  };

  const handlePayFine = async (fineId) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/fines/${fineId}/pay`, {
        method: 'PUT'
      });
      if (res.ok) {
        setSuccess('Fine paid successfully!');
        fetchFines();
      }
    } catch (err) {
      setError('Failed to pay fine');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">📚 Library Management System</h1>
          <p className="text-indigo-100">Manage your library efficiently with modern technology</p>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}
      {success && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p className="font-medium">{success}</p>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-wrap gap-2">
          {['books', 'members', 'issue', 'return', 'reservations', 'loans', 'fines'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Book</h2>
                <form onSubmit={handleAddBook} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={bookForm.title}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={bookForm.author}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Publisher"
                    value={bookForm.publisher}
                    onChange={(e) => setBookForm({ ...bookForm, publisher: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Year Published"
                    value={bookForm.year_published}
                    onChange={(e) => setBookForm({ ...bookForm, year_published: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="ISBN"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Total Copies"
                    value={bookForm.total_copies}
                    onChange={(e) => setBookForm({ ...bookForm, total_copies: e.target.value })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Adding...' : 'Add Book'}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Books Collection ({books.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {books.map(book => (
                        <tr key={book.book_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{book.book_id}</td>
                          <td className="px-4 py-3 text-sm font-medium">{book.title}</td>
                          <td className="px-4 py-3 text-sm">{book.author}</td>
                          <td className="px-4 py-3 text-sm">{book.isbn}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              book.available_copies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {book.available_copies}/{book.total_copies}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Register Member</h2>
                <form onSubmit={handleRegisterMember} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Address"
                    value={memberForm.address}
                    onChange={(e) => setMemberForm({ ...memberForm, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Registering...' : 'Register Member'}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Members ({members.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {members.map(member => (
                        <tr key={member.member_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{member.member_id}</td>
                          <td className="px-4 py-3 text-sm font-medium">{member.name}</td>
                          <td className="px-4 py-3 text-sm">{member.email}</td>
                          <td className="px-4 py-3 text-sm">{member.phone}</td>
                          <td className="px-4 py-3 text-sm">{new Date(member.membership_date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Issue Book Tab */}
        {activeTab === 'issue' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Issue Book to Member</h2>
              <form onSubmit={handleIssueBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Member</label>
                  <select
                    value={issueForm.member_id}
                    onChange={(e) => setIssueForm({ ...issueForm, member_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose a member...</option>
                    {members.map(member => (
                      <option key={member.member_id} value={member.member_id}>
                        {member.name} (ID: {member.member_id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Book</label>
                  <select
                    value={issueForm.book_id}
                    onChange={(e) => setIssueForm({ ...issueForm, book_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose a book...</option>
                    {books.filter(b => b.available_copies > 0).map(book => (
                      <option key={book.book_id} value={book.book_id}>
                        {book.title} - Available: {book.available_copies}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Days</label>
                  <input
                    type="number"
                    value={issueForm.due_days}
                    onChange={(e) => setIssueForm({ ...issueForm, due_days: e.target.value })}
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Issuing...' : 'Issue Book'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Return Book Tab */}
        {activeTab === 'return' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Return Book</h2>
              <form onSubmit={handleReturnBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Active Loan</label>
                  <select
                    value={returnForm.loan_id}
                    onChange={(e) => setReturnForm({ ...returnForm, loan_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose a loan...</option>
                    {loanSummary.filter(l => !l.return_date).map(loan => (
                      <option key={loan.loan_id} value={loan.loan_id}>
                        Loan #{loan.loan_id} - {loan.member_name} - {loan.book_title}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Return Book'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Reservation</h2>
                <form onSubmit={handleAddReservation} className="space-y-4">
                  <select
                    value={reservationForm.member_id}
                    onChange={(e) => setReservationForm({ ...reservationForm, member_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Member...</option>
                    {members.map(member => (
                      <option key={member.member_id} value={member.member_id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={reservationForm.book_id}
                    onChange={(e) => setReservationForm({ ...reservationForm, book_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Book...</option>
                    {books.map(book => (
                      <option key={book.book_id} value={book.book_id}>
                        {book.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Creating...' : 'Create Reservation'}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">All Reservations ({reservations.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reservations.map(reservation => (
                        <tr key={reservation.reservation_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{reservation.reservation_id}</td>
                          <td className="px-4 py-3 text-sm">{reservation.member_id}</td>
                          <td className="px-4 py-3 text-sm">{reservation.book_id}</td>
                          <td className="px-4 py-3 text-sm">{new Date(reservation.reservation_date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              reservation.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                              reservation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {reservation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loans Tab */}
        {activeTab === 'loans' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Loan Summary ({loanSummary.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loanSummary.map(loan => (
                    <tr key={loan.loan_id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{loan.loan_id}</td>
                      <td className="px-4 py-3 text-sm">{loan.member_name}</td>
                      <td className="px-4 py-3 text-sm">{loan.book_title}</td>
                      <td className="px-4 py-3 text-sm">{new Date(loan.issue_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">{new Date(loan.due_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">{loan.return_date ? new Date(loan.return_date).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          loan.return_date ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {loan.return_date ? 'Returned' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fines Tab */}
        {activeTab === 'fines' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Fines Management ({fines.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fine ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {fines.map(fine => (
                    <tr key={fine.fine_id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{fine.fine_id}</td>
                      <td className="px-4 py-3 text-sm">{fine.loan_id}</td>
                      <td className="px-4 py-3 text-sm font-semibold">₹{fine.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          fine.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fine.paid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {!fine.paid && (
                          <button
                            onClick={() => handlePayFine(fine.fine_id)}
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors text-xs font-semibold"
                          >
                            Pay Fine
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Library Management System. Built with React, Express & MySQL.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
