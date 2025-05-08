import { useState } from 'react';
import './Login.css';  // Agregar esta línea

function Login({ setIsAuthenticated, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Set current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuthenticated(true);
      setCurrentPage('expenses');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="btn-primary">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <button onClick={() => setCurrentPage('register')} className="link-button">Regístrate aquí</button>
      </p>
    </div>
  );
}

export default Login;