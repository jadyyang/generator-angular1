/**
 * user.controller
 * Created by jady on 2016/9/27.
 */


var ngModule = require('./user.module');
var template = require('./user.template.html');

require('./user.css');


ngModule.controller('user.controller', ['$scope', function($scope) {

    $scope.name = "User Page";

}]);

module.exports = {
    template: template
};