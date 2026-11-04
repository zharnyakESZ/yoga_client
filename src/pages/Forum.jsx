import React, { useState, useEffect } from 'react';

function Forum() {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Состояния для веток комментариев
  const [activeTopicComments, setActiveTopicComments] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Состояния для Inline-редактирования комментариев
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Загрузка тем из Django API
  const loadTopics = () => {
    fetch('/api/forum/', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Сервер ответил ошибкой: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTopics(data);
        } else if (data.topics && Array.isArray(data.topics)) {
          setTopics(data.topics);
        }
      })
      .catch((err) => console.error('Ошибка загрузки форума:', err));
  };

  useEffect(() => {
    loadTopics();
  }, []);

  // Создание новой темы через POST
  const handleCreateTopic = (e) => {
    e.preventDefault();
    fetch('/api/forum/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.id) {
          setTitle('');
          setDescription('');
          loadTopics();
          setMessage('Тема успешно добавлена!');
          setTimeout(() => setMessage(''), 3000);
        } else {
          console.error('Сервер вернул ошибку:', data.error);
        }
      })
      .catch((err) => console.error('Ошибка при создании темы:', err));
  };

  // Удаление темы через DELETE
  // 1. ИСПРАВЛЕННОЕ УДАЛЕНИЕ С ПЕРЕДАЧЕЙ СЕССИИ
  const handleDeleteTopic = (topicId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту тему?')) return;

    fetch(`/api/forum/${topicId}/`, {
      method: 'DELETE',
      // ДОБАВЛЯЕМ ЭТУ СТРОКУ, ЧТОБЫ DJANGO ПОНЯЛ, ЧТО ЭТО КРИСТИНА:
      credentials: 'include', 
    })
      .then((res) => {
        if (res.ok) {
          setTopics(topics.filter((topic) => topic.id !== topicId));
          if (activeTopicComments === topicId) setActiveTopicComments(null);
        } else {
          alert('У вас нет прав на удаление или сессия устарела. Проверьте статус администратора.');
        }
      })
      .catch((err) => console.error('Ошибка при удалении:', err));
  };


  // Добавление комментария через POST
// Добавление комментария через POST
  const handleAddComment = (e, topicId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // ВНИМАНИЕ: Сверяем адрес строго с urls.py бэкенда!
    fetch(`/api/forum/${topicId}/comments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ text: commentText }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        loadTopics(); // Перезагружаем посты с сервера
        setCommentText(''); // Сбрасываем текстовое поле
      })
      .catch((err) => {
        console.error('Ошибка при добавлении комментария:', err);
        alert('Не удалось отправить комментарий. Проверьте правильность путей API.');
      });
  };
  // Сохранение отредактированного комментария через PUT
  const handleSaveEditComment = (commentId) => {
    if (!editingText.trim()) return;
    fetch(`/api/comments/${commentId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editingText }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditingCommentId(null);
          setEditingText('');
          loadTopics();
        }
      })
      .catch((err) => console.error('Ошибка при изменении комментария:', err));
  };

  // Удаление комментария через DELETE
  const handleDeleteComment = (commentId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот комментарий?')) return;
    fetch(`/api/comments/${commentId}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          loadTopics();
        }
      })
      .catch((err) => console.error('Ошибка при удалении комментария:', err));
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#fbf9f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e35', marginBottom: '40px', fontWeight: '700', fontSize: '32px' }}>
        Форум «Гармония»
      </h1>

      {/* Форма создания темы */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #eae6df', maxWidth: '650px', margin: '0 auto 40px auto', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h3 style={{ color: '#2c3e35', marginTop: 0, marginBottom: '20px', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
          Создать новую тему
        </h3>
        {message && <p style={{ color: '#2ecc71', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>{message}</p>}

        <form onSubmit={handleCreateTopic} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Название темы..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none', fontSize: '15px' }}
          />
          <textarea
            placeholder="Описание обсуждения..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #eae6df', borderRadius: '10px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', fontSize: '15px', resize: 'vertical' }}
          ></textarea>
          <button
            type="submit"
            style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '25px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', alignSelf: 'center' }}
          >
            Опубликовать
          </button>
        </form>
      </div>

      {/* Список существующих тем */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {topics.map((topic) => (
          <div key={topic.id} style={{ background: 'white', padding: '25px 30px', borderRadius: '20px', border: '1px solid #eae6df', boxShadow: '0 4px 12px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>

            {/* Шапка карточки: Заголовок и Кнопка Удалить */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
              <h2 style={{ color: '#2c3e35', margin: 0, fontSize: '20px', fontWeight: '600', lineHeight: '1.4' }}>
                {topic.title}
              </h2>
              <button
                onClick={() => handleDeleteTopic(topic.id)}
                title="Удалить тему"
                style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '16px', padding: '4px', borderRadius: '50%' }}
              >
                🗑️
              </button>
            </div>

            <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '15px' }}>
              {topic.description}
            </p>

            {/* Мета-данные и кнопка комментариев */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#888', fontSize: '13px', borderTop: '1px solid #f5f2eb', paddingTop: '12px', marginTop: '5px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✍️ Автор: <strong style={{ color: '#4a6b5d', fontWeight: '600' }}>{topic.author || 'Аноним'}</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  📅 Дата: {topic.created_at || 'Не указана'}
                </span>
              </div>

              <button
                onClick={() => setActiveTopicComments(activeTopicComments === topic.id ? null : topic.id)}
                style={{ background: '#f7f5f0', border: 'none', padding: '6px 12px', borderRadius: '15px', color: '#4a6b5d', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}
              >
                💬 Комментарии ({topic.comments ? topic.comments.length : 0})
              </button>
            </div>

            {/* ВЕТКА КОММЕНТАРИЕВ (выдвижная панель) */}
            {activeTopicComments === topic.id && (
              <div style={{ marginTop: '15px', padding: '15px', background: '#fcfbfa', borderRadius: '12px', border: '1px dashed #eae6df' }}>

                {/* Список комментов */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                  {topic.comments && topic.comments.length > 0 ? (
                    topic.comments.map((comment) => (
                      <div key={comment.id} style={{ padding: '10px 12px', background: 'white', borderRadius: '8px', border: '1px solid #f0ede7' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                          <strong style={{ color: '#4a6b5d' }}>{comment.author || 'Аноним'}</strong>

                          {/* Панель времени и иконок удаления/редактирования */}
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span>{comment.created_at || ''}</span>
                            <button 
                              onClick={() => { setEditingCommentId(comment.id); setEditingText(comment.text); }}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                              title="Редактировать"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                              title="Удалить"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        {/* Если этот коммент сейчас редактируется */}
                        {editingCommentId === comment.id ? (
                          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                            <input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              style={{ flexGrow: 1, padding: '4px 8px', border: '1px solid #4a6b5d', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
                            />
                            <button onClick={() => handleSaveEditComment(comment.id)} style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                              Сохранить
                            </button>
                            <button onClick={() => setEditingCommentId(null)} style={{ background: '#eee', color: '#333', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                              Отмена
                            </button>
                          </div>
                        ) : (
                          <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>{comment.text}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p style={{ margin: 0, color: '#999', fontSize: '13px', textAlign: 'center', padding: '10px 0' }}>Здесь пока нет комментариев. Станьте первым!</p>
                  )}
                </div>

                {/* Форма отправки коммента */}
                <form onSubmit={(e) => handleAddComment(e, topic.id)} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Напишите комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    style={{ flexGrow: 1, padding: '8px 12px', border: '1px solid #eae6df', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
                  />
                  <button
                    type="submit"
                    style={{ background: '#4a6b5d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
                  >
                    Отправить
                  </button>
                </form>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;