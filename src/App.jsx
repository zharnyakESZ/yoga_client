import { useState } from 'react' // Импортируем хук состояния
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FaVk, FaTelegramPlane, FaWhatsapp, FaBars, FaTimes, FaUserAlt } from 'react-icons/fa' // Импортируем иконки, включая иконку пользователя
import Home from './pages/Home'
import About from './pages/About'
import Asanas from './pages/Asanas'
import Calculator from './pages/Calculator'
import './App.css'
import Shop from './pages/Shop'
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum';

function App() {
  // Состояние для мобильного меню (true — открыто, false — закрыто)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // СОСТОЯНИЕ КОРЗИНЫ: массив, где будут храниться добавленные товары
  const [cart, setCart] = useState([]);

  // СОСТОЯНИЕ АВТОРИЗАЦИИ: автоматически подтягивает имя йогина, если он уже залогинен
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  // Функция для закрытия меню при клике на ссылку (чтобы меню пряталось при переходе)
  const closeMenu = () => setIsMenuOpen(false);

  // Функция выхода из профиля
  const handleLogout = () => {
    localStorage.removeItem('user'); // Удаляем юзера из памяти
    setUser(null); // Сбрасываем стейт, чтобы шапка мгновенно обновилась
    closeMenu();
  };

  // ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Ищем, есть ли уже такой товар в корзине
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Если товар найден, увеличиваем его количество на 1
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Если товара еще нет в корзине, добавляем его с количеством 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Вычисляем общее количество товаров в корзине для отображения в шапке
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* Шапка сайта */}
      <header className="navbar">
        <div className="logo">Цветочная практика</div>
        
        {/* Меню навигации. Класс nav-active добавляется динамически, если isMenuOpen === true */}
        <nav className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
          <Link to="/" className="nav-item" onClick={closeMenu}>Главная</Link>
          <Link to="/about" className="nav-item" onClick={closeMenu}>О нас</Link>
          <Link to="/asanas" className="nav-item" onClick={closeMenu}>Асаны</Link>
          <Link to="/calculator" className="nav-item" onClick={closeMenu}>Калькулятор</Link>
          
          {/* Индикатор количества товаров в корзине */}
          <Link to="/shop" className="nav-item" onClick={closeMenu}>
            Магазин {totalItemsInCart > 0 && <span className="cart-badge">({totalItemsInCart})</span>}
          </Link>
          
          <Link to="/forum" className="nav-item" onClick={closeMenu}>Форум</Link>

          {/* УСЛОВНЫЙ РЕНДЕРИНГ: Если пользователь залогинен — выводим имя, иначе — кнопки авторизации */}
          {user ? (
            <div className="user-profile-nav">
              <span className="user-name-display">
                <FaUserAlt style={{ marginRight: '6px', fontSize: '12px', color: '#4a6b5d' }} />
                {user}
              </span>
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <div className="nav-auth-group">
              <Link to="/login" className="nav-item" onClick={closeMenu}>Войти</Link>
              <span className="nav-separator">/</span>
              <Link to="/register" className="nav-item" onClick={closeMenu}>Регистрация</Link>
            </div>
          )}
        </nav>

        {/* Кнопка Бургера (видима только на мобильных устройствах) */}
        <button className="burger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Контент страниц */}
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/asanas" element={<Asanas />} />
          <Route path="/calculator" element={<Calculator />} />
          
          {/* Передаем функцию addToCart на страницу Магазина */}
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          
          {/* Передаем setUser, чтобы при успешном входе/регистрации имя сразу отображалось в шапке */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </main>

      {/* Подвал сайта */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-nav">
            <h4>Навигация</h4>
            <Link to="/" className="footer-link">Главная</Link>
            <Link to="/about" className="footer-link">О нас</Link>
            <Link to="/asanas" className="footer-link">Асаны</Link>
            <Link to="/calculator" className="footer-link">Калькулятор</Link>
            <Link to="/shop" className="footer-link">Магазин</Link>
            <Link to="/forum" className="footer-link">Форум</Link>
          </div>

          <div className="footer-contacts">
            <h4>Контакты</h4>
            <p className="footer-info">📍 г. Москва, ул. Мира, д. 10</p>
            <p className="footer-info">📞 +7 (999) 123-45-67</p>
          </div>

          <div className="footer-social">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="https://vk.com" target="_blank" rel="noreferrer" className="social-icon vk"><FaVk /></a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="social-icon tg"><FaTelegramPlane /></a>
              <a href="https://wa.me" target="_blank" rel="noreferrer" className="social-icon wa"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Студия Йоги «Цветочная практика». Все права защищены.</p>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App;