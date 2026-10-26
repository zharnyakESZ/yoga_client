import { useState } from 'react'
import '../Calculator.css'

function Calculator() {
  // Состояния для полей ввода
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('female')
  const [activity, setActivity] = useState('1.2')

  // Состояния для результатов
  const [bmi, setBmi] = useState(null)
  const [bmiStatus, setBmiStatus] = useState('')
  const [calories, setCalories] = useState(null)

  const calculateResults = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // Переводим рост в метры
    const a = parseInt(age)

    if (!w || !h || !a) return

    // 1. Расчет ИМТ
    const bmiValue = (w / (h * h)).toFixed(1)
    setBmi(bmiValue)

    // Определение статуса ИМТ
    if (bmiValue < 18.5) setBmiStatus('Дефицит массы тела 🟡')
    else if (bmiValue >= 18.5 && bmiValue < 25) setBmiStatus('Нормальный вес 🟢')
    else if (bmiValue >= 25 && bmiValue < 30) setBmiStatus('Избыточный вес 🟡')
    else setBmiStatus('Ожирение 🔴')

    // 2. Расчет нормы калорий по формуле Миффлина-Сан Жеора
    let bmr = 0
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * (h * 100) - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * (h * 100) - 5 * a - 161
    }

    const totalCalories = Math.round(bmr * parseFloat(activity))
    setCalories(totalCalories)
  }

  return (
    <div className="calc-container">
      <h2 className="calc-header">Калькулятор здоровья</h2>
      <p className="calc-subheader">Узнайте свой Индекс массы тела и получите точный расчет суточной нормы калорий.</p>

      <div className="calc-layout">
        {/* Форма ввода данных */}
        <form onSubmit={calculateResults} className="calc-form">
          <div className="form-group-gender">
            <label className={`gender-label ${gender === 'female' ? 'active' : ''}`}>
              <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
              Женщина
            </label>
            <label className={`gender-label ${gender === 'male' ? 'active' : ''}`}>
              <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
              Мужчина
            </label>
          </div>

          <div className="form-grid">
            <div className="input-field">
              <label>Ваш вес (кг):</label>
              <input type="number" min="30" max="200" required value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="60" />
            </div>
            <div className="input-field">
              <label>Ваш рост (см):</label>
              <input type="number" min="100" max="250" required value={height} onChange={(e) => setHeight(e.target.value)} placeholder="165" />
            </div>
            <div className="input-field">
              <label>Ваш возраст:</label>
              <input type="number" min="14" max="100" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
            </div>
          </div>

          <div className="input-field">
            <label>Уровень физической активности:</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="1.2">Минимальная активность (сидячий образ жизни)</option>
              <option value="1.375">Слабая активность (легкие тренировки или йога 1-3 раза в неделю)</option>
              <option value="1.55">Средняя активность (интенсивные практики 3-5 раз в неделю)</option>
              <option value="1.725">Высокая активность (тяжелые нагрузки каждый день)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary calc-btn">Рассчитать</button>
        </form>

        {/* Блок результатов */}
        <div className="calc-results">
          {bmi ? (
            <div className="results-wrapper">
              <div className="result-box">
                <span className="result-title">Ваш Индекс массы тела (ИМТ):</span>
                <span className="result-value">{bmi}</span>
                <span className="result-status">{bmiStatus}</span>
              </div>
              <div className="result-box calorie-box">
                <span className="result-title">Суточная норма калорий:</span>
                <span className="result-value">{calories} <small>ккал</small></span>
                <p className="result-tip">Используйте эту цифру для поддержания веса. Для снижения веса уменьшите калораж на 10-15%.</p>
              </div>
            </div>
          ) : (
            <div className="results-placeholder">
              <div className="placeholder-icon">📊</div>
              <p>Введите ваши параметры слева и нажмите кнопку «Рассчитать», чтобы получить персональные рекомендации.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator