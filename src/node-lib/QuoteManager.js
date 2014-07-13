
var events = require('events');

var QuoteManager = function() {
    this.eventEmitter = new events.EventEmitter();
    this.ccPairs = {};
    var qm = this;
    setInterval(function() {
        qm.update();
    },100);
}

QuoteManager.prototype.subscribe = function(ccPair,callback) {
    var label = ccPair.label;
    this.eventEmitter.on(label, callback);
    this.ccPairs[label] = events.EventEmitter.listenerCount(this.eventEmitter,label);
};

QuoteManager.prototype.unsubscribe = function(ccPair, callback) {
    var label = ccPair.label;
    this.eventEmitter.removeListener(label, callback);
    var lsnrCount = events.EventEmitter.listenerCount(this.eventEmitter,label);
    if (lsnrCount == 0) {
        delete this.ccPairs[label];
    } else {
        this.ccPairs[label] = lsnrCount;
    }
};

QuoteManager.prototype.update = function() {
    var base = 1.35;
    var shift = Math.sin(new Date().getTime()*2*Math.PI/10)/100;
    for(var i in this.ccPairs) {
        if (Math.random() > 0.3333) {
            continue;
        }
        var spread = Math.random()/500;
        this.eventEmitter.emit(i,{symbol:i, bid: base + shift - spread, offer: base + shift + spread});
    }
};

module.exports=new QuoteManager();