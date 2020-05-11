import "reflect-metadata";

export const OnKey = (mapper: string, key: string, description: string, toggle: boolean = true): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('keys', target)) {
            Reflect.defineMetadata('keys', [], target);
        }
    
        const keys = Reflect.getMetadata('keys', target) as Array<any>;
    
        keys.push({
            name: GetCurrentResourceName() + ':' + <string>methodName,
            method: methodName,
            mapper: mapper,
            key: key,
            description: description,
            toggle: toggle
        });
        Reflect.defineMetadata('keys', keys, target);
    }
}