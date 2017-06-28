/**
 * Created by Mark_Naumenko on 6/11/2017.
 */
'use strict';

const driver = require('selenium-webdriver');

module.exports = {
    getBrandNewQuote: driver.By.css('.fancy-button--purple[title="Get a brand new quote"]'),
    knownRegnumberfalse: driver.By.xpath('.//*[@id="knownRegnumberfalse"]'),
    mark: driver.By.id('make4'),
    otherModel: driver.By.id('modelOther'),
    model328: driver.By.css('option[label="328"]'),
    manualTransmission: driver.By.id('transmission0'),
    year1997: driver.By.css('option[label="1997 (P, R)"]'),
    bodyTypeCoupe: driver.By.css('option[label="I COUPE"]'),
    findCar: driver.By.id('findCar'),
    postcode: driver.By.id('postcode')
};
