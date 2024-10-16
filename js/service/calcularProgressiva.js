
// CHAMAR NA URL = /calcularProgressiva.html?rendaMensal=10000&qtDependentes=0&descontoIdade=0

const urlParams = new URLSearchParams(window.location.search);
const rendaMensal = urlParams.get("rendaMensal")
const quantidadeDependentes = urlParams.get("qtDependentes")
const checkDescontoIdade = urlParams.get("descontoIdade")

var resultBody = document.body;
var config = new Config();

var result = config.montarBaseCalculo(rendaMensal, checkDescontoIdade, quantidadeDependentes);
var valorIrPadrao = config.calcularIrProgressiva(result.basePadrao);
var valorIrSimplificado = config.calcularIrProgressiva(result.baseSimplificado);

var objPadrao = new Object();
objPadrao.rendaMensal = rendaMensal;
objPadrao.quantidadeDependentes = quantidadeDependentes;
objPadrao.valorDescontoIdade = result.valorDescontoIdade;
objPadrao.valorDescontoDepentes = result.valorDescontoDepentes;
objPadrao.baseCalculoPadrao = result.basePadrao;
objPadrao.valorIrPadrao = valorIrPadrao;

var objSimplificado = new Object();
objSimplificado.rendaMensal = rendaMensal;
objSimplificado.valorDescontoSimplificado = config.valorDescontoSimplificado;
objSimplificado.baseCalculoSimplificado = result.baseSimplificado;
objSimplificado.valorIrSimplificado = valorIrSimplificado;

var objResult = new Object();
objResult.retornoPadrao = objPadrao;
objResult.retornoSimplificado = objSimplificado;

var jsonString = JSON.stringify(objResult);

resultBody.innerText = jsonString;
