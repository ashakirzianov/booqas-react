import React from 'react';
import { assertNever, BookRange } from 'booka-common';

import { AppState } from '../ducks';
import { useTheme, updateCurrentPath } from '../core';
import { BookViewComp } from './BookViewComp';
import { WithChildren, Column, point, Row, Callback } from '../atoms';

export type BookScreenProps = {
    fragment: AppState['currentFragment'],
    setQuoteRange: Callback<BookRange | undefined>,
};
export function BookScreenComp(props: BookScreenProps) {
    return <BookScreenContainer>
        <BookScreenContent {...props} />
    </BookScreenContainer>;
}

function BookScreenContent({
    fragment, setQuoteRange,
}: BookScreenProps) {
    const theme = useTheme();
    switch (fragment.state) {
        case 'no-fragment':
            return <span>No fragment set</span>;
        case 'loading':
            return <span>loading: {fragment.location.id}</span>;
        case 'ready':
            return <BookViewComp
                bookId={fragment.location.id}
                theme={theme}
                fragment={fragment.fragment}
                pathToScroll={fragment.location.path}
                // TODO: abstract updateCurrentPath ?
                updateBookPosition={updateCurrentPath}
                quoteRange={fragment.quote}
                setQuoteRange={setQuoteRange}
            />;
        case 'error':
            return <span>error: {fragment.location.id}</span>;
        default:
            assertNever(fragment);
            return <span>Should not happen</span>;
    }
}

function BookScreenContainer({ children }: WithChildren<{}>) {
    return <Row fullWidth centered>
        <Column maxWidth={point(50)} fullWidth padding={point(1)} centered>
            {children}
        </Column>
    </Row>;
}
