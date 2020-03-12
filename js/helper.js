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

  window.helper = {
    getRandomInteger: getRandomInteger,
    getRandomElementArray: getRandomElementArray,
    getRandomArray: getRandomArray
  };
})();
