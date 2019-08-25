export const twoIntString = value => {
    let stringValue = value.toString();
    if (stringValue.length < 2) stringValue = `0${stringValue}`;
    return stringValue;
}

export const dateValue = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${twoIntString(date.getMonth() + 1)}-${twoIntString(date.getDate())}`;
}