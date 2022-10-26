// ©2022 André Oliveira Cunha

const answersResult=[];const data=[{question:'Olá, tudo bem?<br><br>Vamos consultar o Preço para sua Cotação em 5 min?',options:['Sim, quero receber','Não, obrigado'],type:'select',},{question:'Para isso preciso de algumas informações rápidas 🙂<br><br>Qual é o seu nome?',type:'input',},{question:'Prazer em te conhecer, ${answersResult[1]}!<br><br>Em qual e-mail corporativo gostaria de receber a proposta?',type:'input',},{question:'Ótimo, ${answersResult[1]}!<br><br>Poderia me informar seu telefone ? (Prometo não incomodar🙏)',type:'input',},{question:'Legal, estamos quase lá...<br><br>De qual empresa você fala?',type:'input',},{question:'Qual sua principal necessidade?',options:['Aumentar as vendas','Aumentar a produtividade','Aumentar a eficiência','Aumentar a satisfação dos clientes'],type:'select',},{question:'Por último, qual é o número de colaboradores de sua empresa?',options:['1 a 10','11 a 100','101 a 500','501 a 1000','Mais de 1000'],type:'select',},{question:'Obrigado! Em breve nossa equipe de consultores irá entrar em contato para apresentar a melhor proposta para sua empresa 🤝',options:['Ok, obrigado!'],type:'select',},{question:'Resumo da sua cotação:<br><br>Nome: ${answersResult[1]}<br>E-mail: ${answersResult[2]}<br>Telefone: ${answersResult[3]}<br>Empresa: ${answersResult[4]}<br>Necessidade: ${answersResult[5]}<br>Quantidade de colaboradores: ${answersResult[6]}<br><br>',options:['Enviar cotação'],type:'select',}]
let content=null;let input=null;let inputArea=null;function createQuestion(question){const div=document.createElement('div');div.classList.add('question');if(question.question.includes('${answersResult[1]}')){question.question=question.question.replace('${answersResult[1]}',answersResult[1]);}if(question.question.includes('${answersResult[2]}')){question.question=question.question.replace('${answersResult[2]}',answersResult[2]);}if(question.question.includes('${answersResult[3]}')){question.question=question.question.replace('${answersResult[3]}',answersResult[3]);}if(question.question.includes('${answersResult[4]}')){question.question=question.question.replace('${answersResult[4]}',answersResult[4]);}if(question.question.includes('${answersResult[5]}')){question.question=question.question.replace('${answersResult[5]}',answersResult[5]);}if(question.question.includes('${answersResult[6]}')){question.question=question.question.replace('${answersResult[6]}',answersResult[6]);}
if(question.type==='input'){div.innerHTML=`
      <p>${question.question}</p>
      `;inputArea.style.display='flex';input.disabled=false;input.focus();input.addEventListener('keyup',getInputValue);}else{div.innerHTML=`
    <p>${question.question}</p>
    <div class="options">
      ${question.options.map(option => `<button
onclick="createAnswer('${option}');">${option}</button>`).join('')}
    </div>
  `;}
content.appendChild(div);}
function getInputValue(e){if((input.disabled==false)&&(e.keyCode===13||e.type==='click')){const value=input.value;input.value='';input.disabled=true;inputArea.style.display='none';createAnswer(value);}}
function createAnswer(answer){answersResult.push(answer);const div=document.createElement('div');div.classList.add('answer');div.innerHTML=`
    <p>${answer}</p>
  `;content.appendChild(div);animateTyping();scrollToBottom();}
function nextQuestion(){const questions=document.querySelectorAll('.question');const index=questions.length-1;if(index<data.length-1){createQuestion(data[index+1]);}}
function scrollToBottom(){content.scrollTop=content.scrollHeight;}
function animateTyping(){const div=document.createElement('div');div.classList.add('typing');div.innerHTML=`
  <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_nZBVpi.json"  background="transparent"  speed="1.8"  style="width: 80px;" loop autoplay></lottie-player>
  `;content.appendChild(div);setTimeout(()=>{div.remove();nextQuestion();},3000);}
function startBot(){animateTyping();}
function createChatArea(){const div=document.createElement('div');div.innerHTML=`
  <div class="container">
      <div class="header">
          <img src="https://res.cloudinary.com/dj1ereyp0/image/upload/v1666743604/Logos/Branca/SingleSVG_ju7nne.svg" alt="Avatar" class="avatar" width="40px" height="40px" />
          <div class="header-text">
              <h4>Moddev</h4>
              <p>Online agora</p>
          </div>
      </div>
      <div class="content" id="content"></div>
      <div class="input-area" id="input-area">
          <input class="input" id="input" disabled type="text" placeholder="Digite aqui..." />
          <div class="send" id="send"></div>
      </div>
  </div>
  `;document.body.appendChild(div);content=document.getElementById('content');input=document.getElementById('input');inputArea=document.getElementById('input-area');}
function createIcon(){const div=document.createElement('div');div.innerHTML=`
  <div class="chat-icon">
    <img src="https://res.cloudinary.com/dj1ereyp0/image/upload/v1666743604/Logos/Branca/SingleSVG_ju7nne.svg" alt="Avatar" class="avatar" width="35px" height="35px" />
  </div>
  `;document.body.appendChild(div);div.addEventListener('click',()=>{document.querySelector('.container').style.display='flex';startBot();});}
window.addEventListener('load',()=>{const script=document.createElement('script');script.src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";script.async=true;document.body.appendChild(script);const style=document.createElement('link');style.rel="stylesheet";style.href="styles.css";document.body.appendChild(style);createChatArea();createIcon();});