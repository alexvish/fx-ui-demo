define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('StartMenuCtrl',['$scope','$win','startMenuItems',function($scope,$win,startMenuItems) {
        $win.initTray({
            icon: 'images/logo_64x64.png'
        },{root:{type:'context',items:[{
            label: 'Exit',
            click: function() {
                $win.closeAllWindows();
            }
        }]}}, 
        function() {
            if ($win.showing) {
                $win.windowHide();
                $scope.$apply(function() {
                    $scope.searchText = '';    
                });
            } else {
                var x = window.screen.availWidth-600;
                var y = window.screen.availHeight-500;
                $win.windowShow({x:x,y:y});
            }
        });

        $scope.mainMenu = startMenuItems;
        var subMenuItems = [];
        for(var i = 0; i < $scope.mainMenu.length; i++) {
            if ($scope.mainMenu[i].items) {
                Array.prototype.push.apply(subMenuItems,$scope.mainMenu[i].items);
            }
        }
        $scope.subMenuItems = subMenuItems;

        $scope.activateMenu=function(menu) {
            if ( !menu || !menu.items || menu.items.length == 0) {
                return;
            } 
            $scope.activeMenu = menu;
        };

        $scope.isActive = function(menu) {
            return !$scope.isSearchActive() && menu == $scope.activeMenu;
        }

        $scope.isSearchActive = function() {
            return $scope.searchText;
        }

        var nanoUpdateTimeout;
        $scope.allSubItems = function() {
            if (nanoUpdateTimeout) {
                clearTimeout(nanoUpdateTimeout);
            }
            setTimeout(function() {
                 $('.nano').nanoScroller();
            },0);
            if ($scope.isSearchActive()) {
                return $scope.subMenuItems;
            } else if ($scope.activeMenu) {
                return $scope.activeMenu.items;
            }
        }

        $scope.mainItemClick = function(item) {
            if(angular.isFunction(item.click)) {
                $win.windowHide();
                item.click();
            } else {
                if (item.items && item.items.length != 0) {
                    $scope.searchText='';
                    $scope.activateMenu(item);
                }
            }

        }

        $scope.submenuItemClick = function(item){
            if(angular.isFunction(item.click)) {
                $win.windowHide();
                item.click();
            }
        }

        $scope.$on('appwindow.open',function(scope,item,windowId) {
            $win.openWindow(windowId,{ccPair:item.ccPair||{}});
        });

        $scope.$on('appwindow.showDevTools',function() {
            $win.showDevTools();
        });


    }]);
});