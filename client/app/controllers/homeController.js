(function () {
    'use strict';
    
    angular.module('todo').controller('homeController', function (todoService) {
        var vm = this;
        
        vm.categories = [];
        vm.taskMsg = "No message yet.";
        
        var initialize = function () {
            todoService.getCategories().then(function (result) {
                vm.categories = result.data;
                vm.categories.forEach(function(o, i){
                    todoService.getCategoryProjects(o._id).then(function (result) {
                        o.projects = result.data;
                    });
                });
            });
        };
        
        vm.loadCategory = function (categoryId, e) {
            e.preventDefault();
            var $o = $(e.target), 
                $category = $o.closest('.category');
            changeSelected($category);
            console.log($category);
            if (categoryId === 'all') {
                vm.taskMsg = "Loading all items ...";
            } else {
                vm.taskMsg = "Loading cateogry ..." + categoryId.toString();
            }
        }
        
        vm.loadProject = function (projectId, e) {
            e.preventDefault();
            var $o = $(e.target),
                $project = $o.closest('.project');
            changeSelected($project);
            console.log($project);
            vm.taskMsg = "Loading project ..." + projectId.toString();
        }
        
        initialize();
    });
})();