define(['./module','_'], function (services,_) {
    'use strict';

    var gui = require('nw.gui');
    var window = gui.Window.get();
    var windowSettings = global.windowSettings;
    if (!windowSettings) {
        windowSettings = {
            windowId: "start-menu",
            showing: false
        };
    }
    
    var windowId = windowSettings.windowId;
    var appWindows = require('../node-lib/AppWindows');
    var winCtrl = appWindows.windowOpened(windowId);
    window.on('closed',function() {
        appWindows.windowClosed(windowId);
    });



    
    services.service('$win',['windowModels',function(windowModels) {
        var showing = windowSettings.showing;
        if (showing === undefined) {
            showing = true;
        }
        this.__defineGetter__('showing',function() {
            return showing;
        });

        this.__defineGetter__('windowSettings',function() {
            return windowSettings;
        });

        this.showDevTools = function() {
            window.showDevTools();
        };
        this.windowHide = function() {
            window.hide();
            showing = false;
        };

        this.windowClose = function(){
            window.close();
        };

        this.on = function(event,callback) {
            window.on(event,callback);
        }

        this.windowShow = function(options) {
            if (options && options.x !== undefined && options.y !== undefined) {
                window.moveTo(options.x,options.y);
            }
            window.show();
            showing = true;
        };


        this.closeAllWindows = function() {
            gui.App.closeAllWindows();
        }

        this.initTray = function(trayConfig,menu,clickFn) {
            if (_.isFunction(menu)) {
                clickFn = menu;
                menu = undefined;
            }
            var tray = this.tray = new gui.Tray(trayConfig);
            window.on('closed',function() {
                tray.remove();
            });

            if (menu) {
                tray.menu = this.createMenu(menu);
            }

            if (clickFn) {
                tray.on('click',clickFn);
            }
        };

        var notifyUser = function(window,windowSettings) {
            if (windowSettings.focus) {
                window.focus();
            }
            if (windowSettings.request_attn) {
                window.requestAttention(true);
            }
        }

        this.openWindow = function(windowId,options) {
            var windowOptions = _.extend(windowModels.getWindowOptions(windowId),options,{windowId: windowId});
            if (appWindows.windowExists(windowId)){
                appWindows.notifyWindow(windowId,windowOptions);
            } else {
                if (windowOptions.url) {
                    global.windowSettings = windowOptions;
                    var win = gui.Window.open(windowOptions.url,windowOptions);
                    if (_.isNumber(windowOptions.x) && _.isNumber(windowOptions.y)) {
                        win.moveTo(windowOptions.x,windowOptions.y);
                    }
                    //notifyUser(win,windowOptions);
                }
            }
        }

        var this_ = this;
        winCtrl.eventEmitter.on('notifyWindow',function(windowId,windowOptions) {
            if (!this_.showing) {
                this_.windowShow();
            }
            notifyUser(window,windowOptions);
        });

        /**
         * Create a context or window menu.
         * @param menuStructure The actual structure of the menu. This is a shortcut to avoid calling all append methods after creation.
         * Just provide an object with the following supported properties:
         * {
         *  root:{
         *      items:[{
         *          label: "My Menu Label",
         *          type: "normal|separator|checkbox",
         *          enabled: true|false,
         *          tooltip: "This is my tooltip",
         *          icon: "path-to-icon"
         *          items:[{recursive}]
         *      }]
         *  }
         * }
         * @returns {gui.Menu}
         */
        this.createMenu = function(menuStructure) {

            // Create the top menu
            var menu = new gui.Menu();

            // Create sub-menu items if they're provided
            if(menuStructure.root && menuStructure.root.items) {

                console.log("Creating %d menu items for root menu", menuStructure.root.items.length);
                createMenuItems(menu, menuStructure.root.items);
            }

            if(menu.type === 'menubar') {
                this.window.menu = menu;
            }

            return menu;
        };

        function createMenuItems(menu, items) {

            _.each(items, function(i) {

                console.log("Creating item", i.label);

                // Shortcut to integrate menu with Angular event system when click represents an eventName
                if(_.isString(i.click)) {
                    i.click = (function(menu, $rootScope, eventName) { return function() { $rootScope.$broadcast(eventName, menu, this) } })(menu, $rootScope, i.click);
                }
                // Create a sub-menu if items are provided
                if(i.items) {
                    i.submenu = new gui.Menu();
                    createMenuItems(i.submenu, i.items);
                }

                // Append the menu item to the provided menu
                console.log("appending item %s to menu", i.label);
                menu.append(new gui.MenuItem(i));
            });
        }

    }]);
});