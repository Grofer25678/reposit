// Основные функции
function toggleTopic(topicId) {
    const topic = document.getElementById(topicId);
    const card = topic.parentElement;
    
    card.classList.toggle('active');
    
    // Записываем прогресс
    if (card.classList.contains('active')) {
        updateProgress(topicId, 1);
    }
}

function searchTheory() {
    const query = document.getElementById('theorySearch').value.toLowerCase();
    if (!query) return;
    
    const topics = document.querySelectorAll('.topic-content');
    let found = false;
    
    topics.forEach(topic => {
        const text = topic.textContent.toLowerCase();
        if (text.includes(query)) {
            topic.parentElement.classList.add('active');
            topic.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Подсветка текста
            const regex = new RegExp(query, 'gi');
            const highlighted = topic.innerHTML.replace(
                regex, 
                match => `<span class="highlight">${match}</span>`
            );
            topic.innerHTML = highlighted;
            
            found = true;
        }
    });
    
    if (!found) {
        alert('По вашему запросу ничего не найдено. Попробуйте изменить формулировку.');
    }
}

// Интерактивная атомная модель
function updateAtomModel() {
    const element = document.getElementById('elementSelector').value;
    const atomModel = document.getElementById('atomModel');
    const atomStats = document.getElementById('atomStats');
    
    const elements = {
        'H': { protons: 1, neutrons: 0, electrons: 1 },
        'C': { protons: 6, neutrons: 6, electrons: 6 },
        'O': { protons: 8, neutrons: 8, electrons: 8 },
        'Fe': { protons: 26, neutrons: 30, electrons: 26 }
    };
    
    const data = elements[element];
    
    // Очищаем модель
    atomModel.innerHTML = '';
    
    // Добавляем ядро
    const nucleus = document.createElement('div');
    nucleus.className = 'nucleus';
    nucleus.textContent = element;
    atomModel.appendChild(nucleus);
    
    // Добавляем электроны
    for (let i = 0; i < data.electrons; i++) {
        const electron = document.createElement('div');
        electron.className = 'electron';
        electron.style.setProperty('--angle', `${(i / data.electrons) * 360}deg`);
        electron.style.animationDelay = `${i * 0.1}s`;
        atomModel.appendChild(electron);
    }
    
    // Обновляем статистику
    atomStats.innerHTML = `
        <p><strong>Протоны:</strong> ${data.protons}</p>
        <p><strong>Нейтроны:</strong> ${data.neutrons}</p>
        <p><strong>Электроны:</strong> ${data.electrons}</p>
    `;
}

// Периодическая таблица
function initPeriodicTable() {
    const table = document.getElementById('periodicTable');
    const elementInfo = document.getElementById('elementInfo');
    
    const elements = [
        { symbol: 'H', name: 'Водород', number: 1, mass: 1.008, group: 'Неметаллы' },
        { symbol: 'He', name: 'Гелий', number: 2, mass: 4.003, group: 'Инертные газы' },
        // ... другие элементы
        { symbol: 'Fe', name: 'Железо', number: 26, mass: 55.845, group: 'Переходные металлы' }
    ];
    
    elements.forEach(element => {
        const el = document.createElement('div');
        el.className = 'element';
        el.textContent = element.symbol;
        el.title = `${element.name} (${element.number})`;
        
        el.addEventListener('click', () => {
            elementInfo.innerHTML = `
                <h4>${element.name} (${element.symbol})</h4>
                <p><strong>Атомный номер:</strong> ${element.number}</p>
                <p><strong>Атомная масса:</strong> ${element.mass}</p>
                <p><strong>Группа:</strong> ${element.group}</p>
            `;
        });
        
        table.appendChild(el);
    });
}

// Классификация соединений
function checkClassification(type) {
    const compound = document.getElementById('compoundToClassify').textContent;
    const feedback = document.getElementById('classificationFeedback');
    
    const answers = {
        'H₂SO₄': 'acid',
        'NaOH': 'base',
        'NaCl': 'salt',
        'CO₂': 'oxide'
    };
    
    const currentCompound = Object.keys(answers).find(key => compound.includes(key));
    
    if (answers[currentCompound] === type) {
        feedback.innerHTML = `<i class="fas fa-check"></i> Верно! ${currentCompound} - это ${getTypeName(type)}`;
        feedback.className = 'classification-feedback correct';
        
        // Показываем следующее соединение через 1.5 секунды
        setTimeout(nextClassification, 1500);
    } else {
        feedback.innerHTML = `<i class="fas fa-times"></i> Неверно. Попробуй еще раз!`;
        feedback.className = 'classification-feedback incorrect';
    }
}

function nextClassification() {
    const compounds = ['H₂SO₄', 'NaOH', 'NaCl', 'CO₂'];
    const current = document.getElementById('compoundToClassify').textContent;
    let nextIndex = compounds.findIndex(c => current.includes(c)) + 1;
    if (nextIndex >= compounds.length) nextIndex = 0;
    
    document.getElementById('compoundToClassify').textContent = compounds[nextIndex];
    document.getElementById('classificationFeedback').className = 'classification-feedback';
}

function getTypeName(type) {
    const names = {
        'oxide': 'оксид',
        'acid': 'кислота',
        'base': 'основание',
        'salt': 'соль'
    };
    return names[type];
}

// Балансировка уравнений
function balanceReaction(reactionId) {
    const reactions = {
        'reaction1': { 
            unbalanced: 'Mg + O<sub>2</sub> → MgO', 
            balanced: '2Mg + O<sub>2</sub> → 2MgO' 
        },
        'reaction2': { 
            unbalanced: 'H<sub>2</sub>O → H<sub>2</sub> + O<sub>2</sub>', 
            balanced: '2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>' 
        },
        'reaction3': { 
            unbalanced: 'Zn + HCl → ZnCl<sub>2</sub> + H<sub>2</sub>', 
            balanced: 'Zn + 2HCl → ZnCl<sub>2</sub> + H<sub>2</sub>' 
        },
        'reaction4': { 
            unbalanced: 'AgNO<sub>3</sub> + NaCl → AgCl + NaNO<sub>3</sub>', 
            balanced: 'AgNO<sub>3</sub> + NaCl → AgCl + NaNO<sub>3</sub>' 
        }
    };
    
    const reactionElement = event.target.parentElement.querySelector('span');
    const button = event.target;
    
    if (reactionElement.innerHTML.includes(reactions[reactionId].unbalanced)) {
        reactionElement.innerHTML = reactions[reactionId].balanced;
        button.textContent = "Сбросить";
        button.classList.add('btn-success');
        
        setTimeout(() => {
            button.classList.remove('btn-success');
        }, 1000);
    } else {
        reactionElement.innerHTML = reactions[reactionId].unbalanced;
        button.textContent = "Уравнять";
    }
}

// Определение типов реакций
const reactionExamples = [
    { reaction: '2Mg + O<sub>2</sub> → 2MgO', type: 'combination' },
    { reaction: '2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>', type: 'decomposition' },
    { reaction: 'Zn + 2HCl → ZnCl<sub>2</sub> + H<sub>2</sub>', type: 'replacement' },
    { reaction: 'AgNO<sub>3</sub> + NaCl → AgCl + NaNO<sub>3</sub>', type: 'exchange' }
];

let currentReactionIndex = 0;

function checkReactionType(type) {
    const feedback = document.getElementById('reactionFeedback');
    const currentReaction = reactionExamples[currentReactionIndex];
    
    if (currentReaction.type === type) {
        feedback.innerHTML = '<i class="fas fa-check"></i> Верно! ' + getReactionTypeDescription(type);
        feedback.className = 'reaction-feedback correct';
    } else {
        feedback.innerHTML = '<i class="fas fa-times"></i> Неверно. Попробуй еще раз!';
        feedback.className = 'reaction-feedback incorrect';
    }
}

function nextReaction() {
    currentReactionIndex = (currentReactionIndex + 1) % reactionExamples.length;
    document.getElementById('currentReaction').innerHTML = reactionExamples[currentReactionIndex].reaction;
    document.getElementById('reactionFeedback').className = 'reaction-feedback';
}

function getReactionTypeDescription(type) {
    const descriptions = {
        'combination': 'Это реакция соединения, так как из нескольких веществ образуется одно сложное.',
        'decomposition': 'Это реакция разложения, так как из одного вещества образуется несколько.',
        'replacement': 'Это реакция замещения, так как атомы простого вещества замещают атомы в сложном.',
        'exchange': 'Это реакция обмена, так как вещества обмениваются своими составными частями.'
    };
    return descriptions[type];
}

// Номенклатура органических соединений
const organicCompounds = [
    { formula: 'CH<sub>3</sub>-CH<sub>2</sub>-CH<sub>3</sub>', name: 'пропан' },
    { formula: 'CH<sub>2</sub>=CH<sub>2</sub>', name: 'этен' },
    { formula: 'CH≡CH', name: 'этин' },
    { formula: 'CH<sub>3</sub>-CH<sub>2</sub>-OH', name: 'этанол' }
];

let currentCompoundIndex = 0;

function checkNomenclature() {
    const answer = document.getElementById('nomenclatureAnswer').value.toLowerCase();
    const feedback = document.getElementById('nomenclatureFeedback');
    const correctName = organicCompounds[currentCompoundIndex].name;
    
    if (answer === correctName) {
        feedback.innerHTML = '<i class="fas fa-check"></i> Верно! Правильное название: ' + correctName;
        feedback.className = 'nomenclature-feedback correct';
        
        // Автоматически переходим к следующему соединению через 1.5 секунды
        setTimeout(nextCompound, 1500);
    } else {
        feedback.innerHTML = '<i class="fas fa-times"></i> Неверно. Попробуй еще раз!';
        feedback.className = 'nomenclature-feedback incorrect';
    }
}

function nextCompound() {
    currentCompoundIndex = (currentCompoundIndex + 1) % organicCompounds.length;
    document.getElementById('compoundToName').innerHTML = organicCompounds[currentCompoundIndex].formula;
    document.getElementById('nomenclatureAnswer').value = '';
    document.getElementById('nomenclatureFeedback').className = 'nomenclature-feedback';
}

// Электролиз
function togglePower() {
    const powerSwitch = document.querySelector('.power-switch');
    powerSwitch.classList.toggle('active');
    
    const products = document.getElementById('electrolysisProducts');
    const solution = document.querySelector('.solution');
    
    if (powerSwitch.classList.contains('active')) {
        // Включаем электролиз
        products.classList.remove('hidden');
        solution.style.borderColor = 'var(--success)';
        
        // Создаем пузырьки газа
        createBubbles(document.querySelector('.electrolysis-setup'), 10);
    } else {
        // Выключаем электролиз
        products.classList.add('hidden');
        solution.style.borderColor = 'var(--secondary)';
    }
}

function createBubbles(container, count) {
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Случайная позиция
        const left = Math.random() * 80 + 10;
        const size = Math.random() * 15 + 5;
        const delay = Math.random() * 1.5;
        
        bubble.style.left = `${left}%`;
        bubble.style.bottom = '20%';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.animationDelay = `${delay}s`;
        
        container.appendChild(bubble);
        
        // Удаляем пузырек после анимации
        setTimeout(() => {
            bubble.remove();
        }, 1500);
    }
}

function predictElectrolysis() {
    const electrolyte = document.getElementById('electrolyteSelect').value;
    const feedback = document.getElementById('electrolysisFeedback');
    
    const results = {
        'NaCl': {
            anode: '2Cl<sup>-</sup> → Cl<sub>2</sub> + 2e<sup>-</sup>',
            cathode: '2H<sub>2</sub>O + 2e<sup>-</sup> → H<sub>2</sub> + 2OH<sup>-</sup>'
        },
        'CuSO4': {
            anode: '4OH<sup>-</sup> → O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>-</sup>',
            cathode: 'Cu<sup>2+</sup> + 2e<sup>-</sup> → Cu'
        },
        'NaOH': {
            anode: '4OH<sup>-</sup> → O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>-</sup>',
            cathode: '2H<sub>2</sub>O + 2e<sup>-</sup> → H<sub>2</sub> + 2OH<sup>-</sup>'
        },
        'AgNO3': {
            anode: '4OH<sup>-</sup> → O<sub>2</sub> + 2H<sub>2</sub>O + 4e<sup>-</sup>',
            cathode: 'Ag<sup>+</sup> + e<sup>-</sup> → Ag'
        }
    };
    
    feedback.innerHTML = `
        <h5>Продукты электролиза ${electrolyte}:</h5>
        <p><strong>На аноде:</strong> ${results[electrolyte].anode}</p>
        <p><strong>На катоде:</strong> ${results[electrolyte].cathode}</p>
    `;
    feedback.className = 'electrolysis-feedback show';
}

// Система прогресса
function updateProgress(topicId, status) {
    const progress = JSON.parse(localStorage.getItem('theoryProgress')) || {};
    progress[topicId] = status;
    localStorage.setItem('theoryProgress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('theoryProgress')) || {};
    Object.keys(progress).forEach(topicId => {
        const element = document.getElementById(topicId);
        if (element) {
            element.parentElement.classList.add('completed');
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация атомной модели
    updateAtomModel();
    
    // Инициализация периодической таблицы
    initPeriodicTable();
    
    // Загрузка прогресса
    loadProgress();
    
    // Назначаем обработчики
    document.getElementById('elementSelector').addEventListener('change', updateAtomModel);
    document.getElementById('theorySearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchTheory();
    });
});