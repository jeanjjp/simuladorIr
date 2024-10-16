// Evento que é executado ao clicar no botão de enviar
document.getElementById("cadastrarContrib").onclick = function (e) {

    var valorContrib = document.getElementById("valorContrib").value;
    var dataContrib = document.getElementById("dataContrib").value;

    if (valorContrib < 0 || valorContrib == "" || dataContrib == undefined || dataContrib == "") {

        alert("Digite o Valor e a data da contribuição.")

    } else {
        var tableRef = document.getElementById('tabelaContrib').getElementsByTagName('tbody')[0];
        var newRow = tableRef.insertRow(tableRef.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.setAttribute("class", "data")
        cell2.setAttribute("class", "valor")

        var novaData = document.createTextNode(dataContrib);
        var novoValor = document.createTextNode(valorContrib);
        var textoExcluir = document.createElement("a");

        textoExcluir.appendChild(document.createTextNode("Excluir"))
        textoExcluir.href = "#"
        textoExcluir.setAttribute('onclick', "deletarContrib(this)")

        cell1.appendChild(novaData);
        cell2.appendChild(novoValor);
        cell3.appendChild(textoExcluir);
    }


}

function deletarContrib(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById("tabelaContrib").deleteRow(i);
}


function escreverResultado(arrayContrib) {

    var tableRef = document.getElementById('tabelaResultRegressiva');
    var totalIrResult = document.getElementById('totalIrRegressiva');
    
    var totalIr = 0;

    while (tableRef.rows.length > 1) {
        tableRef.deleteRow(1);
    }

    for (let index = 0; index < arrayContrib.length; index++) {
        var contribAtual = arrayContrib[index];

        if (contribAtual.ir > 0) {
            totalIr = totalIr + contribAtual.ir;
            contribAtual.ir = contribAtual.ir.toFixed(2);
            contribAtual.consumo = parseFloat(contribAtual.consumo).toFixed(2);
    
            tableRef.getElementsByTagName('tbody')[0];
            var newRow = tableRef.insertRow(tableRef.rows.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);

            var dataResult = document.createTextNode(contribAtual.data.toLocaleDateString());
            var idadeResult = document.createTextNode(contribAtual.idade);
            var irResult = document.createTextNode(contribAtual.ir);
            var consumoResult = document.createTextNode(contribAtual.consumo);

            cell1.appendChild(dataResult);
            cell2.appendChild(idadeResult);
            cell3.appendChild(irResult);
            cell4.appendChild(consumoResult);
        }
    }
    totalIrResult.textContent = totalIr.toFixed(2);
}