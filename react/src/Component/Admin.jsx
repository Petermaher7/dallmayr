import React , {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dallmayr' && password === 'admin') {
      navigate('/cart'); 
    } else {
      alert(" you are not admin ");
    }};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input type="text" required placeholder='your name' onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>password</label>
        <input type="password" required placeholder='your password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button>login</button>
      </form>
    </div>
  )
}

export default Admin
