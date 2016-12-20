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

                // console.log(scope);

                function loadingImg(url) {
                    return new Promise(function (resolve, reject) {
                        var img = document.createElement("img");
                        img.src = url;

                        console.log(img.complete)
                        console.log(img.naturalWidth)

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
                        // console.log("#")
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
                    $event.preventDefault();

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

                    // setTimeout(function () {
                    //     if (!scope.myMethod()) {
                    //         scope.showPreloader();
                    //     }
                    // }, 0);
                };

                scope.showPrev = function ($event) {
                    $event.preventDefault();

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
            }
        }
    });