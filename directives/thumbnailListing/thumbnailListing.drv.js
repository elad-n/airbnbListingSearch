'use strict';

angular.module('directives.thumbnailListing', [])
    .directive('thumbnailListing', thumbnailListing);

function thumbnailListing() {
    var directive = {
        replace: true,
        restrict: 'E',
        templateUrl: 'directives/thumbnailListing/thumbnail.tpl.html',
        controller: controller,
        controllerAs: 'vm',
        scope: {
            listing: '=',
            selected: '=',
            openThumb: '&',
            closeThumb: '&'
        }
    };

    return directive;

    function controller($scope, $attrs, $element, listSrv) {
        var vm = this;

        $scope.$watch('selected', function (val) {
            if (!val || val.listing.id !== vm.listing.id) return;

            if (!vm.fullItem) {
                getReviews(val.listing.id);
            }
        });

        function getReviews(listingId) {
            vm.loading = true;
            listSrv.getListingReviews(listingId)
                .then(function (results) {
                    if (!results || !results.data || results.data.reviews.length == 0) {
                        vm.noResults = true;
                    } else {
                        vm.reviews = results.data.reviews;
                        _.forEach(vm.reviews, function (review) {
                            review.created_at = review.created_at.split('T')[0];
                        });
                    }
                    vm.loading = false;
                }, function (err) {
                    console.log(err);
                    vm.loading = false;
                    vm.error = true;
                })
        }

        function init() {
            vm.error = false;
            vm.myInterval = 3000;
            vm.listing = $scope.listing.listing;
            vm.loading = false;
            vm.noWrapSlides = false;
            vm.active = 0;
            vm.noResults = false;
            vm.fullItem = false;
        }

        init();
    }
}