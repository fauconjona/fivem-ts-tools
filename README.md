# FiveM typescript Tools

Add some cools features usefuls for FiveM in typescript.

## install

```
npm install fivem-ts-tools --save
```

## Abstarcts

### AbstractService

Add nothing for the moment

### AbstractController

Don't use this one directly

**protected uuidv4()**

Generate a guid

**protected emitPromise(eventName: string, ...args): Promise<any>**

Return a Promise from a callback of the triggered event

**protected emitPromiseTimeout(eventName: string, ...args): Promise<any>**

Same as `emitPromise` but with a 10 secondes timeout

**public logSuccess(message: any)**

Log a success message in the console with the resource name

**public logError(message: any)**

Log a error message in the console with the resource name

### AbstractControllerClient

A Controller for client side

**protected emitNetPromise(eventName: string, ...args): Promise<any>**

Return a Promise from a response event of the triggered net event

The server event need to listen for the response event name as a string in the first param and send a response like:

```typescript
emitNet(gEventName, source, result); //everything good

emitNet(gEventName, source, null, error); //Error
```

### AbstractControllerServer 

A Controller for server side

**protected emitNetPromise(eventName: string, playerId: string, ...args): Promise<any>**

Same as `emitNetPromise` in `AbstractControllerClient`, but with a target. If you send to every player, only the first one to answer will be get.

## Decorators

Only work for class extended from `AbstractControllerClient` or `AbstractControllerServer`

**@Controller()** (Class)

Required for your Controller if you want to use other decorators 

**@Event(name: string)** (method)

Add an event listner on the method for the event

**@NetEvent(name: string)** (method)

Add an event listner on the method for the net event

If on a server controller, the first param need to be the source as string

**@NuiEvent(name: string)** (method / client only)

Add a nui event listner on the method for the event

**@OnTick()** (method)

Execute the method every tick

**@OnInterval(ms: number)** (method)

Execute the method every `ms` millisecondes

**@Command(commandName: string, restricted: boolean (default = false))** (method)

Register the method as a command

**@OnKey(mapper: string, key: string, description: string, toggle: boolean (default = true))** (method)

Execute the method on key action, more info: https://cookbook.fivem.net/2020/01/06/using-the-new-console-key-bindings/

if toggle is false, the param `pushed` will be send to the method.

## Utils

**function delay(ms: number): Promise<any>**

A delay function to wait in a thread

exemple
```ts
await delay(10000); //Wait 10 secondes
```

**function enumeratePeds(action: Function): void**

Enumerate every peds load by the player and execute an action as a callback with the ped as param.