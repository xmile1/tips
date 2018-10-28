# Tips
Tips is a fully customizable vscode extension that displays tips/tricks pooled from itself and other installed extensions with prepacked tips in them as well as from installed Tip packs.

With Tips, you learn new tips about `your editor`, `your extensions`, `your frameworks`, `your languages` and `any subject` depending on your installed Tip packs, in the most customizable, convinient and non intrusive way

Developers can add tips to their extension by simply adding the tips property to their package.json. [See API below](#api)

---
## Features

![tips-demo](./images/tips-demo.gif "Tips Demo")

* You can choose the way you want to display your tips, 

    * In the less prominent status bar
    * As a simple vscode notifications with a link to learn more that auto hides after some seconds
    * As a vscode notifications with action buttons for next tip and a link to learn more

* You can choose from a wide range of time intervals to customize the frequency of display

* Whitelist and Blacklist to customize and streamline the categories of tips to display

![tips-settings-demo](./images/tips-settings-demo.gif "Tips settings demo")

* You can find Tips packs from [vscode marketplace](https://marketplace.visualstudio.com/) and install to get more tips

* You can create your own Tips pack following the simple steps given here

* Developers can simply add tip to their extension in package.json and `Tips` will display them, [See API below](#api)

---
## Installation

* Inside VSCode, press Cmd + P (Windows: Ctrl+P), and enter:
* type `ext install tips`

---
## Usage

Tip is set by default to show One(1) random tip daily from any random category using the `Notification with action` display mode, you can however modify these setting to suit your need.

#### To manually display a tip:
* Inside VSCode, press Cmd + Shift + P,
* type `tips`
* select `Tips, Display a tip`



---
## Extension Settings

You can customize Tip by modifying the following in you Workspace or User Settings :

Setting | Description | Options | Default | Examples |
--- | --- | --- | --- | --- |
|`tips.frequency`: string| Display tips at this frequency | can be in `mins`, `hrs`, `days` | 1 day | `5 days`, `1 min`, `10 hrs` |
| `tips.blacklist`: array\<string\> | Do not display these categories of tips | | nil | ["general", "javascript"] |
| `tips.whitelist`| Only display these categories of tips | | nil | ["gitlens", "vsLiveShare"] |
| `tip.displayMode`| Display tips using any convenient notification type available on vscode | `notification without action`, `notification with action`, `status bar` | notification with action | notification without action |

---

## API

### Add Tips to your Extension
While developing your extension, you can simply add a tips property with value as seen in the sample below to your package.json and that is it, Tips does the rest.



```ts
{
    category:Array<object>:[{ // A category to allow users filter their tips
        // The tip text to be displayed
        text:string,
        // A url that opens when a user clicks on `learn more`
        more?:string
    }]
}
```

for example #package.json

```json
{
  ...

  "tips": {
    "vscode": [
      {
        "text": "Do you know you can use this awesome shortcut with my extension?",
        "more": "https://marketplace.visualstudio.com"
      },
      {
        "text": "Press Ctrl + A to select all"
      }
    ],
    "javascript": [
      {
        "text": "Factory pattern is a Creational Design Pattern used in javascript ",
        "more": "http://jstherightway.org/#patterns"
      }
    ]
  }
}
```

find a sample package.json [here](https://github.com/xmile1/vscode-tips-pack-template/blob/master/package.json)

### Tips Pack
You can create a `Tips Pack` by 

* simply cloning `https://github.com/xmile1/vscode-tips-pack-template`

    ```
    git clone git@github.com:xmile1/vscode-tips-pack-template.git your-tips-pack-name
    ```
* replace the tips object in the [package.json](https://github.com/xmile1/vscode-tips-pack-template/blob/master/package.json) with your categories and tips content
* Update all other personal details in the pacakge.json
* [publish](https://code.visualstudio.com/docs/extensions/publish-extension) your Tips Pack to vscode marketplace



---
## Release Notes

[See Changelog](https://github.com/xmile1/vscode-tips/blob/master/CHANGELOG.md)

---

**Enjoy!**
