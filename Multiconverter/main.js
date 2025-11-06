const precoDolar = 5.08;
const precoBitcoin = 200000;

function dolarToReal(value) {
    if (revert) {
      return (value / precoDolar).toFixed(2);
    } else {
      return (value * precoDolar).toFixed(2);
    }
  }
  
  function bitcoinToReal(value) {
    if (revert) {
      return value / (precoBitcoin / 100000000);
    } else {
      return (value * (precoBitcoin / 100000000)).toFixed(2);
    }
  }
  
  function fahrenheitToCelsius(value) {
    if (revert) {
      return (value * 1.8 + 32).toFixed(1);
    } else {
      return ((value - 32) / 1.8).toFixed(1);
    }
  }
  
  function kilometersToLightYears(value) {
    if (revert) {
      return value * 9460800000000;
    } else {
      return value / 9460800000000;
    }
  }
  
  // Global variable for type of conversion and direction
  var convFunction = dolarToReal;
  var revert = false;
  
  // Available functions To convert
  convFunctions = {
    dolar_real: dolarToReal,
    f_c: fahrenheitToCelsius,
    km_ly: kilometersToLightYears,
    btc_real: bitcoinToReal
  };
  
  // Text options
  convOptions = {
    dolar_real: ["Dólar", "Real"],
    f_c: ["Fahrenheit", "Celsius"],
    km_ly: ["Kilometros", "Anos Luz"],
    btc_real: ["Satoshi", "Real"]
  };
  
  // Event listener for the first input
  var inputA = document.getElementById("unidade_a");
  inputA.addEventListener("input", convert);
  inputA.addEventListener("mouseover", setDirection);
  // Event listener for the second input
  var inputB = document.getElementById("unidade_b");
  inputB.addEventListener("input", convert);
  inputB.addEventListener("mouseover", setDirection);
  // Event listener for buttons
  document
    .querySelector(".separate-area.-converteroptions")
    .addEventListener("click", changeConvFunction);
  
  // Set the revert global variable
  function setDirection(ev) {
    if (ev.currentTarget.id == "unidade_a") {
      revert = false;
    } else if (ev.currentTarget.id == "unidade_b") {
      revert = true;
    }
  }
  
  // Change the convFunction global variable and call updateUnits
  function changeConvFunction(ev) {
    if (ev.target.classList.contains("hidden-button")) {
      convFunction = convFunctions[ev.target.id];
      updateUnits(ev.target.id);
    }
  }
  
  // Update text under input and clean the dirt
  function updateUnits(choose) {
    document.querySelector(".-unidadeA > .input-label").textContent =
      convOptions[choose][0];
    document.querySelector(".-unidadeB > .input-label").textContent =
      convOptions[choose][1];
    inputA.value = "";
    inputB.value = "";
    inputA.style.width = "auto";
    inputB.style.width = "auto";
  }
  
  // Call the convert function and print the result
  function convert(ev) {
    let inputValue = ev.currentTarget.value;
    resizeIt(ev.currentTarget, inputValue);
    let result = convFunction(inputValue);
    printResult(result, ev.currentTarget);
  }
  
  function printResult(result, target) {
    if (target.id == "unidade_a") {
      inputB.value = result;
      resizeIt(inputB, result);
    } else if (target.id == "unidade_b") {
      inputA.value = result;
      resizeIt(inputA, result);
    }
  }
  
  // Resize input dinamically
  function resizeIt(target, text) {
    let textSize = text.toString().length;
    if (textSize > 19) {
      target.style.width = textSize + 2 + "ch";
    }
  }

  // Set Vh to real vh
  function setVH() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  window.addEventListener('load', setVH);
  window.addEventListener('resize', setVH);