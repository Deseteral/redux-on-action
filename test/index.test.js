import createOnActionMiddleware from '../src/index';

describe('on action middleware', () => {
  const mockDispatch = jest.fn();
  const mockState = {};
  const mockGetState = jest.fn(() => mockState);
  const { middleware, onAction } = createOnActionMiddleware();
  const nextHandler = middleware({ dispatch: mockDispatch, getState: mockGetState });
  const actionHandler = nextHandler(action => action);

  test('without on action', () => {
    const action = { type: '42' };
    expect(actionHandler(action)).toBe(action);
  });

  test('on action', done => {
    const onActionName = 'SOME_ACTION';
    onAction(onActionName, (action, dispatch, getState) => {
      expect(action.type).toEqual(onActionName);
      expect(dispatch).toBe(mockDispatch);
      expect(getState).toBe(mockGetState);
      done();
    });
    expect(actionHandler({ type: onActionName })).toBe(mockState);
  });

  test('multiple on action', () => {
    const onActionName = 'SOME_ACTION';
    const mockCallback = jest.fn();
    onAction(onActionName, mockCallback);
    onAction(onActionName, mockCallback);
    onAction(onActionName, mockCallback);
    expect(actionHandler({ type: onActionName })).toBe(mockState);
    expect(mockCallback.mock.calls.length).toBe(3);
  });
});
