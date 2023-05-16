import { useState } from 'react';

import type { HandleInputsType, UseInputParamsType } from '@/aliases/common';
import type { NameValue, StringObject } from '@/interfaces/common';

export const useInput = (initialState: string) => {
    const [state, setter] = useState(initialState);

    const handler = (e: UseInputParamsType | string) => {
        setter((e as UseInputParamsType)?.target?.value ?? e);
    };

    return [state, handler] as const;
};

export const useInputs = (initialState: StringObject) => {
    const [state, setter] = useState(initialState);

    const handler = (e: UseInputParamsType | NameValue) => {
        const { name, value } = (e as UseInputParamsType).target ?? e;

        setter((currentState) => ({ ...currentState, [name]: value }));
    };

    return [state, handler] as const;
};
