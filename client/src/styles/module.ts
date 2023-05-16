import { css } from '@emotion/react';

export const ellipsisStyles = () => css`
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    vertical-align: middle;
    text-overflow: ellipsis;
    overflow-wrap: normal;
    overflow: hidden;
`;

export const centerBoxStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const centerColumnBoxStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const columnBoxStyles = () => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const normalBoxStyles = () => css`
    display: flex;
    align-items: center;
`;

export const spaceBetweenBoxStyles = () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
