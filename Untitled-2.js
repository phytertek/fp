const createAction = (type, payload) => ({ type, payload });

const doThis = arr => createAction('HELLO', arr);

const action = doThis([1, 2, 3]);

console.log(action);
const actionObj = {
  HELLO: () => console.log('hello')
};
