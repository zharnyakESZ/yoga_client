import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register({setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const res = await fetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Регистрация прошла успешно! Перенаправление...');
        localStorage.setItem('user', data.username);
        // Мгновенно обновляем глобальное состояние в App.jsx, чтобы имя появилось в шапке
        if (typeof setUser === 'function') {
          setUser(data.username);
        }
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.error || 'Ошибка регистрации. Возможно, пользователь уже существует.');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка соединения с сервером. Проверьте консоль (F12).');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fbf9f6', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #eae6df', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
        <h2 style={{ color: '#2c3e35', marginBottom: '30px', fontWeight: '600' }}>Регистрация йогина</h2>

        {error && <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '15px' }}>{error}</p>}
        {success && <p style={{ color: '#2ecc71', fontSize: '14px', marginBottom: '15px' }}>{success}</p>}

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Придумайте имя йогина" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' }} />
          <input type="password" placeholder="Придумайте пароль" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' }} />
          <input type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '25px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' }} />

          <button type="submit" style={{ width: '100%', background: '#4a6b5d', color: 'white', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}>
            Зарегистрироваться
          </button>
        </form>

        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Уже есть аккаунт? <Link to="/login" style={{ color: '#4a6b5d', fontWeight: '600', textDecoration: 'none' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
