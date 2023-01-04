import { expect as chaiExpect } from "chai";


export const addLog = async (log: string) => {
    // console.log("[LOG]".padStart(16).padEnd(18) + log);
    console.log("[LOG] " + log);
}

export const addStepLog = async (log: string) => {
    console.log(log);
}


/**
 * It will launch th browser with the default URL, that is given in wdio.conf.ts file.
 * @method open()
 * @returns {void} void
 */
export const open = async (): Promise<void> => {
    try {
        await browser.url("")
        addLog("Launching URL - " + await browser.getUrl())
    } catch (error) {

    }

}

/**
 * It will maximise your opened browser window.
 * @method maximizeWinow()
 * @returns {void} void
 */
export const maximizeWindow = async (): Promise<void> => {
    await browser.maximizeWindow()
}

/**
 * It will set implicit timeout for given time, by default it will set for 10 seconds.
 * @method setImplicitTimeout()
 * @param {number} seconds Optional value, that you want to provide to wait.
 * @returns {void} void
 */
export const setImplicitTimeout = async (seconds?: number): Promise<void> => {
    var timeout: number = 10000;
    if (seconds !== undefined) {
        timeout = seconds * 1000;
    }
    await browser.setTimeout({ 'implicit': timeout });
}

/**
 * It will enter the text into input field.
 * @method typeText()
 * @param {element} element On which action to be performed.
 * @param {string} text Value to be entered.
 * @param {string} description Label for which value entered..
 * @returns {void} void
 */
export const typeText = async (element: Promise<WebdriverIO.Element>, text: string, description: string): Promise<void> => {
    try {
        await (await element).waitForDisplayed()
        await (await element).setValue(text)
        addLog("Type Text into " + description + " - " + text);
        await browser.takeScreenshot()
    } catch (error) {

    }

}

/**
 * method - clearText()
 * 
 * It will clear the text from input field.
 * params - Element, Description
 * return void
 * 
 */
export const clearText = async (element: Promise<WebdriverIO.Element>, description: string) => {
    try {
        await (await element).waitForDisplayed()
        await (await element).clearValue()
        await browser.takeScreenshot()
        addLog("Clear value of " + description)
    } catch (error) {

    }

}

/**
 * method - clickOn()
 * 
 * It will click on the given element.
 * params - Element, Description
 * return void
 * 
 */
export const clickOn = async (element: Promise<WebdriverIO.Element>, description: string) => {
    try {
        await (await element).waitForDisplayed()
        await browser.takeScreenshot()
        await (await element).click()
        addLog("Click on " + description)
    } catch (error) {

    }

}

/**
 * method - getTitle()
 * 
 * It will return the page title.
 * params - NA
 * return String
 * 
 */
export const getTitle = async (): Promise<string> => {
    return await browser.getTitle()
}

/**
 * method - getElementText()
 * 
 * It will return the text of webElement.
 * params - Element
 * return String
 * 
 */
export const getElementText = async (element: Promise<WebdriverIO.Element>): Promise<string> => {
    return await (await element).getText()
}

/**
 * method - verifyTitle()
 * 
 * It will verify the page title using chai assertion library.
 * params - Expected
 * return void
 * 
 */
export const verifyTitle = async (expected: string) => {
    try {
        let actual: string = await browser.getTitle()
        addLog("Matching Title -  Actual - " + actual + " | Expected - " + expected)
        chaiExpect(actual).equal(expected)
    }
    catch (error) {

    }

}
/**
 * method - verifyEquals()
 * 
 * It will verify the element text with the expected text using chai assertion library.
 * params - Actual, Expected, Description
 * return void
 * 
 */
export const verifyEquals = async (actual: any, expected: any, description: string) => {
    try {
        let snap = await browser.takeScreenshot()
        addLog("Matching " + description + " - Actual - " + actual + " | Expected - " + expected)
        chaiExpect(actual).equal(expected)
    } catch (error) {

    }

}

/**
 * method - getAttributeValue()
 * 
 * It will return the attribute of given element.
 * params - String, Attribute
 * return String
 * 
 */
export const getAttributeValue = async (element: Promise<WebdriverIO.Element>, attribute: string): Promise<string> => {
    return await (await element).getAttribute(attribute)
}

/**
 * method - verifyAttributeContains()
 * 
 * It will verify that element contains attribute using chai assertion.
 * params - String, Attribute, Value
 * return void
 * 
 */
export const verifyAttributeContains = async (element: Promise<WebdriverIO.Element>, attribute: string, value: string) => {
    try {
        let actual: string = await getAttributeValue(element, attribute)
        addLog("Matching value of " + attribute + " - Actual - " + actual + " | Expected - " + value)
        chaiExpect(actual).to.have.string(value)
    } catch (error) {

    }

}

/**
 * method - sizeOf()
 * 
 * It will return the size of the elements array
 * params - ElementArray
 * return number
 * 
 */
export const sizeOf = async (element: Promise<WebdriverIO.ElementArray>): Promise<number> => {
    return (await element).length
}

export const typeAndEnter = async (element: Promise<WebdriverIO.Element>, text: string, description: string) => {
    try {
        await (await element).waitForDisplayed()
        await (await element).setValue(text)
        browser.keys("Enter")
    } catch (error) {

    }

}

export const implicitWait = async () => {
    await browser.setTimeout({ 'implicit': 200000 })
}

export const waitForElement = async (element: Promise<WebdriverIO.Element>) => {
    await (await element).waitForDisplayed({ timeout: 30000 })
}

/**
* method - rightClick()
* 
* It will perform double click action on element
* params - Element
* return void
* 
*/
export const doubleClickOnElement = async (element: Promise<WebdriverIO.Element>) => {
    try {
        waitForElement(element)
        await (await (element)).doubleClick()

    } catch (error) {
        console.log("Error occured " + error)
    }

}

/**
* method - hoverAndClick()
* 
* It will first perform hover action then click action on element
* params - Element
* return void
* 
*/
export const hoverAndClick = async (hoverElement: Promise<WebdriverIO.Element>, clickElement: Promise<WebdriverIO.Element>) => {
    try {
        await (await hoverElement).moveTo();
        await (await clickElement).click();
    } catch (error) {
        console.log("Error occured " + error)
    }

}

export const refreshPage = async () => {
    browser.refresh()
}

/**
* method - scrollToAnElement()
* 
* It will perform scroll action until element is not present
* params - Element
* return void
* 
*/
export const scrollToAnElement = async (element: Promise<WebdriverIO.Element>) => {
    try {
        await (await element).scrollIntoView();
    } catch (error) {
        console.log("Error occured " + error)

    }

}

/**
* method - isElementPresent()
* 
* It will check whether element is present or not
* params - Element
* return boolean
* 
*/

export const isElementPresent = async (element: Promise<WebdriverIO.Element>): Promise<boolean> => {
    try {
        waitForElement(element)
        return await (await element).isDisplayed()
    } catch (error) {
        console.log("Error occured " + error)
    }
}

/**
* method - rightClick()
* 
* It will perform right/context click action on element
* params - Element
* return void
* 
*/
export const rightClick = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        waitForElement(element);
        (await element).click({ button: 'right' })
    }
    catch (error) {
        console.log("Error occured " + error)
    }
}

/**
* method - waitUntilClickable()
* 
* It will wait until element is clickable timeout 5000ms
* params - Element
* return void
* 
*/
export const waitUntilClickable = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        browser.waitUntil(async () => (await element).isClickable())
    }
    catch (error) {
        console.log("Error occured " + error)
    }

}
