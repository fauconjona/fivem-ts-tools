import "reflect-metadata";

export const Event = (eventName: string): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('events', target)) {
            console.error("Class is not a controller");
            return;
        }
    
        const events = Reflect.getMetadata('events', target) as Array<any>;
    
        events.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('events', events, target);
    }
}