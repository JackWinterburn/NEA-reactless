define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PriorityQueue {
        constructor() {
            this.items = [];
        }
        enqueue(element, priority) {
            const queueElement = { element, priority };
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.items.push(queueElement);
            }
        }
        // typescript really doesnt like this lol
        dequeue() {
            var _a;
            return ((_a = this.items.shift()) === null || _a === void 0 ? void 0 : _a.element) || null;
        }
        isEmpty() {
            return this.items.length === 0;
        }
    }
    exports.default = PriorityQueue;
});
