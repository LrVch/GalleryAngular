"use strict";

angular.module('galleryApp')
    .directive('addSection', function ($compile) {
        return {
            restrict: 'E',
            // scope: {
            //     images: '=',
            //     index: '=',
            //     active: '='
            // },
            templateUrl: 'addsection/addsection.template.html',
            controller: function ($scope, $element) {
                var count = 0;

                $scope.addMore = function ($event) {
                    $event.preventDefault();

                    ++$scope.activeIndex;

                    count = $scope.activeIndex;

                    if (!$scope.photos[count + 1]) {
                        // return;
                        $scope.showAddButton = false;
                    }

                    var el = $compile("<images images='photos[" + count + "]' index='" + count * 18 + "' state='popupState'></images>")($scope);
                    var parent = $element.parent()[0].querySelector(".additional-sections");
                    var angParent = angular.element(parent);

                    angParent.append(el);
                };
            }
        }
    });