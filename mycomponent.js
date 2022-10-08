class MyChatbot extends HTMLElement{constructor(){super();this.build()}build(){const shadow=this.attachShadow({mode:"open"});shadow.appendChild(this.style());shadow.appendChild(this.createButton());shadow.appendChild(this.createChatArea())}createButton(){const button=document.createElement("button");button.className="chatbot-button";button.textContent="M";button.addEventListener("click",()=>{this.toggleChatArea()});return button}createChatArea(){const chatArea=document.createElement("div");chatArea.className="chatbot-area";return chatArea}toggleChatArea(){const chatArea=this.shadowRoot.querySelector(".chatbot-area");if(chatArea.style.display==="none"){chatArea.style.display="block"}else{chatArea.style.display="none"}}style(){const style=document.createElement("style");style.textContent=`
      .chatbot-button {
        background-color: #40228E;
        border: none;
        color: white;
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        color:'white';
        font-size: 20px;
      }
      .chatbot-area {
        background-color: gray;
        position: fixed;
        bottom: 80px;
        right: 40px;
        width: 300px;
        height: 300px;
        border-radius: 5px;
        display: none;
      }
    `;return style}}customElements.define("my-chatbot",MyChatbot);
