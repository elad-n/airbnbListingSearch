angular.module('directives.results', [])
    .directive('results', results);

function results() {
    var directive = {
        replace: true,
        restrict: 'E',
        templateUrl: 'directives/results/results.tpl.html',
        controller: controller,
        controllerAs: 'vm',
        scope: {}
    };

    return directive;

    function controller($scope, listSrv) {
        'use strict';

        var vm = this;
        var selectedCity = null;

        function init() {
            vm.expanded = false;
            vm.active = false;
            vm.currentPage = 0;
        }

        function searchListing(value, offset) {
            if (value) {
                vm.results = [];
                vm.loading = true;
                vm.noResults = false;

                listSrv.getListingsByCity(value, offset)
                    .then(function (results) {
                        vm.results = results.data.search_results;
                        vm.loading = false;
                        if (!_.size(vm.results)) {
                            vm.noResults = true;
                        }
                    }, function (err) {
                        vm.noResults = false;
                        console.log(err);
                    });
            }
        }

        // listen on changes in the search dropDown.
        $scope.$on('valueChanged', function (value, event) {
            selectedCity = event.value;
            searchListing(event.value);
        });

        vm.selectListing = function (item) {
            if (!vm.selected) {
                vm.selected = item;
            }
        };

        vm.closeThumb = function () {
            vm.selected = null;
        };

        vm.next = function () {
            vm.currentPage += 1;
            searchListing(selectedCity, vm.currentPage * 20);
        };

        vm.prev = function () {
            if (vm.currentPage > 0) {
                vm.currentPage -= 1;
                searchListing(selectedCity, vm.currentPage * 20);
            }
        };

        init();
    }

}
