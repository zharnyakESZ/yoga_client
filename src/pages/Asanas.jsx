import { useState } from 'react'
import '../Asanas.css'

// ИМПОРТИРУЕМ ВСЕ НАШИ КАРТИНКИ ИЗ ПАПКИ ASSETS
import sukhasanaImg from '../assets/sukhasana.png'
import trikonasanaImg from '../assets/trikonasana.png'
import dogImg from '../assets/dog.png'
import vrikshasanaImg from '../assets/vrikshasana.png'
import headstandImg from '../assets/headstand.png'
import peacockImg from '../assets/peacock.png'

function Asanas() {
    const [filter, setFilter] = useState('all');
    // Добавили состояние для отслеживания выбранной асаны в модальном окне
    const [selectedAsana, setSelectedAsana] = useState(null);

    const asanasList = [
        {
            id: 1,
            image: sukhasanaImg,
            title: "Сукхасана",
            translate: "Удобная поза",
            level: "beginner",
            benefit: "Успокаивает ум, улучшает осанку, идеальна для медитации и дыхательных практик.",
            guide: "Сядьте на пол, скрестив ноги по-турецки. Положите ладони на колени. Держите спину абсолютно прямой, тянитесь макушкой вверх. Расслабьте глаза, лицо и челюсть. Дышите глубоко и ровно. Если сложно держать спину прямой, подложите под таз сложенное одеяло или блок."
        },
        {
            id: 2,
            image: trikonasanaImg,
            title: "Триконасана",
            translate: "Поза треугольника",
            level: "beginner",
            benefit: "Укрепляет ноги, растягивает подколенные сухожилия и раскрывает грудную клетку.",
            guide: "Поставьте ноги широко (около 1 метра). Поверните правую стопу наружу на 90 градусов, левую слегка внутрь. Вытяните руки в стороны параллельно полу. На выдохе наклонитесь вправо, вытягивая бок. Опустите правую руку на голень или пол, левую поднимите строго вверх. Смотрите на левую ладонь."
        },
        {
            id: 3,
            image: dogImg,
            title: "Адхо Мукха Шванасана",
            translate: "Собака мордой вниз",
            level: "beginner",
            benefit: "Удлиняет позвоночник, снимает усталость и растягивает заднюю поверхность тела.",
            guide: "Встаньте на четвереньки. Поставьте ладони на ширину плеч, стопы на ширину таза. На выдохе оттолкнитесь руками от пола и поднимите таз вверх и назад. Выпрямляйте спину и ноги, стремясь опустить пятки на пол. Расслабьте шею, голова свободно опущена вниз."
        },
        {
            id: 4,
            image: vrikshasanaImg,
            title: "Врикшасана",
            translate: "Поза дерева",
            level: "beginner",
            benefit: "Укрепляет мышцы ног, развивает чувство равновесия, улучшает концентрацию и фокус внимания.",
            guide: "Встаньте прямо, стопы вместе. Перенесите вес на левую руку/ногу. Поднимите правую ногу, согните в колене и установите стопу на внутреннюю поверхность левого бедра (избегая коленной чашечки). Поймайте баланс, соедините ладони перед грудью или вытяните руки вверх."
        },
        {
            id: 5,
            image: headstandImg,
            title: "Ширшасана",
            translate: "Стойка на голове",
            level: "advanced",
            benefit: "Королевская асана. Стимулирует работу мозга, улучшает кровообращение и баланс.",
            guide: "Выполняйте только при отсутствии противопоказаний! Опуститесь на колени, переплетите пальцы рук и положите предплечья на пол. Опустите макушку головы на пол так, чтобы затылок упирался в ладони. Поднимите таз, подойдите стопами ближе к голове и плавно поднимите ноги вертикально вверх."
        },
        {
            id: 6,
            image: peacockImg,
            title: "Маюрасана",
            translate: "Поза павлина",
            level: "advanced",
            benefit: "Укрепляет мышцы кора и рук, мощно стимулирует пищеварение и детоксикацию.",
            guide: "Встаньте на колени, соедините предплечья и ладони, развернув пальцы рук к ногам. Наклонитесь вперед, упритесь локтями в область живота чуть выше пупка. Подайте вес тела вперед, оторвите колени и стопы от пола, вытягивая ноги назад параллельно полу, балансируя на руках."
        }
    ];

    const filteredAsanas = asanasList.filter(asana => {
        if (filter === 'all') return true;
        return asana.level === filter;
    });

    return (
        <div className="asanas-container">
            <h2 className="asanas-header">Библиотека асан</h2>
            <p className="asanas-subheader">Изучите базовые и продвинутые позы йоги для самостоятельной практики.</p>

            <div className="filter-buttons">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Асаны йоги</button>
                <button className={`filter-btn ${filter === 'beginner' ? 'active' : ''}`} onClick={() => setFilter('beginner')}>Для начинающих</button>
                <button className={`filter-btn ${filter === 'advanced' ? 'active' : ''}`} onClick={() => setFilter('advanced')}>Продвинутые</button>
            </div>

            <div className="asanas-grid">
                {filteredAsanas.map((asana) => (
                    <div key={asana.id} className={`asana-card-item ${asana.level}`}>
                        <div className="asana-img-wrapper">
                            <img src={asana.image} alt={asana.title} className="asana-card-img" />
                        </div>

                        <div className="asana-info-block">
                            <h3 className="asana-title-text">{asana.title}</h3>
                            <span className="asana-translate-text">({asana.translate})</span>
                            <p className="asana-benefit-text">{asana.benefit}</p>

                            <button className="asana-read-more" onClick={() => setSelectedAsana(asana)}>
                                Читать далее...
                            </button>

                            <span className="asana-level-badge">
                                {asana.level === 'beginner' ? '🟢 Легко' : '🔥 Сложно'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ВСПЛЫВАЮЩЕЕ ОКНО ДЛЯ ПОДРОБНОГО ПРОСМОТРА АСАНЫ */}
            {selectedAsana && (
                <div className="asana-modal-overlay" onClick={() => setSelectedAsana(null)}>
                    <div className="asana-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="asana-modal-close" onClick={() => setSelectedAsana(null)}>×</button>

                        {/* Крупная картинка-инфографика */}
                        <div className="modal-asana-img-container">
                            <img src={selectedAsana.image} alt={selectedAsana.title} className="modal-asana-img" />
                        </div>

                        <h3 className="asana-modal-title">{selectedAsana.title}</h3>
                        <span className="asana-translate-text">({selectedAsana.translate})</span>

                        <div className="asana-modal-body">
                            <div className="asana-recipe-block">
                                <h4 className="recipe-block-title">🧘‍♀️ Польза асаны:</h4>
                                <p className="ingredient-item" style={{ fontSize: '15px', color: '#555', lineHeight: '1.5' }}>
                                    {selectedAsana.benefit}
                                </p>
                            </div>

                            {selectedAsana.guide && (
                                <div className="asana-recipe-block" style={{ marginTop: '20px' }}>
                                    <h4 className="recipe-block-title">🧭 Техника выполнения:</h4>
                                    <p className="recipe-instructions-text">{selectedAsana.guide}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Asanas