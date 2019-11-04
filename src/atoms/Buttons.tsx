import * as React from 'react';
import { View } from 'react-native';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import { colors, getFontSize, Themed, FontSizes, PaletteName, FontFamilies, getFontFamily } from './theme';
import { TextLine } from './Basics';
import { point, WithChildren, Callback } from './common';
import { Icon, IconName } from './Icons';
import { LinkOrButton } from './Web';

// TODO: refactor button
export type ButtonProps = Themed & {
    onClick?: Callback,
};

export type TextButtonProps = ButtonProps & {
    text: string,
    fontSize: keyof FontSizes,
    fontFamily: keyof FontFamilies,
};
export function TextButton({
    onClick, theme, text,
    fontSize, fontFamily,
}: TextButtonProps) {
    return <div
        css={{
            cursor: 'default',
            fontSize: getFontSize(theme, fontSize),
            fontFamily: getFontFamily(theme, fontFamily),
            color: colors(theme).accent,
            '&:hover': {
                color: colors(theme).highlight,
            },
        }}
        onClick={onClick}
    >
        {text}
    </div>;
}

export type IconButtonProps = ButtonProps & {
    icon: IconName,
    onHoverIn?: Callback,
    onHoverOut?: Callback,
};
export function IconButton({
    icon, theme,
    onClick, onHoverIn, onHoverOut,
}: IconButtonProps) {
    return <Icon
        theme={theme}
        name={icon}
        size={24}
        color='accent'
        hoverColor='highlight'
        onClick={onClick}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
    />;
}

export type TagButtonProps = ButtonProps & {
    text: string,
};
export function TagButton(props: TagButtonProps) {
    return <div
        onClick={props.onClick}
        css={{
            backgroundColor: colors(props.theme).accent,
            borderWidth: 1,
            borderRadius: 50,
            '&:hover': {
                backgroundColor: colors(props.theme).highlight,
            },
        }}
    >
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingHorizontal: point(1),
            paddingVertical: point(0.2),
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <TextLine
                    theme={props.theme}
                    text={props.text}
                    fontSize='smallest'
                    color='secondary'
                />
            </View>
        </View>
    </div>;
}

export type PaletteButtonProps = ButtonProps & {
    text: string,
    palette: PaletteName,
};
export function PaletteButton(props: PaletteButtonProps) {
    const theme = props.theme;
    const cols = theme.palettes[props.palette].colors;
    const selected = props.palette === theme.currentPalette;
    return <div
        onClick={props.onClick}
        css={{
            display: 'flex',
            color: cols.text,
            fontSize: getFontSize(props.theme, 'normal'),
            '&:hover': {
                color: cols.highlight,
            },
        }}
    >
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            width: 50,
            height: 50,
            justifyContent: 'center',
            backgroundColor: cols.primary,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: selected ? cols.highlight : 'rgba(0,0,0,0)',
            borderStyle: 'solid',
            boxShadow: `0px 0px 5px 0px ${cols.shadow}`,
            '&:hover': {
                borderColor: cols.highlight,
            },
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <span>{props.text}</span>
            </View>
        </div>
    </div>;
}

export type PictureButtonProps = ButtonProps & {
    pictureUrl?: string,
};
export function PictureButton(props: PictureButtonProps) {
    return <LinkOrButton
        onClick={props.onClick}
    >
        <img
            src={props.pictureUrl}
            alt='account'
            style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '50%',
                alignItems: 'center',
                borderColor: colors(props.theme).accent,
                borderWidth: 2,
                borderStyle: 'solid',
                ...({
                    ':hover': {
                        borderColor: colors(props.theme).highlight,
                    },
                }),
            }}
        />
    </LinkOrButton>;
}

export type StretchTextButtonProps = WithChildren<ButtonProps>;
export function StretchTextButton(props: StretchTextButtonProps) {
    return <LinkOrButton
        onClick={props.onClick}
        style={{
            alignSelf: 'stretch',
            flexGrow: 1,
            color: colors(props.theme).accent,
            borderColor: colors(props.theme).accent,
            // TODO: put back hovering
            // ':hover': {
            //     color: colors(props.theme).highlight,
            //     borderColor: colors(props.theme).highlight,
            // },
        }}
    >
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            {props.children}
        </View>
    </LinkOrButton>;
}
