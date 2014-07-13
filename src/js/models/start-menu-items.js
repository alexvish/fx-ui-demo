define(['./module'], function (model) {
    'use strict';
    
    model.factory('startMenuItems',['currencyPairs','$rootScope',function(currencyPairs,$rootScope) {
        var startMenuItems = [];

        var savexMenuItem = {
            label: 'Trade Currency',
            items: []
        };

        startMenuItems.push(savexMenuItem);

        angular.forEach(currencyPairs,function(pair){
            savexMenuItem.items.push({
                label: pair.label,
                click: function() {
                    $rootScope.$broadcast('appwindow.open',this,'Trader.'+this.label);
                },
                ccPair: pair
            });
        });

        var showBlotter = {
            label: 'Blotter',
            click: function() {
                $rootScope.$broadcast('appwindow.open',this,'Blotter');
            }
        };

        startMenuItems.push(showBlotter);


        var showDevTools = {
            label: 'Show DevTools',
            click: function() {
                $rootScope.$broadcast('appwindow.showDevTools',this);
            }
        };

        startMenuItems.push(showDevTools);

        return startMenuItems;
    }]);    
});