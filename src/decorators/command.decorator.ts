import "reflect-metadata";

export const Command = (commandName: string, restricted: boolean = false): MethodDecorator => {
    return (target: Object, methodName: string | symbol): void => {
        if (! Reflect.hasMetadata('commands', target)) {
            Reflect.defineMetadata('commands', [], target);
        }
    
        const commands = Reflect.getMetadata('commands', target) as Array<any>;
    
        commands.push({
            name: commandName,
            restricted: restricted,
            method: methodName
        });
        Reflect.defineMetadata('commands', commands, target);
    }
}