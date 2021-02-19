import "reflect-metadata";

export const Controller = (): ClassDecorator => {
    return (target: any) => {
        if (! Reflect.hasMetadata('events', target.prototype)) {
            Reflect.defineMetadata('events', [], target.prototype);
        }
        if (! Reflect.hasMetadata('netEvents', target.prototype)) {
            Reflect.defineMetadata('netEvents', [], target.prototype);
        }
        if (! Reflect.hasMetadata('nuiEvents', target.prototype)) {
            Reflect.defineMetadata('nuiEvents', [], target.prototype);
        }
        if (! Reflect.hasMetadata('commands', target.prototype)) {
            Reflect.defineMetadata('commands', [], target.prototype);
        }
        if (! Reflect.hasMetadata('ticks', target.prototype)) {
            Reflect.defineMetadata('ticks', [], target.prototype);
        }
        if (! Reflect.hasMetadata('intervals', target.prototype)) {
            Reflect.defineMetadata('intervals', [], target.prototype);
        }
    };
};
