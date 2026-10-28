document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('form-contato');
  if (!form) return;
  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    window.location.href = 'contatoenviado.html';
  });
});
