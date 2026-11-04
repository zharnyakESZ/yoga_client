import React, { useState, useEffect } from 'react';
import '../Home.css';
import backgroundImage from '../assets/banner.png';

function Home({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user || '');
  const [phone, setPhone] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1);
    }
    input = input.substring(0, 10);

    let formattedInput = '';
    if (input.length > 0) {
      formattedInput = '+7 (' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedInput += '-' + input.substring(8, 10);
    }
    setPhone(formattedInput);
  };

  const recipes = [
    { id: 1, title: 'Зелёный смузи для энергии', shortText: 'Идеальный детокс-напиток для восполнения сил после утренней практики йоги.', ingredients: ['1/2 спелого авокадо', 'Большая горсть свежего шпината', '1 спелый банан', '200 мл охлажденной кокосовой воды'], image: 'smusi.png', instructions: 'Тщательно промойте зелень шпината. Очистите банан и авокадо от кожуры. Поместите все ингредиенты в чашу блендера и взбивайте на высокой скорости 1-2 минуты до однородной, нежной кремовой консистенции.' },
    { id: 2, title: 'Пряная овсянка с яблоком', shortText: 'Согревающий и лёгкий завтрак с корицей и кардамоном для баланса энергии.', ingredients: ['50г овсяных хлопьев', '200 мл миндального молока', '1 яблоко', 'щепотка корицы', '1 ч.л. мёда'], image: 'ovsyanka.png', instructions: 'Сварите овсянку на молоке на медленном огне. Яблоко нарежьте кубиками и припустите на сковороде с корицей и каплей воды 3 минуты. Выложите яблоки на кашу.' },
    { id: 3, title: 'Салат с киноа и тыквой', shortText: 'Питательный и лёгкий ужин, который не перегружает пищеварительную систему.', ingredients: ['60г киноа', '100г тыквы', 'горсть руколы', 'оливковое масло', 'лимонный сок'], image: 'kinoa.png', instructions: 'Отварите киноа. Тыкву нарежьте кубиками, сбрызните маслом и запекайте в духовке при 180°C около 20 минут. Смешайте в глубокой тарелке киноа, тыкву и руколу.' },
    { id: 4, title: 'Будда-боул с нутом', shortText: 'Сбалансированное вегетарианское блюдо, богатое растительным белком и клетчаткой.', ingredients: ['150г нута', '200г готового киноа', '100г свежего шпината', '1 шт Авокадо'], image: 'byddaboyl.png', instructions: 'Выложите по кругу глубокой тарелки готовое киноа, листья шпината, половинки черри и ломтики авокадо. Нут предварительно прогрейте или обжарьте со специями.' },
    { id: 5, title: 'Чечевичный суп-пюре', shortText: 'Традиционный согревающий индийский дал с ароматными специями.', ingredients: ['150г красной чечевицы', '1 крупный томат', 'кусочек свежего имбиря'], image: 'hehevisa.png', instructions: 'Обжарьте в кастрюле тертый имбирь и специи в течение 30 секунд. Добавьте чечевицу и томат, залейте водой. Варите 20 минут, затем измельчите блендером.' },
    { id: 6, title: 'Чиа-пудинг на кокосовом молоке', shortText: 'Полезный десерт без сахара, богатый жирными кислотами Омега-3.', ingredients: ['3 ст.л. семян чиа', '150 мл кокосового молока', 'Свежие ягоды'], image: 'hia.png', instructions: 'Залейте семена чиа кокосовым молоком, тщательно перемешайте. Оставьте в холодильнике минимум на 4 часа. Перед подачей украсьте свежими ягодами.' },
  ];

  const faqData = [
    { q: 'Нужна ли физическая подготовка для первых занятий?', a: 'Абсолютно нет! Наши практики Хатха-йоги и медитации рассчитаны в том числе на новичков.' },
    { q: 'Что необходимо взять с собой на практику?', a: 'Мы рекомендуем взять удобную спортивную одежду, которая не стесняет движений. Все коврики и пледы предоставляются бесплатно.' },
    { q: 'Как часто нужно заниматься, чтобы увидеть результат?', a: 'Для стабильного улучшения гибкости и снижения стресса мы рекомендуем посещать занятия 2–3 раза в неделю.' },
  ];

  useEffect(() => {
    if (isOpen) setName(user || '');
  }, [isOpen, user]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= recipes.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? recipes.length - 3 : prev - 1));
  };

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по телефону: ${phone}`);
    setIsOpen(false);
    setPhone('');
  };

  return (
    <div style={{ backgroundColor: '#fbf9f6', position: 'relative' }}>
      
      {/* ИНЖЕКЦИЯ ВСЕХ СТИЛЕЙ АНИМАЦИИ (ПРИ ЗАГРУЗКЕ И ПРИ СКРОЛЛЕ) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealOnScroll {
          from { opacity: 0; transform: translateY(50px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-up {
          animation: fadeInUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .scroll-animated-section {
          view-timeline-name: --sectionTimeline;
          view-timeline-axis: block;
          animation-name: revealOnScroll;
          animation-fill-mode: both;
          animation-timeline: --sectionTimeline;
          animation-range: entry 10% cover 40%;
        }
        .direction-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .direction-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 12px 25px rgba(74, 107, 93, 0.08) !important;
        }
      `}</style>

      {/* 1. ФИКСИРОВАННЫЙ ГЛАВНЫЙ БАННЕР */}
      <div
        className="hero-section"
        style={{
          position: 'sticky',
          top: '60px',
          left: 0,
          width: '100%',
          height: '65vh',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          boxSizing: 'border-box',
          zIndex: 1,
        }}
      >
        <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-title" style={{ color: '#2c3e35', fontSize: '46px', fontWeight: '700', margin: 0 }}>
            Студия Йоги «Цветочная практика»
          </h1>
          <p className="hero-subtitle" style={{ color: '#3b4a41', fontSize: '18px', margin: '20px 0 30px 0', fontWeight: '500', maxWidth: '600px' }}>
            Пространство, где body обретает силу, а разум — абсолютное спокойствие.
          </p>
          <button
            className="btn-primary"
            onClick={() => setIsOpen(true)}
            style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '25px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(74, 107, 93, 0.2)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.03)'; e.target.style.background = '#3d594d'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = '#4a6b5d'; }}
          >
            Записаться на практику
          </button>
        </div>
      </div>

      {/* 2. НАЕЗЖАЮЩАЯ СКОРЛУПКА С АНИМИРОВАННЫМИ СЕКЦИЯМИ ВНУТРИ */}
      <div 
        className="scroll-shell-content"
        style={{ 
          position: 'relative', 
          zIndex: 10,
          background: 'rgba(251, 249, 246, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTopLeftRadius: '45px',
          borderTopRightRadius: '45px', 
          boxShadow: '0 -15px 35px rgba(44, 62, 53, 0.06)',
          marginTop: '-30px',
          paddingTop: '40px',
          paddingBottom: '60px'
        }}
      >
        {/* АНИМИРОВАННАЯ СЕКЦИЯ НАПРАВЛЕНИЙ */}
        <section className="directions-section scroll-animated-section" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: '#2c3e35', fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>
            Наши направления
          </h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '40px' }}>Выберите практику, которая откликается вашему внутреннему состоянию</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
            
            <div className="direction-card" style={{ background: 'white', borderRadius: '24px', width: '300px', padding: '35px 25px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eae6df', boxShadow: '0 4px 20px rgba(44, 62, 53, 0.02)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: '#81b29a' }}></div>
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>🌿</div>
              <h3 style={{ color: '#2c3e35', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>Хатха-йога</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Классическая практика, направленная на баланс силы и гибкости вашего тела.
            </p>
          </div>

          {/* Карточка 2: Кундалини */}
          <div className="direction-card" style={{ background: 'white', borderRadius: '24px', width: '300px', padding: '35px 25px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eae6df', boxShadow: '0 4px 20px rgba(44, 62, 53, 0.02)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: '#f4a261' }}></div>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>✨</div>
            <h3 style={{ color: '#2c3e35', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>Кундалини</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Интенсивная работа с внутренней энергией через дыхательные крийи и мантры.</p>
          </div>

          {/* Карточка 3: Медитация */}
          <div className="direction-card" style={{ background: 'white', borderRadius: '24px', width: '300px', padding: '35px 25px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eae6df', boxShadow: '0 4px 20px rgba(44, 62, 53, 0.02)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: '#e76f51' }}></div>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🧘‍♀️</div>
            <h3 style={{ color: '#2c3e35', fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0' }}>Медитация</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>Практики глубокого расслабления, осознанности и очищения разума от стресса.</p>
          </div>

        </div>
      </section>

      {/* АНИМИРОВАННАЯ СЕКЦИЯ РЕЦЕПТОВ */}
      <section className="recipes-section scroll-animated-section" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: '30px', color: '#2c3e35', fontWeight: '700', fontSize: '32px' }}>
          Рецепты (Йога-питание)
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <button type="button" onClick={prevSlide} style={{ background: '#4a6b5d', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>
            &lt;
          </button>
          
          <div style={{ display: 'flex', gap: '20px', overflow: 'hidden', width: '960px' }}>
            {recipes.slice(currentSlide, currentSlide + 3).map((recipe) => (
              <div key={recipe.id} style={{ background: 'white', border: '1px solid #eae6df', borderRadius: '20px', width: '300px', padding: '0 0 20px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', textAlign: 'center', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '160px', background: '#f7f5f0', overflow: 'hidden', marginBottom: '15px' }}>
                  {recipe.image ? (
                    <img src={`/${recipe.image}`} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '40px' }}>🍲</div>
                  )}
                </div>
                <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ color: '#2c3e35', fontSize: '18px', margin: '0 0 10px 0', fontWeight: '600' }}>{recipe.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px', flexGrow: 1, margin: 0, lineHeight: '1.5' }}>{recipe.shortText}</p>
                  <button type="button" onClick={() => setActiveRecipe(recipe)} style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '20px', cursor: 'pointer', marginTop: '15px', fontWeight: '600', width: '100%' }}>
                    Посмотреть рецепт
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={nextSlide} style={{ background: '#4a6b5d', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' }}>
            &gt;
          </button>
        </div>
      </section>

      {/* АНИМИРОВАННАЯ СЕКЦИЯ FAQ */}
      <section className="faq-section scroll-animated-section" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e35', marginBottom: '35px', fontWeight: '700', fontSize: '32px' }}>
          Часто задаваемые вопросы
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqData.map((item, index) => (
            <div key={index} style={{ background: 'white', border: '1px solid #eae6df', borderRadius: '15px', overflow: 'hidden', transition: 'all 0.2s' }}>
              <div onClick={() => toggleFaq(index)} style={{ padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: activeFaqIndex === index ? '#fcfbfa' : 'white' }}>
                <span style={{ color: '#2c3e35', fontWeight: '600', fontSize: '16px' }}>{item.q}</span>
                <span style={{ color: '#4a6b5d', fontWeight: 'bold', fontSize: '18px' }}>{activeFaqIndex === index ? '−' : '+'}</span>
              </div>
              {activeFaqIndex === index && (
                <div style={{ padding: '0 25px 20px 25px', color: '#666', fontSize: '15px', lineHeight: '1.6', background: '#fcfbfa' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div> {/* КОНЕЦ СКОРЛУПКИ (.scroll-shell-content) */}

    {/* МОДАЛЬНОЕ ОКНО ДЛЯ РЕЦЕПТА */}
    {activeRecipe && (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setActiveRecipe(null)}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '20px', maxWidth: '500px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ color: '#2c3e35', margin: '0 0 15px 0', textAlign: 'center', fontSize: '22px', fontWeight: '700' }}>{activeRecipe.title}</h3>
          {activeRecipe.image && (
            <div style={{ width: '100%', height: '240px', borderRadius: '15px', overflow: 'hidden', margin: '0 0 20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f7f5f0' }}>
              <img src={`/${activeRecipe.image}`} alt={activeRecipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          )}
          {activeRecipe.ingredients && (
            <div style={{ marginTop: '15px', textAlign: 'left' }}>
              <h4 style={{ color: '#4a6b5d', marginBottom: '5px' }}>🥑 Ингредиенты:</h4>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {activeRecipe.ingredients.map((ing, i) => (
                  <li key={i} style={{ color: '#555', marginBottom: '4px' }}>{ing}</li>
                ))}
              </ul>
            </div>
          )}
          {activeRecipe.instructions && (
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <h4 style={{ color: '#4a6b5d', marginBottom: '5px' }}>🥣 Способ приготовления:</h4>
              <p style={{ color: '#555', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{activeRecipe.instructions}</p>
            </div>
          )}
          <button type="button" onClick={() => setActiveRecipe(null)} style={{ marginTop: '25px', background: '#4a6b5d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', width: '100%' }}>
            Закрыть
          </button>
        </div>
      </div>
    )}

    {/* МОДАЛЬНОЕ ОКНО ЗАПИСИ НА ЗАНЯТИЕ */}
    {isOpen && (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setIsOpen(false)}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '20px', maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
          <h3 style={{ color: '#2c3e35', marginTop: 0, marginBottom: '20px', textAlign: 'center', fontWeight: '700' }}>Запись на практику</h3>
          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '12px', border: '1px solid #eae6df', borderRadius: '10px', outline: 'none' }} />
            <input type="text" placeholder="+7 (___) ___-__-__" value={phone} onChange={handlePhoneChange} required style={{ padding: '12px', border: '1px solid #eae6df', borderRadius: '10px', outline: 'none' }} />
            <button type="submit" style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
              Подтвердить запись
            </button>
          </form>
        </div>
      </div>
    )}

  </div>
);
}

export default Home;