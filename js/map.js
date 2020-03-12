'use strict';

(function () {
  var Nodes = {
    AD_FORM: document.querySelector('.ad-form'),
    MAP: document.querySelector('.map'),
    MAP_PIN_MAIN: document.querySelector('.map__pin--main'),
    MAP_FILTERS: document.querySelector('.map__filters')
  };

  var FieldNodes = {
    AD_INPUTS: Nodes.AD_FORM.querySelectorAll('input'),
    FILTER_INPUTS: Nodes.MAP_FILTERS.querySelectorAll('input'),
    AD_SELECTS: Nodes.AD_FORM.querySelectorAll('select'),
    FILTER_SELECTS: Nodes.MAP_FILTERS.querySelectorAll('select')
  };

  // Функция перевода страницы в неактивный режим
  var deactivatePage = function () {
    Nodes.MAP_FILTERS.classList.add('map__filters--disabled');

    window.form.setAddressField(false);
    window.form.setStateFields(FieldNodes, false);
  };

  //  Функция перевода страницы в активный режим
  var activatePage = function () {
    Nodes.MAP_FILTERS.classList.remove('map__filters--disabled');
    Nodes.AD_FORM.classList.remove('ad-form--disabled');
    Nodes.MAP.classList.remove('map--faded');

    window.form.setAddressField(true);
    window.form.setStateFields(FieldNodes, true);

    // Рисуем пины
    window.pin();

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

  var pinPressListener = function () {
    Nodes.MAP_PIN_MAIN.addEventListener('mousedown', pinMovingHandler);
    document.addEventListener('keydown', pinPressEnterHandler);
  };

  window.map = {
    pinPressListener: pinPressListener,
    deactivatePage: deactivatePage
  };
})();

