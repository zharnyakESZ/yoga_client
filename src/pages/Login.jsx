import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('user', data.username);
        // Мгновенно обновляем глобальное состояние в App.jsx, чтобы имя появилось в шапке
        if (typeof setUser === 'function') {
          setUser(data.username);
        }
        navigate('/');
      } else {
        setError(data.error || 'Неверное имя пользователя или пароль');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fbf9f6', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #eae6df', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
        <h2 style={{ color: '#2c3e35', marginBottom: '30px' }}>Вход в кабинет</h2>

        {error && <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Имя йогина" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' }} />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '25px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' }} />
          <button type="submit" style={{ width: '100%', background: '#4a6b5d', color: 'white', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer' }}>Войти</button>
        </form>
      </div>
    </div>
  );
}

export default Login;