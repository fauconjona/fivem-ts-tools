export const NetEvent = (eventName) => {
    return (target, methodName) => {
        if (!Reflect.hasMetadata('netEvents', target)) {
            Reflect.defineMetadata('netEvents', [], target);
        }
        const netEvents = Reflect.getMetadata('netEvents', target);
        netEvents.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('netEvents', netEvents, target);
    };
};
//# sourceMappingURL=netEvent.decorator.js.map