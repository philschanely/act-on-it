(function(){
    angular.module('todo').directive('categoryItem', function(todoService){
        return {
            restrict: "E",
            scope: {
                category: "="
            },
            templateUrl: "app/views/category/item.html",
            controller: function($scope){
                
                $scope.checkKey = function(e) {
                    // TODO: Is there a better way to check which keys were pressed?
                    if (e.which == 27 || e.which == 9) {
                        $scope.cancelEdit();
                    }
                };
                $scope.edit = function(id) {
                    $scope.editing = true;
                    console.log("Trying to edit category");
                };
                $scope.initialize = function() {
                    console.log("Loading category item");
                    $scope.label = $scope.category.label;
                    $scope.id = $scope.category.id;
                    $scope.owner = $scope.category.owner; 
                    $scope.editing = $scope.category.editing ? $scope.category.editing : false;
                    $scope.selected = false;
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
                $scope.select = function(id, e) {
                    e.preventDefault();
                    console.log($(e.target));
                    if ($(e.target).closest(".category-header").hasClass("selected")) {
                        $scope.edit(id);
                    } else {
                        changeSelected();
                    }
                    $scope.selected = true;
                }
                $scope.cancelEdit = function() {
                    $scope.editing = false;
                };
               
                $scope.initialize();
            },
            controllerAs: "ci"
       };
    });
})();