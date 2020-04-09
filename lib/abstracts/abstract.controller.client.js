//region IMPORTS
import { AbstractController } from "./abstract.controller";
//endregion
//region CLASS
export class AbstractControllerClient extends AbstractController {
    constructor() {
        super();
        this.emitNetPromise = (eventName, ...args) => {
            return new Promise((resolve, reject) => {
                let timeout = false;
                setTimeout(() => {
                    timeout = true;
                    reject(`NetPromiseTimeout => Resource = ${GetCurrentResourceName()}, EventName = ${eventName}`);
                }, 10000);
                let guid = this.uuidv4();
                const gEventName = eventName.concat(guid);
                emitNet(eventName, gEventName, ...args);
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
                onNet(event.name, (...args) => this[event.method](...args));
            });
        }
    }
}
//endregion
//# sourceMappingURL=abstract.controller.client.js.map