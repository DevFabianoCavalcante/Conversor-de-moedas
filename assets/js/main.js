document.querySelector('#input-value').focus();

const typeCoin = document.querySelector('#options-coins');
const typeConversion = document.querySelector('#options-coins-conversion');

let resultRequisition;
let coinOptionOne;
let coinOptionTwo; 
let result;
let locale;

const requisition = () => {
    fetch('https://api.hgbrasil.com/finance/quotations?format=json-cors&key=6dd8e3ca')
    .then(response => response.json())
    .then(json => resultRequisition = json.results.currencies)
    .catch(error => {
        console.log(error);
    })
};

const maskInput = () => {
    let input = document.querySelector('#input-value');
    let valueInput = input.value;

    valueInput = valueInput.replace(/\D/g, '');
    valueInput = valueInput.replace(/([\d]{2})$/g, ',$1');

    if(valueInput.length > 6) {
        valueInput = valueInput.replace(/(\d{3}),(\d{2}$)/g, ".$1,$2");
    };

    if(valueInput.length > 10) {
        valueInput = valueInput.replace(/(\d{3}(?=\.))/g, ".$1");
    };

    input.value = valueInput;
};

const getTypeCoin = () => typeCoin.value;
const getTypeConversion = () => typeConversion.value;

const getValueConversion = (typeValue, typeConversion) => {

    (typeValue == 'ARS')? coinOptionOne = resultRequisition.ARS.buy:
    (typeValue == 'AUD')? coinOptionOne = resultRequisition.AUD.buy:
    (typeValue == 'CAD')? coinOptionOne = resultRequisition.CAD.buy:
    (typeValue == 'CNY')? coinOptionOne = resultRequisition.CNY.buy:
    (typeValue == 'EUR')? coinOptionOne = resultRequisition.EUR.buy:
    (typeValue == 'GBP')? coinOptionOne = resultRequisition.GBP.buy:
    (typeValue == 'JPY')? coinOptionOne = resultRequisition.JPY.buy:
    (typeValue == 'USD')? coinOptionOne = resultRequisition.USD.buy:
    (typeValue == 'BRL')? coinOptionOne = 'BRL' : 'BRL';

    (typeConversion == 'ARS')? coinOptionTwo = resultRequisition.ARS.buy:
    (typeConversion == 'AUD')? coinOptionTwo = resultRequisition.AUD.buy:
    (typeConversion == 'CAD')? coinOptionTwo = resultRequisition.CAD.buy:
    (typeConversion == 'CNY')? coinOptionTwo = resultRequisition.CNY.buy:
    (typeConversion == 'EUR')? coinOptionTwo = resultRequisition.EUR.buy:
    (typeConversion == 'GBP')? coinOptionTwo = resultRequisition.GBP.buy:
    (typeConversion == 'JPY')? coinOptionTwo = resultRequisition.JPY.buy:
    (typeConversion == 'USD')? coinOptionTwo = resultRequisition.USD.buy:
    (typeConversion == 'BRL')? coinOptionTwo = 'BRL' : 'BRL';
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
        };
    } else if(value === '' || isNaN(value)) {
        result = 'Insira um valor válido';
    };

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

const changeFormatCoinResult = (value, locale) => {
    const [localeCoin, currency] = locale;

    const formatValue = value.toLocaleString(`${localeCoin}`, {style: 'currency', currency: `${currency}`});
    setValueDisplay(formatValue);
};

const setValueDisplay = (valueCoin) => {
    const valueConverted = valueCoin;
    document.querySelector('.value-conversion').innerHTML = valueConverted;
};

const modifyTypeInputValue = (value) => {
    value = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    value = (isNaN(value))? value = '': value;
    return value;
};

const conversionCoin = () => {
    const getInputAreaValue = document.querySelector('#input-value').value;
    let value = modifyTypeInputValue(getInputAreaValue);
    const valueType = getTypeCoin();
    const ConversionType = getTypeConversion();
    getValueConversion(valueType, ConversionType);
    calculateCoin(value, coinOptionOne, coinOptionTwo);
    setLocaleCoin();
    changeFormatCoinResult(result, locale);
};

const btnEnterConversion = (e) => {
    if(e.keyCode === 13) {
        conversionCoin();
    };
};

requisition();

document.querySelector('#btn-calc').addEventListener('click', conversionCoin);
typeCoin.addEventListener('change', getTypeCoin);
typeConversion.addEventListener('change', getTypeConversion);
document.addEventListener('keyup', btnEnterConversion);
document.querySelector('#input-value').addEventListener('keyup', maskInput);
