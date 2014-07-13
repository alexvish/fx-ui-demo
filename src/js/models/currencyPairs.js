define(['./module'], function (model) {
    'use strict';
    
    model.factory('currencyPairs',function() {
        var currencyPairs = [];
        currencyPairs.push({
            cc1: "CC0",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC1",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC2",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC3",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC4",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC5",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC6",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC7",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC8",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CC9",
            cc2: "USD"
        });

        currencyPairs.push({
            cc1: "CB0",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB1",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB2",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB3",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB4",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB5",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB6",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB7",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB8",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CB9",
            cc2: "USD"
        });

        currencyPairs.push({
            cc1: "CD0",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD1",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD2",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD3",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD4",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD5",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD6",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD7",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD8",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CD9",
            cc2: "USD"
        });

        currencyPairs.push({
            cc1: "CE0",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE1",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE2",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE3",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE4",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE5",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE6",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE7",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE8",
            cc2: "USD"
        });
        currencyPairs.push({
            cc1: "CE9",
            cc2: "USD"
        });



        angular.forEach(currencyPairs,function(ccPair) {
            ccPair.label = ccPair.cc1 + '/' + ccPair.cc2;
        });
        return currencyPairs;
    });    
});