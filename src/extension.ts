'use strict'

import * as vscode from 'vscode'
import Tips from './tips'
import { parseFrequency, parseDayFrequency } from './utils/transformTime'
import { getConfig } from './utils/getConfig'
import { MINIMUM_FREQUENCY, MAXIMUM_FREQUENCY, INVALID_FREQUENCY_CONFIG } from './constant'

let tipInterval
let tipTimeout

export function activate(context: vscode.ExtensionContext) {
    const { blacklist, whitelist, frequency, displayMode }: any = getConfig(['blacklist', 'whitelist', 'frequency', 'displayMode'])
    const parsedFrequency = parseFrequency(frequency)
    const tips = new Tips(whitelist, blacklist)

    vscode.extensions.all.forEach((ext) => {
        if (ext.packageJSON.tips) {
            tips.addTips(ext.packageJSON.tips)
        }
    })

    //TODO: refactor or document for clarity
    if (MAXIMUM_FREQUENCY > +parsedFrequency && +parsedFrequency > MINIMUM_FREQUENCY) {
        const parsedDayFrequency = parseDayFrequency(context, frequency, parsedFrequency)
        if (parsedDayFrequency !== false) {
            tipTimeout = setTimeout((() => {
                tips.showRandomTip(displayMode)
                context.globalState.update('tips.lastTipTime', new Date())
                tipInterval = setInterval((() => tips.showRandomTip(displayMode)).bind(tips), +parsedFrequency)
            }).bind(tips), parsedDayFrequency)
        } else {
            tipInterval = setInterval((() => tips.showRandomTip(displayMode)).bind(tips), +parsedFrequency)
        }
    } else {
        vscode.window.showInformationMessage(INVALID_FREQUENCY_CONFIG)
    }

    let disposable = vscode.commands.registerCommand('extension.tips', () => {
        tips.showRandomTip(displayMode)
    })
    context.subscriptions.push(disposable)
}

export function deactivate() {
    if (tipInterval) { clearInterval(tipInterval) }     
    if (tipTimeout) { clearTimeout(tipTimeout) }
}