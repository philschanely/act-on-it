(function () {
    'use strict';
    
    angular.module('todo').controller('homeController', function (todoService) {
        var vm = this;
        
        vm.categories = [];
        vm.taskMsg = "No message yet.";
        
        var initialize = function () {
            todoService.getCategories().then(function (result) {
                vm.categories = result.data;
            });
            todoService.getTasks().then(function (result) {
                vm.tasks = result.data;
            });
        };
        
        vm.loadCategory = function (categoryId, e) {
            e.preventDefault();
            var $o = $(e.target), 
                $category = $o.closest('.category');
            changeSelected($category);
            if (categoryId === 'all') {
                vm.taskMsg = "Loading all items ...";
                todoService.getTasks().then(function (result) {
                    vm.tasks = result.data;
                });
            } else {
                vm.taskMsg = "Loading cateogry ..." + categoryId.toString();
                todoService.getCategory(categoryId).then(function (result) {
                    console.log(result.data);                                                    
                });
            }
        };
        
        vm.loadProject = function (projectId, e) {
            e.preventDefault();
            var $o = $(e.target),
                $project = $o.closest('.project-header');
            changeSelected($project);
            vm.taskMsg = "Loading project ..." + projectId.toString();
            todoService.getProject(projectId).then(function (result) {
                vm.tasks = result.data.tasks;
            });
        };
        
        vm.newCategory = function(){
            console.log("Trying to add a new category");
            var category = { 
                id:null, 
                owner:1, 
                label:"New Category", 
                projects:[],
                editing:true
            }
            vm.categories.push(category);
        };
        
        initialize();
    });
})();