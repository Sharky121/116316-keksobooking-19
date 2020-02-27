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

var MainPin = {
  SIZE: 65,
  TAIL_HEIGHT: 22
};

var Nodes = {
  map: document.querySelector('.map'),
  mapPins: document.querySelector('.map__pins'),
  mapPinMain: document.querySelector('.map__pin--main'),
  adForm: document.querySelector('.ad-form'),
  mapFilters: document.querySelector('.map__filters'),
  adTemplate: document.querySelector('#pin').content.querySelector('.map__pin')
};

var FieldNodes = {
  AD_INPUTS: Nodes.adForm.querySelectorAll('input'),
  FILTER_INPUTS: Nodes.mapFilters.querySelectorAll('input'),
  AD_SELECTS: Nodes.adForm.querySelectorAll('select'),
  FILTER_SELECTS: Nodes.mapFilters.querySelectorAll('select')
};

var ADDRESS_FIELD = Nodes.adForm.querySelector('#address');
var ROOM_NUMBER_FIELD = Nodes.adForm.querySelector('#room_number');
var CAPACITY_FIELD = Nodes.adForm.querySelector('#capacity');

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

// Функция блокировки полей
var disableFields = function (fields) {
  var fieldsKeys = Object.keys(fields);

  for (var i = 0; i < fieldsKeys.length; i++) {
    fields[fieldsKeys[i]].forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  }
};

// Функция разблокировки полей
var enableFields = function (fields) {
  var fieldsKeys = Object.keys(fields);

  for (var i = 0; i < fieldsKeys.length; i++) {
    fields[fieldsKeys[i]].forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }
};

// Функция установки координат адреса
var setAddressField = function (state) {
  var left = Math.floor(Nodes.mapPinMain.offsetLeft + MainPin.SIZE / 2);
  var top;

  if (state === 'active') {
    top = Math.floor(Nodes.mapPinMain.offsetTop + MainPin.SIZE + MainPin.TAIL_HEIGHT);
  } else {
    top = Math.floor(Nodes.mapPinMain.offsetTop + MainPin.SIZE / 2);
  }

  ADDRESS_FIELD.value = top + ', ' + left;
};

// Функция перевода страницы в неактивный режим
var deactivatePage = function () {
  Nodes.mapFilters.classList.add('map__filters--disabled');

  setAddressField();
  disableFields(FieldNodes);
};

//  Функция перевода страницы в активный режим
var activatePage = function () {
  Nodes.mapFilters.classList.remove('map__filters--disabled');
  Nodes.adForm.classList.remove('ad-form--disabled');
  Nodes.map.classList.remove('map--faded');

  setAddressField('active');
  enableFields(FieldNodes);
  main(COUNT);
};

// Хэндлер для перемещения пина
var pinMovingHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();

    Nodes.mapPinMain.removeEventListener('mousedown', pinMovingHandler);
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

  if (field1 === 1 && field2 === 1) {
    return true;
  }

  if (field1 === 2 && field2 === 1) {
    return true;
  }

  if (field1 === 2 && field2 === 2) {
    return true;
  }

  if (field1 === 3 && field2 !== 0) {
    return true;
  }

  if (field1 === 100 && field2 === 0) {
    return true;
  }

  return false;
};

// Функция для обработки options value.
var getSelectInputs = function (input1, input2) {
  var index1 = input1.selectedIndex;
  var index2 = input2.selectedIndex;

  var Values = {
    value1: input1[index1].value,
    value2: input2[index2].value
  };

  return Values;
};

Nodes.mapPinMain.addEventListener('mousedown', pinMovingHandler);
document.addEventListener('keydown', pinPressEnterHandler);

Nodes.adForm.addEventListener('click', function () {
  var values = getSelectInputs(ROOM_NUMBER_FIELD, CAPACITY_FIELD);
  var result = compareField(values.value1, values.value2);

  if (!result) {
    CAPACITY_FIELD.setCustomValidity('Выбранное количество гостей не подходит под количество комнат!');
  } else {
    CAPACITY_FIELD.setCustomValidity('');
  }
});

deactivatePage();
