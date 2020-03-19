import React from 'react';
import { throttle } from 'lodash';

import { useLibrarySearch, SearchState, Themed, useTheme } from '../application';
import {
    TextInput, Column, ActivityIndicator, Triad, Panel,
} from '../controls';
import { BookListComp } from './BookListComp';
import { AccountButton } from './AccountButton';
import { AppearanceButton } from './AppearanceButton';

export function TopBar({ query }: {
    query: string | undefined,
}) {
    const { theme } = useTheme();
    const { searchState, doQuery } = useLibrarySearch(query);
    const querySearch = React.useCallback(throttle((q: string) => {
        doQuery(q ? q : undefined);
    }, 300), [doQuery]);

    return <Column>
        <Triad
            left={
                <TextInput
                    theme={theme}
                    initial={query}
                    onChange={querySearch}
                />
            }
            right={<>
                <AppearanceButton />
                <AccountButton />
            </>}
        />
        {query
            ? <Panel theme={theme}>
                <SearchResultsComp
                    theme={theme}
                    state={searchState}
                />
            </Panel>
            : null
        }
    </Column>;
}

function SearchResultsComp({ state, theme }: Themed & {
    state: SearchState,
}) {
    switch (state.state) {
        case 'error':
            return <span>Search error</span>;
        case 'loading':
            return <ActivityIndicator theme={theme} />;
        case 'ready':
            return <BookListComp books={state.results.map(r => r.desc)} />;
        default:
            return null;
    }
}
