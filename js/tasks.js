// Массив задач для тренировки
const tasksData = [
    {
        id: 1,
        theme: "Неорганическая химия",
        difficulty: "medium",
        number: "24",
        question: "При взаимодействии 16,2 г алюминия с серой образовалось 30,6 г сульфида алюминия. Определите массовую долю выхода продукта реакции от теоретически возможного.",
        answer: "68%",
        solution: [
            "Записываем уравнение реакции: 2Al + 3S → Al₂S₃",
            "Находим количество вещества алюминия: n(Al) = m/M = 16,2/27 = 0,6 моль",
            "По уравнению реакции: n(Al₂S₃) = 1/2 n(Al) = 0,3 моль",
            "Теоретическая масса Al₂S₃: m(теор) = n*M = 0,3*150 = 45 г",
            "Выход продукта: η = m(практ)/m(теор)*100% = 30,6/45*100% = 68%"
        ]
    },
    {
        id: 2,
        theme: "Органическая химия",
        difficulty: "hard",
        number: "32",
        question: "При сгорании 5,6 л (н.у.) газообразного органического вещества получили 16,8 л CO₂ и 13,5 г воды. Плотность паров этого вещества по водороду равна 30. Определите молекулярную формулу вещества.",
        answer: "C₃H₆O",
        solution: [
            "Находим количество вещества CO₂: n(CO₂) = V/Vm = 16,8/22,4 = 0,75 моль",
            "Находим количество вещества H₂O: n(H₂O) = m/M = 13,5/18 = 0,75 моль",
            "Находим количество вещества C и H: n(C) = 0,75 моль, n(H) = 1,5 моль",
            "Находим количество вещества исходного соединения: n(в-ва) = 5,6/22,4 = 0,25 моль",
            "Определяем формулу: C₃H₆Oₓ",
            "Находим молярную массу: M = D*M(H₂) = 30*2 = 60 г/моль",
            "Проверяем: 12*3 + 1*6 + 16*1 = 58 (не подходит), 12*3 + 1*6 + 16*1 = 58 (не подходит)",
            "Правильная формула: C₃H₆O"
        ]
    },
    {
        id: 3,
        theme: "Расчетные задачи",
        difficulty: "easy",
        number: "22",
        question: "Вычислите массу осадка, образовавшегося при сливании 200 г 10%-ного раствора хлорида бария и 100 г 15%-ного раствора сульфата натрия.",
        answer: "23,3 г",
        solution: [
            "Записываем уравнение реакции: BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl",
            "Находим массы веществ: m(BaCl₂) = 200*0,1 = 20 г; m(Na₂SO₄) = 100*0,15 = 15 г",
            "Находим количества веществ: n(BaCl₂) = 20/208 ≈ 0,096 моль; n(Na₂SO₄) = 15/142 ≈ 0,106 моль",
            "BaCl₂ в недостатке, расчет по нему",
            "n(BaSO₄) = n(BaCl₂) = 0,096 моль",
            "m(BaSO₄) = n*M = 0,096*233 ≈ 22,4 г"
        ]
    }
];

// Таймер для задачи
let timerInterval;
let seconds = 0;

// Загрузка задач при открытии страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка случайной задачи
    loadRandomTask();
    
    // Настройка таймера
    startTimer();
    
    // Обработчики событий
    document.getElementById('generateTask').addEventListener('click', loadRandomTask);
    document.getElementById('checkAnswer').addEventListener('click', checkTaskAnswer);
    document.getElementById('showSolution').addEventListener('click', showSolution);
    document.getElementById('nextTask').addEventListener('click', loadRandomTask);
    
    // Фильтрация задач
    document.getElementById('taskTheme').addEventListener('change', filterTasks);
    document.getElementById('taskDifficulty').addEventListener('change', filterTasks);
});

// Загрузка случайной задачи
function loadRandomTask() {
    // Сброс таймера
    resetTimer();
    startTimer();
    
    // Скрытие решения и обратной связи
    document.getElementById('taskSolution').classList.add('hidden');
    document.getElementById('taskFeedback').classList.add('hidden');
    
    // Очистка поля ответа
    document.getElementById('taskAnswer').value = '';
    
    // Получение выбранных фильтров
    const themeFilter = document.getElementById('taskTheme').value;
    const difficultyFilter = document.getElementById('taskDifficulty').value;
    
    // Фильтрация задач
    let filteredTasks = tasksData;
    
    if (themeFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => 
            task.theme.toLowerCase().includes(themeFilter)
        );
    }
    
    if (difficultyFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => 
            task.difficulty === difficultyFilter
        );
    }
    
    // Выбор случайной задачи из отфильтрованных
    if (filteredTasks.length > 0) {
        const randomTask = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
        displayTask(randomTask);
    } else {
        alert('Нет задач, соответствующих выбранным фильтрам. Попробуйте изменить критерии поиска.');
    }
}

// Отображение задачи на странице
function displayTask(task) {
    document.querySelector('.task-theme').textContent = task.theme;
    document.querySelector('.task-theme').className = 'task-theme';
    
    // Установка класса сложности
    const difficultyElement = document.querySelector('.task-difficulty');
    difficultyElement.textContent = getDifficultyText(task.difficulty);
    difficultyElement.className = 'task-difficulty ' + task.difficulty;
    
    document.querySelector('.task-number').textContent = 'Задача ' + task.number;
    document.querySelector('.task-question p').textContent = task.question;
    document.getElementById('correctAnswer').textContent = task.answer;
    
    // Очистка и заполнение решения
    const solutionList = document.querySelector('.task-solution ol');
    solutionList.innerHTML = '';
    
    task.solution.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        solutionList.appendChild(li);
    });
}

// Получение текста сложности
function getDifficultyText(difficulty) {
    switch(difficulty) {
        case 'easy': return 'Легкая сложность';
        case 'medium': return 'Средняя сложность';
        case 'hard': return 'Высокая сложность';
        default: return 'Неизвестная сложность';
    }
}

// Проверка ответа
function checkTaskAnswer() {
    const userAnswer = document.getElementById('taskAnswer').value.trim();
    const correctAnswer = document.getElementById('correctAnswer').textContent.trim();
    const feedback = document.getElementById('taskFeedback');
    
    // Показываем решение
    document.getElementById('taskSolution').classList.remove('hidden');
    
    // Проверяем ответ
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.querySelector('.feedback-incorrect').style.display = 'none';
        feedback.querySelector('.feedback-correct').style.display = 'flex';
        
        // Обновляем статистику (в реальном приложении)
        updateTaskStats(true);
    } else {
        feedback.querySelector('.feedback-correct').style.display = 'none';
        feedback.querySelector('.feedback-incorrect').style.display = 'flex';
        
        // Обновляем статистику (в реальном приложении)
        updateTaskStats(false);
    }
    
    feedback.classList.remove('hidden');
}

// Показать решение
function showSolution() {
    document.getElementById('taskSolution').classList.remove('hidden');
}

// Фильтрация задач
function filterTasks() {
    // В реальном приложении здесь будет обновление списка задач
    console.log('Фильтры изменены:', 
        document.getElementById('taskTheme').value,
        document.getElementById('taskDifficulty').value
    );
}

// Таймер
function startTimer() {
    seconds = 0;
    updateTimerDisplay();
    timerInterval = setInterval(function() {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('taskTime').textContent = 
        `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Обновление статистики (заглушка)
function updateTaskStats(isCorrect) {
    console.log(`Ответ ${isCorrect ? 'правильный' : 'неправильный'}`);
    // В реальном приложении здесь будет запись в localStorage или отправка на сервер
}