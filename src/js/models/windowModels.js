define(['./module'], function (model) {
    'use strict'
    var appWindows = require('../node-lib/AppWindows');

    model.service('windowModels',function() {
        var strStartsWith = function(s,str) {
            return s.slice(0,str.length) == str;
        };
        var getTraderY = function(row,geom) {
            return geom.screenInsetY +  geom.marginY + row*(geom.height + geom.marginY);
        } 
        var getTraderX = function(col,geom) {
            return geom.screenInsetX + geom.marginX + col * (geom.width + geom.marginX) 
        }
        var getNextTraderPos = function(pos,geom) {
            pos.row += 1;
            if (window.screen.availHeight - geom.screenInsetY > getTraderY(pos.row,geom) + geom.height) {
                return pos;
            } else {
                pos.row = 0;
                pos.col += 1;
                if (window.screen.availWidth - geom.screenInsetX > getTraderX(pos.col,geom) + geom.width) {
                    return pos;
                } else {
                    pos.col = 0;
                    return pos;
                }
            }
        }

        this.nextTraderPos = {row:0,col:0};
        this.traderGeom = {
            width: 350,
            height: 180,
            marginX: 0,
            marginY: 0,
            screenInsetY: 10,
            screenInsetX: 10
        }
        this.getWindowOptions = function(windowId) {
            var windowOptions = {
                title: "Fx window",
                show: true,
                toolbar: false,
                frame: true,
                resizable: true,
                width: 500,
                height: 500,
                position: "mouse",
                "always-on-top": false,
                icon:"images/logo_64x64.png",
                show_in_taskbar: true,
                //not node-webkit fields
                url:'',
                x:0,
                y:0,
                focus: true,
                request_attn: true
            };

            if (strStartsWith(windowId,'Trader.')) {
                windowOptions.resizable = false;
                windowOptions.frame = false;
                windowOptions.x = getTraderX(this.nextTraderPos.col,this.traderGeom);
                windowOptions.y = getTraderY(this.nextTraderPos.row,this.traderGeom);
                windowOptions.title = 'Trade ' + windowId.slice(-7);
                windowOptions.url = './fx-trader.html';
                windowOptions.width = this.traderGeom.width;
                windowOptions.height = this.traderGeom.height;

                if (!appWindows.windowExists(windowId)) {
                    this.nextTraderPos = getNextTraderPos(this.nextTraderPos,this.traderGeom);    
                }
                
            } else if (windowId == 'Blotter') {
                windowOptions.width = 900;
                windowOptions.height = 300;
                windowOptions.x = 400;
                windowOptions.y = window.screen.availHeight - 50 - windowOptions.height;
                windowOptions.title = 'Blotter';
                windowOptions.url = './blotter.html';
            }
            return windowOptions;
        }
    });

});