export { AbstractController } from './abstracts/abstract.controller';
export { AbstractControllerClient } from './abstracts/abstract.controller.client';
export { AbstractControllerServer } from './abstracts/abstract.controller.server';
export { AbstractService } from './abstracts/abstract.service';
export { Controller } from './decorators/controller.decorator';
export { Event } from './decorators/event.decorator';
export { NetEvent } from './decorators/netEvent.decorator';
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function enumeratePeds(action) {
    let ped = 0;
    let handle;
    let next = true;
    let findResult = FindFirstPed(ped);
    handle = findResult[0];
    do {
        ped = findResult[1];
        if (ped != undefined) {
            action(ped);
        }
        findResult = FindNextPed(handle, ped);
        next = findResult[0];
    } while (next != false);
    EndFindPed(handle);
}
//# sourceMappingURL=index.js.map