export type FontFamily =
    | 'Georgia' | 'San Francisco' | 'Helvetica'
    | 'Open Sans'
    ;
export type FontSize = number;
export type Color = string;

export type Palette = {
    text: Color,
    accent: Color,
    dimmed: Color,
    highlight: Color,
    primary: Color,
    secondary: Color,
    shadow: Color,
    semiTransparent: Color,
    neutral: Color,
    positive: Color,
    negative: Color,
    warning: Color,
    white: Color,
    red: Color,
    green: Color,
    blue: Color,
    yellow: Color,
    pink: Color,
    violet: Color,
};
export type PaletteColor = keyof Palette;
export type FontSizes = {
    xxsmall: FontSize,
    xsmall: FontSize,
    small: FontSize,
    normal: FontSize,
    large: FontSize,
    xlarge: FontSize,
    xxlarge: FontSize,
    text: FontSize,
};
export type FontFamilies = {
    book: FontFamily,
    menu: FontFamily,
};

export type Palettes = {
    light: Palette,
    sepia: Palette,
    dark: Palette,
};
export type PaletteName = keyof Palettes;

export type Theme = {
    palettes: Palettes,
    currentPalette: PaletteName,
    fontScale: number,
    fontFamilies: FontFamilies,
    fontSizes: FontSizes,
};

export type Themed = {
    theme: Theme,
};

export function colors(theme: Theme): Palette {
    return theme.palettes[theme.currentPalette];
}

export function getFontSize(theme: Theme, size?: keyof FontSizes): number {
    return size === 'text'
        ? theme.fontSizes.text * theme.fontScale
        : theme.fontSizes[size || 'normal'];
}

export function getFontFamily(theme: Theme, key: keyof FontFamilies): string {
    return theme.fontFamilies[key];
}

const defaultColors: Palette = {
    text: '#000',
    primary: '#fff',
    secondary: '#eee',
    accent: '#777',
    dimmed: '#ddd',
    highlight: '#aaf',
    shadow: '#000',
    semiTransparent: 'rgba(0, 0, 0, 0.3)',
    neutral: 'navy',
    positive: 'green',
    negative: 'crimson',
    warning: 'gold',
    white: 'white',
    red: '#F44336',
    green: '#4CAF50',
    blue: '#2196F3',
    pink: '#EC407A',
    violet: '#673AB7',
    yellow: '#fbe381',
};
export const defaultTheme: Theme = {
    palettes: {
        light: {
            ...defaultColors,
        },
        sepia: {
            ...defaultColors,
            text: '#5f3e24',
            primary: '#f9f3e9',
            secondary: '#e6e0d6',
            accent: '#987',
            highlight: '#000',
        },
        dark: {
            ...defaultColors,
            text: '#999',
            primary: '#000',
            secondary: '#222',
            accent: '#ddd',
            highlight: '#fff',
            shadow: '#333',
        },
    },
    currentPalette: 'light',
    fontFamilies: {
        book: 'Georgia',
        menu: 'Open Sans',
    },
    fontSizes: {
        xxsmall: 10,
        xsmall: 14,
        small: 18,
        normal: 20,
        large: 24,
        xlarge: 30,
        xxlarge: 36,
        text: 26,
    },
    fontScale: 1,
};
