'use strict';

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

// Функция возвращает случайный элемент из массива, удаляя его из исходного массива
var getRandomElementModifyArray = function (array) {
  var randomIndex = getRandomInteger(0, array.length - 1);

  return array.splice(randomIndex, 1);
};

// Функция создания одного объявления
var generateAd = function () {
  var coords = {
    x: getRandomInteger(Coords.X_MIN, Coords.X_MAX),
    y: getRandomInteger(Coords.Y_MIN, Coords.Y_MAX)
  };

  var ad = {
    author: {
      avatar: getRandomElementModifyArray(AVATARS)
    },

    offer: {
      title: getRandomElementModifyArray(TITLES),
      address: coords.x + ', ' + coords.y,
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRandomElementArray(TYPES),
      rooms: getRandomInteger(Rooms.MIN, Rooms.MAX),
      guests: getRandomInteger(Guests.MIN, Guests.MAX),
      checkin: getRandomElementArray(TIMES),
      checkout: getRandomElementArray(TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomElementModifyArray(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },

    location: {
      x: coords.x,
      y: coords.y
    }
  };

  return ad;
};

// Функция создания массива объявлений
var generateAdsArray = function (count) {
  var adsArray = [];

  for (var j = 0; j < count; j++) {
    var ad = generateAd();
    adsArray.push(ad);
  }

  return adsArray;
};

// Функция рендера одного объявления
var renderAd = function (ad) {
  var element = adTemplate.cloneNode(true);

  element.style.left = ad.location.x - (Offset.X) / 2 + 'px';
  element.style.top = ad.location.y - Offset.Y + 'px';

  element.querySelector('img').src = ad.author.avatar;
  element.querySelector('img').alt = ad.offer.title;

  return element;
};

// Функция отрисовки всех объявлений
var renderAds = function (ads) {
  for (var j = 0; j < ads.length; j++) {
    adFragment.appendChild(renderAd(ads[j]));
  }

  map.appendChild(adFragment);
};

// Функция наполнения массива случайными данными
var generateArray = function (count, str) {
  var array = [];

  for (var i = 1; i <= count; i++) {
    array.push(str + ' ' + i);
  }

  return array;
};

// Функция наполнения массива аватаров
var generateAvatarsArray = function (count) {
  var array = [];

  for (var i = 1; i <= count; i++) {
    var imageSrc = 'img/avatars/user0' + i + '.png';
    array.push(imageSrc);
  }

  return array;
};

// Наполняем пустые массивы данными
var TITLES = generateArray(COUNT, 'title');

var DESCRIPTIONS = generateArray(COUNT, 'description');

var AVATARS = generateAvatarsArray(8);

// Создаём массив объявлений
var adsArray = generateAdsArray(COUNT);

// Получаем элементы
document.querySelector('.map').classList.remove('map--faded');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adFragment = document.createDocumentFragment();
var map = document.querySelector('.map__pins');

// Отрисовываем элементы
renderAds(adsArray);
