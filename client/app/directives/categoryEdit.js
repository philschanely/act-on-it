(function(){
    angular.module('todo').directive('categoryEdit', function(){
        return {
            restrict: "E",
            templateUrl: "app/views/category/edit.html",
            controller: function($scope){

                this.category_id = null;
                this.label = '';
                this.description = '';
                this.owner = 1;

                this.initialize = function() {
                    console.log('Category editor loaded.');
                };

                this.save = function () {
                    console.log('Trying to save category.');
                    /* create/update record
                    todoService.saveCategory({
                        category_id: this.category_id,
                        label: this.label,
                        description: this.description,
                        owner: this.owner
                    }).then(function (result) {
                        console.log(result);
                    });
                    */
                };

                this.initialize();
            },
            controllerAs: "category"
        };
    });
})();