// Evento que é executado ao clicar no botão de enviar
document.getElementById("calcularProgressiva").onclick = function (e) {

    var rendaMensal = document.getElementById("rendaMensal").value;
    var quantidadeDependentes = document.getElementById("quantidadeDependentes").value;
    var checkDescontoIdade = document.getElementById("descontoIdade");
    var resumoValorBruto = document.getElementById("valorBruto");
    var resumoValorBrutoSimplificado = document.getElementById("valorBrutoSimplificado");
    var resumoValorTotalDependentes = document.getElementById("valorTotalDependentes");
    var resumoDescontoIdade = document.getElementById("valorDescontoIdade");
    var resumoDescontoSimplificado = document.getElementById("valorDescontoSimplificado");
    var resumoBaseCalculoPadrao = document.getElementById("valorBaseCalculoPadrao");
    var resumoBaseCalculoSimplificado = document.getElementById("valorBaseCalculoSimplificado");
    var resumoValorIrPadrao = document.getElementById("valorIrPadrao");
    var resumoValorIrSimplificado = document.getElementById("valorIrSimplificado");

    var config = new Config();

    var result = config.montarBaseCalculo(rendaMensal, checkDescontoIdade, quantidadeDependentes);
    var valorIrPadrao = config.calcularIrProgressiva(result.basePadrao);
    var valorIrSimplificado = config.calcularIrProgressiva(result.baseSimplificado);

    resumoValorBruto.textContent = rendaMensal;
    resumoValorBrutoSimplificado.textContent = rendaMensal;
    resumoValorTotalDependentes.textContent = result.valorDescontoDepentes;
    resumoDescontoIdade.textContent = result.valorDescontoIdade;
    resumoDescontoSimplificado.textContent = config.valorDescontoSimplificado;
    resumoBaseCalculoPadrao.textContent = result.basePadrao.toFixed(2);
    resumoBaseCalculoSimplificado.textContent = result.baseSimplificado.toFixed(2);
    resumoValorIrPadrao.textContent = valorIrPadrao.toFixed(2);
    resumoValorIrSimplificado.textContent = valorIrSimplificado.toFixed(2);
}

document.getElementById("calcularRegressiva").onclick = function (e) {

    var valores = document.getElementById('tabelaContrib').getElementsByClassName("valor");
    var datas = document.getElementById('tabelaContrib').getElementsByClassName("data");
    var rendaMensalRegressiva = document.getElementById("rendaMensalRegressiva").value;
    var valorTotal = 0;
    var arrayContrib = [];
    var objContrib = new Object();
    var config = new Config();

    for (i = 0; i < valores.length; i++) {
        objContrib = new Object();
        objContrib.valor = valores[i].innerHTML;
        var data = datas[i].innerHTML;
        var parts = data.split('-');
        var dataFormatada = new Date(parts[2], parts[1] - 1, parts[0]);
        objContrib.data = dataFormatada;

        arrayContrib.push(objContrib);

        valorTotal += parseFloat(valores[i].innerHTML);
    }

    if (valorTotal < rendaMensalRegressiva) {
        alert("O valor total de contribuições deve ser no mínimo igual ao valor da renda mensal");
    } else {

        arrayContrib.sort((a, b) => a.data - b.data);

        arrayContrib = config.calcularIrRegressivo(arrayContrib, rendaMensalRegressiva);
        escreverResultado(arrayContrib);

        console.log(arrayContrib);
    }





}