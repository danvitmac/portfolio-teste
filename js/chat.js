document.addEventListener('DOMContentLoaded', function() {
  const openChatBtns = document.querySelectorAll('#openChatDesktop, #openChatMobile'); // Seleciona ambos os botões
  const closeModalBtn = document.getElementById('closeChat');
  const chatModal = document.getElementById('chatModal');
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendMessage');
  const typingIndicator = document.getElementById('typingIndicator');
  
// Função para adicionar animação de fade
function showMessageWithFade(message, delay = 1000) {
const element = document.createElement('div');
element.classList.add('fade-in');  // Adiciona a classe de animação
element.innerHTML = message;
document.body.appendChild(element); // Adiciona o elemento ao corpo ou container específico

setTimeout(() => {
  element.classList.add('show'); // Ativa a animação após o atraso
}, 50); // Um pequeno atraso antes de começar a animação
}

// Mensagens pré-definidas do bot
const botMessages = {
greeting: function() {
  const hora = new Date().getHours();
  let saudacao = "Olá";
  
  if (hora >= 5 && hora < 12) {
    saudacao = "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }
  
  return `${saudacao}! Me chamo Daniel Machado, sou desenvolvedor Full Stack. Como posso te ajudar hoje?`;
},

intro: `Sempre fui fascinado por tecnologia, e na programação encontrei meu verdadeiro propósito. Transformar ideias em soluções inovadoras me motiva a evoluir constantemente.`,

skills: `Sou desenvolvedor Full Stack com experiência em HTML, CSS, JavaScript, Python e Node.js. Utilizo Git e GitHub para versionamento e estou sempre aprimorando minhas habilidades para entregar soluções eficientes.`,

experience: `Estou em busca da minha primeira oportunidade profissional para crescer na área e contribuir com projetos inovadores. Participei do desenvolvimento de um projeto para o SESI em parceria com minha equipe do SENAI, uma solução com potencial para implementação em todas as unidades do país.`,

contribution: `Posso agregar valor ao seu projeto por meio de:
• Desenvolvimento de interfaces modernas e responsivas
• Criação de soluções web escaláveis e performáticas
• Implementação de funcionalidades personalizadas conforme sua necessidade
• Integração com APIs e banco de dados para garantir eficiência nos processos`,

contact: `Entre em contato comigo através de:
• 📧 Email: <a href="mailto:daniel.atdr@gmail.com">daniel.atdr@gmail.com</a>
• 📞 Telefone/WhatsApp: <a href="tel:+351939467926">(351) 939467926 | https://api.whatsapp.com/send/?phone=351939467926&text&type=phone_number&app_absent=0</a>
• 🔗 LinkedIn: <a href="https://www.linkedin.com/in/devdanielmachado/" target="_blank">linkedin.com/in/devdanielmachado/</a>
• 💻 GitHub: <a href="https://github.com/danvitmac/" target="_blank">github.com/danvitmac/</a>`,

workPreference: `Tenho preferência por trabalho híbrido e remoto, mas estou aberto a outros formatos, incluindo o presencial, conforme as necessidades da empresa e da vaga.`,

strengths: `Minhas principais qualidades incluem resolução de problemas, aprendizado rápido e trabalho em equipe. Estou sempre buscando melhorar minhas habilidades e contribuir com soluções eficientes.`,

weaknesses: `Uma das áreas que venho trabalhando é a delegação de tarefas, pois muitas vezes gosto de resolver tudo sozinho. No entanto, tenho aprimorado minha capacidade de confiar na equipe e distribuir responsabilidades de forma mais eficaz.`,

careerGoals: `Meu objetivo a curto prazo é consolidar minha experiência como desenvolvedor Full Stack e contribuir para projetos inovadores. A longo prazo, pretendo me especializar ainda mais em tecnologias avançadas.`,

unknown: `Desculpe, não consegui entender sua pergunta. Sou apenas um assistente virtual, mas se precisar de suporte direto com o desenvolvedor, você pode entrar em contato através dos seguintes canais:

📧 E-mail: <a href="mailto:daniel.atdr@gmail.com">daniel.atdr@gmail.com</a>
📞 Telefone/WhatsApp: <a href="tel:+351939467926">(351) 939467926 | https://api.whatsapp.com/send/?phone=351939467926&text&type=phone_number&app_absent=0</a>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/devdanielmachado/" target="_blank">linkedin.com/in/devdanielmachado/</a>
💻 GitHub: <a href="https://github.com/danvitmac/" target="_blank">github.com/danvitmac/</a>

`
};

// Opções disponíveis para o usuário - Lista completa
const allOptions = [
"Sua experiência",
"Suas habilidades",
"Como pode contribuir",
"Informações de contato",
"Seus objetivos de carreira",
"Suas qualidades",
"Seus desafios",
"Preferência de trabalho"
];

// Sequência inicial de mensagens com animação de fade
const initialMessages = [
{ text: botMessages.greeting(), delay: 500 },
{
  text: "Selecione uma opção ou escreva sua pergunta:",
  options: allOptions,
  delay: 1500
}
];

    
  
openChatBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    chatModal.classList.add('active');
    startInitialMessages(); // Chama a função para iniciar as mensagens
  });
});

  
  // Fechar chat ao clicar no X
  closeModalBtn.addEventListener('click', function() {
    chatModal.classList.remove('active');
  });
  
  // Enviar mensagem ao clicar no botão de enviar
  sendButton.addEventListener('click', sendUserMessage);
  
  // Enviar mensagem ao pressionar Enter
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendUserMessage();
    }
  });
  
  // Função para iniciar a sequência de mensagens iniciais
  function startInitialMessages() {
    let cumulativeDelay = 0;
    
    initialMessages.forEach(msg => {
      cumulativeDelay += msg.delay;
      setTimeout(() => {
        showTyping();
        
        setTimeout(() => {
          hideTyping();
          addBotMessage(msg.text);
          
          if (msg.options) {
            addOptionButtons(msg.options);
          }
          
          
        }, 1000);
      }, cumulativeDelay);
    });
  }
  
  // Função para adicionar mensagem do bot
  function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'message-bot');
    messageDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/•/g, '&#8226;');
    
    // Inserir antes do indicador de digitação
    chatMessages.insertBefore(messageDiv, typingIndicator);
    scrollToBottom();
  }
    // Função para rolar o chat para o final
    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
  // Função para adicionar mensagem do usuário
  function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'message-user');
    messageDiv.textContent = text;
    
    // Inserir antes do indicador de digitação
    chatMessages.insertBefore(messageDiv, typingIndicator);
    scrollToBottom();
  }
  
  // Função para adicionar botões de opções
  function addOptionButtons(options) {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('option-buttons');
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = option;
      button.addEventListener('click', function() {
        handleUserInput(option);
        buttonsDiv.remove();
      });
      
      buttonsDiv.appendChild(button);
    });
    
    // Inserir antes do indicador de digitação
    chatMessages.insertBefore(buttonsDiv, typingIndicator);
    
  }
  
  // Função para mostrar indicador de digitação
  function showTyping() {
    typingIndicator.style.display = 'block';
    
  }
  
  // Função para esconder indicador de digitação
  function hideTyping() {
    typingIndicator.style.display = 'none';
  }
  
  // Função para enviar mensagem do usuário
  function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
      addUserMessage(message);
      userInput.value = '';
      handleUserInput(message);
    }
  }
  
  // Função para processar a entrada do usuário e responder
  function handleUserInput(message) {
    const lowerMessage = message.toLowerCase();
    
    showTyping();
    
    setTimeout(() => {
      hideTyping();
      
      if (lowerMessage.includes('experiência') || lowerMessage === 'sua experiência') {
        addBotMessage(botMessages.intro);
        addBotMessage(botMessages.experience);
      } 
      else if (lowerMessage.includes('habilidade') || lowerMessage === 'suas habilidades' || lowerMessage.includes('skills')) {
        addBotMessage(botMessages.skills);
      }
      else if (lowerMessage.includes('contribuir') || lowerMessage === 'como pode contribuir' || lowerMessage.includes('empresa')) {
        addBotMessage(botMessages.contribution);
      }
      else if (lowerMessage.includes('contato') || lowerMessage === 'informações de contato' || lowerMessage.includes('email') || lowerMessage.includes('telefone')) {
        addBotMessage(botMessages.contact);
      }
      else if (lowerMessage.includes('preferência') || lowerMessage.includes('trabalho') || lowerMessage === 'preferência de trabalho') {
        addBotMessage(botMessages.workPreference);
      }
      else if (lowerMessage.includes('qualidades') || lowerMessage.includes('forças') || lowerMessage.includes('strengths') || lowerMessage === 'suas qualidades') {
        addBotMessage(botMessages.strengths);
      }
      else if (lowerMessage.includes('desafios') || lowerMessage.includes('fraquezas') || lowerMessage.includes('weaknesses') || lowerMessage === 'seus desafios') {
        addBotMessage(botMessages.weaknesses);
      }
      else if (lowerMessage.includes('objetivos') || lowerMessage.includes('carreira') || lowerMessage.includes('futuro') || lowerMessage === 'seus objetivos de carreira') {
        addBotMessage(botMessages.careerGoals);
      }
      else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('começar')) {
        addBotMessage(botMessages.greeting());
      }
      else {
        addBotMessage(botMessages.unknown);
      }
      
      // Mostrar novamente as opções após qualquer resposta
      setTimeout(() => {
        addBotMessage("Mais alguma informação que você gostaria de saber?");
        addOptionButtons(allOptions);
      }, 800);
      
     
    }, 1000);
  }
  

  
  // Evitar que o clique dentro do modal feche ele
  chatModal.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
  // Focar no input quando o chat é aberto
  chatModal.addEventListener('transitionend', function() {
    if (chatModal.classList.contains('active')) {
      userInput.focus();
    }
  });
});