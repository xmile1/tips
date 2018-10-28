const conversionFactor = {
    min: 1000 * 60,
    mins: 1000 * 60,
    hr: 1000 * 60 * 60,
    hrs: 1000 * 60 * 60,
    day: 1,
    days: 1,
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

export const showDaily = (context, frequency, parsedFrequency) => {
    if (frequency.includes('day') && parsedFrequency) {

        const lastTipTime = context.workspaceState.get('tips.lastTipTime')
        if (!lastTipTime) {
            return true
        }
        const lastTipDate = new Date(lastTipTime)
        const currentDate = new Date()
        lastTipDate.setDate(lastTipDate.getDate() + parsedFrequency)
        if (currentDate.getTime() >= lastTipDate.getTime()) {
            return true
        }
    }

    return false
}
