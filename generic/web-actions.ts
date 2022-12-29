import { expect as chaiExpect } from "chai";


export const addLog = async (log: string) => {
    // console.log("[LOG]".padStart(16).padEnd(18) + log);
    console.log("[LOG] " + log);
}

export const addStepLog = async (log: string) => {
    console.log(log);
}


/**
 * method - open()
 * 
 * It will launch th browser with the default URL, that is given in wdio.conf.ts file.
 * Adding the step into report.
 * params - NA
 * return void
 * 
 */
export const open = async () => {
    await browser.url("")
    addLog("Launching URL - " + await browser.getUrl())
}

export const maximizeWindow = async () => {
    await browser.maximizeWindow()
}

export const setImplicitTimeout = async () => {
    await browser.setTimeout({ 'implicit': 20000 })
}

/**
 * method - typeText()
 * 
 * It will enter the text into input field.
 * Adding the step into report.
 * params - Element, Text, Description
 * return void
 * 
 */
export const typeText = async (element: Promise<WebdriverIO.Element>, text: string, description: string) => {
    await (await element).waitForDisplayed()
    await (await element).setValue(text)
    await browser.takeScreenshot()
}

/**
 * method - clearText()
 * 
 * It will clear the text from input field.
 * Adding the step into report.
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
 * Adding the step into report.
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
 * Adding the step into report.
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
 * Adding the step into report.
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
 * Adding the step into report.
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