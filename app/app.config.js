'use strict';

angular.module('galleryApp')
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api-fotki.yandex.ru/api/recent/?format=json']);
    }]);
