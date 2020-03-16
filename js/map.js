'use strict';

(function () {
  var Nodes = {
    AD_FORM: document.querySelector('.ad-form'),
    MAP: document.querySelector('.map'),
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    MAP_FILTERS: document.querySelector('.map__filters'),
    MAP_PINS: document.querySelector('.map__pins')
  };

  var FieldNodes = {
    AD_INPUTS: Nodes.AD_FORM.querySelectorAll('input'),
    FILTER_INPUTS: Nodes.MAP_FILTERS.querySelectorAll('input'),
    AD_SELECTS: Nodes.AD_FORM.querySelectorAll('select'),
    FILTER_SELECTS: Nodes.MAP_FILTERS.querySelectorAll('select')
  };

  var ClassLists = {
    MAP_FILTERS_DISABLED: 'map__filters--disabled',
    AD_FORM_DISABLED: 'ad-form--disabled',
    MAP_FADED: 'map--faded'
  };

  // Функция отрисовки пинов
  var onMapRenderPins = function (array) {
    var fragment = window.renderPins(array);

    Nodes.MAP_PINS.appendChild(fragment);
  };

  var onMapErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Функция перевода страницы в неактивный режим
  var deactivatePage = function () {
    Nodes.MAP_FILTERS.classList.add(ClassLists.MAP_FILTERS_DISABLED);

    window.form.setAddressField(false);
    window.form.setStateFields(FieldNodes, false);
  };

  //  Функция перевода страницы в активный режим
  var activatePage = function () {
    Nodes.MAP_FILTERS.classList.remove(ClassLists.MAP_FILTERS_DISABLED);
    Nodes.AD_FORM.classList.remove(ClassLists.AD_FORM_DISABLED);
    Nodes.MAP.classList.remove(ClassLists.MAP_FADED);

    // Рисуем пины
    window.backend.load(onMapRenderPins, onMapErrorLoad);

    window.form.setAddressField(true);
    window.form.setStateFields(FieldNodes, true);

    // Снимаем обработчики
    Nodes.MAP_PIN_MAIN.removeEventListener('mousedown', pinMovingHandler);
    document.removeEventListener('keydown', pinPressEnterHandler);
  };

  // Хэндлер для перемещения пина
  var pinMovingHandler = function (evt) {
    window.util.pinMovingHandler(evt, activatePage);
  };

  // Хэндлер для нажатия Enter по пину
  var pinPressEnterHandler = function (evt) {
    window.util.pinPressEnterHandler(evt, activatePage);
  };

  // Слушатель событий на главном пине
  var pinPressListener = function () {
    Nodes.MAP_PIN_MAIN.addEventListener('mousedown', pinMovingHandler);
    document.addEventListener('keydown', pinPressEnterHandler);
  };

  window.map = {
    pinPressListener: pinPressListener,
    deactivatePage: deactivatePage
  };
})();
