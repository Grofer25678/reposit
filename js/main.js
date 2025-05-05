// Расчет дней до экзамена (22.05.2025)
document.addEventListener('DOMContentLoaded', function() {
    const examDate = new Date('2025-05-22');
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('days-left').textContent = diffDays;
    
    // Загрузка прогресса из localStorage
    const progressData = JSON.parse(localStorage.getItem('chemProgress')) || {
        topicsPassed: 24,
        tasksSolved: 156,
        progressPercent: 68
    };
    
    document.getElementById('topics-passed').textContent = progressData.topicsPassed;
    document.getElementById('tasks-solved').textContent = progressData.tasksSolved;
    document.getElementById('progress-percent').textContent = progressData.progressPercent + '%';
});

// Открытие чата поддержки
function openSupportChat() {
    const messages = [
        "Привет, Данил! Какой у тебя вопрос по химии?",
        "Данил, готов помочь с любой темой!",
        "Вижу, ты активно готовишься! Чем могу помочь?",
        "Готов объяснить сложную тему простыми словами!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    alert(randomMessage + "\n\n(Это демо-версия. В реальном сайте здесь будет чат с Георгием)");
}

// Навигация в личный кабинет
document.getElementById('userProfile').addEventListener('click', function() {
    window.location.href = 'profile.html';
});