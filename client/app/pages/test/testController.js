(function () {
    'use strict';
    
    
    
    angular.module('todo').controller('testController', function (todoService) {
        var vm = this;
        
        var initialize = function () {
            console.log(crypto);
            
            var password = 'password';
            var hash = crypto.createHash("md5");
            var md5 = hash.update(password)
            console.log(md5);
        };
        
        initialize();
    });
})();