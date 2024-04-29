export function getEntries<T>(parsedCsv: any[][], getClass: (type: any) => T) {
    const entries: T[] = [];

    parsedCsv.forEach(csvLine => {
        const type = Number(csvLine[0]);
        const typeClass = getClass(type);

        if (typeClass) {
            let index = 0;
            const keys = Object.keys(typeClass);

            for (const key of keys) {
                const value = GetStringValueAsType(csvLine[index++], typeof((typeClass as any)[key]));
                (typeClass as any)[key] = value;
            }

            entries.push(typeClass);
        }
    });

    return entries;
}

export function GetStringValueAsType(value: string, type: string) {
    if (type == "string")
        return value as string;
    if (type == "number")
        return Number(value);
    if (type == "boolean")
        return Boolean(value);
    return value;
}
