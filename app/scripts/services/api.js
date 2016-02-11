'use strict';

/**
 * @ngdoc service
 * @name pantyexpressApp.api
 * @description
 * # api
 * Service in the pantyexpressApp.
 */

angular.module('pantyexpressApp')
  .service('api', function (ApiFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return new ApiFactory();
  });

