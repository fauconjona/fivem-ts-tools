import "reflect-metadata";

export const NuiEvent = (eventName: string): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('nuiEvents', target)) {
            Reflect.defineMetadata('netEvents', [], target);
        }
    
        const nuiEvents = Reflect.getMetadata('nuiEvents', target) as Array<any>;
    
        nuiEvents.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('nuiEvents', nuiEvents, target);
    }
}