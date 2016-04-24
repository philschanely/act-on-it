(function(){
    angular.module('todo').directive('projectEdit', function(){
       return {
           restrict: "E",
           templateUrl: "app/views/project/edit.html",
           controller: function($scope){
                this.project_id = null;
                this.category = null;
                this.label = '';
                this.description = '';
                this.owner = 1;

                this.saveCategory = function () {
                    // create/update record
                    todoService.saveProject({
                        project_id: this.project_id,
                        category: this.category,
                        label: this.label,
                        description: this.description,
                        owner: this.owner
                    }).then(function (result) {
                        console.log(result);
                        
                    });
                };
           },
           controllerAs: "project"
       };
    });
})();