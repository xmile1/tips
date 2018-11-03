const conversionFactor = {
    min: 1000 * 60,
    mins: 1000 * 60,
    hr: 1000 * 60 * 60,
    hrs: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    days: 1000 * 60 * 60 * 24,
}

export const parseFrequency = (frequency) => {
    if (frequency === 'never') {
        return false
    }
    const [time, type] = frequency.split(' ')

    if (!isNaN(time) && conversionFactor[type]) {
        return time * conversionFactor[type]
    }

    return false
}

const millisecsToDay = (millisecs) => millisecs / (1000 * 60 * 60 * 24)

export const parseDayFrequency = (context, frequency, parsedFrequency) => {
    if (frequency.includes('day') && parsedFrequency) {
        const lastTipTime = context.globalState.get('tips.lastTipTime')
        if (!lastTipTime) {
            return 0
        }
        const lastTipDate = new Date(lastTipTime)
        const currentDate = new Date()
        lastTipDate.setDate(lastTipDate.getDate() + millisecsToDay(parsedFrequency))
        return lastTipDate.getTime() - currentDate.getTime()
    }

    return false
}
