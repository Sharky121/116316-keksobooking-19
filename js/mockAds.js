'use strict';

(function () {
  var COUNT = 8;

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var Price = {
    MIN: 1000,
    MAX: 10000
  };

  var Rooms = {
    MIN: 1,
    MAX: 5
  };

  var Guests = {
    MIN: 0,
    MAX: 5
  };

  var Offset = {
    X: 50,
    Y: 70
  };

  var Coords = {
    X_MIN: 0 + Offset.X,
    X_MAX: 1200 - Offset.X,
    Y_MIN: 130,
    Y_MAX: 630
  };

  // Функция создания одного объявления
  var mockAd = function (count) {
    var coords = {
      x: window.helper.getRandomInteger(Coords.X_MIN, Coords.X_MAX),
      y: window.helper.getRandomInteger(Coords.Y_MIN, Coords.Y_MAX)
    };

    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (count + 1) + '.png'
      },

      offer: {
        title: 'Title ' + count,
        address: coords.x + ', ' + coords.y,
        price: window.helper.getRandomInteger(Price.MIN, Price.MAX),
        type: window.helper.getRandomElementArray(TYPES),
        rooms: window.helper.getRandomInteger(Rooms.MIN, Rooms.MAX),
        guests: window.helper.getRandomInteger(Guests.MIN, Guests.MAX),
        checkin: window.helper.getRandomElementArray(TIMES),
        checkout: window.helper.getRandomElementArray(TIMES),
        features: window.helper.getRandomArray(FEATURES),
        description: 'Description ' + count,
        photos: window.helper.getRandomArray(PHOTOS)
      },

      location: {
        x: coords.x,
        y: coords.y
      }
    };

    return ad;
  };

  // Функция создания массива объявлений
  var mockData = function (count) {
    var adsArray = [];

    for (var i = 0; i < count; i++) {
      adsArray.push(mockAd(i));
    }

    return adsArray;
  };

  window.mockAds = mockData(COUNT);
})();
