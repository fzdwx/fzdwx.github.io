export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}


export function dayNth(input: string) {
    const d = Number.parseInt(input)
    if (d > 3 && d < 21)
        return `${d}th`
    switch (d % 10) {
        case 1: return `${d}st`
        case 2: return `${d}nd`
        case 3: return `${d}rd`
        default: return `${d}th`
    }
}
