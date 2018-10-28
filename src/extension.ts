'use strict'

import * as vscode from 'vscode'
import Tips from './tips'
import { parseFrequency, showDaily } from './utils/transformTime'
import { getConfig } from './utils/getConfig'

let tipInterval

export function activate(context: vscode.ExtensionContext) {
    const { blacklist, whitelist, frequency, displayMode }: any = getConfig(['blacklist', 'whitelist', 'frequency', 'displayMode'])
    const parsedFrequency = parseFrequency(frequency)
    const tips = new Tips( whitelist, blacklist)

    vscode.extensions.all.forEach((ext) => {
        if (ext.packageJSON.tips) {
            tips.addTips(ext.packageJSON.tips)
        }
    })

    if (showDaily(context, frequency, parsedFrequency)) {
        tips.showRandomTip(displayMode)
        context.workspaceState.update('tips.lastTipTime', new Date())
    } else if (parsedFrequency) {
        tipInterval = setInterval((()=> tips.showRandomTip(displayMode)).bind(tips), parsedFrequency)
    }

    let disposable = vscode.commands.registerCommand('extension.tips', () => {
        tips.showRandomTip(displayMode)
    })
    context.subscriptions.push(disposable)
}

export function deactivate() {
    if (tipInterval) {
        tipInterval.close()
    }
}