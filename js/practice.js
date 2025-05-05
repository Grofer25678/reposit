// Фильтрация практических заданий
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const practiceCards = document.querySelectorAll('.practice-card');
            
            practiceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-level') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Открытие модального окна практики
function startPractice(type) {
    const modal = document.getElementById('practiceModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Устанавливаем заголовок в зависимости от типа практики
    switch(type) {
        case 'formulas':
            modalTitle.textContent = 'Составление формул';
            break;
        case 'coefficients':
            modalTitle.textContent = 'Расстановка коэффициентов';
            break;
        case 'experiments':
            modalTitle.textContent = 'Решение экспериментальных задач';
            break;
        case 'calculations':
            modalTitle.textContent = 'Расчетные задачи';
            break;
    }
    
    // Загрузка данных из localStorage
    const practiceData = JSON.parse(localStorage.getItem('practiceData')) || {
        formulas: { correct: 12, incorrect: 4 },
        coefficients: { correct: 8, incorrect: 6 },
        experiments: { correct: 5, incorrect: 7 },
        calculations: { correct: 3, incorrect: 9 }
    };
    
    // Установка статистики
    document.getElementById('correctCount').textContent = practiceData[type].correct;
    document.getElementById('incorrectCount').textContent = practiceData[type].incorrect;
    
    const accuracy = Math.round(
        practiceData[type].correct / (practiceData[type].correct + practiceData[type].incorrect) * 100
    );
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    // Показываем модальное окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closePracticeModal() {
    const modal = document.getElementById('practiceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Проверка ответа
function checkFormula() {
    const input = document.getElementById('formulaInput').value.trim();
    const feedback = document.getElementById('taskFeedback');
    
    // Простая проверка (в реальном приложении будет более сложная логика)
    if (input.toLowerCase() === 'al2o3' || input === 'Al₂O₃') {
        feedback.querySelector('.feedback-incorrect').style.display = 'none';
        feedback.querySelector('.feedback-correct').style.display = 'flex';
        
        // Обновляем статистику
        updatePracticeStats('correct');
    } else {
        feedback.querySelector('.feedback-correct').style.display = 'none';
        feedback.querySelector('.feedback-incorrect').style.display = 'flex';
        
        // Обновляем статистику
        updatePracticeStats('incorrect');
    }
    
    feedback.style.display = 'block';
}

// Обновление статистики практики
function updatePracticeStats(type) {
    const modalTitle = document.getElementById('modalTitle').textContent;
    let practiceType = '';
    
    // Определяем тип практики по заголовку
    if (modalTitle.includes('формул')) practiceType = 'formulas';
    else if (modalTitle.includes('коэффициент')) practiceType = 'coefficients';
    else if (modalTitle.includes('эксперимент')) practiceType = 'experiments';
    else if (modalTitle.includes('расчет')) practiceType = 'calculations';
    
    // Загружаем данные
    const practiceData = JSON.parse(localStorage.getItem('practiceData')) || {
        formulas: { correct: 0, incorrect: 0 },
        coefficients: { correct: 0, incorrect: 0 },
        experiments: { correct: 0, incorrect: 0 },
        calculations: { correct: 0, incorrect: 0 }
    };
    
    // Обновляем данные
    practiceData[practiceType][type]++;
    
    // Сохраняем
    localStorage.setItem('practiceData', JSON.stringify(practiceData));
    
    // Обновляем отображение статистики
    document.getElementById('correctCount').textContent = practiceData[practiceType].correct;
    document.getElementById('incorrectCount').textContent = practiceData[practiceType].incorrect;
    
    const accuracy = Math.round(
        practiceData[practiceType].correct / (practiceData[practiceType].correct + practiceData[practiceType].incorrect) * 100
    );
    document.getElementById('accuracy').textContent = accuracy + '%';
}

// Показ подсказки
function showHint() {
    alert('Подсказка: Al имеет степень окисления +3, O - -2. Наименьшее общее кратное 6. Значит Al₂O₃.');
}

// Следующее задание
function nextTask() {
    const feedback = document.getElementById('taskFeedback');
    feedback.style.display = 'none';
    document.getElementById('formulaInput').value = '';
    
    // В реальном приложении здесь будет загрузка нового задания
    const questions = [
        "Составьте формулу сульфата железа(III):",
        "Составьте формулу нитрата кальция:",
        "Составьте формулу фосфата аммония:"
    ];
    
    const currentQuestion = document.querySelector('.task-question p');
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion.textContent = questions[randomIndex];
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('practiceModal');
    if (event.target === modal) {
        closePracticeModal();
    }
});