// создаем объект календаря и инициализируем его
var calendar = new Calendar();
calendar.init();

// добавляем обработчики перемещения по месяцам
document.getElementById('prev-month')
.addEventListener('click', calendar.prevMonth.bind(calendar));

document.getElementById('next-month')
.addEventListener('click', calendar.nextMonth.bind(calendar));

// добавляем обработчик установки текущего месяца
document.getElementById('today')
.addEventListener('click', calendar.today.bind(calendar));
