function AddTaskPopup() {
  // save current context in closure
  var self = this;

  self.open = function() {
    // create shadow background
    var shadow = document.createElement('div');
    shadow.id = 'shadow';
    document.body.insertBefore(shadow, document.body.firstChild);

    shadow.addEventListener('click', self.close);

    // create popup window
    var popup = document.createElement('div');
    popup.id = 'add-task-popup';
    popup.innerHTML =
      '<h3>Добавление нового события</h3>\
      <form id="add-task-form" action="">\
        <input type="text" name="date" placeholder="Дата события (дд.мм.гггг)">\
        <input type="text" name="members" placeholder="Участники (через запятую)">\
        <textarea name="description" placeholder="Краткое описание события"></textarea>\
        <div class="buttons">\
          <input type="submit" value="Сохранить">\
          <span id="close-popup">Отмена</span>\
        </div>\
      </form>';

    // insert popup into DOM
    document.body.insertBefore(popup, document.getElementById('wrapper'));

    // add event listener for popup close button
    document.getElementById('close-popup')
    .addEventListener('click', self.close);

    document.getElementById('add-task-form')
    .addEventListener('submit', saveTask);
  }

  self.close = function() {
    document.getElementById('shadow').remove();
    document.getElementById('add-task-popup').remove();
  }

  // click event handler of save button
  function saveTask(e) { // this => FormElement
    e.preventDefault();

    // create real array from form elements collection
    var formElems = Array.prototype.slice.call(this.elements);

    // remove class "error" when form fields in focus
    formElems.forEach(function(item, i) {
      item.addEventListener('focus', function() {
        if(this.classList.contains('error')) {
          this.classList.remove('error');
        }
      });
    });

    var data = isValidForm(this);

    if(data) {
      var storageData = localStorage.getItem('tasksList')
      ? JSON.parse(localStorage.getItem('tasksList'))
      : [];

      storageData.push(data);
      localStorage.setItem('tasksList', JSON.stringify(storageData));

      self.close();
      alert('Событие добавлено успешно!');
    }
  }

  // form fields validation
  function isValidForm(formElemsCollections) {
    var dateField = formElemsCollections.elements.date;
    var membersField = formElemsCollections.elements.members;
    var descriptionFiled = formElemsCollections.elements.description;

    var data = {}, result = true;

    // date field validation
    var date = isValidDate(dateField.value);
    if(date) {
      data.year = date.getFullYear();
      data.month = date.getMonth();
      data.day = date.getDate();
    }
    else {
      dateField.classList.add('error');
      result = false;
    }

    // members list validation
    if(membersField.value) {
      membersArr = membersField.value.split(',');
      membersArr = membersArr.map(function(member) {
        return member.trim();
      });
      data.members = membersArr;
    }
    else {
      membersField.classList.add('error');
      result = false;
    }

    // validation of task description
    if(descriptionFiled.value) {
      data.description = descriptionFiled.value;
    }
    else {
      descriptionFiled.classList.add('error');
      result = false;
    }

    return result ? data : false;
  }

  // validation date format 'dd.mm.yyyy'
  function isValidDate(dateString) {
    var dateToArray = dateString.split('.');
    var year = dateToArray[2];
    var month = parseInt(dateToArray[1] - 1);
    var day = parseInt(dateToArray[0]);
    var dateObj = new Date(year, month, day);

    if(isNaN(dateObj)) return false;

    var resultYear = dateObj.getFullYear();

    var resultMonth = dateObj.getMonth() + 1;
    resultMonth = (resultMonth < 10)
    ? '0' + resultMonth
    : resultMonth;

    var resultDay = dateObj.getDate();
    resultDay = (resultDay < 10)
    ? '0' + resultDay
    : resultDay;

    var resultFullDate = resultDay + '.' + resultMonth + '.' + resultYear;

    if(resultFullDate === dateString) return dateObj;

    return false;
  }
}
