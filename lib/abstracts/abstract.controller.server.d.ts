import { AbstractController } from "./abstract.controller";
export declare abstract class AbstractControllerServer extends AbstractController {
    protected constructor();
    protected emitNetPromise: (eventName: string, playerId: string, ...args: any[]) => Promise<unknown>;
}
//# sourceMappingURL=abstract.controller.server.d.ts.map