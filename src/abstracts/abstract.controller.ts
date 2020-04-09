//region CLASS

export abstract class AbstractController {

    protected constructor() {
        const events: Array<any> = Reflect.getMetadata('events', this);

        if (events) {
            events.forEach((event) => {
                on(event.name, (...args) => this[event.method](...args));
            })
        }   
    }

    protected uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    protected emitPromise = (eventName: string, ...args): Promise<any> => {
        return new Promise((resolve, reject) => {
            emit(eventName, ...args, (result, error) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    };

    protected emitPromiseTimeout = (eventName: string, ...args): Promise<any> => {

        return new Promise((resolve, reject) => {
            let timeout = false;

            setTimeout(() => {
                timeout = true;
                reject(`PromiseTimeout => Resource = ${GetCurrentResourceName()}, EventName = ${eventName}`);
            }, 10000);

            emit(eventName, ...args, (result, error) => {
                if (timeout) {
                    return;
                }

                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    };

    //any parce qu'on peut afficher des objets
    public logSuccess = (message: any) => {
        console.log('\x1b[32m%s\x1b[0m', `[bReal ${GetCurrentResourceName()}] ${message}`); 
    };

    public logError = (message: any) => {
        console.error('\x1b[31m%s\x1b[0m', `[bReal ${GetCurrentResourceName()}] ${message}`); 
    };

}

//endregion