import React from 'react';
import { LibraryCard } from 'booka-common';
import { Themed } from '../application';
import { GridList } from '../controls';
import { LibraryCardTile } from './LibraryCardTile';

export function BookList({ books, theme }: Themed & {
    books: LibraryCard[],
}) {
    return <GridList>
        {
            books.map((card, idx) =>
                <LibraryCardTile
                    key={idx}
                    theme={theme}
                    card={card}
                />
            )
        }
    </GridList>;
}
