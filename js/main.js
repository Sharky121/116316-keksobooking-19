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

var CUSTOM_VALIDITY_TEXT = 'Выбранное количество гостей не подходит под количество комнат!';

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

var MainPin = {
  SIZE: 65,
  TAIL_HEIGHT: 22
};

var Nodes = {
  MAP: document.querySelector('.map'),
  MAP_PINS: document.querySelector('.map__pins'),
  MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
  AD_FORM: document.querySelector('.ad-form'),
  MAP_FILTERS: document.querySelector('.map__filters'),
  AD_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin')
};

var FieldNodes = {
  AD_INPUTS: Nodes.AD_FORM.querySelectorAll('input'),
  FILTER_INPUTS: Nodes.MAP_FILTERS.querySelectorAll('input'),
  AD_SELECTS: Nodes.AD_FORM.querySelectorAll('select'),
  FILTER_SELECTS: Nodes.MAP_FILTERS.querySelectorAll('select')
};

var ValidityFields = {
  ADDRESS: Nodes.AD_FORM.querySelector('#address'),
  ROOMS: Nodes.AD_FORM.querySelector('#room_number'),
  CAPACITY: Nodes.AD_FORM.querySelector('#capacity')
};

var MAIN_PIN_Y = Nodes.MAP_PIN_MAIN.offsetTop + MainPin.SIZE;

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
var mockAd = function (count) {
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
var mockData = function (count) {
  var adsArray = [];

  for (var i = 0; i < count; i++) {
    adsArray.push(mockAd(i));
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

  array.forEach(function (item) {
    fragment.appendChild(renderAd(item));
  });

  return fragment;
};

// Функция отрисовки всех объявлений на карте
var main = function (count) {
  var adsArray = mockData(count);
  var fragment = renderAds(adsArray);

  Nodes.MAP_PINS.appendChild(fragment);
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
  isActive ? el.removeAttribute('disabled') : el.setAttribute('disabled', 'disabled');
};

// Функция установки координат адреса
var setAddressField = function (isState) {
  var left = Math.floor(MAIN_PIN_Y / 2);
  var top = isState ? Math.floor(MAIN_PIN_Y + MainPin.TAIL_HEIGHT) : Math.floor(MAIN_PIN_Y - MainPin.SIZE / 2);

  ValidityFields.ADDRESS.value = top + ', ' + left;
};

// Функция перевода страницы в неактивный режим
var deactivatePage = function () {
  Nodes.MAP_FILTERS.classList.add('map__filters--disabled');

  setAddressField(false);
  setStateFields(FieldNodes, false);
};

//  Функция перевода страницы в активный режим
var activatePage = function () {
  Nodes.MAP_FILTERS.classList.remove('map__filters--disabled');
  Nodes.AD_FORM.classList.remove('ad-form--disabled');
  Nodes.MAP.classList.remove('map--faded');

  setAddressField(true);
  setStateFields(FieldNodes, true);
  main(COUNT);
};

// Хэндлер для перемещения пина
var pinMovingHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();

    Nodes.MAP_PIN_MAIN.removeEventListener('mousedown', pinMovingHandler);
  }
};

// Хэндлер для нажатия Enter по пину
var pinPressEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();

    document.removeEventListener('keydown', pinPressEnterHandler);
  }
};

// Функция сравнения двух полей
var compareField = function (field1, field2) {
  field1 = parseInt(field1, 10);
  field2 = parseInt(field2, 10);

  return field1 === field2 && field1 >= 1 || field1 === 2 && field2 === 1 || field1 === 3 && field2 !== 0 || field1 === 100 && field2 === 0;
};

// Функция для обработки options value.
var getSelectInputs = function (input1, input2) {
  var Values = {
    value1: input1.value,
    value2: input2.value
  };

  return Values;
};

Nodes.MAP_PIN_MAIN.addEventListener('mousedown', pinMovingHandler);
document.addEventListener('keydown', pinPressEnterHandler);

Nodes.AD_FORM.addEventListener('click', function () {
  var values = getSelectInputs(ValidityFields.ROOMS, ValidityFields.CAPACITY);
  var result = compareField(values.value1, values.value2);

  result ? ValidityFields.CAPACITY.setCustomValidity('') : ValidityFields.CAPACITY.setCustomValidity(CUSTOM_VALIDITY_TEXT);
});

deactivatePage();
