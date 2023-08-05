import dayjs from "dayjs";

export function groupBy<T extends {}, K>(arr: T[], mapper: (v: T) => K) {
    return arr.reduce((rv, x) => {
        // @ts-ignore
        (rv[mapper(x)] = rv[mapper(x)] || []).push(x)
        return rv
    }, {})
}

export function parseDate(date: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).locale('zh-cn').format(format)
}
