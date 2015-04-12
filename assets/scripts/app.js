(function() {
    'use strict';

    angular
        .module('pictureSearcher', [])
        .controller('psCtrl', function($scope, $http) {
            $scope.submitter = function() {
                $scope.alertSuccess = $scope.alertDanger = false;
                console.log($scope.psForm, 'psform');
                if ($scope.psForm.$valid) {
                    var mySearch = $scope.search;
                    $scope.search = '';
                    $scope.alertSuccess = true;
                    $scope.successMessage = "Searching Instagram for photos tagged " + mySearch;

                    var url = 'https://api.instagram.com/v1/tags/' + mySearch + '/media/recent';
                    var req = {
                        callback: 'JSON_CALLBACK',
                        client_id: '002afbe647b043438a497ae47b90470d'
                    }

                    $http({
                            method: 'JSONP',
                            url: url,
                            params: req
                        })
                        .then(successful, errorful);


                    function successful(result) {
                        console.log(result);
                        if (result.data.meta.code !== 400 && result.data.data.length) {
                            $scope.pictures = result.data.data;
                            $scope.alertSuccess = false;
                            $scope.successMessage = result.data.data.length + " pictures found!";
                            $scope.alertSuccess = true;
                        } else if (result.data.meta.code === 400) {
                            $scope.alertSuccess = false;
                            $scope.dangerMessage = result.data.meta.error_message;
                            $scope.alertDanger = true;
                            $scope.pictures = null;
                        }

                    }

                    function errorful(result) {
                        console.log(result);
                        $scope.alertSuccess = false;
                        $scope.dangerMessage = "There has been an error!";
                        $scope.alertDanger = true;
                    }

                } else {
                    $scope.alertDanger = true;
                    $scope.dangerMessage = $scope.psForm.$error.pattern[0].$viewValue +
                        " is an invalid choice. Letters only please!";
                }
            }
        });

}());
