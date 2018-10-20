import { workspace } from 'vscode'

export const getConfig = (configKeys: Array<string>) => {
    const config:object = {}
    configKeys.forEach((configKey:string) => {
        config[configKey] = workspace.getConfiguration('tips').get(configKey)
    })

    return config
}