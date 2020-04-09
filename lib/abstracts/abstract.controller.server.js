//region IMPORTS
import { AbstractController } from "./abstract.controller";
//endregion
//region CLASS
export class AbstractControllerServer extends AbstractController {
    constructor() {
        super();
        this.emitNetPromise = (eventName, playerId, ...args) => {
            return new Promise((resolve, reject) => {
                let timeout = false;
                setTimeout(() => {
                    timeout = true;
                    reject(`NetPromiseTimeout => Resource = ${GetCurrentResourceName()}, EventName = ${eventName}`);
                }, 10000);
                let guid = this.uuidv4();
                const gEventName = eventName.concat(guid);
                emitNet(eventName, playerId, gEventName, ...args);
                function handleEvent(result, error) {
                    removeEventListener(gEventName, handleEvent);
                    if (timeout) {
                        return;
                    }
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
                onNet(gEventName, handleEvent);
            });
        };
        const netEvents = Reflect.getMetadata('netEvents', this);
        if (netEvents) {
            netEvents.forEach((event) => {
                onNet(event.name, (...args) => this[event.method](source, ...args));
            });
        }
    }
}
//endregion
//# sourceMappingURL=abstract.controller.server.js.map