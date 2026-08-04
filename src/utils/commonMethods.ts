

export const formatDateTime = (
    date: Date | string | number,
    locale: string = "en-AU",
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }
): string => {
    if (date)
        return new Intl.DateTimeFormat(locale, options).format(new Date(date));
    else
        return new Intl.DateTimeFormat(locale, options).format(new Date());
};