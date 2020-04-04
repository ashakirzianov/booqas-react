import { of, Observable } from 'rxjs';
import {
    AuthToken, CardCollectionName, CurrentPositionPost,
} from 'booka-common';
import { libFetcher, backFetcher } from './utils';

const back = backFetcher();
const lib = libFetcher();

export function userDataProvider({ token }: {
    token: AuthToken | undefined,
}) {
    return {
        getCurrentPositions() {
            return optional(token && back.get('/current-position', {
                auth: token.token,
            }));
        },
        postAddCurrentPosition(position: CurrentPositionPost) {
            return optional(token && back.put('/current-position', {
                auth: token.token,
                body: position,
            }));
        },

        getCollection(name: CardCollectionName) {
            if (name === 'uploads') {
                return optional(token && lib.get('/uploads', {
                    auth: token.token,
                }));
            } else {
                return optional(token && back.get('/collections', {
                    auth: token.token,
                    query: { name },
                }));
            }
        },
        postAddToCollection(bookId: string, collection: CardCollectionName) {
            return optional(token && back.post('/collections', {
                auth: token.token,
                query: { bookId, collection },
            }));
        },
        postRemoveFromCollection(bookId: string, collection: CardCollectionName) {
            return optional(token && back.delete('/collections', {
                auth: token.token,
                query: { bookId, collection },
            }));
        },
    };
}

function optional<T>(observable?: Observable<T>): Observable<T> {
    return observable ?? of<T>();
}
