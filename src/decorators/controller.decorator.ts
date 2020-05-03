import "reflect-metadata";

export const Controller = (): ClassDecorator => {
    return (target: any) => {
      if (! Reflect.hasMetadata('events', target)) {
        Reflect.defineMetadata('events', [], target);
      }
      if (! Reflect.hasMetadata('netEvents', target)) {
        Reflect.defineMetadata('netEvents', [], target);
      }
      if (! Reflect.hasMetadata('nuiEvents', target)) {
        Reflect.defineMetadata('nuiEvents', [], target);
      }
      if (! Reflect.hasMetadata('commands', target)) {
        Reflect.defineMetadata('commands', [], target);
      }
    };
  };