// create and initialize date object
var calendar = new Calendar();
calendar.init();

// add event listeners for movement by month
document.getElementById('prev-month')
.addEventListener('click', calendar.prevMonth.bind(calendar));

document.getElementById('next-month')
.addEventListener('click', calendar.nextMonth.bind(calendar));

// add event listener for set current month
document.getElementById('today')
.addEventListener('click', calendar.today.bind(calendar));

// add event listener for refresh task list
document.getElementById('refresh-task-list')
.addEventListener('click', calendar.refresh.bind(calendar));

// create object of add-task-popup
var addTaskPopup = new AddTaskPopup();

// add event listener for show popup
document.getElementById('add-task-btn')
.addEventListener('click', addTaskPopup.open.bind(addTaskPopup));
