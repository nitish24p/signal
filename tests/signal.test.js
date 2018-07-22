import test from 'ava';
const Signal = require('./../signal');

test('Create single instance of signal object', async t => {
  const Signal1 = new Signal();
  const Signal2 = new Signal();
  t.true(Signal1 === Signal2);
})

test('On event name is empty', async t => {
  const Signal1 = new Signal();

  const error = t.throws(() => {
    Signal1.on()
  }, ReferenceError);

  t.is(error.message, 'Event name is empty');

});

test('On event callback is empty', async t => {
  const Signal1 = new Signal();

  const error = t.throws(() => {
    Signal1.on('woot')
  }, ReferenceError);

  t.is(error.message, 'Event callback should be of type function');

});

test('On event callback is empty', async t => {
  const Signal1 = new Signal();

  const error = t.throws(() => {
    Signal1.on('woot', {});
  }, ReferenceError);

  t.is(error.message, 'Event callback should be of type function');
});


test('Emit has empty name', async t => {
  const Signal1 = new Signal();

  t.is(Signal1.emit(), undefined);

})

test('Instance can emit', async t => {
  const Signal1 = new Signal();
  
  Signal1.on('woot', (data) => {
    t.is(data, 'boot');
  })
  
  Signal1.emit('woot', 'boot');
});

test('Instance can emit multiple times', async t => {
  const Signal1 = new Signal();
  const firstHandler = function(data) {}

  const secondHandler = function(data) {}

  const thirdHandler = function(data) {}

  Signal1.on('woot', firstHandler);
  Signal1.on('woot', secondHandler);
  Signal1.on('woot', thirdHandler);

  Signal1.remove('woot', thirdHandler);  
  t.is(Object.keys(Signal1.events.woot).length, 3);
})