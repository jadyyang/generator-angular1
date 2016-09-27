/**
 * message.controller
 * Created by jady on 2016/9/27.
 */


var ngModule = require('./message.module');
var template = require('./message.template.html');

require('./message.css');


ngModule.controller('message.controller', ['$scope', function($scope) {

    $scope.name = "Message Page";

}]);

module.exports = {
    template: template
};