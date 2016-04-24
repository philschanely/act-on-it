(function(){
    angular.module('todo').directive('categoryItem', function(todoService){
        return {
            restrict: "E",
            scope: {
                category: "="
            },
            templateUrl: "app/views/category/item.html",
            controller: function($scope){
                
                // TODO: Set real owner here once authentication is enabled.
                $scope.owner = 1;
                $scope.editing = false;
                
                $scope.checkKey = function(e) {
                    // TODO: Is there a better way to check which keys were pressed?
                    if (e.which == 27 || e.which == 9) {
                        $scope.cancelEdit();
                    }
                };
                $scope.edit = function(categoryId, e) {
                    e.preventDefault();
                    $scope.editing = true;
                    console.log("Trying to edit category");
                };
                $scope.initialize = function() {
                    console.log("Loading category item");
                    $scope.label = $scope.category.label;
                    $scope.id = $scope.category.id;
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
            controllerAs: "ci"
       };
    });
})();