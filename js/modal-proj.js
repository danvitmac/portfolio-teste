function abrirModal(projeto) {
  // Define conteúdo do modal com base no projeto
  let modalInfo = document.getElementById('modal-info');
  
  if (projeto === 'refeitorio') {
    modalInfo.innerHTML = `
      <h2 class="modal-title">Refeitório</h2>
      <img src="./images/refeitorio-banner.png" alt="Projeto Refeitório" class="modal-banner">
      
      <div class="modal-description">
        <p>O Projeto Refeitório é uma iniciativa educativa desenvolvida pelo meu grupo do SENAI para a rede SESI de Ferraz. Criado com o objetivo de auxiliar a nutricionista e os alunos, o projeto busca otimizar a organização e o acompanhamento nutricional no refeitório.</p>
      </div>
      
      <div class="modal-gallery">
        <div class="gallery-item">
          <img src="./images/refeitorio-equipe.png" alt="Tela inicial">
        </div>
        <div class="gallery-item">
          <img src="./images/refeitorio-logo.png" alt="Logo Refeitório">
        </div>
      </div>
    
      <div class="modal-actions">
        <a href="https://github.com/joaopbg06/semestral" class="modal-btn btn-repo" target="_blank">
          <i class="fas fa-code-branch"></i> Repositório
        </a>
      </div>
    `;
  } else if (projeto === 'orcamento') {
    modalInfo.innerHTML = `
      <h2 class="modal-title">Orçamento Amigo</h2>
      <img src="./images/Orcamento-banner.png" alt="Projeto Orçamento Amigo" class="modal-banner">
      
      <div class="modal-description">
        <p>Conheça os desenvolvedores do Orçamento Amigo e veja como baixar e utilizar o app de forma simples e eficiente!</p>
      </div>
      
      <div class="modal-gallery">
        <div class="gallery-item">
          <img src="./images/felipeluz.png" alt="Dashboard">
        </div>
        <div class="gallery-item">
          <img src="./images/gustavolenni.png" alt="Logo Orçamento">
        </div>
      </div>
      
      <video class="modal-video" controls>
        <source src="./videos/Orcamento-amigo.mp4" type="video/mp4">
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      <div class="modal-actions">
        <a href="https://www.mediafire.com/file/ekzt02njqh4820v/orcamento-app.apk/file" class="modal-btn btn-repo" target="_blank">
          <i class="fas fa-download"></i> Baixar
        </a>
      </div>
    `;
  }
  
  // Exibe o modal
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  
  // Previne scrolling na página de fundo
  document.body.style.overflow = 'hidden';
  
  // Fecha o modal ao clicar fora do conteúdo
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      fecharModal();
    }
  });
  
  // Adiciona opção de fechar com tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      fecharModal();
    }
  });
}

function fecharModal() {
  // Fecha o modal com animação
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');
  
  modalContent.style.animation = 'modal-disappear 0.2s forwards';
  
  setTimeout(() => {
    // Fecha o modal
    modal.style.display = 'none';
    modalContent.style.animation = 'modal-appear 0.3s ease-out';
    
    // Restaura scrolling na página
    document.body.style.overflow = '';
  }, 200);
  
  // Remove event listeners
  document.removeEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      fecharModal();
    }
  });
}

// Adiciona animação de desaparecimento
const styleSheet = document.styleSheet || document.createElement('style');
styleSheet.innerHTML = `
  @keyframes modal-disappear {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(styleSheet);

// Verifica se o modal deve ser aberto com base na URL
window.addEventListener('load', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const projeto = urlParams.get('projeto');
  
  if (projeto) {
    abrirModal(projeto);
  }
});