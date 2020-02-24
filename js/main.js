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

var Nodes = {
  map: document.querySelector('.map'),
  mapPins: document.querySelector('.map__pins'),
  mapPinMain: document.querySelector('.map__pin--main'),
  adForm: document.querySelector('.ad-form'),
  mapFilters: document.querySelector('.map__filters'),
  adTemplate: document.querySelector('#pin').content.querySelector('.map__pin')
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

// Функция создания одного объявления
var generateAd = function (count) {
  var coords = {
    x: getRandomInteger(Coords.X_MIN, Coords.X_MAX),
    y: getRandomInteger(Coords.Y_MIN, Coords.Y_MAX)
  };

  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (count + 1) + '.png'
    },

    offer: {
      title: 'Title ' + count,
      address: coords.x + ', ' + coords.y,
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRandomElementArray(TYPES),
      rooms: getRandomInteger(Rooms.MIN, Rooms.MAX),
      guests: getRandomInteger(Guests.MIN, Guests.MAX),
      checkin: getRandomElementArray(TIMES),
      checkout: getRandomElementArray(TIMES),
      features: getRandomArray(FEATURES),
      description: 'Description ' + count,
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

  for (var i = 0; i < count; i++) {
    adsArray.push(generateAd(i));
  }

  return adsArray;
};

// Функция рендера одного объявления
var renderAd = function (ad) {
  var element = Nodes.adTemplate.cloneNode(true);

  element.style.left = ad.location.x - (Offset.X) / 2 + 'px';
  element.style.top = ad.location.y - Offset.Y + 'px';

  element.querySelector('img').src = ad.author.avatar;
  element.querySelector('img').alt = ad.offer.title;

  return element;
};

// Функция создания фрагмента
var renderAds = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderAd(array[i]));
  }

  return fragment;
};

// Функция отрисовки всех объявлений на карте
var main = function (count) {
  var adsArray = generateAdsArray(count);
  var fragment = renderAds(adsArray);

  Nodes.mapPins.appendChild(fragment);
};

// Nodes.map.classList.remove('map--faded');
// main(COUNT);


var adInputs = Nodes.adForm.querySelectorAll('input');
var adSelects = Nodes.adForm.querySelectorAll('select');

Nodes.mapFilters.classList.add('map__filters--disabled');

var filtersInputs = Nodes.mapFilters.querySelectorAll('input');
var filterSelects = Nodes.mapFilters.querySelectorAll('select');

console.log(adInputs);

adInputs.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

adSelects.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

filtersInputs.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

filterSelects.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

Nodes.mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {

  }
});
