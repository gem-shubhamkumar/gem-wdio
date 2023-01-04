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
    await browser.url("")
    addLog("Launching URL - " + await browser.getUrl())
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
    await (await element).waitForDisplayed()
    await (await element).setValue(text)
    addLog("Type Text into " + description + " - " + text);
    await browser.takeScreenshot()
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
    await (await element).waitForDisplayed()
    await (await element).clearValue()
    await browser.takeScreenshot()
    addLog("Clear value of " + description)
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
    await (await element).waitForDisplayed()
    await browser.takeScreenshot()
    await (await element).click()
    addLog("Click on " + description)
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
    let actual: string = await browser.getTitle()
    addLog("Matching Title -  Actual - " + actual + " | Expected - " + expected)
    chaiExpect(actual).equal(expected)
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
    let snap = await browser.takeScreenshot()
    addLog("Matching " + description + " - Actual - " + actual + " | Expected - " + expected)
    chaiExpect(actual).equal(expected)
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
    let actual: string = await getAttributeValue(element, attribute)
    addLog("Matching value of " + attribute + " - Actual - " + actual + " | Expected - " + value)
    chaiExpect(actual).to.have.string(value)
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