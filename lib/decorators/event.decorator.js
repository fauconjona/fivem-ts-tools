export const Event = (eventName) => {
    return (target, methodName) => {
        if (!Reflect.hasMetadata('events', target)) {
            Reflect.defineMetadata('events', [], target);
        }
        const events = Reflect.getMetadata('events', target);
        events.push({
            name: eventName,
            method: methodName
        });
        Reflect.defineMetadata('events', events, target);
    };
};
//# sourceMappingURL=event.decorator.js.map