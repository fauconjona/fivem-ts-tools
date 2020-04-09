export const Event = (eventName: string): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('events', target)) {
            Reflect.defineMetadata('events', [], target);
        }
    
        const events = Reflect.getMetadata('events', target) as Array<any>;
    
        events.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('events', events, target);
    }
}