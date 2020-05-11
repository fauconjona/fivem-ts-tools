//region IMPORTS

import "reflect-metadata";
import {AbstractController} from "./abstract.controller";

//endregion

//region CLASS

export abstract class AbstractControllerClient extends AbstractController {

    protected constructor() {
        super();
        const netEvents: Array<any> = Reflect.getMetadata('netEvents', this);
        const nuiEvents: Array<any> = Reflect.getMetadata('nuiEvents', this);
        const keys: Array<any> = Reflect.getMetadata('keys', this);

        if (netEvents) {
            netEvents.forEach((event) => {
                onNet(event.name, (...args) => this[event.method](...args));
            })
        }        

        if (nuiEvents) {
            nuiEvents.forEach((event) => {
                RegisterNuiCallbackType(event.name);
                on(`__cfx_nui:${event.name}`, (data: any, cb: Function) => this[event.method](data, cb));
            })
        } 

        if (keys) {
            keys.forEach((key) => {
                if (key.toggle) {
                    RegisterCommand(key.name, () => this[key.method](), false);
                } else {
                    RegisterCommand('+'+key.name, () => this[key.method](true), false);
                    RegisterCommand('-'+key.name, () => this[key.method](false), false);
                }
                RegisterKeyMapping((key.toggle?'':'+') + key.name, key.description, key.mapper, key.key);
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