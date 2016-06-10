function Calendar() {
  // object of current date
  var now = new Date();

  // date object for view
  var dateForShowObj = new Date();

  // calendar table
  var calendarTable = document.getElementById('calendar-table');

  // array of month names
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

  // array of weekday names
  var weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];

  // get days count in month from date object
  function getDaysCount(dateObj) {
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth();
    return new Date(new Date(year, month + 1).setDate(0)).getDate();
  }

  // added length limit method to String prototype
  String.prototype.limit = function(count) {
    if(this.length <= count) return this;
    return this.slice(0, count) + '...';
  }

  // calendar initialize - add day count and event handlers (calendar engine)
  this.init = function () {
    // month and year numbers from object date for show
    var month = dateForShowObj.getMonth();
    var year  = dateForShowObj.getFullYear();

    // view month name and year
    document.getElementById('current-month').innerHTML = monthNames[month] + ' ' + year;

    // first day of month date object
    var firstDayOfMonthObj = new Date(year, month, 1);

    // offset first day of month
    var offsetDate = (firstDayOfMonthObj.getDay() == 0)
    ? firstDayOfMonthObj.getDate() - 6
    : firstDayOfMonthObj.getDate() - firstDayOfMonthObj.getDay() + 1;

    firstDayOfMonthObj.setDate(offsetDate);

    // days count in month
    var daysCount = getDaysCount(dateForShowObj);

    // last days count of previous month
    var lastMonthDaysCount = Math.abs(offsetDate - 1);

    // calculate rows and cells count for calendar table
    var calendarTableRowsCount = Math.ceil((daysCount + lastMonthDaysCount) / 7)
    var calendarTableCellsCount = calendarTableRowsCount * 7;

    // prepare table content
    var tableContent = '';
    for(var i=0; i<calendarTableRowsCount; i++) {
      tableContent += '<tr>';
      for(var j=0; j<7; j++) {
        tableContent += '<td data-month="' + month + '" data-year="' + year + '">';

        // inset weekday names to first row
        if(i == 0) {
          tableContent += '<span class="weekday">' + weekdays[j] + ', </span>';
        }
        tableContent += '<span class="day"></span>';
        tableContent += '</td>';
      }
      tableContent += '</tr>';
    }

    // apply table content
    calendarTable.innerHTML = tableContent;

    // collection of calendar items for inserting numbers of days
    var daysSpan = document.getElementById('calendar-table').querySelectorAll('.day');

    // add day numbers and planned tasks to calendar table
    for(var i=0; i<calendarTableCellsCount; i++) {
      // insert day numbers into DOM
      daysSpan[i].innerHTML = firstDayOfMonthObj.getDate();

      // change date object for the one day ahead
      firstDayOfMonthObj.setDate(firstDayOfMonthObj.getDate() + 1);

      // select current day
      var isCurrentDay = firstDayOfMonthObj.getDate() == now.getDate()
      && firstDayOfMonthObj.getMonth() == now.getMonth()
      && firstDayOfMonthObj.getFullYear() == now.getFullYear();

      if(isCurrentDay) {
        daysSpan[i+1].closest('td').classList.add('today');
      }
    }

    // refresh planned task list
    this.refresh();
  }

  // refresh planned task list
  this.refresh = function() {
    var storageData = JSON.parse(localStorage.getItem('tasksList'));
    if(Array.isArray(storageData)) {

      if(!storageData.length) return;

      var tableCells = calendarTable.querySelectorAll('td');
      var dataYear, dataMonth, day, displayMessage,
      storageDataMembers, storageDataDescription, task;

      for(var i=0; i<tableCells.length; i++) {

        dataYear = tableCells[i].getAttribute('data-year');
        dataMonth = tableCells[i].getAttribute('data-month');
        day = tableCells[i].querySelector('span.day').textContent;

        if(tableCells[i].classList.contains('has-tasks')) {
          tableCells[i].classList.remove('has-tasks');
        }

        if(tableCells[i].querySelector('.task')) {
          var existTasks = tableCells[i].querySelectorAll('.task');
          existTasks.forEach = [].forEach;
          existTasks.forEach(function(task) {
            task.remove();
          });
        }

        for(var j=0; j<storageData.length; j++) {
          if(storageData[j].year == dataYear
            && storageData[j].month == dataMonth
            && storageData[j].day == day) {

            tableCells[i].classList.add('has-tasks');

            storageDataMembers = storageData[j].members.join(', ').limit(30);
            storageDataDescription = storageData[j].description.limit(25);

            task = document.createElement('div');
            task.classList.add('task');
            task.innerHTML = '<p><strong>' + storageDataDescription + '</strong><br>' + storageDataMembers + '</p>';
            tableCells[i].appendChild(task);
          }
        }
      }
    }
  }

  // offset a month ago
  this.prevMonth = function() {
    dateForShowObj.setMonth(dateForShowObj.getMonth() - 1);
    this.init();
  }

  // offset to a month in advance
  this.nextMonth = function() {
    dateForShowObj.setMonth(dateForShowObj.getMonth() + 1);
    this.init();
  }

  // set curent month
  this.today = function() {
    now = new Date();
    dateForShowObj = new Date();
    this.init();
  }
}
