import React from 'react';
import { assertNever, BookRange } from 'booka-common';

import { AppState } from '../ducks';
import { updateCurrentPath } from '../core';
import { BookViewComp } from './BookViewComp';
import {
    WithChildren, Column, point, Row, Callback, Themed,
    Triad, IconButton, TopBar, EmptyLine, Clickable,
} from '../atoms';

export type BookScreenProps = Themed & {
    fragment: AppState['currentFragment'],
    setQuoteRange: Callback<BookRange | undefined>,
    toggleControls: Callback,
    controlsVisible: boolean,
};
export function BookScreenComp(props: BookScreenProps) {
    return <BookScreenContainer
        theme={props.theme}
        visible={props.controlsVisible}
        toggleControls={props.toggleControls}
    >
        <BookScreenContent {...props} />
    </BookScreenContainer>;
}

function BookScreenContent({
    fragment, setQuoteRange, theme,
}: BookScreenProps) {
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

type BookScreenContainerProps = WithChildren<Themed & {
    visible: boolean,
    toggleControls: Callback,
}>;
function BookScreenContainer({
    theme, visible, toggleControls, children,
}: BookScreenContainerProps) {
    return <>
        <BookScreenHeader theme={theme} visible={visible} />
        <Row fullWidth centered>
            <Clickable onClick={toggleControls}>
                <Column maxWidth={point(50)} fullWidth padding={point(1)} centered>
                    <EmptyLine />
                    {children}
                    <EmptyLine />
                </Column>
            </Clickable>
        </Row>
    </>;
}

type BookScreenHeaderProps = Themed & {
    visible: boolean,
};
function BookScreenHeader({ theme, visible }: BookScreenHeaderProps) {
    return <TopBar
        theme={theme}
        open={visible}
        paddingHorizontal={point(1)}
    >
        <Triad
            left={<LibButton theme={theme} />}
        />
    </TopBar>;
}

type LibButtonProps = Themed;
function LibButton({ theme }: LibButtonProps) {
    return <IconButton
        theme={theme}
        icon='left'
        to='/'
    />;
}
