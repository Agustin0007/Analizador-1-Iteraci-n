import { useState } from 'react';
import './Login.css';  // Agregar esta línea

function Register({ setIsAuthenticated, setCurrentPage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!fullName || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      setError('El correo ya está registrado');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      password
    };

    // Add user to array and save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    setSuccess('Cuenta creada correctamente');
    setError('');
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      setCurrentPage('login');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h2>Registro de Cuenta</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            placeholder="Ingrese su nombre completo"
          />
        </div>
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
        <button type="submit" className="btn-primary">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <button onClick={() => setCurrentPage('login')} className="link-button">Inicia sesión aquí</button>
      </p>
    </div>
  );
}

export default Register;