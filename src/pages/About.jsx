function About() {
  return (
    <div className="about-container">
      <h2 className="about-header">О нашей студии «Гармония»</h2>
      <p className="about-description">
        Мы верим, что йога — это не просто комплекс упражнений, а путь к внутренней свободе, 
        здоровью и гармонии с окружающим миром. Наша студия создана как тихий островок спокойствия 
        посреди шумного города, где каждый найдет поддержку и профессиональный подход. </p>

      <div className="features-grid">
        <div className="feature-item">
          <h3 className="feature-title">Опытные мастера</h3>
          <p className="feature-text">Все наши сертифицированные преподаватели практикуют более 5 лет и бережно ведут учеников от первых асан до продвинутых техник.</p>
        </div>

        <div className="feature-item">
          <h3 className="feature-title">Уютная атмосфера</h3>
          <p className="feature-text">Светлые залы, мягкое освещение, приятная музыка и аромат благовоний помогут вам полностью расслабиться и отключиться от забот.</p>
        </div>

        <div className="feature-item">
          <h3 className="feature-title">Индивидуальный подход</h3>
          <p className="feature-text">Мы внимательно следим за уровнем подготовки каждого гостя, подбирая оптимальную нагрузку для вашего комфорта и безопасности.</p>
        </div>
      </div>
    </div>
  )
}

export default About