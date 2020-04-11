//region IMPORTS

import "reflect-metadata";
import {AbstractController} from "./abstract.controller";

//endregion

//region CLASS

export abstract class AbstractControllerClient extends AbstractController {

    protected constructor() {
        super();
        const netEvents: Array<any> = Reflect.getMetadata('netEvents', this);

        if (netEvents) {
            netEvents.forEach((event) => {
                onNet(event.name, (...args) => this[event.method](...args));
            })
        } 

        const nuiEvents: Array<any> = Reflect.getMetadata('nuiEvents', this);

        if (nuiEvents) {
            nuiEvents.forEach((event) => {
                RegisterNuiCallbackType(event.name);
                on(`__cfx_nui:${event.name}`, (data: any, cb: Function) => this[event.method](data, cb));
            })
        } 
    }

    protected emitNetPromise = (eventName: string, ...args) => {

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

}

//endregion