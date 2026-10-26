import { useState } from 'react'
import '../Home.css'
import backgroundImage from '../assets/banner.png'

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 1. Состояния для слайдера и модального окна рецептов
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeRecipe, setActiveRecipe] = useState(null); // Хранит рецепт, который открыт в поп-апе

  // База данных из 6 рецептов йога-питания с картинками
  const recipes = [
    {
      id: 1,
      image: "smusi.png",
      title: "Зелёный смузи для энергии",
      shortText: "Идеальный детокс-напиток для восполнения сил после утренней практики йоги.",
      ingredients: [
        "1/2 спелого авокадо",
        "Большая горсть свежего шпината",
        "1 спелый банан",
        "200 мл охлажденной кокосовой воды"
      ],
      instructions: "Тщательно промойте зелень шпината. Очистите банан и авокадо от кожуры. Поместите все ингредиенты в чашу блендера и взбивайте на высокой скорости 1-2 минуты до однородной, нежной кремовой консистенции. Рекомендуется пить сразу после приготовления."
    },
    {
      id: 2,
      image: "ovsyanka.png",
      title: "Пряная овсянка с яблоком",
      shortText: "Согревающий и лёгкий завтрак с корицей и кардамоном для баланса энергии.",
      ingredients: [
        "50г овсяных хлопьев",
        "200 мл миндального молока",
        "1 яблоко",
        "щепотка корицы",
        "1 ч.л. мёда"
      ],
      instructions: "Сварите овсянку на молоке на медленном огне. Яблоко нарежьте кубиками и припустите на сковороде с корицей и каплей воды 3 минуты. Выложите яблоки на кашу, украсьте орехами и полейте мёдом."
    },
    {
      id: 3,
      image: "kinoa.png",
      title: "Салат с киноа и тыквой",
      shortText: "Питательный и лёгкий ужин, который не перегружает пищеварительную систему.",
      ingredients: [
        "60г киноа",
        "100г тыквы",
        "горсть руколы",
        "оливковое масло",
        "лимонный сок"
      ],
      instructions: "Отварите киноа. Тыкву нарежьте кубиками, сбрызните маслом и запекайте в духовке при 180°C около 20 минут. Смешайте в глубокой тарелке киноа, тыкву и руколу. Заправьте лимонным соком и оливковым маслом."
    },
    {
      id: 4,
      image: "byddaboyl.png",
      title: "Будда-боул с нутом",
      shortText: "Сбалансированное вегетарианское блюдо, богатое растительным белком и клетчаткой.",
      ingredients: [
        "150г нут",
        "200г киноа ",
        "150 г огурец",
        "100 г шпинат",
        "10шт Помидоры черри",
        "1 шт Авокадо",
        "пару веточек Петрушка",
        "2 ст.л. Масло оливковое",
        "2 ч.л. Уксус красный винный",
        "Соль - по желанию",
        "Кунжут - при наличии",
        "Паприка(по желанию) - щепотка"
      ],
      instructions: "Переложите готовый нут в глубокую миску, влейте немного масла, чуть посолите. При желании, для красивого цвета можно всыпать щепотку паприки.Отрежьте стебли у шпината, редис нарежьте кружочками. Выложите по кругу шпинат, редис и киноа. Авокадо очистите от кожуры и косточки, нарежьте тонкими ломтиками. Помидоры черри разрежьте пополам, огурец - кружочками. Также выложите овощи по кругу тарелки. На шпинат положите нут.Слегка полейте овощи и киноа оливковым маслом, винным уксусом (или лимонным соком), можно чуть посолить по вкусу, посыпьте листиками петрушки. Для придания блюду орехового вкуса некоторые овощи можно посыпать обжаренным кунжутом."
    },
    {
      id: 5,
      image: "hehevisa.png",
      title: "Чечевичный суп-пюре",
      shortText: "Традиционный согревающий индийский дал с ароматными специями.",
      ingredients: [
        " 150г стакан красной чечевицы",
        "1 томат",
        "имбирь",
        "куркума",
        "кумин"
      ],
      instructions: "Обжарьте в кастрюле тертый имбирь и специи в течение 30 секунд. Добавьте промытую чечевицу и нарезанный томат, залейте водой. Варите 20 минут до мягкости чечевицы, затем измельчите суп блендером до состояния пюре."
    },
    {
      id: 6,
      image: "hia.png",
      title: "Чиа-пудинг на кокосовом молоке",
      shortText: "Полезный десерт без сахара, богатый жирными кислотами Омега-3.",
      ingredients: [
        "3 ст.л. семян чиа",
        "150мл кокосового молока",
        "ягоды для украшения"
      ],
      instructions: "Залейте семена чиа кокосовым молоком, тщательно перемешайте, чтобы не было комочков. Оставьте в холодильнике минимум на 4 часа (лучше на ночь). Перед подачей украсьте пюре из свежих ягод или кусочками манго."
    }
  ];

  // Логика слайдера (показываем по 3 карточки на ПК, по 1 на мобильных)
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= recipes.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? recipes.length - 3 : prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо за заявку, ${name}! Мы свяжемся с вами по телефону: ${phone}`);
    setIsOpen(false);
    setName('');
    setPhone('');
  };

  return (
    <div>
      {/* Баннер */}
      <div className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${backgroundImage})` }}>
        <h1 className="hero-title">Студия Йоги «Гармония»</h1>
        <p className="hero-subtitle">Пространство, где тело обретает силу, а разум — абсолютное спокойствие.</p>
        <button className="btn-primary" onClick={() => setIsOpen(true)}>Записаться на практику</button>
      </div>

      {/* Направления */}
      <section className="directions-section">
        <h2 className="section-title">Наши направления</h2>
        <div className="cards-container">
          <div className="direction-card">
            <div className="card-icon">🌿</div>
            <h3 className="card-title">Хатха-йога</h3>
            <p className="card-text">Классическая практика, направленная на баланс силы и гибкости.</p>
          </div>
          <div className="direction-card">
            <div className="card-icon">✨</div>
            <h3 className="card-title">Кундалини</h3>
            <p className="card-text">Интенсивная работа с внутренней энергией через дыхание и мантры.</p>
          </div>
          <div className="direction-card">
            <div className="card-icon">🧘‍♀️</div>
            <h3 className="card-title">Медитация</h3>
            <p className="card-text">Практики глубокого расслабления и очищения разума от стресса.</p>
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ СЛАЙДЕРА РЕЦЕПТОВ С КАРТИНКАМИ */}
      <section className="recipes-section">
        <h2 className="section-title">Рецепты (Йога-питание)</h2>

        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={prevSlide}>‹</button>

          <div className="carousel-container">
            {/* Расчет сдвига: на ПК карточка занимает примерно 33.33% ширины контейнера */}
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}>
              {recipes.map((recipe) => (
                <div className="recipe-card-new" key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                  <div className="recipe-info-block">
                    <h3 className="recipe-title-new">{recipe.title}</h3>
                    <p className="recipe-text-new">{recipe.shortText}</p>
                    <button className="btn-secondary" onClick={() => setActiveRecipe(recipe)}>
                      Посмотреть рецепт
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>›</button>
        </div>
      </section>
      {/* НАЧАЛО НОВОЙ СЕКЦИИ: АККОРДЕОН (FAQ) */}
      <section className="faq-section">
        <h2 className="section-title">Часто задаваемые вопросы</h2>

        <div className="accordion-container">
          {[
            {
              q: "Нужна ли физическая подготовка для первых занятий?",
              a: "Абсолютно нет! Наши практики Хатха-йоги и медитации рассчитаны в том числе на новичков. Преподаватель всегда предлагает несколько уровней сложности для каждого упражнения, чтобы вы чувствовали себя комфортно."
            },
            {
              q: "Что необходимо взять с собой на практику?",
              a: "Мы рекомендуем взять удобную спортивную одежду, которая не стесняет движений. Занятия проходят босиком или в носках. Коврики, пледы и все необходимые пропсы (блоки, ремни) в нашей студии предоставляются бесплатно."
            },
            {
              q: "Как часто нужно заниматься, чтобы увидеть результат?",
              a: "Для стабильного улучшения гибкости, укрепления мышц и снижения уровня стресса мы рекомендуем посещать занятия 2–3 раза в неделю. Однако даже одна практика в неделю принесет ощутимую пользу вашему телу и разуму."
            }
          ].map((faq, index) => {
            // Создаем локальное состояние для отслеживания открытого вопроса
            const [isActive, setIsActive] = useState(false);

            return (
              <div key={index} className={`accordion-item ${isActive ? 'active' : ''}`}>
                <div className="accordion-header" onClick={() => setIsActive(!isActive)}>
                  <span className="accordion-question">{faq.q}</span>
                  <span className="accordion-icon">▼</span>
                </div>
                <div className="accordion-collapse">
                  <div className="accordion-body">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* КОНЕЦ СЕКЦИИ АККОРДЕОНА */}


      {/* МОДАЛЬНОЕ ОКНО ДЛЯ РЕЦЕПТА */}
      {activeRecipe && (
        <div className="modal-overlay" onClick={() => setActiveRecipe(null)}>
          <div className="modal-content recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveRecipe(null)}>×</button>

            <img src={activeRecipe.image} alt={activeRecipe.title} className="modal-recipe-img" />
            <h3 className="modal-title" style={{ marginTop: '15px' }}>{activeRecipe.title}</h3>

            <div className="modal-recipe-body">
              {/* Блок Ингредиентов (рендерится, только если они прописаны как массив) */}
              {activeRecipe.ingredients && (
                <div className="recipe-block">
                  <h4 className="recipe-block-title">🥑 Ингредиенты:</h4>
                  <ul className="ingredients-list">
                    {activeRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="ingredient-item">✨ {ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Блок Приготовления */}
              {activeRecipe.instructions && (
                <div className="recipe-block" style={{ marginTop: '20px' }}>
                  <h4 className="recipe-block-title">🥣 Способ приготовления:</h4>
                  <p className="recipe-instructions-text">{activeRecipe.instructions}</p>
                </div>
              )}

              {/* Старый вариант вывода на случай, если у других рецептов текст еще не разделен */}
              {activeRecipe.fullText && (
                <p className="modal-recipe-fulltext">{activeRecipe.fullText}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Стандартное модальное окно записи */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsOpen(false)}>×</button>
            <h3 className="modal-title">Запись на занятие</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" placeholder="Ваше имя" required value={name} onChange={(e) => setName(e.target.value)} />
              <input type="tel" placeholder="Номер телефона" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              <button type="submit" className="btn-primary">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home