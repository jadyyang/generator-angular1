
var angular = require("angular");
var router = require("angular-ui-router");
var oclazyload = (function() { require("oclazyload"); return { name: 'oc.lazyLoad'}; })();

import './resources/css/index.css'

var app = angular.module('app', [
    router, oclazyload.name
]);

app.config(['$stateProvider', '$locationProvider',
    function ($stateProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('/', {
                url: '/',
                templateProvider: ['$q', function($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var controller = require('./app/index/index.controller');
                        deferred.resolve(controller.template);
                    });
                    return deferred.promise;
                }],
                controller: 'index.controller',
                resolve: {
                    foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure([], function () {
                            var controller = require('./app/index/index.controller');
                            $ocLazyLoad.load({
                                name: 'index.module'
                            });
                            deferred.resolve(controller);
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('/user/', {
                url: '/user/',
                templateProvider: ['$q', function($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var controller = require('./app/user/user.controller');
                        deferred.resolve(controller.template);
                    });
                    return deferred.promise;
                }],
                controller: 'user.controller',
                resolve: {
                    foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure([], function () {
                            var controller = require('./app/user/user.controller');
                            $ocLazyLoad.load({
                                name: 'user.module'
                            });
                            deferred.resolve(controller);
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('/message/', {
                url: '/message/',
                templateProvider: ['$q', function($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var controller = require('./app/message/message.controller');
                        deferred.resolve(controller.template);
                    });
                    return deferred.promise;
                }],
                controller: 'message.controller',
                resolve: {
                    foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure([], function () {
                            var controller = require('./app/message/message.controller');
                            $ocLazyLoad.load({
                                name: 'message.module'
                            });
                            deferred.resolve(controller);
                        });
                        return deferred.promise;
                    }]
                }
            })
    }
]);

angular.bootstrap(document, [app.name]);

module.exports = app;