import { useState, useEffect } from 'react'
import './App.css'

// Components
import Login from './assets/components/Login'
import Register from './assets/components/Register'
import ExpenseList from './assets/components/ExpenseList'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
      setCurrentPage('expenses');
    }
  }, []);

  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'register') {
        return <Register setIsAuthenticated={setIsAuthenticated} setCurrentPage={setCurrentPage} />;
      }
      return <Login setIsAuthenticated={setIsAuthenticated} setCurrentPage={setCurrentPage} />;
    }
    return <ExpenseList setIsAuthenticated={setIsAuthenticated} setCurrentPage={setCurrentPage} />;
  };

  return (
    <div className="container">
      {renderPage()}
    </div>
  )
}

export default App;