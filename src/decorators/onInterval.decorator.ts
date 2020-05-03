import "reflect-metadata";

export const OnInterval = (ms: number): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('intervals', target)) {
            Reflect.defineMetadata('intervals', [], target);
        }
    
        const intervals = Reflect.getMetadata('intervals', target) as Array<any>;
    
        intervals.push({
            method: methodName,
            ms: ms
        });
        Reflect.defineMetadata('intervals', intervals, target);
    }
}