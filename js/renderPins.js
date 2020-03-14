'use strict';

(function () {
  var Offset = {
    X: 50,
    Y: 70
  };

  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция рендера одного пина
  var renderPin = function (ad) {
    var element = adTemplate.cloneNode(true);

    element.style.left = ad.location.x - (Offset.X) / 2 + 'px';
    element.style.top = ad.location.y - Offset.Y + 'px';

    element.querySelector('img').src = ad.author.avatar;
    element.querySelector('img').alt = ad.offer.title;

    return element;
  };

  // Функция создания фрагмента
  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      fragment.appendChild(renderPin(item));
    });

    return fragment;
  };

  window.renderPins = renderPins;
})();
