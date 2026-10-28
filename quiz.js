
const perguntas = [
  {
    pergunta: "Qual atividade mais desperta seu interesse?",
    respostas: [
      { texto: "Criar sites e aplicativos", curso: "fullstack" },
      { texto: "Criar interfaces bonitas e fáceis de usar", curso: "design" },
      { texto: "Organizar equipes e projetos", curso: "gestao" }
    ]
  },
  {
    pergunta: "Em qual dessas tarefas você gostaria de trabalhar?",
    respostas: [
      { texto: "Programar funcionalidades de um sistema", curso: "fullstack" },
      { texto: "Desenhar e prototipar telas", curso: "design" },
      { texto: "Planejar atividades e acompanhar entregas", curso: "gestao" }
    ]
  },
  {
    pergunta: "Qual habilidade você mais gostaria de desenvolver?",
    respostas: [
      { texto: "Raciocínio lógico e programação", curso: "fullstack" },
      { texto: "Criatividade e experiência do usuário", curso: "design" },
      { texto: "Liderança e organização", curso: "gestao" }
    ]
  },
  {
    pergunta: "Que tipo de desafio parece mais interessante?",
    respostas: [
      { texto: "Resolver problemas técnicos com código", curso: "fullstack" },
      { texto: "Melhorar a experiência de quem usa um produto", curso: "design" },
      { texto: "Coordenar pessoas para atingir objetivos", curso: "gestao" }
    ]
  },
  {
    pergunta: "Qual resultado você gostaria de alcançar?",
    respostas: [
      { texto: "Desenvolver uma aplicação completa", curso: "fullstack" },
      { texto: "Criar o protótipo de um produto digital", curso: "design" },
      { texto: "Conduzir um projeto do início ao fim", curso: "gestao" }
    ]
  }
];

const cursos = {
  fullstack: {
    nome: "Desenvolvimento Web Full-Stack",
    descricao:
      "Você demonstrou interesse em programação, tecnologia e criação de aplicações. O curso de Desenvolvimento Web Full-Stack pode combinar com seus objetivos!"
  },
  design: {
    nome: "UI/UX Design & Product Design",
    descricao:
      "Suas respostas indicam interesse em criatividade, interfaces e experiência do usuário. O curso de UI/UX Design & Product Design pode ser uma ótima escolha!"
  },
  gestao: {
    nome: "Gestão de Projetos & Processos Ágeis",
    descricao:
      "Você demonstrou interesse em liderança, planejamento e organização. O curso de Gestão de Projetos & Processos Ágeis pode combinar com seu perfil!"
  }
};

const intro = document.getElementById("quiz-intro");
const areaPerguntas = document.getElementById("quiz-questions");
const areaResultado = document.getElementById("quiz-result");

const botaoIniciar = document.getElementById("start-btn");
const botaoProximo = document.getElementById("next-btn");
const botaoReiniciar = document.getElementById("restart-btn");

const progresso = document.getElementById("quiz-progress");
const tituloPergunta = document.getElementById("question-title");
const opcoes = document.getElementById("answer-options");

let perguntaAtual = 0;
let respostaSelecionada = null;
let pontuacao = {
  fullstack: 0,
  design: 0,
  gestao: 0
};

function iniciarQuiz() {
  perguntaAtual = 0;
  respostaSelecionada = null;

  pontuacao = {
    fullstack: 0,
    design: 0,
    gestao: 0
  };

  intro.hidden = true;
  areaResultado.hidden = true;
  areaPerguntas.hidden = false;

  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];

  respostaSelecionada = null;
  botaoProximo.disabled = true;

  progresso.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  tituloPergunta.textContent = pergunta.pergunta;

  opcoes.innerHTML = "";

  pergunta.respostas.forEach((resposta) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "answer-option";
    botao.textContent = resposta.texto;
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", () => {
      respostaSelecionada = resposta.curso;

      document.querySelectorAll(".answer-option").forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });

      botao.classList.add("selected");
      botao.setAttribute("aria-pressed", "true");

      botaoProximo.disabled = false;
    });

    opcoes.appendChild(botao);
  });

  botaoProximo.textContent =
    perguntaAtual === perguntas.length - 1
      ? "Ver meu resultado"
      : "Próxima pergunta";
}

function proximaPergunta() {
  if (respostaSelecionada === null) {
    return;
  }

  pontuacao[respostaSelecionada] += 1;
  perguntaAtual += 1;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  areaPerguntas.hidden = true;
  areaResultado.hidden = false;

  const cursoRecomendado = Object.keys(pontuacao).reduce(
    (melhor, atual) =>
      pontuacao[atual] > pontuacao[melhor] ? atual : melhor
  );

  document.getElementById("recommended-course").textContent =
    cursos[cursoRecomendado].nome;

  document.getElementById("recommendation-description").textContent =
    cursos[cursoRecomendado].descricao;
}

botaoIniciar.addEventListener("click", iniciarQuiz);
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", iniciarQuiz);
