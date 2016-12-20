"use strict";


angular.module('galleryApp')
    .directive('popup', function () {
        return {
            restrict: 'E',
            scope: {
                state: "="
            },
            templateUrl: 'popup/popup.template.html',
            link: function (scope, element, attrs) {

                scope.preloader = false;

                console.log(scope);

                scope.$watch('state.show', function (newval, oldval) {
                    if (newval) {
                        scope.imageIndex = scope.state.index;
                        element.addClass('show');
                        // setTimeout(function() {
                        //     if (!scope.myMethod()) {
                        //         scope.showPreloader();
                        //     }
                        // }, 0);
                        // console.log(scope);
                        // console.log(scope.state.images.length);
                        scope.img = scope.state.images[scope.state.index].img.XXL.href;
                    } else {
                        element.removeClass('show');
                        scope.img = "#";
                    }
                });

                scope.hidePopup = function () {
                    scope.state.show = false;
                    scope.state.showFn();
                };

                scope.showNext = function ($event) {
                    $event.preventDefault();

                    const images = scope.state.images;

                    if (scope.imageIndex > images.length - 2) {
                        return;
                    }


                    scope.imageIndex++;


                    console.log(scope.imageIndex);
                    scope.img = images[scope.imageIndex].img.XXL.href;

                    // setTimeout(function () {
                    //     if (!scope.myMethod()) {
                    //         scope.showPreloader();
                    //     }
                    // }, 0);
                };

                scope.showPrev = function ($event) {
                    $event.preventDefault();

                    const images = scope.state.images;

                    if (scope.imageIndex < 1) {
                        return;
                    }

                    scope.imageIndex--;


                    console.log(scope.imageIndex)
                    scope.img = images[scope.imageIndex].img.XXL.href;


                    // setTimeout(function () {
                    //     if (!scope.myMethod()) {
                    //         scope.showPreloader();
                    //     }
                    // }, 0);

                };

                scope.showPreloader = function () {
                    element.addClass('preloader');
                };

                scope.hidePreloader = function () {
                    element.removeClass('preloader');
                };

                // scope.showImage = function (value) {
                //     if (value) {
                //         scope.hidePreloader();
                //     } else {
                //         // console.log(value);
                //     }
                // };
            }
        }
    });