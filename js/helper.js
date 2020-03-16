'use strict';

(function () {
  // Функция случайного числа с параметром диапазона
  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция выбора случайного элемента из массива
  var getRandomItem = function (array) {
    var randomIndex = getRandomBetween(0, array.length - 1);

    return array[randomIndex];
  };

  // Функция возвращения массива случайной длины
  var getRandomItems = function (array) {
    var filterArray = array.filter(function () {
      return getRandomBetween(0, 1);
    });

    return filterArray.length === 0 ? array : filterArray;
  };

  window.helper = {
    getRandomBetween: getRandomBetween,
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems
  };
})();
