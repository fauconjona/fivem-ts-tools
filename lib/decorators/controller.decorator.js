export const Controller = () => {
    return (target) => {
        if (!Reflect.hasMetadata('events', target)) {
            Reflect.defineMetadata('events', [], target);
        }
        if (!Reflect.hasMetadata('netEvents', target)) {
            Reflect.defineMetadata('netEvents', [], target);
        }
    };
};
//# sourceMappingURL=controller.decorator.js.map