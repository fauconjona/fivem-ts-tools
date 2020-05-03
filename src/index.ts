export { AbstractController } from './abstracts/abstract.controller';
export { AbstractControllerClient } from './abstracts/abstract.controller.client';
export { AbstractControllerServer } from './abstracts/abstract.controller.server';
export { AbstractService } from './abstracts/abstract.service';
export { Controller } from './decorators/controller.decorator';
export { Event } from './decorators/event.decorator';
export { NetEvent } from './decorators/netEvent.decorator';
export { NuiEvent } from './decorators/nuiEvent.decorator';
export { Command } from './decorators/command.decorator';
export { OnInterval } from './decorators/onInterval.decorator';
export { OnTick } from './decorators/onTick.decorator';

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function enumeratePeds(action: Function): void {
    let ped: number = 0;
    let handle: number;
    let next = true;
    let findResult: any = FindFirstPed(ped);
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