import * as React from 'react';

import {
    Themed, TopBar, point, Triad, EmptyLine,
} from '../atoms';
import { useTheme } from '../application';
import { ConnectedAccountButton } from './AccountButton';
import { LibrarySearchConnected } from './LibrarySearchComp';
import { CollectionsConnected } from './CollectionsComp';
import { RecentBooksConnected } from './RecentBooksComp';
import { LibraryCardComp } from './LibraryCard';

export function FeedScreen({ show }: {
    show: string | undefined,
}) {
    const theme = useTheme();
    return <>
        {show ? <LibraryCardComp bookId={show} /> : null}
        <FeedScreenHeader theme={theme} />
        <EmptyLine />
        <LibrarySearchConnected />
        <CollectionsConnected />
        <RecentBooksConnected />
    </>;
}

function FeedScreenHeader({ theme }: Themed) {
    return <TopBar
        theme={theme}
        open={true}
        paddingHorizontal={point(1)}
    >
        <Triad
            right={<ConnectedAccountButton />}
        />
    </TopBar>;
}
