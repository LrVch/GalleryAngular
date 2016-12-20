"use strict";

angular.module('galleryApp')
    .controller('galleryController', ['$scope', 'Photo', function ($scope, Photo) {

        self.phone = Photo.get({}, function (photos) {
            // $scope.popupState.images = photos.entries;
            // console.log($scope.popupState.images)
            // console.log(modifyData(photos.entries));
            $scope.photos = modifyData(photos.entries);
            $scope.initArray = $scope.photos[0];
        });

        $scope.sectionCount = 1;

        $scope.popupState = {
            show: false,
            index: 0,
            showFn: function () {
                console.log("this.show", this.show);
                console.log("this.index", this.index);
            }
        };

        $scope.showPop = function () {
            $scope.popupState.show = true;
        };

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