import { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';

function ExpenseList({ setIsAuthenticated }) {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
      
      // Get expenses for current user
      const userExpenses = JSON.parse(localStorage.getItem(`expenses_${user.id}`)) || [];
      setExpenses(userExpenses);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expense
    };
    
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    
    // Save to localStorage
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
    setShowForm(false);
  };

  const updateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
    setShowForm(false);
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    if (window.confirm('¿Está seguro de eliminar este gasto?')) {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setExpenses(updatedExpenses);
      localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(updatedExpenses));
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  return (
    <div className="expenses-container">
      <div className="header">
        <h2>Listado de Gastos</h2>
        <div>
          <span>Bienvenido, {currentUser?.fullName}</span>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>

      <button 
        onClick={() => {
          setEditingExpense(null);
          setShowForm(true);
        }} 
        className="btn-add"
      >
        Registrar Gasto
      </button>

      {showForm && (
        <ExpenseForm 
          onSubmit={editingExpense ? updateExpense : addExpense} 
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
          initialData={editingExpense}
        />
      )}

      {expenses.length === 0 ? (
        <p className="no-expenses">No hay gastos registrados</p>
      ) : (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description || '-'}</td>
                <td>${expense.amount}</td>
                <td>
                  <button onClick={() => handleEdit(expense)} className="btn-edit">Editar</button>
                  <button onClick={() => deleteExpense(expense.id)} className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;