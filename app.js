var app = angular.module('app', [
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.select',
    'ui.bootstrap',

    'controllers.mainCtrl',

    'directives.listingSearch',
    'directives.thumbnailListing',
    'directives.results',
    'directives.review',

    'services.listing'
]);

app.constant('searchByCityUrl', 'https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty');
app.constant('listingReviewUrl', 'https://api.airbnb.com/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty');

app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
