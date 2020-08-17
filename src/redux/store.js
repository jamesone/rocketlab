import { createStore } from 'redux';
import rootReducer from './reducers';

/**
 * Configures the redux store which is used for
 * global state management throughout the application.
 */
const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState);

  return store;
};

export default configureStore();
