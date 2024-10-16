$(document).ready(function () {

  $('#modalProgressiva').modal();
  $('#modalRegressiva').modal();
  $('.collapsible').collapsible();

  $('.datepicker').datepicker({
    format: 'dd-mm-yyyy',
    i18n: {
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
      weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      today: 'Hoje',
      clear: 'Limpar',
      close: 'Pronto',
      labelMonthNext: 'Próximo mês',
      labelMonthPrev: 'Mês anterior',
      labelMonthSelect: 'Selecione um mês',
      labelYearSelect: 'Selecione um ano',
      selectMonths: true,
      selectYears: 15,
      cancel: 'Cancelar',
      clear: 'Limpar'
    }
  });
});