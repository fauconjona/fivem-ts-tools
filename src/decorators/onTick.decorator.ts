import "reflect-metadata";

export const OnTick = (): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('ticks', target)) {
            Reflect.defineMetadata('ticks', [], target);
        }
    
        const ticks = Reflect.getMetadata('ticks', target) as Array<any>;
    
        ticks.push({
            method: methodName
        });
        Reflect.defineMetadata('ticks', ticks, target);
    }
}