var events = require('events'),
    uuid = require('uuid'),
    _ = require('lodash');

function OrderManager() {
    this.orders = {};
    this.orderlist = [];
    events.EventEmitter.call(this);
}

OrderManager.prototype.__proto__ = events.EventEmitter.prototype;


OrderManager.prototype.placeOrder = function(order) {
    var orderId = uuid.v4();
    _.extend(order,{orderId:orderId,state:'new'});
    this.orders[orderId] = order;
    this.orderlist.unshift(order);
    this.emit('new',order);
    var om = this;
    setTimeout(function() {
        if (Math.random() < 0.2) {
            om.changeOrder({orderId:orderId,state:'rejected'});
        } else {
            om.changeOrder({orderId: orderId, state:'executed'});
        }
    }, 3000);
    return orderId;
};

OrderManager.prototype.changeOrder = function(order) {
    if (!this.orders.hasOwnProperty(order.orderId)){
        return;
    }
    var o = this.orders[order.orderId];
    _.extend(o,order);
    this.emit('change',o);
};

OrderManager.prototype.getOrderById = function(orderId) {
    return this.orders[orderId];
};

OrderManager.prototype.getAllOrders = function() {
    return this.orderlist.slice(0);
};

module.exports=new OrderManager();