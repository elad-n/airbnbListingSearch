angular.module('directives.review', [])
    .directive('review', reviews);

function reviews() {
    var directive = {
        replace: true,
        restrict: 'E',
        templateUrl: 'directives/review/review.tpl.html',
        link: link,
        controller: angular.noop,
        bindToController: true,
        controllerAs: 'vm',
        scope: {
            reviewData: '='
        }
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
        'use strict';

    }
}