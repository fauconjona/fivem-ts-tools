export declare abstract class AbstractController {
    protected constructor();
    protected uuidv4: () => string;
    protected emitPromise: (eventName: string, ...args: any[]) => Promise<any>;
    protected emitPromiseTimeout: (eventName: string, ...args: any[]) => Promise<any>;
    logSuccess: (message: any) => void;
    logError: (message: any) => void;
}
//# sourceMappingURL=abstract.controller.d.ts.map