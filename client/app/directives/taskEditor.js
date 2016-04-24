(function(){
    angular.module('todo').directive('taskEditor', function(todoService){
        return {
            restrict: "E",
            scope: {
                task: "="
            },
            templateUrl: "app/views/task/edit.html",
            controller: function($scope){
                
                $scope.checkKey = function(e) {
                    // TODO: Is there a better way to check which keys were pressed?
                    if (e.which == 27 || e.which == 9) {
                        $scope.cancelEdit();
                    }
                };
                $scope.edit = function(id) {
                    $scope.editing = true;
                    console.log("Trying to edit task");
                };
                $scope.initialize = function() {
                    console.log("Loading category item");
                    if ($scope.task) {
                        $scope.status = $scope.task.status;
                        $scope.id = $scope.task.id;
                        $scope.date_due = $scope.task.date_due; 
                        $scope.body = $scope.task.body;
                        $scope.editing = $scope.task.editing ? $scope.task.editing : false;
                        $scope.selected = false;
                    } else {
                        $scope.status = 0;
                        $scope.id = null;
                        $scope.date_due = ""; 
                        $scope.body = "";
                        $scope.editing = false;
                        $scope.selected = false;
                    }
                    if ($scope.editing) {
                        changeSelected();
                        $scope.selected = true;
                    }
                    console.log($scope.selected);
                };
                $scope.save = function (e) {
                    console.log(e);
                    $scope.editing = false;
                    todoService.saveCategory({
                        id: $scope.id,
                        label: $(e.target).find("input.category-label").val(),
                        owner: $scope.owner
                    }).then(function (result) {
                        console.log(result);
                        $scope.label = result.data.label;
                    });
                };
                $scope.cancelEdit = function() {
                    $scope.editing = false;
                };
               
                $scope.initialize();
            },
            controllerAs: "ti"
       };
    });
})();