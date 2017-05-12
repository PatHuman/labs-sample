'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController =
//end-non-standard


function NavbarController() {
  _classCallCheck(this, NavbarController);

  this.menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  this.isCollapsed = true;
}
//start-non-standard
;

angular.module('backendApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map
