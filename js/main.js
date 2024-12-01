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

// Menu Toggle Logic for Desktop
const popoutMenu = document.getElementById('popoutMenu');

// Menu Toggle Logic for Mobile
const menuButton = document.getElementById('menuButton');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeMenuButton = document.getElementById('closeMenuButton');
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');
const themeLightMobile = document.getElementById('themeLightMobile');
const themeDarkMobile = document.getElementById('themeDarkMobile');

// Toggle Desktop Popout Menu
menuButton.addEventListener('click', () => {
  popoutMenu.classList.toggle('hidden');
});

// Toggle Mobile Sidebar
menuButton.addEventListener('click', () => {
  mobileSidebar.classList.toggle('translate-x-full');
});

closeMenuButton.addEventListener('click', () => {
  mobileSidebar.classList.add('translate-x-full');
});

// Close Mobile Sidebar when clicking outside
document.addEventListener('click', (event) => {
  if (
    !mobileSidebar.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    mobileSidebar.classList.add('translate-x-full');
  }
});

// Keyboard Shortcut for Menu Toggle (e.g., Alt + M)
document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key.toLowerCase() === 'm') {
    popoutMenu.classList.toggle('hidden');
    mobileSidebar.classList.toggle('translate-x-full');
  }
});

// Theme Toggle Logic for Desktop
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

// Theme Toggle Logic for Mobile
themeLightMobile.addEventListener('click', () => {
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('bg-gray-800', 'text-white');
  document.body.classList.add('bg-gray-200', 'text-gray-800');
  mobileSidebar.classList.add('translate-x-full');
});

themeDarkMobile.addEventListener('click', () => {
  document.documentElement.classList.add('dark');
  document.body.classList.remove('bg-gray-200', 'text-gray-800');
  document.body.classList.add('bg-gray-800', 'text-white');
  mobileSidebar.classList.add('translate-x-full');
});

// Submit Button Logic
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const toolOutput = document.getElementById('tool-output');

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

// Memory Management Logic
const memoriesList = document.getElementById('memoriesList');
const memoriesListMobile = document.getElementById('memoriesListMobile');
const conversationsList = document.getElementById('conversationsList');
const conversationsListMobile = document.getElementById('conversationsListMobile');

// Function to add memory (desktop and mobile)
function addMemory(memory) {
  // Check for duplicates in both desktop and mobile lists
  const existingDesktop = Array.from(memoriesList.children).find(child => child.textContent === memory.content);
  const existingMobile = Array.from(memoriesListMobile.children).find(child => child.textContent === memory.content);
  if (existingDesktop || existingMobile) return;

  const memoryHTML = `
    <div class="flex items-center bg-gray-500 p-2 rounded-lg space-x-2">
      <span>${memory.icon}</span>
      <div>
        <h4 class="font-semibold">${memory.title}</h4>
        <p class="text-sm">${memory.content}</p>
      </div>
    </div>
  `;

  memoriesList.insertAdjacentHTML('beforeend', memoryHTML);
  memoriesListMobile.insertAdjacentHTML('beforeend', memoryHTML);
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
const conversationsListBoth = [conversationsList, conversationsListMobile];

function addConversation(conversation) {
  conversationsListBoth.forEach(list => {
    // Check for duplicates
    const existing = Array.from(list.children).find(child => child.textContent === conversation.title);
    if (existing) return;

    const convoDiv = document.createElement('div');
    convoDiv.className = 'bg-gray-500 p-2 rounded-lg cursor-pointer hover:bg-gray-600';
    convoDiv.textContent = conversation.title;
    list.appendChild(convoDiv);
  });
}

// Example Conversations
const exampleConversations = [
  {
    title: "App Introduction"
  }
];

exampleConversations.forEach(convo => addConversation(convo));
