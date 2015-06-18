(function () {
	'use strict';

	angular.module('app', ['gridster']);


	angular.module('app')
		.service('offersService', function ($http) {
			return {
				get: function () {
					return $http.get('https://staging.remontnik.ru/api/v1/portfolio/all/?format=json')
						.then(function (response) {
							return response.data.results;
						});
				}
			};
		});

	angular.module('app')
		.directive('offers', function () {
			return {
				restrict: 'C',
				templateUrl: 'assets/templates/offers.html'
			};
		});

	angular.module('app')
		.directive('imageloaded', [

			function () {
				return {
					restrict: 'C',
					link: function (scope, element) {
						element.bind('load', function () {
							angular.element(element).addClass('_faded');
						});
					}
				};
			}
		]);

	angular.module('app')
		.controller('offersCtrl', [
			'$scope',
			'offersService',
			function ($scope, offersService) {
				$scope.results = [];
				$scope.opts = {
					columns: 3,
					margins: [20, 20],
					resizable: {
						enabled: false
					},
					rowHeight: 170
				};
				$scope.position = [
					{size: {x: 3, y: 3}},
					{size: {x: 1, y: 1}},
					{size: {x: 1, y: 1}},
					{size: {x: 1, y: 1}},
					{size: {x: 1, y: 1}},
					{size: {x: 2, y: 2}},
					{size: {x: 1, y: 1}},
					{size: {x: 2, y: 2}},
					{size: {x: 1, y: 1}},
					{size: {x: 1, y: 1}}
				];
				$scope.getOffers = function () {
					offersService
						.get()
						.then(function (data) {
							$scope.results = data;
						});
				};

				$scope.getOffers();
			}
		]);


}());

