/**
 * index.controller
 * Created by jady on 2016/9/27.
 */


var ngModule = require('./index.module');
var template = require('./index.template.html');

require('./index.css');


ngModule.controller('index.controller', ['$scope', function($scope) {

    $scope.name = "Index Page";

}]);

module.exports = {
    template: template
};