// Обработка FAQ
function toggleFaq(id) {
    const faqItem = document.getElementById(id).parentElement;
    faqItem.classList.toggle('active');
}

function showAllFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.classList.add('active');
    });
}

// Обработка формы поддержки
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const topic = document.getElementById('questionTopic').value;
    const question = document.getElementById('questionText').value.trim();
    const file = document.getElementById('questionFile').files[0];
    
    if (!question) {
        alert('Пожалуйста, опишите ваш вопрос');
        return;
    }
    
    // В реальном приложении здесь будет отправка на сервер
    console.log('Отправка вопроса:', {
        topic,
        question,
        fileName: file ? file.name : 'нет файла'
    });
    
    // Показываем сообщение об успешной отправке
    alert('Ваш вопрос отправлен! Георгий ответит вам в ближайшее время.');
    
    // Очищаем форму
    this.reset();
});

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    // Можно добавить загрузку часто задаваемых вопросов с сервера
});