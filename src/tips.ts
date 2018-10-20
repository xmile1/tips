import * as vscode from 'vscode'
import * as opn from 'opn'
import { NEXT_TIP, LEARN_MORE } from './constant'

interface ICategoryItems {
    text: string,
    more?: string,
}

interface ITip {
    category?: Array<ICategoryItems>,
}


export default class Tips {
    whiteList: Array<string>
    blackList: Array<string>
    tips: ITip = {}

    constructor(whiteList, blackList) {
        this.whiteList = whiteList
        this.blackList = blackList
    }

    addTip(tip){
        this.addTips([tip])
    }

    addTips(tips) {
        if (tips){
        Object.keys(tips).forEach((category) => {
            const availableCategory = this.getCategoryItems[category] || []
            this.tips[category] = [ ...availableCategory, ...tips[category] ]
        })
    }
    }

    // TODO: Abstract Category methods from Tips class
    getCategoryItems(category) {
        return this.tips[category]
    }

    getAllCategory() {
        return Object.keys(this.tips)
    }

    getAuthorizedCategory() {
        let tips = []
        if (this.whiteList.length) {
            return this.whiteList
        } else if (this.blackList.length) {
            return Object.keys(this.tips).filter((category) => {
                return !this.blackList.includes(category)
            })
        }
        return this.getAllCategory()
    }

    getRandomTip(category?:string) {
        let tipList = []
        if (category) {
            tipList.push(...this.getCategoryItems(category))
        } else {
            let categoryName = this.getRandomCategoryName()
            tipList.push(...this.getCategoryItems(categoryName))
        }
        const randomTipIndex = Math.floor(Math.random() * tipList.length)
        return tipList[randomTipIndex]
    }

    getRandomCategoryName(){
        const authorizedCategory = this.getAuthorizedCategory()
        const randomCategory = Math.floor(Math.random() * authorizedCategory.length)
        return authorizedCategory[randomCategory]
    }

    showRandomTip(){
        const learnMore = "learn More"
        const nextTip = "Next Tip"
        const tip = this.getRandomTip()

        //TODO: Inject the vscode dependency to inmprove loose coupling
        const choices = vscode.window.showInformationMessage(tip.text, LEARN_MORE, NEXT_TIP)

        choices.then((choice) => {
            switch (choice) {
                case learnMore: opn(tip.more)
                    break
                case nextTip: this.showRandomTip()
                    break
                default: return null
        }
        })
    }
}