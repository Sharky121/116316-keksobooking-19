'use strict';

(function () {
  var ENTER = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  var pinPressEnterHandler = function (evt, action) {
    if (evt.key === ENTER) {
      action();
    }
  };

  var pinMovingHandler = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  window.util = {
    pinPressEnterHandler: pinPressEnterHandler,
    pinMovingHandler: pinMovingHandler
  };
})();
