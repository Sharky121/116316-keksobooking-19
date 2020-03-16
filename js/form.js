'use strict';

(function () {
  var CUSTOM_VALIDITY_TEXT = 'Выбранное количество гостей не подходит под количество комнат!';

  var MainPin = {
    SIZE: 65,
    TAIL_HEIGHT: 22
  };

  var Nodes = {
    AD_FORM: document.querySelector('.ad-form'),
    MAP_PIN_MAIN: document.querySelector('.map__pin--main')
  };

  var ValidityFields = {
    ADDRESS: Nodes.AD_FORM.querySelector('#address'),
    ROOMS: Nodes.AD_FORM.querySelector('#room_number'),
    CAPACITY: Nodes.AD_FORM.querySelector('#capacity')
  };

  var MAIN_PIN_Y = Nodes.MAP_PIN_MAIN.offsetTop + MainPin.SIZE;

  // Функция проверки вместимости номера
  var roomCapacityCompare = function (field1, field2) {
    field1 = parseInt(field1, 10);
    field2 = parseInt(field2, 10);

    return field1 === field2 && field1 >= 1 || field1 === 2 && field2 === 1 || field1 === 3 && field2 !== 0 || field1 === 100 && field2 === 0;
  };

  // Функция установки координат адреса
  var setAddressField = function (isState) {
    var left = Math.floor(MAIN_PIN_Y / 2);
    var top = Math.floor(MAIN_PIN_Y + (isState ? MainPin.TAIL_HEIGHT : -MainPin.SIZE / 2));

    ValidityFields.ADDRESS.value = top + ', ' + left;
  };

  // Функция блокировки / разблокировки полей
  var setStateFields = function (fields, isActive) {
    var fieldsKeys = Object.keys(fields);

    fieldsKeys.forEach(function (key) {
      fields[key].forEach(function (el) {
        setInputAttribute(el, isActive);
      });
    });
  };

  // Функция установки / снятия атрибута disabled
  var setInputAttribute = function (el, isActive) {
    var inputAttr = el[isActive ? 'removeAttribute' : 'setAttribute']('disabled', 'disabled');
  };

  // Функция для обработки options value.
  var getSelectInputs = function (input1, input2) {
    return {
      value1: input1.value,
      value2: input2.value
    };
  };

  Nodes.AD_FORM.addEventListener('click', function () {
    var values = getSelectInputs(ValidityFields.ROOMS, ValidityFields.CAPACITY);
    var result = roomCapacityCompare(values.value1, values.value2);

    if (result) {
      ValidityFields.CAPACITY.setCustomValidity('');
    } else {
      ValidityFields.CAPACITY.setCustomValidity(CUSTOM_VALIDITY_TEXT);
    }
  });

  window.form = {
    setStateFields: setStateFields,
    setAddressField: setAddressField
  };
})();
