import { AbstractController } from "./abstract.controller";
export declare abstract class AbstractControllerClient extends AbstractController {
    protected constructor();
    protected emitNetPromise: (eventName: string, ...args: any[]) => Promise<unknown>;
}
//# sourceMappingURL=abstract.controller.client.d.ts.map