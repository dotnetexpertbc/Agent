import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import PostsReducer from './reducers/PostsReducer';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
//import rootReducers from './reducers/Index';
import todoReducers from './reducers/Reducers';
import { reducer as reduxFormReducer } from 'redux-form';
import { createLogger } from 'redux-logger'

const asyncDispatchMiddleware = store => next => action => {
    let syncActivityFinished = false;
    let actionQueue = [];

    function flushQueue() {
        actionQueue.forEach(a => store.dispatch(a)); // flush queue
        actionQueue = [];
    }

    function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction]);

        if (syncActivityFinished) {
            flushQueue();
        }
    }

    const actionWithAsyncDispatch =
        Object.assign({}, action, { asyncDispatch });

    const res = next(actionWithAsyncDispatch);

    syncActivityFinished = true;
    flushQueue();

    return res;
};

const middlewares = [thunk, asyncDispatchMiddleware];
let composeEnhancers = compose;

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const middleware = applyMiddleware(...middlewares);


const reducers = combineReducers({
    posts: PostsReducer,
    auth: AuthReducer,
		todoReducers,
	form: reduxFormReducer,	
});

//const store = createStore(rootReducers);

export const store = createStore(reducers, undefined,  composeEnhancers(middleware));
