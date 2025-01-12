import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dallmayr' && password === 'admin') {
      navigate('/cart');
    } else {
      alert("You are not an admin");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">UserName</label>
          <input 
            type="text" 
            className="form-control form-control-lg" 
            required 
            placeholder="your name" 
            onChange={(e) => setUsername(e.target.value)}  />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control form-control-lg" 
            required 
            placeholder="your password" 
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Admin;
