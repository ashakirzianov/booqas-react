import React from 'react';
import { CardCollections, LibraryCard } from 'booka-common';
import { Column, Themed } from '../atoms';
import { useTheme, useCollections } from '../application';

import { BookListComp } from './BookList';

export function CollectionsComp() {
    const { state } = useCollections();

    const theme = useTheme();

    const readingList = state.collections['reading-list'];

    return <Column>
        <CardCollectionComp
            theme={theme}
            displayName='Reading List'
            cards={readingList}
        />
    </Column>;
}

function CardCollectionComp({ cards, displayName }: Themed & {
    cards: LibraryCard[] | undefined,
    displayName: string,
}) {
    if (!cards?.length) {
        return null;
    }

    return <Column>
        <span>{displayName}</span>
        <BookListComp books={cards} />
    </Column>;
}
