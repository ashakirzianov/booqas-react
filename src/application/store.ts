/*global globalThis*/
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { filterUndefined } from 'booka-common';

import { config } from '../config';
import { createAppEpicMiddleware, rootReducer, rootEpic } from '../ducks';
import { startupFbSdk, fbState } from './facebookSdk';
import { dataAccess } from './hooks/dataProvider';
import { historySyncMiddleware, subscribeToHistory } from './historySync';

export const ConnectedProvider: React.SFC = ({ children }) =>
    React.createElement(Provider, { store }, children);

function configureStore() {
    const composeEnhancers: typeof compose =
        // Note: support redux dev tools
        (globalThis.window && (globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        || compose;

    const epicMiddleware = createAppEpicMiddleware({
        dependencies: dataAccess,
    });
    const middlewares = filterUndefined([
        epicMiddleware,
        historySyncMiddleware,
        config().logActions ? createLogger() : undefined,
    ]);
    const s = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(...middlewares),
        ),
    );
    epicMiddleware.run(rootEpic);

    return s;
}

const store = configureStore();
store.dispatch({
    type: 'data/update-provider',
});
subscribeToHistory(link => {
    store.dispatch({
        type: 'location/navigate',
        payload: link,
        meta: { silent: true },
    });
});

startupFbSdk(config().facebook.clientId);
fbState().subscribe(state => {
    if (state.state === 'logged' && state.token) {
        store.dispatch({
            type: 'account/receive-fb-token',
            payload: {
                token: state.token,
            },
        });
    }
});
