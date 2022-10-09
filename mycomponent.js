class MyChatbot extends HTMLElement {
  constructor() {
    super();

    // list of messages to ask to the user (question and answer)
    this.messages = [
      {
        question: 'Hello, can I help you?',
        answers: [
          {
            text: 'Yes',
            next: 1
          },
          {
            text: 'No',
            next: 2
          }
        ]
      }
    ];

    this.build();
  }

  build() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(this.style());
    shadow.appendChild(this.createButton());
    shadow.appendChild(this.createChatArea());

    this.sendMessage();
  }

  createButton() {
    // create button
    const button = document.createElement('button');
    button.className = 'chatbot-button';
    button.textContent = 'M';
    button.addEventListener('click', () => {
      this.toggleChatArea();
    });
    return button;
  }

  createChatArea() {
    const chatArea = document.createElement('div');
    chatArea.className = 'chatbot-area';

    const chatAreaHeader = document.createElement('div');
    chatAreaHeader.className = 'chatbot-area-header';
    chatAreaHeader.textContent = 'Chatbot';
    chatArea.appendChild(chatAreaHeader);

    const chatAreaBody = document.createElement('div');
    chatAreaBody.className = 'chatbot-area-body';
    chatArea.appendChild(chatAreaBody);

    const chatAreaFooter = document.createElement('div');
    chatAreaFooter.className = 'chatbot-area-footer';
    chatArea.appendChild(chatAreaFooter);

    return chatArea;
  }

  toggleChatArea() {
    // verify if chat area is visible
    const chatArea = this.shadowRoot.querySelector('.chatbot-area');
    if (chatArea.style.display === 'none') {
      chatArea.style.display = 'block';
    }
    else {
      chatArea.style.display = 'none';
    }
  }

  // methods to send and receive messages
  sendMessage() {
    // add first message from bot to chat area
    const randomMessage = this.messages[0].question;
    this.addMessageToChatArea(randomMessage, 'bot');
  }

  addMessageToChatArea(message, sender) {
    console.log('addMessageToChatArea', message, sender);
    // show the question and buttons to answer
    const chatAreaBody = this.shadowRoot.querySelector('.chatbot-area-body');
    const chatAreaFooter = this.shadowRoot.querySelector('.chatbot-area-footer');

    // create message
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message';
    // add the message to the chat area body
    messageElement.textContent = message;
    chatAreaBody.appendChild(messageElement);
    
    // add message to chat area
    if (sender === 'bot') {
      messageElement.classList.add('bot');
      chatAreaBody.appendChild(messageElement);
    }
    else {
      messageElement.classList.add('user');
      chatAreaBody.appendChild(messageElement);
    }

    // scroll to bottom
    chatAreaBody.scrollTop = chatAreaBody.scrollHeight;

    // clear footer
    chatAreaFooter.innerHTML = '';

    // show buttons to answer
    if (sender === 'bot') {
      const answers = this.messages[0].answers;
      answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.addEventListener('click', () => {
          this.addMessageToChatArea(answer.text, 'user');
          this.sendMessage();
        });
        chatAreaFooter.appendChild(button);
      });
    }
  }

  style() {
    const style = document.createElement('style');
    style.textContent = `
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
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .chatbot-button:hover {
        filter: brightness(0.7);
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      .chatbot-area-header {
        background-color: #40228E;
        color: white;
        padding: 10px;
        border-radius: 5px 5px 0 0;
      }
      .chatbot-area-body {
        background-color: white;
        padding: 10px;
        height: 200px;
        overflow-y: auto;
      }
      .chatbot-area-footer {
        background-color: white;
        padding: 10px;
        border-radius: 0 0 5px 5px;
      }
      .chatbot-message {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
      }
      .chatbot-message.bot {
        background-color: gray;
        color: white;
        align-self: flex-start;
      }
      .chatbot-message.user {
        background-color: #40228E;
        color: white;
        align-self: flex-end;
      }
    `;
    return style;
  }
}

customElements.define('my-chatbot', MyChatbot);
