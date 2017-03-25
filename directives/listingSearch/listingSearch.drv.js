angular.module('directives.listingSearch', [])
    .directive('listingSearch', listingSearch);

function listingSearch() {
    var directive = {
        replace: true,
        restrict: 'E',
        templateUrl: 'directives/listingSearch/listingSearch.tpl.html',
        controller: controller,
        controllerAs: 'vm',
        scope: {}
    };

    return directive;

    function controller($scope, $element, $rootScope) {
        'use strict';
        var vm = this;

        function init() {
            vm.searchListing = null;
            vm.loading = false;
            vm.cities = ['Tel Aviv', 'London', 'Paris', 'New York', 'Bucharest', 'Boston', 'Amsterdam'];
            vm.selectedValue = null;
        }

        $scope.$watch('vm.selectedValue', function (newVal, oldVal) {
            if(newVal != oldVal) {
                $rootScope.$broadcast('valueChanged', {value: vm.selectedValue})
            }
        });

        init();
    }
}