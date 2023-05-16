import { ChangeEvent } from 'react';

import { Bool } from '@/enums/common';
import type { JSONArray, NameValue } from '@/interfaces/index';

export type BoolType = (typeof Bool)[keyof typeof Bool];

export type HandleInputType = (e: string | UseInputParamsType) => void;
export type HandleInputsType = (e: NameValue | UseInputParamsType) => void;

export type JSONObjectType = { [key: string]: JSONValueType };
export type JSONPrimitiveType = boolean | null | number | string;
export type JSONValueType = JSONArray | JSONObjectType | JSONPrimitiveType;

export type UseInputParamsType = ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
