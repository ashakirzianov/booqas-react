import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Theme, PaletteColor, colors, getFontSize } from './theme';
import { percent, point, Size, WithChildren, defaults } from './common';

export type TextProps = {
    fontFamily?: keyof Theme['fontFamilies'],
    fontSize?: keyof Theme['fontSizes'],
    color?: PaletteColor | null,
    bold?: boolean,
    italic?: boolean,
    letterSpacing?: Size,
};
export type TextLineProps = TextProps & {
    text: string | undefined,
    theme: Theme,
};
export function TextLine(props: TextLineProps) {
    return <span
        style={{
            fontSize: getFontSize(props.theme, props.fontSize),
            fontFamily: props.theme.fontFamilies[props.fontFamily || 'menu'],
            color: props.color === null ? undefined : colors(props.theme)[props.color || 'text'],
            letterSpacing: props.letterSpacing,
            fontWeight: props.bold ? 'bold' : 'normal',
            fontStyle: props.italic ? 'italic' : 'normal',
        }}
    >
        {props.text}
    </span>;
}

export type FullScreenActivityIndicatorProps = {
    theme: Theme,
};
export function FullScreenActivityIndicator(props: FullScreenActivityIndicatorProps) {
    return <View
        style={{
            position: 'fixed' as any,
            flexDirection: 'column',
            top: 0, left: 0,
            minHeight: '100%',
            minWidth: '100%',
            width: '100%',
            height: '100%',
            backgroundColor: defaults.semiTransparent,
            justifyContent: 'center',
            zIndex: 10,
        }}
    >
        <ActivityIndicator
            size='large'
            color={colors(props.theme).primary}
        />
    </View>;
}

export function Separator() {
    return <hr style={{
        width: percent(100),
    }} />;
}

export type ClickableProps = WithChildren<{
    onClick: () => void,
}>;
export function Clickable(props: ClickableProps) {
    return <div onClick={props.onClick}>
        {props.children}
    </div>;
}

export function Tab() {
    return <span>&nbsp;&nbsp;</span>;
}

export function EmptyLine() {
    return <View
        style={{
            flexDirection: 'row',
            height: point(defaults.headerHeight),
        }}
    />;
}

export type ImageProps = {
    url: string,
    alt?: string,
};
export function Image(props: ImageProps) {
    return <img
        src={props.url}
        alt={props.alt || ''}
    />;
}
