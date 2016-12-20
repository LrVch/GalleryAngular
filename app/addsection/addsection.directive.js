"use strict";

angular.module('galleryApp')
    .directive('addSection', function ($compile) {
        return {
            restrict: 'E',
            // scope: {
            //   info: '='
            // },
            templateUrl: 'addsection/addsection.template.html',
            controller: function ($scope, $element) {
                $scope.addMore = function ($event) {
                    $event.preventDefault();
                    console.log($scope)
                    var el = $compile("<images images='initArray'></images>")($scope);
                    $element.parent().append(el);
                };
            }
            // link: function(scope, element, attrs) {
            //   scope.addMore = function($event) {
            //     $event.preventDefault();
            //     element.append("<book></book>")
            //   }


            // }
        }
    });