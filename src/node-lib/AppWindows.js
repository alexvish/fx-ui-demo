
var events = require('events');

function AppWindows() {
    this._windows = {};
}

AppWindows.prototype.windowOpened = function(id) {
    if (!id || this.windowExists(id)) {
        return;
    }
    var winCtrl = {
        eventEmitter:new events.EventEmitter()
    };

    this._windows[id] = winCtrl;
    console.log("window opened " + id);
    return winCtrl;
};

AppWindows.prototype.windowClosed = function(id) {
    if (!id || !this._windows[id]) {
        return;
    }
    var winCtrl = this._windows[id];
    delete this._windows[id];
    console.log("window closed " + id);
    return winCtrl;
};

AppWindows.prototype.windowExists = function(windowId) {
    return this._windows.hasOwnProperty(windowId);
};

AppWindows.prototype.notifyWindow = function(windowId,windowOptions) {
    var winCtrl = this._windows[windowId];
    if (!winCtrl) {
        return;
    }

    var eventEmitter = winCtrl.eventEmitter;
    if (!eventEmitter) {
        return;
    }
    eventEmitter.emit('notifyWindow',windowId, windowOptions);
};

module.exports=new AppWindows();