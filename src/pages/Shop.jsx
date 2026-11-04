import React, { useState, useEffect } from 'react';

// Принимаем функцию addToCart из родительского компонента App
function Shop({ addToCart }) {
  const [equipment, setEquipment] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/shop/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Сервер ответил ошибкой: \${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEquipment(data))
      .catch((err) => {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить товары. Проверьте, что сервер запущен.');
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#fbf9f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e35', marginBottom: '40px', fontWeight: '600' }}>
        Оборудование для фитнеса и йоги
      </h1>

      {error && <p style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
        {equipment.map((item) => (
          <div key={item.id} style={{ background: 'white', borderRadius: '20px', border: '1px solid #eae6df', width: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>

            {/* Блок картинки */}
            <div style={{ width: '100%', height: '200px', background: '#f7f5f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '40px' }}>📦</span>
              )}
            </div>

            {/* Блок текста */}
            <div style={{ padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#2c3e35', fontSize: '20px' }}>{item.title}</h3>
              <p style={{ color: '#8a9a86', fontStyle: 'italic', margin: '0 0 15px 0' }}>{item.price} руб.</p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1, maxHeight: '120px', overflowY: 'auto' }}>
                {item.description}
              </p>

              <button
                onClick={() => addToCart(item)}
                style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', marginTop: 'auto' }}
              >
                Купить
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;