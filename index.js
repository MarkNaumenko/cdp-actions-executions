'use strict';

(async () => {

  require('chromedriver');


  // let options = new ChromeOptions();
  // options.AddArgument("--start-maximized");

  const webdriver = require('selenium-webdriver'),
    fs = require('fs'),
    until = webdriver.until,
    Key = require('selenium-webdriver').Key,
  //   driver = new webdriver.Builder()
  //     .withCapabilities(webdriver.Capabilities.chrome())
  //     // .setChromeOptions(options) //JUST HOW????? Hot to set CHROME OPTIONS???
  //     .build(),
    driver = new webdriver.Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .forBrowser('chrome')
      .build(),


    page = require('./po.js');

  async function writeScreenShot(data, filename) {
    let stream = fs.createWriteStream(filename);
    await stream.write(new Buffer(data, 'base64'));
    await stream.end();
  }

  async function click(locator, time = 10000) {
    await driver.wait(until.elementLocated(locator), time);
    await driver.findElement(locator).click();
  }

  async function highlightWithJS(element) {
    // TASK 2
    // Example of using script execution in Webdriver JS
    await driver.executeScript('arguments[0].style.backgroundColor = "red"', element)
  }

  async function click(locator, time = 10000) {
    await driver.wait(until.elementLocated(locator), time);
    await driver.findElement(locator).click();
  }

  async function input(locator, text, time = 10000) {
    await driver.wait(until.elementLocated(locator), time);
    // await driver.findElement(locator).sendKeys(text); //don't work due to selenium bug
  }

  await driver.get('http://devvm/car-insurance/');

  await highlightWithJS(driver.findElement(page.getBrandNewQuote));

  await driver.sleep(2000);

  // TASK 1
  // Example of using actions in Webdriver JS
  await driver.actions()
    .keyDown(webdriver.Key.CONTROL)
    .click(driver.findElement(page.getBrandNewQuote))
    .keyUp(webdriver.Key.CONTROL)
    .perform();

  let tab;
  await driver.getAllWindowHandles().then((tabs) => {
    tab = tabs[1];
  });
  await driver.close();
  await driver.switchTo().window(tab);
  await driver.sleep(3000);
  await click(page.knownRegnumberfalse);
  await click(page.mark);
  await click(page.otherModel);
  await click(page.model328);
  await click(page.manualTransmission);
  await click(page.year1997);
  await click(page.bodyTypeCoupe);
  await input(page.postcode, 'b');
  await click(page.findCar);
  await driver.sleep(1000);
  await driver.navigate().refresh();

  console.log(await driver.getCurrentUrl());

  let height = await driver.executeScript('return window.innerHeight;')

  console.log(height,await driver.executeScript('return document.body.scrollHeight;'));

  await driver.sleep(3000);

  let number = Math.round(await driver.executeScript('return document.body.scrollHeight;') / height);
  let i = 1;

  //operator "for" do not work here, why?
  do {
    await driver.executeScript(`window.scrollTo(0, ${height * i});`)
    await writeScreenShot(await driver.takeScreenshot(), `foo_${i}.png`);
    i++;
   } while (i < number)

  await driver.quit();

})();

