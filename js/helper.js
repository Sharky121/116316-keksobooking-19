'use strict';

(function () {
  // Функция случайного числа с параметром диапазона
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция выбора случайного элемента из массива
  var getRandomElementArray = function (array) {
    var randomIndex = getRandomInteger(0, array.length - 1);

    return array[randomIndex];
  };

  // Функция возвращения массива случайной длины
  var getRandomArray = function (array) {
    var filterArray = array.filter(function () {
      return getRandomInteger(0, 1);
    });

    return filterArray.length === 0 ? array : filterArray;
  };

  // Функция сравнения двух полей
  var compareField = function (field1, field2) {
    field1 = parseInt(field1, 10);
    field2 = parseInt(field2, 10);

    return field1 === field2 && field1 >= 1 || field1 === 2 && field2 === 1 || field1 === 3 && field2 !== 0 || field1 === 100 && field2 === 0;
  };

  window.helper = {
    getRandomInteger: getRandomInteger,
    getRandomElementArray: getRandomElementArray,
    getRandomArray: getRandomArray,
    compareField: compareField
  };
})();
