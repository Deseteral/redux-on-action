# redux-on-action
Do something async when Redux action happens. Yet another (tiny) Redux async middleware.

## Table of Contents
* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [License](#license)

## Install
```sh
npm install --save redux-on-action
```

## Usage
First you have to apply the middleware:

```js
import { createStore, applyMiddleware } from 'redux';
import createOnActionMiddleware from 'redux-on-action';
import rootReducer from './reducers/index';

const { middleware, onAction } = createOnActionMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(middleware),
);
```

Then you can setup action listener:
```js
onAction('IMPORT_START_REQUEST', async (action, dispatch, getState) => {
  dispatch({ type: 'IMPORT_STARTED' });

  await importDirectory(
    action.payload.directoryPath,
    importedFileCount => dispatch({ type: 'IMPORT_PROGRESS', payload: importedFileCount }),
  );

  dispatch({ type: 'IMPORT_FINISHED' });
});
```

## API
### onAction
Registers action listener. When specified action is dispatched - provided function will be called.

#### Arguments
* `action` -
String, type of Redux action.
* `callback` -
[onActionCallback](#onActionCallback), function that will be called when action is dispatched.

### onActionCallback
Function specified as [onAction](#onAction) callback.

#### Arguments
* `action` -
Object, dispatched Redux action.
* `dispatch` -
Function, [Redux dispatch function](https://redux.js.org/api/store#dispatch-action).
* `getState` -
Function, [Redux getState function](https://redux.js.org/api/store#getstate).

## Mulitple action listeners
You can setup many listeners for single action type. Every registered callback will be called in
order in which they were registered.

```js
onAction('MY_ACTION', () => console.log('first!'));
onAction('MY_ACTION', () => console.log('second!'));

dispatch({ type: 'MY_ACTION' });
// first!
// second!
```

## License
This project is licensed under the [MIT license](LICENSE).
