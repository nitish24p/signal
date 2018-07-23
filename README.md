# Signal

Signal is a light ~700 Bytes Singleton instance of an Event bus. It works directly in the browser or has support for commonJS and amd modules.

Its Really tiny. Check it out [here](https://bundlephobia.com/result?p=signal-event@1.0.0);

<p align="center">
  <img src="https://user-images.githubusercontent.com/13037986/43097405-a6a8516c-8ed9-11e8-9141-373b08bf6afb.png" height="350px"/>
</p>

&nbsp;

### Motivation
I got the concept of creating a unified event bus whilst reading [this](https://micro-frontends.org/) article. What  if an app had multiple tech stacks, was there was a way to communicate between them?? This can be super useful for people migrating their stacks from one to another. A unified bus is one of the ways for microservices / micro apps to communicate with one another. Typically they follow a pub sub design pattern

<p align="center">
  <img src="https://user-images.githubusercontent.com/13037986/43097761-ad7837a4-8eda-11e8-9f53-550ab22d05ad.png" height="350px"/>
</p>



## Installation
Using npm

```bash
npm install signal-event

yarn add signal-event
```


## Usage

`signal-event` exports a function which when invoked with a consturctor will generate the same instance every single time. Thereby keeping all your events at one place.

```js
const Signal = require('signal-event');

const S1 = new Signal();
```

Register An Event handler

```js
S1.on('foo', function(data) {
  console.log(`got data for event name foo`, data)
});


```

Register Multiple Event handlers

```js
S1.on('foo', handlerFunction1);
S1.on('foo', handlerFunction2);
S1.on('foo', handlerFunction3);
S1.on('foo', handlerFunction4);

S1.emit('foo', { foo: 'bar' })

// This will get triggered in all the handlers;

```

Emit an Event

```js
S1.emit('foo', { foo: 'bar' })

```

Remove an Event Hanlder
```js
function beepEventHandler(data) {
  // do something with data
}

S1.on('beep', beepEventHandler);

S1.emit('beep', 'bloop');

S1.remove('beep', beepEventHandler);

/*
* If you need to remove an event handler the function specified
 must have a name, annonymous arrow fn wont work
 S1.remove('beep', () => {}); will not work
*/

```

Remove All event handlers for an event

```js
S1.remove('beep', null, true);

```

# API
1. Add Event Listener
```md
Signal.on(eventName, handlerFunction)
```

2. Emit Event
```md
Signal.emit(eventName, data)
```
3. Emit Event
```md
Signal.emit(eventName, data)
```

4. Remove Event Handler
```md
Signal.remove(eventName, handlerFunction, removeAllHandlers)
```

#Dev Setup
```bash
yarn run test
yarn run cover
```

&nbsp;

Liked the repo :star: it.

Found any Bugs
File them [here](https://github.com/nitish24p/signal/issues)
