export const emailValidation = (value: string) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);

export const fileValidation = (fileName: string) =>
    /\.(jpg|jpeg|pdf|png)$/i.test(fileName);

export const numberValidation = (value: string) => /^[0-9]*$/g.test(value);
