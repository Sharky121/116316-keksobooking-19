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

var Types = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

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
  X_MIN: Offset.X,
  X_MAX: 1200 - Offset.X,
  Y_MIN: 130,
  Y_MAX: 630
};

var Nodes = {
  MAP: document.querySelector('.map'),
  MAP_PINS: document.querySelector('.map__pins'),
  AD_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),

};

var PopupNodes = {
  POPUP_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
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
      type: getRandomElementArray(Types),
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

// Функция создания массива объявлений. Возвращает сгенерированный массив объявлений
var generateAdsArray = function (count) {
  var adsArray = [];

  for (var i = 0; i < count; i++) {
    adsArray.push(generateAd(i));
  }

  return adsArray;
};

// Функция рендера одного объявления
var renderAd = function (ad) {
  var element = Nodes.AD_TEMPLATE.cloneNode(true);

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

  Nodes.MAP_PINS.appendChild(fragment);
};

Nodes.MAP.classList.remove('map--faded');
main(COUNT);

// Функция рендера одного объявления
var renderCard = function (card) {
  var element = PopupNodes.POPUP_TEMPLATE.cloneNode(true);

  element.querySelector('.popup__title').textContent = card[0].offer.title;
  element.querySelector('.popup__text--address').textContent = card[0].offer.address;
  element.querySelector('.popup__text--price').textContent = card[0].offer.price + ' ₽/ночь';
  element.querySelector('.popup__type').textContent = card[0].offer.type;
  element.querySelector('.popup__text--capacity').textContent = card[0].offer.rooms + ' комнаты для ' + card[0].offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card[0].offer.checkin + ', выезд до ' + card[0].offer.checkout;

  element.querySelector('.popup__description').textContent = card[0].offer.description;
  element.querySelector('.popup__photos').textContent = card[0].offer.title;
  element.querySelector('.popup__avatar').src = card[0].author.avatar;

  var ul = element.querySelector('.popup__features');
  ul.querySelector('.popup__feature').textContent = card[0].offer.features;

  return element;
};

var test = generateAdsArray(1);
var test2 = renderCard(test);
var filters = document.querySelector('.map__filters-container');
console.log(test);

Nodes.MAP.insertBefore(test2, filters);
