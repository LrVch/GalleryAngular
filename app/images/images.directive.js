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

                scope.showPopup = function showPopup(index) {
                    console.log(index);
                    // scope.state.show = true;
                    // scope.state.index = index;
                    // scope.state.showFn();
                };
            }
        }
    });