// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked nav item
    event.target.closest('.nav-item').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Дашборд',
        'schedule': 'Управление расписанием',
        'students': 'База учеников',
        'finance': 'Финансовый блок',
        'content': 'Редактор контента'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

// Initialize Charts
function initCharts() {
    // Income Chart
    const incomeCtx = document.getElementById('incomeChart').getContext('2d');
    new Chart(incomeCtx, {
        type: 'line',
        data: {
            labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'],
            datasets: [{
                label: 'Доход (₸)',
                data: [56000, 63000, 70000, 77000, 84000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ₸';
                        }
                    }
                }
            }
        }
    });

    // Workload Chart
    const workloadCtx = document.getElementById('workloadChart').getContext('2d');
    new Chart(workloadCtx, {
        type: 'bar',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Занятий',
                data: [4, 5, 6, 5, 7, 3, 0],
                backgroundColor: '#3498db',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Schedule Functions
function checkGaps() {
    const result = document.getElementById('gapsResult');
    result.style.display = 'block';
    result.className = 'alert info';
    result.innerHTML = `
        <strong>Найдено свободных окон:</strong><br>
        • 17.01.2026: 15:00 - 16:00 (1 час)<br>
        • 18.01.2026: 14:00 - 16:00 (2 часа)<br>
        • 19.01.2026: 17:00 - 19:00 (2 часа)
    `;
}

// Student Functions
function addStudent() {
    const name = prompt('Введите имя ученика:');
    if (name) {
        alert('Функция добавления ученика будет реализована с backend');
    }
}

// Finance Functions
function generateKaspiLink() {
    const link = 'https://kaspi.kz/pay/YOUR_MERCHANT_ID?amount=7000';
    const result = document.getElementById('kaspiLinkResult');
    result.style.display = 'block';
    result.className = 'alert success';
    result.innerHTML = `
        <strong>Ссылка сформирована:</strong><br>
        <a href="${link}" target="_blank">${link}</a><br>
        <small>Скопируйте и отправьте ученику</small>
    `;
    
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
        console.log('Ссылка скопирована в буфер обмена');
    });
}

// Content Functions
function saveContent() {
    const result = document.getElementById('contentSaveResult');
    result.style.display = 'block';
    result.className = 'alert success';
    result.textContent = 'Изменения успешно сохранены!';
    
    setTimeout(() => {
        result.style.display = 'none';
    }, 3000);
}

function uploadMaterial() {
    alert('Функция загрузки материалов будет реализована с backend');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    
    // Simulate real-time updates
    setInterval(() => {
        const todayLessons = document.getElementById('todayLessons');
        const currentValue = parseInt(todayLessons.textContent);
        // This is just a demo - in real app, fetch from backend
    }, 30000);
});

// Handle navigation clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            if (document.getElementById(sectionId)) {
                showSection(sectionId);
            }
        }
    });
});
