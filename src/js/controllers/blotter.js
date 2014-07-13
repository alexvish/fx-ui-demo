define(['./module'], function (controllers) {
    'use strict';


    var orderManager = require('../node-lib/OrderManager');


    controllers.controller('BlotterCtl',['$scope','$win',function($scope,$win) {
        $scope.orders = orderManager.getAllOrders();
        var columnDefs = [
            {
                field: 'orderId',
                displayName: 'Order Id'
            },
            {
                field: 'Symbol',
                displayName: 'Symbol'
            },
            {
                field: 'Price',
                displayName: 'Rate'
            },
            {
                field: 'Side',
                displayName: 'Side',
                cellTemplate: "<div class=\"ngCellText\" ng-class=\"[col.colIndex(),COL_FIELD]\"><span ng-cell-text>{{COL_FIELD}}</span></div>"
            },
            {
                displayName: 'Currency1',
                cellTemplate: "<div class=\"ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>{{row.entity.FCurrency}}: <span ng-class=\"{buy:'blackQty',sell:'redQty'}[row.entity.Side]\"> {{row.entity.Price * row.entity.OrderQty}}</span> </span></div>"
            },
            {
                displayName: 'Currency2',
                cellTemplate: "<div class=\"ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>{{row.entity.Currency}}: <span ng-class=\"{buy:'redQty',sell:'blackQty'}[row.entity.Side]\"> {{row.entity.OrderQty}}</span> </span></div>"
            },
            {
                field: 'state',
                displayName: 'State'
            }

        ];
        $scope.gridOptions = { 
            data: 'orders',
            enableRowSelection:true,
            multiSelect:false,
            enableColumnResize:true,
            columnDefs: columnDefs,
            rowTemplate:"<div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"[col.colIndex(),{new:'neworder',executed:'executedorder',rejected:'rejectedorder'}[row.entity.state]]\" class=\"ngCell {{col.cellClass}}\">\n" +
                            "\t<div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>\n" +
                            "\t<div ng-cell></div>\n" +
                        "</div>"
        };

        var onNewOrder = function(order) {
            $scope.$apply(function() {
                $scope.orders.unshift(order);
            });
        };

        var onOrderChange = function(order) {
            $scope.$apply(function() {
                for (var i=0; i < $scope.orders.length; i++) {
                    if (order.id == $scope.orders[i].id) {
                        //var ord = angular.extend({},$scope.orders[i]);
                        $scope.orders[i] = order;
                        break;
                    }
                }
            });
        };

        orderManager.on('new',onNewOrder);
        orderManager.on('change',onOrderChange);

        $win.on('closed',function(){
            orderManager.removeListener('new', onNewOrder);
            orderManager.removeListener('change', onOrderChange);
        });
    }]);
});