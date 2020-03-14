import React from 'react';
import {
    getLocationsData, ResolvedCurrentPosition,
} from 'booka-common';
import { useTheme, usePositions } from '../application';
import {
    Column, Themed,
} from '../atoms';
import { LinkToPath } from './Navigation';

export function RecentBooksConnected() {
    const { positions } = usePositions();

    const { theme } = useTheme();

    return <RecentBooksComp
        theme={theme}
        positions={positions}
    />;
}

function RecentBooksComp({ positions }: Themed & {
    positions: ResolvedCurrentPosition[],
}) {
    return <Column>
        <span key='label'>Recent books: {positions.length}</span>
        {
            positions.map((recentBook, idx) => {
                return <CurrentBookComp
                    key={idx}
                    currentPosition={recentBook}
                />;
            })
        }
    </Column>;
}

function CurrentBookComp({ currentPosition: recentBook, }: {
    currentPosition: ResolvedCurrentPosition,
}) {
    const data = getLocationsData(recentBook);
    if (!data) {
        return null;
    }
    const { mostRecent, furthest } = data;
    if (mostRecent === furthest) {
        return <Column>
            <span>Title: {recentBook.card.title}</span>
            <span>Recent and furthest</span>
            <span>{mostRecent.preview?.substr(0, 300)}</span>
            <LinkToPath
                bookId={recentBook.card.id}
                path={mostRecent.path}
            >
                Continue
            </LinkToPath>
        </Column>;
    } else {
        return <Column>
            <span>Title: {recentBook.card.title}</span>
            <span>Recent</span>
            <span>{mostRecent.preview?.substr(0, 300)}</span>
            <LinkToPath
                bookId={recentBook.card.id}
                path={mostRecent.path}
            >
                Continue
            </LinkToPath>
            <span>Furthest</span>
            <span>{furthest.preview?.substr(0, 300)}</span>
            <LinkToPath
                bookId={recentBook.card.id}
                path={furthest.path}
            >
                Continue
            </LinkToPath>
        </Column>;
    }
}
