define(['./module'], function (controllers) {
    'use strict';

    var quoteManager = require('../node-lib/QuoteManager'),
        orderManager = require('../node-lib/OrderManager');


    controllers.controller('FXTraderCtl',['$scope','$win',function($scope,$win) {
        $scope.ccPair = $win.windowSettings.ccPair;
        if (!$scope.ccPair) {
            $scope.ccPair = {
                cc1: "EUR",
                cc2: "USD",
                label: "EUR/USD"
            };    
        }
        var quoteListener = function(quote) {
            $scope.$apply(function() {
                $scope.bid = quote.bid;
                $scope.offer = quote.offer;    
            });
        };
        quoteManager.subscribe($scope.ccPair,quoteListener);
        var ccPair = $scope.ccPair;
        $win.on('closed',function() {
            quoteManager.unsubscribe(ccPair,quoteListener);
        });

        $scope.buy = function() {
            orderManager.placeOrder({
                Symbol : $scope.ccPair.label,
                Side: 'buy',
                FCurrency: $scope.ccPair.cc1,
                OrderQty: 100000.0,
                Currency: $scope.ccPair.cc2,
                Price: $scope.bid
            });
        };
        $scope.sell = function() {
            orderManager.placeOrder({
                Symbol : $scope.ccPair.label,
                Side: 'sell',
                FCurrency: $scope.ccPair.cc1, 
                OrderQty: 100000.0,
                Currency: $scope.ccPair.cc2,
                Price: $scope.offer
            });
        };



        $scope.windowClose = function() {
            $win.windowClose();
        };
    }]);

    controllers.filter("pricePart",function() {
        return function(input, part) {
            if (part === undefined) {
                part = 1;
            }
            if(part == 1) {
                return input.slice(0,3);
            } else if (part == 2) {
                return input.slice(3,5);
            } else {
                return input.slice(5,6);
            }
        };
    });

});