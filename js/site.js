$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);

        // Instrumentação para métricas Prometheus
        sendMetricsToPrometheus('scroll_to_section');

        return false;
      }
    }
  });

  function sendMetricsToPrometheus(metricName) {
    // Substitua a URL abaixo pela URL do seu servidor Prometheus
    var prometheusURL = 'http://129.213.202.101:9091/metrics';

    // Crie um objeto com as métricas desejadas
    var metrics = {
      metric: metricName,
      value: 1 // Pode ser ajustado conforme necessário
    };

    // Envie a requisição para o servidor Prometheus
    $.ajax({
      type: 'POST',
      url: prometheusURL,
      data: metrics,
      success: function(response) {
        console.log('Métrica enviada com sucesso:', response);
      },
      error: function(error) {
        console.error('Erro ao enviar métrica:', error);
      }
    });
  }
});
