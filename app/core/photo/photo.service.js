'use strict';

angular.
  module('core.photo').
  factory('Photo', ['$resource',
    function($resource) {
      return $resource('https://cors-anywhere.herokuapp.com/http://api-fotki.yandex.ru/api/recent/?format=json', {});
      // return $resource('http://api-fotki.yandex.ru/api/recent/?format=json', {});
    }
  ]);
