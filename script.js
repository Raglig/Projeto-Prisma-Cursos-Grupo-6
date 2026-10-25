// Prisma Cursos - Interatividades globais

// Página de confirmação: mostra os dados enviados no formulário de contatos.
// O formulário (contatos.html) envia nome, email e mensagem pela URL.
document.addEventListener('DOMContentLoaded', function () {
  var nome = document.getElementById('dado-nome');
  if (!nome) return;

  var dados = new URLSearchParams(window.location.search);
  nome.textContent = dados.get('nome') || '';
  document.getElementById('dado-email').textContent = dados.get('email') || '';
  document.getElementById('dado-mensagem').textContent = dados.get('mensagem') || '';
});
