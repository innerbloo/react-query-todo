import { JSONValueType } from '@/aliases/common';

export interface Value {
    value: string;
}

export interface Name {
    name: string;
}

export interface JSONArray extends Array<JSONValueType> {}

export interface NameValue extends Name, Value {}

export interface StringObject {
    [key: string]: string;
}

export interface LoginData {
    email: string;
    password: string;
}
