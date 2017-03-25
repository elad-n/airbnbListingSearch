angular.module('services.listing', [])
    .service('listSrv', listSrv);

function listSrv($http, searchByCityUrl, listingReviewUrl) {
    'use strict';

    return {
        getListingsByCity: getListingsByCity,
        getListingReviews: getListingReviews
    };

    /////////////////////

    // return array of listings in give searchVal (city).
    function getListingsByCity(searchVal, offset) {
        return $http.get(searchByCityUrl, {
            params: {location: searchVal, _limit: 20, _offset: offset}
        });
    }

    // return specific listing review.
    function getListingReviews(clientId) {
        return $http.get(listingReviewUrl, {
            params: {listing_id: clientId, role: 'all'}
        })
    }
}

