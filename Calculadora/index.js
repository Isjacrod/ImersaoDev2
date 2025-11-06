const $calculatorImage = document.getElementById('calculadora');
var mainCalculator;

const calculadoras = [
    "{\"url\":\"https://www.tilibra.com.br/storage/products/md/calculadora-de-bolso-8-digitos-grande-tc03-rosa_238937-e1.jpg\",\"name\":\"\",\"width\":636,\"height\":636,\"areas\":{\"0\":{\"symbol\":0,\"coords\":[162,532,212,578]},\"1\":{\"symbol\":1,\"coords\":[161,464,213,512]},\"2\":{\"symbol\":2,\"coords\":[232,462,279,512]},\"3\":{\"symbol\":3,\"coords\":[291,463,340,506]},\"4\":{\"symbol\":4,\"coords\":[165,401,215,445]},\"5\":{\"symbol\":5,\"coords\":[229,398,278,445]},\"6\":{\"symbol\":6,\"coords\":[294,401,344,445]},\"7\":{\"symbol\":7,\"coords\":[168,333,212,378]},\"8\":{\"symbol\":8,\"coords\":[231,336,275,379]},\"9\":{\"symbol\":9,\"coords\":[294,329,340,377]},\"plus\":{\"symbol\":\"+\",\"coords\":[358,467,408,574]},\"times\":{\"symbol\":\"*\",\"coords\":[357,399,404,445]},\"divide\":{\"symbol\":\"/\",\"coords\":[421,399,471,443]},\"minus\":{\"symbol\":\"-\",\"coords\":[420,461,469,513]},\"point\":{\"symbol\":\".\",\"coords\":[231,532,276,575]},\"onoff\":{\"coords\":[165,269,213,312]},\"equal\":{\"coords\":[420,531,469,578]},\"screen\":{\"coords\":[177,133,459,209]}}}",
    "{\"url\":\"https://images-americanas.b2w.io/produtos/4366223938/imagens/calculadora-portatil-miedeon-cute-cat-mini-student-portable-computer-pequenas-calculadoras-calculadoras-para-alunos-calculadoras-desktop-cor-rosa/4366223938_1_xlarge.jpg\",\"name\":\"\",\"width\":639,\"height\":639,\"areas\":{\"0\":{\"symbol\":0,\"coords\":[168,511,222,547]},\"1\":{\"symbol\":1,\"coords\":[170,461,219,494]},\"2\":{\"symbol\":2,\"coords\":[251,461,304,493]},\"3\":{\"symbol\":3,\"coords\":[327,466,383,494]},\"4\":{\"symbol\":4,\"coords\":[171,407,219,434]},\"5\":{\"symbol\":5,\"coords\":[250,408,301,438]},\"6\":{\"symbol\":6,\"coords\":[331,408,381,439]},\"7\":{\"symbol\":7,\"coords\":[171,356,218,386]},\"8\":{\"symbol\":8,\"coords\":[250,353,300,388]},\"9\":{\"symbol\":9,\"coords\":[326,356,374,387]},\"plus\":{\"symbol\":\"+\",\"coords\":[412,515,463,547]},\"times\":{\"symbol\":\"*\",\"coords\":[415,409,459,437]},\"divide\":{\"symbol\":\"/\",\"coords\":[416,357,465,386]},\"minus\":{\"symbol\":\"-\",\"coords\":[415,464,457,495]},\"point\":{\"symbol\":\".\",\"coords\":[248,512,297,545]},\"onoff\":{\"coords\":[180,251,222,286]},\"equal\":{\"coords\":[329,515,379,550]},\"screen\":{\"coords\":[184,141,456,211]}}}",
    "{\"url\":\"https://mbtech.com.br/wordpress/wp-content/uploads/2019/05/MB54316_01.jpg\",\"name\":\"\",\"width\":639,\"height\":639,\"areas\":{\"0\":{\"symbol\":0,\"coords\":[209,510,261,560]},\"1\":{\"symbol\":1,\"coords\":[213,437,259,484]},\"2\":{\"symbol\":2,\"coords\":[290,437,335,484]},\"3\":{\"symbol\":3,\"coords\":[373,440,417,484]},\"4\":{\"symbol\":4,\"coords\":[212,367,260,410]},\"5\":{\"symbol\":5,\"coords\":[291,366,340,410]},\"6\":{\"symbol\":6,\"coords\":[370,363,420,413]},\"7\":{\"symbol\":7,\"coords\":[210,286,263,337]},\"8\":{\"symbol\":8,\"coords\":[289,287,340,334]},\"9\":{\"symbol\":9,\"coords\":[365,289,418,337]},\"plus\":{\"symbol\":\"+\",\"coords\":[448,436,516,558]},\"times\":{\"symbol\":\"*\",\"coords\":[537,422,598,460]},\"divide\":{\"symbol\":\"/\",\"coords\":[540,349,601,394]},\"minus\":{\"symbol\":\"-\",\"coords\":[452,358,513,411]},\"point\":{\"symbol\":\".\",\"coords\":[289,513,338,557]},\"onoff\":{\"coords\":[41,486,101,558]},\"equal\":{\"coords\":[544,483,584,550]},\"screen\":{\"coords\":[166,167,394,219]}}}",
    "{\"url\":\"https://graffite.vteximg.com.br/arquivos/ids/168884-1000-1000/61XltFrUhaL._AC_SL1000_.jpg\",\"name\":\"\",\"width\":431,\"height\":431,\"areas\":{\"0\":{\"symbol\":0,\"coords\":[157,372.5,189,401.5]},\"1\":{\"symbol\":1,\"coords\":[153,331.5,184,358.5]},\"2\":{\"symbol\":2,\"coords\":[205,331.5,234,356.5]},\"3\":{\"symbol\":3,\"coords\":[250,333.5,278,357.5]},\"4\":{\"symbol\":4,\"coords\":[157,289.5,183,317.5]},\"5\":{\"symbol\":5,\"coords\":[202,292.5,233,319.5]},\"6\":{\"symbol\":6,\"coords\":[247,289.5,277,317.5]},\"7\":{\"symbol\":7,\"coords\":[155,247.5,189,275.5]},\"8\":{\"symbol\":8,\"coords\":[204,248.5,230,273.5]},\"9\":{\"symbol\":9,\"coords\":[246,248.5,279,277.5]},\"plus\":{\"symbol\":\"+\",\"coords\":[294,334.5,321,400.5]},\"times\":{\"symbol\":\"*\",\"coords\":[292,248.5,321,277.5]},\"divide\":{\"symbol\":\"/\",\"coords\":[293,209.5,322,235.5]},\"minus\":{\"symbol\":\"-\",\"coords\":[292,291.5,324,318.5]},\"point\":{\"symbol\":\".\",\"coords\":[202,370.5,232,399.5]},\"onoff\":{\"coords\":[112,374.5,142,400.5]},\"equal\":{\"coords\":[246,373.5,278,399.5]},\"screen\":{\"coords\":[113,77.5,319,143.5]}}}",
]

function loadCalculator(index = 0) {
    let tmpCalcObj = JSON.parse(calculadoras[index]);
    $calculatorImage.src = tmpCalcObj.url;
    $calculatorImage.onload = () => {
         mainCalculator = new Calculator(tmpCalcObj); 
         mainCalculator.index = index;
    }
}

function mudarCalculadora() {
    let index = mainCalculator.index;
    index = (index == calculadoras.length -1) ? 0 : ++index;
    loadCalculator(index);
}
class Calculator {
    constructor(calcObj) {
        this.$calcPlace = document.getElementById('_calc_placeholder');
        this.clearButtons();
        this.generateAreas(calcObj.areas, calcObj.width, calcObj.height);
        this.addEventToButtons(calcObj.areas);
        this.screenValue = "";
        this.screen = document.getElementById('btn-screen');
    }
    clearButtons() {
        let elements = this.$calcPlace.querySelectorAll('.buttons');
        if (elements.length != 0)
            elements.forEach((el) => el.remove());
    }
    generateAreas(areas, width, height) {
        let $tmpAreas = "";
        for (let prop in areas) {
            let symbol = areas[prop]["symbol"];
            let coords = areas[prop]["coords"];
            $tmpAreas += this.createButton(prop, symbol, coords, width, height);
        }
        this.$calcPlace.insertAdjacentHTML('afterbegin', $tmpAreas);
    }
    createButton(prop, symbol, coordsValues, width, height) {
        let imageWidth = width, imageHeight = height;
        let initialX = coordsValues[0], initialY = coordsValues[1], endX = coordsValues[2], endY = coordsValues[3];
        // Position and size by percentage
        let leftPosition = (initialX / imageWidth) * 100;
        let topPosition = (initialY / imageHeight) * 100;
        let buttonWidth = ((endX - initialX) / imageWidth) * 100;
        let buttonHeight = ((endY - initialY) / imageHeight) * 100;
        // Set button props
        let buttonStyle = `left: ${leftPosition}%; top: ${topPosition}%; width: ${buttonWidth}%; height: ${buttonHeight}%;`
        return `<div class="buttons" id="btn-${prop}" data-symbol="${symbol}" style='${buttonStyle}'></div>`
    }
    addEventToButtons(buttonArea) {
        delete buttonArea.equal;
        document.getElementById(`btn-equal`).addEventListener('click', this.result.bind(this));
        delete buttonArea.onoff;
        document.getElementById(`btn-onoff`).addEventListener('click', this.turnOnOff.bind(this));
        delete buttonArea.screen;
        document.getElementById(`btn-screen`).addEventListener('click', this.turnOnOff.bind(this));

        for (let prop in buttonArea) {
            document.getElementById(`btn-${prop}`).addEventListener('click', ev => this.compute(ev));
        }
    }
    compute(event) {
        let buttonPressed = event.target.dataset.symbol;
        this.screenValue += buttonPressed;
        this.display(this.screenValue);
    }
    turnOnOff() {
        this.screenValue = "";
        this.display("");
    }
    display(value) {
        this.screen.innerText = value;
    }
    result() {
        try {
            this.display(eval(this.screenValue));
        } catch {
            this.display("Error");
        }
        this.screenValue = "";
    }
}

loadCalculator(0);
// Developer Mode, Comment the line above
// Asks for buttons location and save in buttonsObj
var coords = [];
function developerMode() {
    window.calculatorTemplate = {
        url: $calculatorImage.src,
        name: '',
        width: $calculatorImage.width,
        height: $calculatorImage.height,
        areas: gimmeButtons(),
    };
    calculatorTemplate.areas.screen = { coords: '' };
    window.gerador = waitForClicks();
    $calculatorImage.addEventListener('click', getButtonsPosition);
    gerador.next();
}

function* waitForClicks() {
    for (prop in calculatorTemplate.areas) {
        console.log('selecione os cantos do botão', prop)
        yield prop;
        calculatorTemplate.areas[prop]['coords'] = coords;
        coords = [];
    }
    console.log('propriedades salvas em calculatorTemplate use JSON.stringfy', calculatorTemplate);
}

function gimmeButtons() {
    let tmpObj = {};
    tmpObj.plus = { symbol: '+', coords: '' };
    tmpObj.times = { symbol: '*', coords: '' };
    tmpObj.divide = { symbol: '/', coords: '' };
    tmpObj.minus = { symbol: '-', coords: '' };
    tmpObj.point = { symbol: '.', coords: '' };
    tmpObj.onoff = { coords: '' };
    tmpObj.equal = { coords: '' };
    for (let i = 0; i < 10; i++) {
        tmpObj[i] = { symbol: i, coords: '' };
    }
    return tmpObj;
}

function getButtonsPosition(event) {
    let x = event.clientX - $calculatorImage.getClientRects()[0].x;
    let y = event.clientY - $calculatorImage.getClientRects()[0].y;

    coords.push(x);
    coords.push(y);

    console.log('posicoes', coords);
    if (coords.length == 4)
        gerador.next();
}
