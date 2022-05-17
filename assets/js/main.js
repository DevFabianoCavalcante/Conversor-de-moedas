document.querySelector('#input-value').focus();

const typeCoin = document.querySelector('#options-coins');
const typeConversion = document.querySelector('#options-coins-conversion');

let resultRequisition;
let coinOptionOne;
let coinOptionTwo; 
let result;
let locale;

const requisition = () => {
    fetch(`https://api.hgbrasil.com/finance/quotations?format=json-cors&key=666d26e4`)
    .then(response => response.json())
    .then(json => resultRequisition = json.results.currencies)
    .catch(error => {
        console.log(error);
    })
};

const getTypeCoin = () => typeCoin.value;
const getTypeConversion = () => typeConversion.value;

const getValueConversion = (typeValue, typeConversion) => {

    (typeValue == 'ARS')? coinOptionOne = resultRequisition.ARS.buy:
    (typeValue == 'AUD')? coinOptionOne = resultRequisition.AUD.buy:(typeValue == 'CAD')? coinOptionOne = resultRequisition.CAD.buy:(typeValue == 'CNY')? coinOptionOne = resultRequisition.CNY.buy:(typeValue == 'EUR')? coinOptionOne = resultRequisition.EUR.buy:
    (typeValue == 'GBP')? coinOptionOne = resultRequisition.GBP.buy:
    (typeValue == 'JPY')? coinOptionOne = resultRequisition.JPY.buy:(typeValue == 'USD')? coinOptionOne = resultRequisition.USD.buy:(typeValue == 'BRL')? coinOptionOne = 'BRL' : 'BRL';

    (typeConversion == 'ARS')? coinOptionTwo = resultRequisition.ARS.buy:
    (typeConversion == 'AUD')? coinOptionTwo = resultRequisition.AUD.buy:(typeConversion == 'CAD')? coinOptionTwo = resultRequisition.CAD.buy:(typeConversion == 'CNY')? coinOptionTwo = resultRequisition.CNY.buy:(typeConversion == 'EUR')? coinOptionTwo = resultRequisition.EUR.buy:
    (typeConversion == 'GBP')? coinOptionTwo = resultRequisition.GBP.buy:
    (typeConversion == 'JPY')? coinOptionTwo = resultRequisition.JPY.buy:(typeConversion == 'USD')? coinOptionTwo = resultRequisition.USD.buy:(typeConversion == 'BRL')? coinOptionTwo = 'BRL' : 'BRL';
};

const calculateCoin = (value, coinTypeOne, coinTypeTwo) => {
    if(value !== '') {
        if ( coinTypeOne === coinTypeTwo) {
            result = value;
        } else if (coinTypeOne === 'BRL') {
            result = value / coinTypeTwo;
        } else if(coinTypeTwo === 'BRL') {
            result = value * coinTypeOne;
        } else if (coinTypeOne !== 'BRL' && coinTypeTwo !== 'BRL') {
            result = (value * coinTypeOne) / coinTypeTwo;
        }
    } else {
        result = 'Insira um valor';
    }
};

const setLocaleCoin = () => {
    const localeCoin = getTypeConversion();

    (localeCoin === 'ARS')? locale = ['es-AR', localeCoin]:
    (localeCoin === 'AUD')? locale = ['en-AU', localeCoin]:
    (localeCoin === 'CAD')? locale = ['en-CA', localeCoin]:
    (localeCoin === 'CNY')? locale = ['zh-Hans-CN', localeCoin]:
    (localeCoin === 'EUR')? locale = ['de-DE', localeCoin]:
    (localeCoin === 'GBP')? locale = ['en-GB', localeCoin]:
    (localeCoin === 'JPY')? locale = ['ja-JP', localeCoin]:
    (localeCoin === 'USD')? locale = ['en-US', localeCoin]:
    (localeCoin === 'BRL')? locale = ['pt-BR', localeCoin]: 0;
};

const changeFormatCoin = (value, locale) => {
    const [localeCoin, currency] = locale;
    (value.lenght >=1)? value.toFixed(2): value;

    const formatValue = value.toLocaleString(`${localeCoin}`, {style: 'currency', currency: `${currency}`});
    setValueDisplay(formatValue);
};

const setValueDisplay = (valueCoin) => {
    const currencyOne = getTypeCoin();
    const currencyTwo = getTypeConversion();
    const valueConverted = valueCoin;
    const cambio = `${currencyOne} - ${currencyTwo}`;
    document.querySelector('.conversion-type').innerHTML = cambio;
    document.querySelector('.value-conversion').innerHTML = valueConverted;
};

const conversionCoin = () => {
    const value = document.querySelector('#input-value').value;
    const valueType = getTypeCoin();
    const ConversionType = getTypeConversion();
    getValueConversion(valueType, ConversionType);
    calculateCoin(value, coinOptionOne, coinOptionTwo);
    setLocaleCoin();
    changeFormatCoin(result, locale);
};

const btnEnterConversion = (e) => {
    if(e.keyCode === 13) {
        conversionCoin();
    }
};

requisition();

document.querySelector('#btn-calc').addEventListener('click', conversionCoin);
typeCoin.addEventListener('change', getTypeCoin);
typeConversion.addEventListener('change', getTypeConversion);
document.addEventListener('keypress', btnEnterConversion);
