import React from 'react';
import { groupBy } from 'lodash';
import {
    findPositions, CurrentPosition, BookPath,
} from 'booka-common';
import { usePositions, useLibraryCard, usePreview } from '../application';
import { Column, BookPathLink } from '../controls';

export function RecentBooksComp() {
    const { positions } = usePositions();
    const grouped = groupBy(positions, p => p.bookId);

    return <Column>
        <span key='label'>Recent books: {positions.length}</span>
        {
            Object.entries(grouped).map(([bookId, pos], idx) => {
                return <CurrentBookComp
                    key={idx}
                    bookId={bookId}
                    positions={pos}
                />;
            })
        }
    </Column>;
}

function CurrentBookComp({ positions, bookId }: {
    bookId: string,
    positions: CurrentPosition[],
}) {
    const { card } = useLibraryCard(bookId);
    const data = findPositions(positions);
    if (!data) {
        return null;
    }
    const { mostRecent, furthest } = data;
    const title = 'nope';

    return <Column>
        <span>Title: {title}</span>
        {
            mostRecent === furthest
                ? <Preview
                    title='Recent & furthest'
                    bookId={bookId}
                    path={mostRecent.path}
                />
                : <>
                    <Preview
                        title='Recent'
                        bookId={bookId}
                        path={mostRecent.path}
                    />
                    <Preview
                        title='Furthest'
                        bookId={bookId}
                        path={furthest.path}
                    />
                </>
        }
    </Column>;
}

function Preview({ title, bookId, path }: {
    title: string,
    bookId: string,
    path: BookPath,
}) {
    const { previewState } = usePreview(bookId, path);
    return <>
        <span>{title}</span>
        <BookPathLink
            bookId={bookId}
            path={path}
        >
            Continue
    </BookPathLink>
    </>;
}
