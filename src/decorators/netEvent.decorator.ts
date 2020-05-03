import "reflect-metadata";

export const NetEvent = (eventName: string): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('netEvents', target)) {
            console.error("Class is not a controller");
            return;
        }
    
        const netEvents = Reflect.getMetadata('netEvents', target) as Array<any>;
    
        netEvents.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('netEvents', netEvents, target);
    }
}