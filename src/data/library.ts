import { of, concat } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Book, BookPath, fragmentForPath, LibraryCard,
    findReference, BookFragment, defaultFragmentLength, tocForBook,
} from 'booka-common';
import { Api } from './api';

export function libraryProvider(api: Api, storage: Storage) {
    const bookCache: StringMap<Book> = {};
    const cardCache: StringMap<LibraryCard> = {};

    return {
        fragmentForPath(bookId: string, path: BookPath) {
            const cached = bookCache[bookId];
            if (cached) {
                const fragment = resolveFragment(cached, path);
                return of(fragment);
            } else {
                return concat(
                    api.getFragment(bookId, path),
                    api.getBook(bookId).pipe(
                        map(book => {
                            bookCache[bookId] = book;
                            return resolveFragment(book, path);
                        })
                    ),
                );
            }
        },
        fragmentForRef(bookId: string, refId: string) {
            const cached = bookCache[bookId];
            if (cached) {
                const fragment = resolveRefId(cached, refId);
                return of(fragment);
            } else {
                return api.getBook(bookId).pipe(
                    map(book => {
                        bookCache[bookId] = book;
                        return resolveRefId(book, refId);
                    })
                );
            }
        },
        cardForId(bookId: string) {
            const cached = cardCache[bookId];
            if (cached) {
                return of(cached);
            } else {
                return api.getLibraryCard(bookId).pipe(
                    map(card => {
                        cardCache[bookId] = card;
                        return card;
                    })
                );
            }
        },
    };
}

// TODO: move to 'common' ?

type StringMap<T> = {
    [key in string]: T | undefined;
};

function resolveRefId(book: Book, refId: string) {
    const reference = findReference(book.nodes, refId);
    if (reference) {
        const path = reference[1];
        const fragment = resolveFragment(book, path);
        return { fragment, path };
    } else {
        return undefined;
    }
}

function resolveFragment(book: Book, path: BookPath): BookFragment {
    const fragment = fragmentForPath(book, path, defaultFragmentLength);
    return {
        ...fragment,
        images: book.images,
        toc: tocForBook(book),
    };
}
