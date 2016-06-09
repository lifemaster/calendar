/* Конструктор календаря */
function Calendar() {
  // Объект текущей даты
  var now = new Date();

  // Объект отображаемой даты
  var dateForShowObj = new Date();

  // Таблица календаря
  var calendarTable = document.getElementById('calendar-table');

  // Массивы названий месяцев
  var monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентярь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  // Массивы названий дней недели
  var weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];

  // возвращает количество дней в месяце из объекта даты
  function getDaysCount(dateObj) {
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth();
    return new Date(new Date(year, month + 1).setDate(0)).getDate();
  }

  // метод установки дней и событий в календаре (движок календаря)
  this.init = function () {
    // номера месяца и года из объекта даты для показа
    var month = dateForShowObj.getMonth();
    var year  = dateForShowObj.getFullYear();

    // установка месяца и года
    document.getElementById('current-month').innerHTML = monthNames[month] + ' ' + year;

    // Объект первого дня месяца
    var firstDayOfMonthObj = new Date(year, month, 1);

    // смещение даты первого дня месяца до того числа прошлого месяца,
    // которое будет отображаться первым понедельником в таблице календаря
    var offsetDate = (firstDayOfMonthObj.getDay() == 0)
    ? firstDayOfMonthObj.getDate() - 6
    : firstDayOfMonthObj.getDate() - firstDayOfMonthObj.getDay() + 1;

    firstDayOfMonthObj.setDate(offsetDate);

    // количество дней в месяце
    var daysCount = getDaysCount(dateForShowObj);

    // количество последних дней прошлого месяца
    var lastMonthDaysCount = Math.abs(offsetDate - 1);

    // вычисляем необходимое количество рядов и ячеек в таблице
    var calendarTableRowsCount = Math.ceil((daysCount + lastMonthDaysCount) / 7)
    var calendarTableCellsCount = calendarTableRowsCount * 7;

    // подготовка пустого контента таблицы календаря
    var tableContent = '';
    for(var i=0; i<calendarTableRowsCount; i++) {
      tableContent += '<tr>';
      for(var j=0; j<7; j++) {
        tableContent += '<td data-month="' + month + '" data-year="' + year + '">';

        // в первой строке таблицы добавляем ячейкам названия дней недели
        if(i == 0) {
          tableContent += '<span class="weekday">' + weekdays[j] + ', </span>';
        }
        tableContent += '<span class="day"></span>';
        tableContent += '</td>';
      }
      tableContent += '</tr>';
    }

    // создаем таблицу календаря
    calendarTable.innerHTML = tableContent;

    // коллекция элементов календаря для вставки номеров дней
    var daysSpan = document.getElementById('calendar-table').querySelectorAll('.day');

    // заполняем календарь днями и событиями
    for(var i=0; i<calendarTableCellsCount; i++) {
      // Устанавливаем в DOM номера дней месяца
      daysSpan[i].innerHTML = firstDayOfMonthObj.getDate();

      // затем переводим объект даты на день вперед
      firstDayOfMonthObj.setDate(firstDayOfMonthObj.getDate() + 1);

      // выделение текущего дня
      var isCurrentDay = firstDayOfMonthObj.getDate() == now.getDate()
      && firstDayOfMonthObj.getMonth() == now.getMonth()
      && firstDayOfMonthObj.getFullYear() == now.getFullYear();

      if(isCurrentDay) {
        daysSpan[i+1].closest('td').classList.add('today');
      }
    }

    // обновляем список запланированных заданий
    this.refresh();
  }

  // обновление списка запланированных заданий
  this.refresh = function() {
    // ... code
  }

  // смещение на месяц назад
  this.prevMonth = function() {
    dateForShowObj.setMonth(dateForShowObj.getMonth() - 1);
    this.init();
  }

  // смещение на месяц вперед
  this.nextMonth = function() {
    dateForShowObj.setMonth(dateForShowObj.getMonth() + 1);
    this.init();
  }

  // установка актуального месяца
  this.today = function() {
    now = new Date();
    dateForShowObj = new Date();
    this.init();
  }
}
