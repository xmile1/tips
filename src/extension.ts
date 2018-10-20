'use strict'

import * as vscode from 'vscode'
import Tips from './tips'
import { parseFrequency, showDaily } from './utils/transformTime'
import { getConfig } from './utils/getConfig'
let tipInterval

export function activate(context: vscode.ExtensionContext) {

    const { blacklist, whitelist, frequency }: any = getConfig(['blacklist', 'whitelist', 'frequency'])
    const parsedFrequency = parseFrequency(frequency)
    const tips = new Tips( whitelist, blacklist)

    vscode.extensions.all.forEach((ext) => {
        if (ext.packageJSON.tips) {
            tips.addTips(ext.packageJSON.tips)
        }
    })

    if (showDaily(context, frequency, parsedFrequency)) {
        tips.showRandomTip()
        context.workspaceState.update('tips.lastTipTime', new Date())
    } else if (parsedFrequency) {
        tipInterval = setInterval(tips.showRandomTip.bind(tips), parsedFrequency)
    }

    let disposable = vscode.commands.registerCommand('extension.tips', () => {
        tips.showRandomTip()
    })
    context.subscriptions.push(disposable)
}

export function deactivate() {
    if (tipInterval) {
        tipInterval.close()
    }
}