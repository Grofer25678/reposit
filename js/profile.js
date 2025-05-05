// Инициализация графика прогресса
document.addEventListener('DOMContentLoaded', function() {
    // Расчет дней до экзамена
    const examDate = new Date('2025-05-22');
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('profileDaysLeft').textContent = diffDays;
    
    // Инициализация графика
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май'],
            datasets: [{
                label: 'Прогресс подготовки',
                data: [5, 15, 35, 60, 68],
                backgroundColor: 'rgba(142, 68, 173, 0.1)',
                borderColor: 'rgba(142, 68, 173, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Загрузка данных прогресса из localStorage
    const progressData = JSON.parse(localStorage.getItem('chemProgress')) || {
        topicsPassed: 24,
        tasksSolved: 156,
        progressPercent: 68
    };
    
    // Здесь можно обновить данные на странице, если нужно
});

// Анимация кругов прогресса
document.querySelectorAll('.stat-circle').forEach(circle => {
    const percent = circle.style.getPropertyValue('--percent');
    const progress = circle.querySelector('.progress');
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    progress.style.strokeDasharray = circumference;
    progress.style.strokeDashoffset = offset;
});