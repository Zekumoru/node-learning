import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

type TData = {
  title: string;
};

emitter.on('start', ({ title }: TData) => {
  console.log(`Start: ${title}`);
});

const data: TData = {
  title: 'Hello world!',
};
emitter.emit('start', data);
