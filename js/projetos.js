// JavaScript para o carrossel de projetos

document.addEventListener('DOMContentLoaded', function() {
  // Dados dos projetos
  const projects = [
    {
      title: "Refeitório",
      banner: "./images/refeitorio-banner.png",
      logo: "./images/refeitorio-logo.png",
      team: "Grupo Senai",
      description: "O projeto Refeitório ajuda a melhorar a interação dos estudantes com a nutricionista. Aqui você pode acessar várias funcionalidades do sistema, como consulta ao cardápio e envio de mensagens.",
      projectUrl: "",
      repoUrl: ""
    },
    {
      title: "Michael Instrumentos",
      banner: "./images/michael-banner.png",
      logo: "./images/michael-logo.png",
      team: "Grupo Senai",
      description: "Michael Instrumentos é um sistema para gerenciar instrumentos musicais, proporcionando controle de inventário e vendas.",
      projectUrl: "https://gustavolenni.github.io/Michael-Instrumentos-HTML/",
      repoUrl: "https://github.com/GustavoLenni/Michael-Instrumentos-HTML"
    },
    {
      title: "Orçamento Amigo",
      banner: "./images/Orcamento-banner.png",
      logo: "./images/Orcamento-logo.png",
      team: "Gustavo Lenni e Felipe Luz",
      description: "Orçamento Amigo é um sistema para gerenciar suas compras com maior facilidade, oferecendo controle financeiro e organização de gastos.",
      projectUrl: "https://expo.dev/accounts/guhxs/projects/OrcamentoAmigo/builds/6fd7e8bd-ef01-42e8-a5d7-2411cec024f3 ",
      repoUrl: "https://github.com/GustavoLenni/Orcamento"
    },
    {
      title: "Fit Flow",
      banner: "./images/Flow-banner.png",
      logo: "./images/Flow-logo.png",
      team: "Gustavo Lenni",
      description: "Fit Flow é um projeto educativo inspirado no universo fitness de Xandão. Criado para fins de aprendizado, simula uma plataforma de academia com treinos, planos nutricionais e interação comunitária, sem representar uma empresa real do influenciador.",
      projectUrl: "",
      repoUrl: ""
    }
  ];

  // Elementos do carrossel
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!track || !prevButton || !nextButton || !indicatorsContainer) {
    console.error("Erro: Um ou mais elementos do carrossel não foram encontrados.");
    return;
  }

  let currentIndex = 0;
  let startX;
  let currentTranslate = 0;
  let isDragging = false;

  // Inicializar indicadores
  function setupIndicators() {
    projects.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');

      indicator.addEventListener('click', () => {
        goToSlide(index);
      });

      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;

    currentIndex = index;
    currentTranslate = -currentIndex * 100;
    track.style.transform = `translateX(${currentTranslate}%)`;
    updateIndicators();
  }

  prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = (startX - currentX) / track.clientWidth * 100;
    track.style.transform = `translateX(${currentTranslate - diff}%)`;
  });

  track.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      goToSlide(currentIndex + (diff > 0 ? 1 : -1));
    } else {
      goToSlide(currentIndex);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  setupIndicators();
});
