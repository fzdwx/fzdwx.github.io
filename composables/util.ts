export function groupBy<T extends {}, K>(arr: T[], mapper: (v: T) => K) {
    return arr.reduce((rv, x) => {
        // @ts-ignore
        (rv[mapper(x)] = rv[mapper(x)] || []).push(x)
        return rv
    }, {})
}
