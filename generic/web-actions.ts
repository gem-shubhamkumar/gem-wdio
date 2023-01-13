import { expect as chaiExpect } from "chai";


export const addLog = async (log: string) => {
    // console.log("[LOG]".padStart(16).padEnd(18) + log);
    console.log("[LOG] " + log);
}

export const addStepLog = async (log: string) => {
    console.log(log);
}


/**
 * It will launch the browser with the given URL. By default it will launch with URL that is defined inside [`wdio.conf.ts`](../../wdio.conf.ts) file.
 * @method open()
 * @param {string} baseUrl URL, that you want to provide for launching `Optional`.
 * @returns {void} void
 */
export const open = async (baseUrl?: string): Promise<void> => {
    try {
        baseUrl === undefined ? await browser.url("") : await browser.url(baseUrl);
        addLog("Launching URL - " + await browser.getUrl())
    } catch (error) {
        throw new Error("Fail to launch browser.");
    }

}

/**
 * It will maximise your opened browser window.
 * @method maximizeWinow()
 * @returns {void} void
 */
export const maximizeWindow = async (): Promise<void> => {
    try {
        await browser.maximizeWindow()
    } catch (error) {
        throw new Error("Fail to maxmize window.");
    }
}

/**
 * It will set implicit timeout for given time, by default it will set for 10 seconds.
 * @method setImplicitTimeout()
 * @param {number} seconds Time, that you want to provide to wait `Optional`.
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
 * It will enter the value into the input field.
 * @method typeText()
 * @param {Element} element On which action to be performed.
 * @param {string} text Value to be entered.
 * @param {string} description Label for which value entered `Optional`.
 * @returns {void} void
 */
export const typeText = async (element: Promise<WebdriverIO.Element>, text: string, description?: string): Promise<void> => {
    try {
        await (await element).waitForDisplayed()
        await (await element).setValue(text)
        if (description !== undefined) {
            addLog("Type Text into " + description + " - " + text);
        } else {
            addLog("Type Text - " + text);
        }
    } catch (error) {
        throw new Error("Fail while entering value.");
    }

}

/**
 * It will clear the text from input field.
 * @method clearText()
 * @param {Element} element On which action to be performed.
 * @param {string} description Label for which value cleared `Optional`.
 * @returns {void} void
 */
export const clearText = async (element: Promise<WebdriverIO.Element>, description?: string): Promise<void> => {
    try {
        await (await element).waitForDisplayed()
        await (await element).clearValue()
        if (description !== undefined) {
            addLog("Clear text from " + description);
        } else {
            addLog("Text cleared");
        }
    } catch (error) {
        throw new Error("Fail while clearing text field.");
    }

}

/**
 * It will click on the given element.
 * @method clickOn()
 * @param {Element} element On which action to be performed.
 * @param {string} description Label for which clicked `Optional`.
 * @returns {void} void
 */
export const clickOn = async (element: Promise<WebdriverIO.Element>, description?: string): Promise<void> => {
    try {
        await (await element).waitForDisplayed()
        await (await element).click()
        if (description !== undefined) {
            addLog("Click on " + description);
        } else {
            addLog("Clicked");
        }
    } catch (error) {
        throw new Error("Fail while clicking.");
    }

}

/**
 * It will return the page title.
 * @method getTitle()
 * @returns {string} title of the web page
 */
export const getTitle = async (): Promise<string> => {
    try {
        return await browser.getTitle()
    } catch (error) {
        throw new Error("Fail to get title.");
    }
}

/**
 * It will return the text of given element.
 * @method getElementText()
 * @param {Element} element On which action to be performed.
 * @returns {string} text of the element
 */
export const getElementText = async (element: Promise<WebdriverIO.Element>): Promise<string> => {
    try {
        return await (await element).getText()
    } catch (error) {
        throw new Error("Fail to get element text.");
        
    }
}

/**
 * It will verify the page title using chai assertion library.
 * @method verifyTitle()
 * @param {string} expected Expected Title for verifying
 * @returns {void} void
 */
export const verifyTitle = async (expected: string): Promise<void> => {
    try {
        let actual: string = await browser.getTitle()
        addLog("Matching Title -  Actual - " + actual + " | Expected - " + expected)
        chaiExpect(actual).equal(expected)
    }
    catch (error) {
        throw new Error("Fail to verify title.");
        
    }

}

/**
 * It will verify the element text with the expected text using chai assertion library.
 * @method verifyEquals()
 * @param {string} actual Actual Value for verifying
 * @param {string} expected Expected Value for verifying
 * @param {string} description Value that we are verifying for. `Optional`
 * @returns {void} void
 */
export const verifyEquals = async (actual: any, expected: any, description?: string): Promise<void> => {
    try {
        addLog("Matching " + description + " - Actual - " + actual + " | Expected - " + expected)
        chaiExpect(actual).equal(expected)
    } catch (error) {
        throw new Error("Fail to verify values.");
    }

}

/**
 * It will return the attribute of given element.
 * @method getAttributeValue()
 * @param {Element} element On which action to be performed.
 * @param {string} attribute element attribute for which the value get
 * @returns {string} attribute value of given element
 */
export const getAttributeValue = async (element: Promise<WebdriverIO.Element>, attribute: string): Promise<string> => {
    try {
        return await (await element).getAttribute(attribute)
    } catch (error) {
        throw new Error("Fail to get the attribute value");
    }
}

/**
 * It will verify the attribute value of given element using chai assertion.
 * @method verifyAttributeContains()
 * @param {Element} element On which action to be performed.
 * @param {string} attribute element attribute for which the value get
 * @param {string} value Expected attribute value of given element for verifying
 * @returns {void} void
 */
export const verifyAttributeContains = async (element: Promise<WebdriverIO.Element>, attribute: string, value: string): Promise<void> => {
    try {
        let actual: string = await getAttributeValue(element, attribute)
        addLog("Matching value of " + attribute + " - Actual - " + actual + " | Expected - " + value)
        chaiExpect(actual).to.have.string(value)
    } catch (error) {
        throw new Error("Fail to verify the attribute value");
    }

}

/**
 * It will return the size of the elements array
 * @method sizeOf()
 * @param {Element} element On which action to be performed.
 * @returns {number} the size of the elements array
 */
export const sizeOf = async (element: Promise<WebdriverIO.ElementArray>): Promise<number> => {
    return (await element).length;
}

/**
 * It will enter the value in text field and press `ENTER` key.
 * @method typeAndEnter()
 * @param {Element} element On which action to be performed.
 * @param {string} text Value to be entered.
 * @param {string} description Label for which value entered `Optional`.
 * @returns {void} void
 */
export const typeAndEnter = async (element: Promise<WebdriverIO.Element>, text: string, description?: string): Promise<void> => {
    try {
        await typeText(element, text, description)
        browser.keys("Enter")
    } catch (error) {
        throw new Error("Fail to type and enter");
        
    }

}

/**
 * It will wait until given element is displayed.
 * @method waitForElement()
 * @param {Element} element On which action to be performed.
 * @returns {void} void
 */
export const waitForElement = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    await (await element).waitForDisplayed({ timeout: 30000 })
}

/**
 * It will perform double click action on the given element.
 * @method doubleClickOnElement()
 * @param {Element} element On which action to be performed.
 * @returns {void} void
 */
export const doubleClickOnElement = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        await waitForElement(element)
        await (await (element)).doubleClick()

    } catch (error) {
        throw new Error("Fail to double click on element");
    }

}

/**
 * It will first hover on the given element and then perform click action on the given element.
 * @method hoverAndClick()
 * @param {Element} hoverElement On which hover action to be performed.
 * @param {Element} clickElement On which click action to be performed.
 * @returns {void} void
 */
export const hoverAndClick = async (hoverElement: Promise<WebdriverIO.Element>, clickElement: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        await (await hoverElement).moveTo();
        await (await clickElement).click();
    } catch (error) {
        console.log("Error occured " + error)
    }

}

/**
 * It will refresh the opened page.
 * @method refreshPage()
 * @returns {void} void
 */
export const refreshPage = async (): Promise<void> => {
    browser.refresh()
}

/**
 * It will perform scroll action until given element is present.
 * @method scrollToAnElement()
 * @param {Element} element Scroll action to be performed till which element.
 * @returns {void} void
 */
export const scrollToAnElement = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        await (await element).scrollIntoView();
    } catch (error) {
        console.log("Error occured " + error)

    }

}


/**
 * It will check for presence of a given element.
 * @method isElementPresent()
 * @param {Element} element Whose presence is to be checked.
 * @returns {boolean} boolean
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
 * It will perform right click action on given element.
 * @method rightClick()
 * @param {Element} element On which action to be performed.
 * @returns {void} void
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
 * It will wait for given element until it is clickable.
 * @method waitUntilClickable()
 * @param {Element} element Wait until clickable
 * @returns {void} void
 */
export const waitUntilClickable = async (element: Promise<WebdriverIO.Element>): Promise<void> => {
    try {
        browser.waitUntil(async () => (await element).isClickable())
    }
    catch (error) {
        console.log("Error occured " + error)
    }

}


