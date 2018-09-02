function createOnActionMiddleware() {
  const subscriptions = {};

  const middleware = ({ dispatch, getState }) => next => (action) => {
    if (!subscriptions[action.type]) return next(action);
    subscriptions[action.type].forEach(callback => callback(action, dispatch, getState));
    return getState();
  };

  const onAction = (action, callback) => {
    if (!subscriptions[action]) subscriptions[action] = [];
    subscriptions[action].push(callback);
  };

  return { middleware, onAction };
}

export default createOnActionMiddleware;
