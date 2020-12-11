import EventEmitter from '..';

describe('service', () => {
  it('event handlers should be properly called', () => {
    const e = new EventEmitter();
    const test = jest.fn();
    e.on('test', test);
    expect(test).toHaveBeenCalledTimes(0);
    e.emit('test');
    expect(test).toHaveBeenCalledTimes(1);
    e.emit('test');
    e.emit('test');
    e.emit('test');
    expect(test).toHaveBeenCalledTimes(4);
    e.off('test', test);
    e.emit('test');
    expect(test).toHaveBeenCalledTimes(4);
    e.on('test', test);
    e.emit('test');
    expect(test).toHaveBeenCalledTimes(5);
    e.on('test2', test);
    e.emit('test');
    e.emit('test2');
    expect(test).toHaveBeenCalledTimes(7);
    e.offAll();
    e.emit('test');
    expect(test).toHaveBeenCalledTimes(7);
  });
});
