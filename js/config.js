class Config {

    constructor() {
        this.descontoIdade = 1903.98;
        this.valorDescontoSimplificado = 564.80;
        this.valorPorDependente = 189.59
        this.faixas = [2259.20, 2826.65, 3751.05, 4664.68, 999999999];
        this.aliquotas = [0, 7.5, 15, 22.5, 27.5];
        this.faixasRegressiva = [10, 8, 6, 4, 2, 0];
        this.aliquotasRegressivas = [10, 15, 20, 25, 30, 35];
        this.hoje = new Date();
    }

    calcularIrProgressiva(baseCalculo) {
        var limiteInferiror = 0;
        var valorIr = 0;

        for (let index = 0; index < this.faixas.length; index++) {
            const faixa = this.faixas[index];
            const aliquota = this.aliquotas[index];

            if (baseCalculo > faixa) {
                valorIr = valorIr + (faixa - limiteInferiror) / 100 * aliquota;
            } else {
                valorIr = valorIr + (baseCalculo - limiteInferiror) / 100 * aliquota;
                return valorIr;
            }
            limiteInferiror = faixa;
        }
    }

    montarBaseCalculo(rendaMensal, descontoIdade, quantidadeDependentes) {

        if (descontoIdade.checked || descontoIdade == true) {
            var valorDescontoIdade = this.descontoIdade;
        } else {
            var valorDescontoIdade = 0;
        }

        if (quantidadeDependentes > 0) {
            var valorDescontoDepentes = quantidadeDependentes * this.valorPorDependente;
        } else {
            var valorDescontoDepentes = 0;
        }

        var baseCalculoPadrao = rendaMensal - (valorDescontoIdade + valorDescontoDepentes);
        var baseCalculoSimplificado = rendaMensal - this.valorDescontoSimplificado;

        if (baseCalculoPadrao < 0) {
            baseCalculoPadrao = 0;
        }

        if (baseCalculoSimplificado < 0) {
            baseCalculoSimplificado = 0;
        }

        var retorno = new Object();
        retorno.basePadrao = baseCalculoPadrao;
        retorno.baseSimplificado = baseCalculoSimplificado;
        retorno.valorDescontoIdade = valorDescontoIdade;
        retorno.valorDescontoDepentes = valorDescontoDepentes;

        return retorno;
    }

    calcularIdadeParcela(dataContrib, hoje) {
        var diferencaAnos = hoje.getFullYear() - dataContrib.getFullYear();
        if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
            new Date(hoje.getFullYear(), dataContrib.getMonth(), dataContrib.getDate()))
            diferencaAnos--;
        return diferencaAnos;
    }

    calcularIrRegressivo(arrayContrib, rendaMensal) {

        for (let i = 0; i < arrayContrib.length; i++) {
            var contribAtual = arrayContrib[i];
            var idadeParcela = this.calcularIdadeParcela(contribAtual.data, this.hoje);

            contribAtual.valor = parseFloat(contribAtual.valor);
            rendaMensal = parseFloat(rendaMensal);

            for (let index = 0; index < this.faixasRegressiva.length; index++) {
                var faixa = this.faixasRegressiva[index];

                if (idadeParcela > faixa || faixa == 0) {
                    if (rendaMensal > contribAtual.valor) {
                        var valorIrRegressiva = (contribAtual.valor / 100) * this.aliquotasRegressivas[index];
                        rendaMensal = rendaMensal - contribAtual.valor;
                        contribAtual.consumo = contribAtual.valor;
                    } else {
                        var valorIrRegressiva = (rendaMensal / 100) * this.aliquotasRegressivas[index];
                        contribAtual.consumo = rendaMensal;
                        rendaMensal = 0;
                    }

                    contribAtual.idade = idadeParcela;
                    contribAtual.ir = valorIrRegressiva;
                    contribAtual.aliquota = this.aliquotasRegressivas[index];
                    break;
                }
            }

            if (rendaMensal == 0) {
                break;
            }
        }

        return arrayContrib;
    }
}

