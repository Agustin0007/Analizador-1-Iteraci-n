import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Components
import Login from './components/Login'
import Register from './components/Register'
import ExpenseList from './components/ExpenseList'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/expenses" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/expenses" />} />
          <Route path="/expenses" element={isAuthenticated ? <ExpenseList setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/expenses" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;