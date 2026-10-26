import { useState } from 'react' // Импортируем хук состояния
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FaVk, FaTelegramPlane, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa' // Импортируем иконки бургера и крестика
import Home from './pages/Home'
import About from './pages/About'
import Asanas from './pages/Asanas'
import Calculator from './pages/Calculator'
import './App.css'

function App() {
  // Состояние для мобильного меню (true — открыто, false — закрыто)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция для закрытия меню при клике на ссылку (чтобы меню пряталось при переходе)
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <BrowserRouter>
      {/* Шапка сайта */}
      <header className="navbar">
        <div className="logo">Лотос</div>
        
        {/* Меню навигации. Класс nav-active добавляется динамически, если isMenuOpen === true */}
        <nav className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
          <Link to="/" className="nav-item" onClick={closeMenu}>Главная</Link>
          <Link to="/about" className="nav-item" onClick={closeMenu}>О нас</Link>
          <Link to="/asanas" className="nav-item" onClick={closeMenu}>Асаны</Link>
          <Link to="/calculator" className="nav-item" onClick={closeMenu}>Калькулятор</Link>
          
        </nav>

        {/* Кнопка Бургера (видима только на мобильных устройствах) */}
        <button className="burger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Контент страниц */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/asanas" element={<Asanas />} />
          <Route path="/calculator" element={<Calculator />} />
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
          <p>© 2026 Студия Йоги «Гармония». Все права защищены.</p>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App