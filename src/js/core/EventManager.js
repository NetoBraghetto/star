var App = require("app");

var EventManager = function () {
    "use strict";

    var map = {};

    return {
        subscribe: function (eventName, fn) {
            if (typeof eventName !== "string") {
                throw "eventName must be string";
            }

            if (!eventName.length) {
                throw "eventName cannot be empty";
            }

            if (!map.hasOwnProperty(eventName)) {
                map[eventName] = [];
            }

            map[eventName].push(fn);
        },

        subscribeMultiple: function (eventsNames, fn) {
            var i, length = eventsNames.length;

            for (i = 0; i < length; i++) {
                this.subscribe(eventsNames[i], fn);
            }
        },

        unsubscribe: function (eventName, fn) {
            if (!map.hasOwnProperty(eventName)) {
                return;
            }

            var index = map[eventName].indexOf(fn);
            if (index !== -1) {
                map[eventName].splice(index, 1);
            }
        },

        unsubscribeMultiple: function (eventsNames, fn) {
            console.log()
            var i, length = eventsNames.length;
            for (i = 0; i < length; i++) {
                this.unsubscribe(eventsNames[i], fn);
            }
        },

        unsubscribeAll: function (eventsNames) {
            var i, length = eventsNames.length;
            for (i = 0; i < length; i++) {
                if (map.hasOwnProperty(eventsNames[i])) {
                    delete (map[eventsNames[i]]);
                }
            }
        },

        notify: function (eventName) {
            console.log("fired " + eventName);

            if (!map.hasOwnProperty(eventName)) {
                console.log("nobody listening " + eventName);
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            map[eventName].forEach(function (fn) {
                fn.apply(this, args);
            });
        }
    };
};

module.exports = EventManager;
