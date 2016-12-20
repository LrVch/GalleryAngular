"use strict";

angular.module('galleryApp')
    .controller('galleryController', ['$scope', 'Photo', function ($scope, Photo) {

        $scope.activeIndex = 0;
        $scope.showAddButton = false;

        $scope.popupState = {
            images: [],
            show: false,
            index: 0,
            showFn: function () {
                // console.log("this.show", this.show);
                // console.log("this.index", this.index);
            }
        };

        self.photo = Photo.get({}, function (photos) {
            $scope.photos = modifyData(photos.entries);
            $scope.initArray = $scope.photos[0];
            $scope.showAddButton = true;

            console.log($scope.photos)

            addImagesToPopupView($scope.initArray);
        });

        
        $scope.$watch('activeIndex', function (newval, oldval) {
            if (newval) {
                addImagesToPopupView($scope.photos[newval]);
            }
        });


        $scope.showPop = function () {
            $scope.popupState.show = true;
        };

        function addImagesToPopupView(arr) {
            $scope.popupState.images = $scope.popupState.images.concat(arr);
        }

        function modifyData(arr) {
            const result = [];
            const items = 18;
            const iterations = parseInt(arr.length / 18 + 1);

            for (var i = 0; i < iterations; i++) {
                result.push(arr.slice(i*items, (i + 1)*items));
            }

            return result;
        }
    }]);