import React, { useCallback, ReactNode } from 'react';
import { View } from 'react-native';

import {
    LibraryCard, BookPath, firstPath, filterUndefined,
} from 'booka-common';
import {
    useTheme, useLibraryCard,
    useCollections, usePositions, mostRecentPosition,
} from '../application';
import {
    Modal, ActivityIndicator, ActionButton, TagLabel,
    regularSpace, Label,
} from '../controls';
import { Themed, PaletteColor } from '../core';
import { LibraryCardTile } from './LibraryCardTile';
import { BookPathLink } from './Navigation';
import { ParagraphPreview } from './ParagraphPreview';

export function LibraryCardModal({ bookId }: {
    bookId: string | undefined,
}) {
    if (bookId) {
        return <LibraryCardModalImpl bookId={bookId} />;
    } else {
        return null;
    }
}

function LibraryCardModalImpl({ bookId }: {
    bookId: string,
}) {
    const { theme } = useTheme();
    const { card, closeCard } = useLibraryCard(bookId);

    return <Modal
        theme={theme}
        title=''
        close={closeCard}
        open={true}
    >
        {
            card.loading
                ? <ActivityIndicator theme={theme} />
                : <Layout
                    Cover={<LibraryCardTile theme={theme} card={card} />}
                    Title={<Label
                        theme={theme}
                        text={card.title}
                        color='text'
                    />}
                    Author={<Label
                        theme={theme}
                        text={`by ${card.author ?? 'unknown'}`}
                        italic
                        color='accent'
                        fontSize='xsmall'
                    />}
                    Read={<ReadButtons card={card} />}
                    Continue={<ContinueRead card={card} />}
                    Tags={<TagList theme={theme} card={card} />}
                />
        }
    </Modal>;
}

function TagList({ card, theme }: Themed & {
    card: LibraryCard,
}) {
    const data = getTagDescs(card);
    return <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: regularSpace,
    }}>
        {
            data.map(({ color, text }, idx) => {
                return <TagLabel
                    key={idx}
                    theme={theme}
                    color={color}
                    text={text}
                />;
            })
        }
    </View>;
}

type TagDesc = { color: PaletteColor, text: string };
function getTagDescs(card: LibraryCard): TagDesc[] {
    return filterUndefined(card.tags.map((tag): TagDesc | undefined => {
        switch (tag.tag) {
            case 'subject':
                return { color: 'blue', text: tag.value };
            case 'language':
                return { color: 'green', text: `Language: ${tag.value.toUpperCase()}` };
            case 'pg-index':
                return { color: 'red', text: 'Project Gutenberg' };
            default:
                return undefined;
        }
    }));
}

function ReadButtons({ card }: {
    card: LibraryCard,
}) {
    return <View style={{
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        flexWrap: 'wrap',
        marginBottom: regularSpace,
        justifyContent: 'flex-end',
    }}>
        <ReadingListButton card={card} />
        <BookPathButton
            bookId={card.id}
            text='From Start'
        />
    </View>;
}

function ContinueRead({ card }: {
    card: LibraryCard,
}) {
    const { theme } = useTheme();
    const { positions } = usePositions();

    const currentPositions = positions.filter(
        p => p.bookId === card.id,
    );
    const continueReadPosition = mostRecentPosition(currentPositions);
    const continuePath = continueReadPosition?.path;
    if (!continuePath) {
        return null;
    }
    return <View style={{
        padding: regularSpace,
    }}>
        <Label
            theme={theme}
            text='Continue reading'
            fontSize='xsmall'
            color='accent'
        />
        <ParagraphPreview
            theme={theme}
            bookId={card.id}
            path={continuePath ?? firstPath()}
        />
    </View>;
}

function ReadingListButton({ card }: {
    card: LibraryCard,
}) {
    const { theme } = useTheme();
    const {
        collectionsState: { collections },
        addToCollection,
        removeFromCollection,
    } = useCollections();
    const readingListCards = collections['reading-list'] ?? [];
    const addToReadingList = useCallback(
        () => addToCollection(card, 'reading-list'),
        [addToCollection, card],
    );
    const removeFromReadingList = useCallback(
        () => removeFromCollection(card.id, 'reading-list'),
        [removeFromCollection, card],
    );
    const isInReadingList = readingListCards.find(c => c.id === card.id) !== undefined;
    if (isInReadingList) {
        return <ActionButton
            theme={theme}
            text='Not To Read'
            color='negative'
            callback={removeFromReadingList}
        />;
    } else {
        return <ActionButton
            theme={theme}
            text='To Read'
            color='positive'
            callback={addToReadingList}
        />;
    }
}

function BookPathButton({ text, bookId, path }: {
    text: string,
    bookId: string,
    path?: BookPath,
}) {
    const { theme } = useTheme();
    return <BookPathLink bookId={bookId} path={path}>
        <ActionButton
            theme={theme}
            text={text}
            color='neutral'
        />
    </BookPathLink>;
}

function Layout({
    Cover, Title, Author, Read, Tags, Continue,
}: {
    Cover: ReactNode,
    Title: ReactNode,
    Author: ReactNode,
    Read: ReactNode,
    Continue: ReactNode,
    Tags: ReactNode,
}) {
    return <View style={{
        padding: regularSpace,
        paddingTop: 0,
    }}>
        <View style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-start',
        }}>
            <View style={{
                flexGrow: 0,
                minWidth: 'auto',
            }}>
                {Cover}
            </View>
            <View style={{
                flexGrow: 1,
                flexShrink: 1,
            }}>
                <View style={{
                    margin: regularSpace,
                }}>
                    {Title}
                    {Author}
                </View>
                {Tags}
                {Read}
            </View>
        </View>
        <View>
            {Continue}
        </View>
    </View>;
}
