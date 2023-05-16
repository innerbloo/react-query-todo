import theme from '@/styles/theme';

import { css } from '@emotion/react';

const defaultBorderWidth = '0.1rem';

export const $backgroundImage = (
    url: string,
    backgroundSize?: string,
    attachment?: string,
    position?: string,
) => css`
    background: transparent url(${url}) no-repeat ${attachment}
        ${position ?? attachment};
    background-size: ${backgroundSize};
`;

export const $border = (color: string, width = defaultBorderWidth) => css`
    border: ${width} solid ${color};
`;

export const $borderBottom = (color: string, width = defaultBorderWidth) => css`
    border-bottom: ${width} solid ${color};
`;

export const $borderLeft = (color: string, width = defaultBorderWidth) => css`
    border-left: ${width} solid ${color};
`;

export const $borderRight = (color: string, width = defaultBorderWidth) => css`
    border-right: ${width} solid ${color};
`;

export const $borderTop = (color: string, width = defaultBorderWidth) => css`
    border-top: ${width} solid ${color};
`;

export const $scrollBar = (color = theme.colors.lightGray) => css`
    &::-webkit-scrollbar {
        ${$size('0.45rem')};
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.25rem;
        -webkit-box-shadow: ${`inset 0 0 0.6rem ${color}`};
        background: transparent;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.2);
    }
`;

export const $size = (width: string, height?: string) => css`
    height: ${height ?? width};
    width: ${width};
`;
