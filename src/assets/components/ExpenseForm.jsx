import { useState, useEffect } from 'react';

function ExpenseForm({ onSubmit, onCancel, initialData }) {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Categories for the dropdown
  const categories = [
    'Alimentación',
    'Transporte',
    'Vivienda',
    'Entretenimiento',
    'Salud',
    'Educación',
    'Ropa',
    'Otros'
  ];

  useEffect(() => {
    // If editing an expense, populate form with existing data
    if (initialData) {
      setDate(initialData.date);
      setCategory(initialData.category);
      setDescription(initialData.description || '');
      setAmount(initialData.amount);
    } else {
      // Set today's date as default for new expenses
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date || !category || !amount) {
      setError('Todos los campos obligatorios deben completarse');
      return;
    }

    // Validate amount is a number
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError('El monto debe ser un número positivo');
      return;
    }

    // Create expense object
    const expense = {
      id: initialData ? initialData.id : null,
      date,
      category,
      description,
      amount: parseFloat(amount)
    };

    // Submit to parent component
    onSubmit(expense);
  };

  return (
    <div className="expense-form-container">
      <h3>{initialData ? 'Editar Gasto' : 'Registrar Gasto'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha *</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Categoría *</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Descripción (opcional)"
          />
        </div>
        <div className="form-group">
          <label>Monto *</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Ingrese el monto"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {initialData ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;