import reset from 'react-style-reset';

import { Media } from '@/enums/common';
import { media } from '@/styles/mediaQuery';
import {
    $backgroundImage,
    $borderBottom,
    $borderRight,
    $borderTop,
    $scrollBar,
    $size,
} from '@/styles/mixin';
import { centerBoxStyles } from '@/styles/module';
import type { CustomThemeType } from '@/styles/theme';
import theme from '@/styles/theme';

import { css } from '@emotion/react';

export const globalStyles = (props: CustomThemeType) => css`
    ${reset};

    * {
        box-sizing: border-box;
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 100;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Thin.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Thin.woff') format('woff'),
            url('/fonts/NotoSansKR-Thin.otf') format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Light.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Light.woff') format('woff'),
            url('/fonts/NotoSansKR-Light.otf') format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Regular.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Regular.woff') format('woff'),
            url('/fonts/NotoSansKR-Regular.otf') format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Medium.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Medium.woff') format('woff'),
            url('/fonts/NotoSansKR-Medium.otf') format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 700;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Bold.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Bold.woff') format('woff'),
            url('/fonts/NotoSansKR-Bold.otf') format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 900;
        src: local('Noto Sans KR'),
            url('/fonts/NotoSansKR-Black.woff2') format('woff2'),
            url('/fonts/NotoSansKR-Black.woff') format('woff'),
            url('/fonts/NotoSansKR-Black.otf') format('opentype');
    }

    html {
        font-size: 62.5%;
    }

    body {
        min-width: 28rem;
        min-height: calc(var(--vh, 1vh) * 100);
        word-wrap: break-word;
        word-break: keep-all;
        line-break: strict;
        font-family: ${props.fontFamily};
        font-size: ${props.fontSizes.size16};
        color: ${props.colors.blackGray};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @supports (-webkit-appearance: none) and (stroke-color: transparent) {
            min-height: -webkit-fill-available;
        }

        &.ReactModal__Body--open {
            touch-action: none;
            overflow: hidden;
        }

        &.mobile-overflow {
            touch-action: none;
            overflow: hidden;

            ${media(Media.LG)} {
                overflow: unset;
            }
        }

        &.fp-viewing-0 {
            #fp-nav {
                a {
                    span {
                        border: 0.1rem solid ${props.colors.white} !important;
                    }

                    &.active {
                        span {
                            background: ${props.colors.white} !important;

                            &::after {
                                border: 0.1rem solid ${props.colors.white} !important;
                            }
                        }
                    }
                }
            }
        }

        span.flatpickr-day.today:not(.selected),
        span.flatpickr-day.prevMonthDay.today:not(.selected),
        span.flatpickr-day.nextMonthDay.today:not(.selected) {
            background: ${theme.colors.milkyBlue};
            border-bottom-color: ${theme.colors.demiMiddleGray};
        }

        span.flatpickr-day.today:not(.selected):hover,
        span.flatpickr-day.prevMonthDay.today:not(.selected):hover,
        span.flatpickr-day.nextMonthDay.today:not(.selected):hover {
            border-color: ${theme.colors.demiMiddleGray};
            background: ${theme.colors.demiMiddleGray};
            color: inherit;
        }

        .flatpickr-day.notAllowed {
            border-color: unset;
        }

        .flatpickr-day.flatpickr-disabled,
        .flatpickr-day.flatpickr-disabled:hover,
        .flatpickr-day.prevMonthDay,
        .flatpickr-day.nextMonthDay,
        .flatpickr-day.notAllowed,
        .flatpickr-day.notAllowed.prevMonthDay,
        .flatpickr-day.notAllowed.nextMonthDay {
            border-right-color: transparent;
        }

        div.dayContainer .flatpickr-day.flatpickr-disabled:nth-of-type(7n + 1) {
            color: rgba(255, 75, 75, 0.2);
        }

        div.dayContainer .flatpickr-day.flatpickr-disabled:nth-of-type(7n) {
            color: rgba(66, 114, 236, 0.2);
        }
    }

    div {
        &#fp-nav {
            right: initial;
            left: 50%;
            margin: 1rem 0 0 57rem !important;
            transition: all 0.3s linear;
            transform: unset !important;

            ul {
                li {
                    a {
                        span {
                            width: 0.8rem !important;
                            height: 0.8rem !important;
                            border: 0.1rem solid ${props.colors.gray} !important;
                            background: unset !important;
                        }

                        &.active {
                            span {
                                margin: -0.2rem 0 0 -0.2rem !important;
                                background: ${props.colors.gray} !important;

                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    ${$size('1.6rem')};
                                    border: 0.1rem solid ${props.colors.gray} !important;
                                    border-radius: 50%;
                                    transform: translate(-50%, -50%);
                                }
                            }
                        }
                    }

                    &:last-of-type {
                        display: none;
                    }

                    &:hover {
                        a {
                            span {
                                margin: -0.2rem 0 0 -0.2rem !important;
                                transform: scale(1.5);
                            }

                            &.active {
                                span {
                                    transform: scale(1.1) !important;
                                }
                            }
                        }
                    }
                }
            }
        }

        &.Dropdown-arrow-wrapper {
            display: none;
        }

        &.Dropdown-control {
            height: 4rem;
            border: 0;
            ${$borderBottom(props.colors.deepLightGray)};
            padding: 1.3rem 0 0.8rem 1rem;
            font-size: ${props.fontSizes.size14};
            color: ${props.colors.demiLightGray};

            ${media(Media.LG)} {
                font-size: ${props.fontSizes.size15};
            }

            &::before {
                content: '';
                position: absolute;
                top: 1.7rem;
                right: 1rem;
                ${$size('0.6rem')};
                ${$borderTop(props.colors.demiLightGray, '0.2rem')};
                ${$borderRight(props.colors.demiLightGray, '0.2rem')};
                transform: translateY(-50%) rotate(135deg);
            }
        }

        &.Dropdown-root {
            &.is-open {
                .Dropdown-control {
                    &::before {
                        transform: rotate(315deg);
                    }
                }
            }
        }

        &.Dropdown-menu {
            max-height: 20.5rem;
            padding: 0.2rem;
            border: 0;
            border-radius: 0.2rem;
            ${$scrollBar()};
            box-shadow: rgba(0, 0, 0, 0.2) 0 0.1rem 0.5rem 0;
            z-index: 10;

            .Dropdown-option {
                padding: 1rem;
                border-radius: 0.2rem;
                font-size: ${props.fontSizes.size14};

                ${media(Media.LG)} {
                    font-size: ${props.fontSizes.size15};
                }

                &:hover {
                    background: ${props.colors.deepWhiteGray};
                }

                &.is-selected {
                    ${$backgroundImage(
                        '/webp/icons/success-blue.webp',
                        '1.3rem',
                    )};
                    background-position: right 1rem center;
                    background-color: ${props.colors.milkyBlue};
                    font-weight: 600;
                    color: ${props.colors.purpleBlue};
                }
            }
        }

        &.ReactModal__Overlay {
            z-index: 80;
        }

        &.flatpickr-months {
            ${$borderBottom(theme.colors.milkyDeepGray)};

            div {
                &.flatpickr-month {
                    ${centerBoxStyles()};
                    height: 5rem;
                    padding: 0 0 0.7rem;
                }
            }

            span {
                &.flatpickr-prev-month,
                &.flatpickr-next-month {
                    top: 0.5rem;

                    svg {
                        fill: ${theme.colors.grey};
                    }

                    &:hover {
                        svg {
                            fill: ${theme.colors.blackGray};
                        }
                    }
                }
            }
        }

        &.flatpickr-current-month {
            ${centerBoxStyles()};
            flex-direction: row-reverse;
            font-size: ${theme.fontSizes.size16};

            div {
                &.numInputWrapper {
                    width: 7rem;

                    input {
                        height: 2.6rem;
                        font-weight: 700;
                    }
                }
            }

            select {
                &.flatpickr-monthDropdown-months {
                    margin: unset;
                    padding: 0 0.5rem 0 0.4rem;
                    font-weight: 700;
                }
            }
        }

        &.flatpickr-weekdays {
            height: 4rem;

            span {
                &:first-of-type {
                    color: ${theme.colors.red};
                }

                &:last-of-type {
                    color: ${theme.colors.purpleBlue};
                }
            }
        }

        &.dayContainer {
            span {
                &:not(.prevMonthDay, .nextMonthDay, .selected) {
                    &:nth-of-type(7n + 1) {
                        color: ${theme.colors.red};
                    }

                    &:nth-of-type(7n) {
                        color: ${theme.colors.purpleBlue};
                    }
                }

                &.selected {
                    border-color: ${theme.colors.purpleBlue};
                    background: ${theme.colors.purpleBlue};

                    &:hover {
                        border-color: ${theme.colors.purpleBlue};
                        background: ${theme.colors.purpleBlue};
                    }
                }
            }
        }
    }

    a {
        text-decoration: none;
        color: inherit;

        &:active {
            color: inherit;
        }
    }

    input,
    textarea,
    select {
        font-size: ${props.fontSizes.size16} !important;
    }

    button,
    input,
    textarea {
        font-family: inherit;

        &:focus {
            outline: none;
        }
    }

    input {
        &:disabled {
            background: unset;
        }

        &:read-only {
            cursor: default;
        }

        &::placeholder {
            color: ${props.colors.demiLightGray};
        }

        &.flatpickr-input {
            background: unset;
        }

        &[type='date'] {
            -webkit-appearance: none;

            &::-webkit-calendar-picker-indicator {
                display: none;
            }
        }
    }

    textarea {
        &::placeholder {
            color: ${props.colors.demiLightGray};
        }
    }

    input:focus::-webkit-input-placeholder,
    textarea:focus::-webkit-input-placeholder {
        color: transparent !important;
    }

    button {
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;

        &:disabled {
            cursor: inherit;
        }

        &:focus-visible {
            outline: 0.2rem solid black;
        }

        &:-moz-focusring {
            outline: 0.1rem dotted black;
        }
    }

    label {
        outline: 0;

        &:active {
            border: 0;
        }

        &:focus-visible {
            outline: 0.2rem solid black;
        }

        &:-moz-focusring {
            outline: 0.1rem dotted black;
        }
    }

    strong {
        font-weight: 600;
    }
`;

export default globalStyles;
