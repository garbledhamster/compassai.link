// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
});

// Terms of Service Logic
document.addEventListener('DOMContentLoaded', () => {
  const termsOverlay = document.getElementById('termsOverlay');
  const acceptButton = document.getElementById('acceptTermsButton');
  const openAITermsCheckbox = document.getElementById('openAITermsCheckbox');

  // Check if terms were already accepted
  if (localStorage.getItem('termsAccepted') === 'true') {
    termsOverlay.style.display = 'none';
  } else {
    termsOverlay.style.display = 'flex';
  }

  // Enable/Disable accept button based on checkbox
  openAITermsCheckbox.addEventListener('change', () => {
    acceptButton.disabled = !openAITermsCheckbox.checked;
  });

  // Accept Terms Button Click
  acceptButton.addEventListener('click', () => {
    if (openAITermsCheckbox.checked) {
      localStorage.setItem('termsAccepted', 'true');
      termsOverlay.style.display = 'none';
    }
  });
});

// Menu Toggle Logic
const menuButton = document.getElementById('menuButton');
const popoutMenu = document.getElementById('popoutMenu');
const closeMenuButton = document.getElementById('closeMenuButton');

menuButton.addEventListener('click', () => {
  popoutMenu.classList.toggle('hidden');
});

closeMenuButton.addEventListener('click', () => {
  popoutMenu.classList.add('hidden');
});

// Close Menu when clicking outside
document.addEventListener('click', (event) => {
  if (!popoutMenu.contains(event.target) && !menuButton.contains(event.target)) {
    popoutMenu.classList.add('hidden');
  }
});

// Keyboard Shortcut for Menu Toggle (e.g., Alt + M)
document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key.toLowerCase() === 'm') {
    popoutMenu.classList.toggle('hidden');
  }
});

// Theme Toggle Logic
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');

themeLight.addEventListener('click', () => {
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('bg-gray-800', 'text-white');
  document.body.classList.add('bg-gray-200', 'text-gray-800');
});

themeDark.addEventListener('click', () => {
  document.documentElement.classList.add('dark');
  document.body.classList.remove('bg-gray-200', 'text-gray-800');
  document.body.classList.add('bg-gray-800', 'text-white');
});

// Submit Button Logic
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const toolOutput = document.getElementById('tool-output');

submitButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';

  // Placeholder for AI response
  setTimeout(() => {
    const aiResponse = `You said: "${message}"`;
    appendMessage('assistant', aiResponse);
  }, 1000);
});

// Handle Enter key for message submission
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    submitButton.click();
  }
});

// Function to append messages
function appendMessage(role, content) {
  const messageDiv = document.createElement('div');
  if (role === 'user') {
    messageDiv.className = 'self-end bg-blue-500 text-white p-2 rounded-lg max-w-2/3';
  } else if (role === 'assistant') {
    messageDiv.className = 'self-start bg-gray-700 text-white p-2 rounded-lg max-w-2/3';
  }
  messageDiv.textContent = content;
  toolOutput.appendChild(messageDiv);
  toolOutput.scrollTop = toolOutput.scrollHeight;
}

// Memory Management Logic
const memoriesList = document.getElementById('memoriesList');
const conversationsList = document.getElementById('conversationsList');

function addMemory(memory) {
  // Check for duplicates
  const existing = Array.from(memoriesList.children).find(child => child.textContent === memory.content);
  if (existing) return;

  const memoryDiv = document.createElement('div');
  memoryDiv.className = 'flex items-center bg-gray-500 p-2 rounded-lg space-x-2';
  memoryDiv.innerHTML = `
    <span>${memory.icon}</span>
    <div>
      <h4 class="font-semibold">${memory.title}</h4>
      <p class="text-sm">${memory.content}</p>
    </div>
  `;
  memoriesList.appendChild(memoryDiv);
}

// Example Memories
const exampleMemories = [
  {
    icon: "📚",
    title: "Standard GPT",
    content: "Explain whatever the user wants in detail."
  },
  {
    icon: "📜",
    title: "OpenAI Rules",
    content: "You must adhere to the rules of OpenAI."
  }
];

exampleMemories.forEach(memory => addMemory(memory));

// Conversations Management Logic
function addConversation(conversation) {
  const convoDiv = document.createElement('div');
  convoDiv.className = 'bg-gray-500 p-2 rounded-lg cursor-pointer hover:bg-gray-600';
  convoDiv.textContent = conversation.title;
  conversationsList.appendChild(convoDiv);
}

// Example Conversations
const exampleConversations = [
  {
    title: "App Introduction"
  }
];

exampleConversations.forEach(convo => addConversation(convo));
