"use strict";

angular.module('galleryApp')
    .directive('images', function () {
        return {
            restrict: 'E',
            scope: {
                images: '=',
                index: "=",
                state: "="
            },
            templateUrl: 'images/images.template.html',
            link: function (scope, element, attrs) {

                scope.showPopup = function showPopup($event, index) {
                    $event.preventDefault();

                    console.log(scope.index);
                    console.log(scope.index + index);

                    scope.state.show = true;
                    scope.state.index = scope.index + index;
                    scope.state.showFn();
                };
            }
        }
    });