"use strict";


angular.module('galleryApp')
    .directive('popup', ['hotkeys', function (hotkeys) {
        return {
            restrict: 'E',
            scope: {
                state: "="
            },
            templateUrl: 'popup/popup.template.html',
            link: function (scope, element, attrs) {

                scope.preloader = false;

                hotkeys.add({
                    combo: 'left',
                    description: 'This one goes to left',
                    callback: function() {
                        scope.showPrev();
                    }
                });

                hotkeys.add({
                    combo: 'right',
                    description: 'This one goes to right',
                    callback: function() {
                        scope.showNext();
                    }
                });


                function loadingImg(url) {
                    return new Promise(function (resolve, reject) {
                        var img = document.createElement("img");
                        img.src = url;

                        if (img.complete && img.naturalWidth !== 0) {
                            return;
                        }

                        scope.showPreloader();
                        img.onload = function () {
                            resolve();
                        };

                        img.error = function () {
                            reject();
                        };
                    });
                }

                scope.$watch('state.show', function (newval, oldval) {
                    if (newval) {
                        scope.imageIndex = scope.state.index;
                        element.addClass('show');
                        scope.img = scope.state.images[scope.state.index].img.XXL.href;

                        loadingImg(scope.state.images[scope.state.index].img.XXL.href)
                            .then(function (resolve) {
                                // console.log(scope);
                                scope.hidePreloader();
                            });
                        

                        if (scope.state.index === 0) {
                            element[0].querySelector(".popup__prev").classList.add("hide");
                        }

                        if (scope.state.index === scope.state.images.length - 1) {
                            element[0].querySelector(".popup__next").classList.add("hide");
                        }
                    } else {
                        element.removeClass('show');
                        scope.img = "#";
                    }
                });


                scope.hidePopup = function ($event) {
                    $event.preventDefault();
                    scope.state.show = false;
                    scope.state.showFn();
                    element[0].querySelector(".popup__next").classList.remove("hide");
                    element[0].querySelector(".popup__prev").classList.remove("hide");
                };

                scope.showNext = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                    }

                    const images = scope.state.images;
                    element[0].querySelector(".popup__prev").classList.remove("hide");

                    if (scope.imageIndex > images.length - 3) {
                        element[0].querySelector(".popup__next").classList.add("hide");
                    }

                    if (scope.imageIndex > images.length - 2) {
                        // console.log(element[0]);
                        return;
                    }

                    scope.imageIndex++;

                    scope.img = images[scope.imageIndex].img.XXL.href;

                    loadingImg(images[scope.imageIndex].img.XXL.href)
                        .then(function (resolve) {
                            // console.log(scope);
                            scope.hidePreloader();
                        });
                };

                scope.showPrev = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                    }

                    const images = scope.state.images;
                    element[0].querySelector(".popup__next").classList.remove("hide");


                    if (scope.imageIndex < 2) {
                        element[0].querySelector(".popup__prev").classList.add("hide");
                    }

                    if (scope.imageIndex < 1) {
                        return;
                    }

                    scope.imageIndex--;

                    scope.img = images[scope.imageIndex].img.XXL.href;

                    loadingImg(images[scope.imageIndex].img.XXL.href)
                        .then(function (resolve) {
                            console.log(scope);
                            scope.hidePreloader();
                        });
                };

                scope.showPreloader = function () {
                    element.addClass('preloader');
                };

                scope.hidePreloader = function () {
                    element.removeClass('preloader');
                };
            }
        }
    }]);