// main.js

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
const popoutMenu = document.getElementById('popoutMenu');
const menuButton = document.getElementById('menuButton');
const closeMenuButton = document.getElementById('closeMenuButton');

// Toggle Popout Menu when menuButton is clicked
menuButton.addEventListener('click', () => {
  popoutMenu.classList.toggle('hidden');
});

// Close Popout Menu when closeMenuButton is clicked
closeMenuButton.addEventListener('click', () => {
  popoutMenu.classList.add('hidden');
});

// Close Popout Menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (
    !popoutMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
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

// Function to apply light theme
function applyLightTheme() {
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('bg-gray-800', 'text-white');
  document.body.classList.add('bg-gray-200', 'text-gray-800');
}

// Function to apply dark theme
function applyDarkTheme() {
  document.documentElement.classList.add('dark');
  document.body.classList.remove('bg-gray-200', 'text-gray-800');
  document.body.classList.add('bg-gray-800', 'text-white');
}

// Event listeners for theme buttons
themeLight.addEventListener('click', () => {
  applyLightTheme();
  appendMessage('system', 'Light theme applied.');
});

themeDark.addEventListener('click', () => {
  applyDarkTheme();
  appendMessage('system', 'Dark theme applied.');
});

// Submit Button Logic
const submitButton = document.getElementById('submit-button');
const userInput = document.getElementById('user-input');
const toolOutput = document.getElementById('tool-output');

// Function to append messages to tool-output
function appendMessage(role, content) {
  const messageDiv = document.createElement('div');
  if (role === 'user') {
    messageDiv.className = 'self-end bg-blue-500 text-white p-2 rounded-lg max-w-2/3';
  } else if (role === 'assistant') {
    messageDiv.className = 'self-start bg-gray-700 text-white p-2 rounded-lg max-w-2/3';
  } else if (role === 'system') {
    messageDiv.className = 'self-center bg-yellow-500 text-gray-800 p-2 rounded-lg max-w-2/3';
  }
  messageDiv.textContent = content;
  toolOutput.appendChild(messageDiv);
  toolOutput.scrollTop = toolOutput.scrollHeight;
}

// Handle message submission
submitButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';

  // Placeholder for AI response (mock)
  setTimeout(() => {
    const aiResponse = `Mock response to: "${message}"`;
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

// Function to add memory
function addMemory(memory) {
  // Check for duplicates
  const existing = Array.from(memoriesList.children).find(child => child.textContent === memory.content);
  if (existing) return;

  const memoryDiv = document.createElement('div');
  memoryDiv.className = 'flex items-center bg-gray-500 p-2 rounded-lg space-x-2 cursor-pointer hover:bg-gray-600';
  memoryDiv.innerHTML = `
    <span>${memory.icon}</span>
    <div>
      <h4 class="font-semibold">${memory.title}</h4>
      <p class="text-sm">${memory.content}</p>
    </div>
  `;
  
  // Add click event to load memory content
  memoryDiv.addEventListener('click', () => {
    appendMessage('system', `Loaded memory: ${memory.title}\n${memory.content}`);
  });

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

// Add example memories
exampleMemories.forEach(memory => addMemory(memory));

// Conversations Management Logic
const conversationsList = document.getElementById('conversationsList');

// Function to add conversation
function addConversation(conversation) {
  // Check for duplicates
  const existing = Array.from(conversationsList.children).find(child => child.textContent === conversation.title);
  if (existing) return;

  const convoDiv = document.createElement('div');
  convoDiv.className = 'bg-gray-500 p-2 rounded-lg cursor-pointer hover:bg-gray-600';
  convoDiv.textContent = conversation.title;

  // Add click event to load conversation (mock)
  convoDiv.addEventListener('click', () => {
    appendMessage('system', `Loaded conversation: ${conversation.title}\n[Mock conversation history]`);
  });

  conversationsList.appendChild(convoDiv);
}

// Example Conversations
const exampleConversations = [
  {
    title: "App Introduction"
  },
  {
    title: "Project Discussion"
  },
  {
    title: "Support Chat"
  }
];

// Add example conversations
exampleConversations.forEach(convo => addConversation(convo));

// Guides Management Logic
const menuItems = document.querySelectorAll('.menu-item');

// Function to handle menu item clicks
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const span = item.querySelector('span');
    if (!span) return;
    const text = span.textContent.trim();
    switch(text) {
      case 'Guides':
        displayGuides();
        break;
      case 'Memories':
        displayMemories();
        break;
      case 'Instructions':
        displayInstructions();
        break;
      case 'Notes':
        displayNotes();
        break;
      case 'Tools':
        displayTools();
        break;
      case 'Conversations':
        displayConversations();
        break;
      case 'Settings':
        displaySettings();
        break;
      default:
        appendMessage('assistant', 'Unknown menu item clicked.');
    }

    // Close the popout menu after selection
    popoutMenu.classList.add('hidden');
  });
});

// Function to display Guides
function displayGuides() {
  toolOutput.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Guides</h2>
      <p>Here are some guides to help you navigate Compass AI:</p>
      <ul class="list-disc list-inside">
        <li><strong>Getting Started:</strong> Steps to begin using Compass AI.</li>
        <li><strong>Memory Management:</strong> How to add, view, and delete memories.</li>
        <li><strong>Using Tools:</strong> Overview of available AI tools and how to use them.</li>
      </ul>
    </div>
  `;
}

// Function to display Memories
function displayMemories() {
  // Fetch memories from memoriesList
  const memories = Array.from(memoriesList.children).map(child => ({
    icon: child.querySelector('span').textContent,
    title: child.querySelector('h4').textContent,
    content: child.querySelector('p').textContent
  }));

  let memoriesHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Memories</h2>
      ${memories.map(memory => `
        <div class="flex items-center bg-gray-600 p-2 rounded-lg space-x-2">
          <span>${memory.icon}</span>
          <div>
            <h4 class="font-semibold">${memory.title}</h4>
            <p class="text-sm">${memory.content}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  toolOutput.innerHTML = memoriesHTML;
}

// Function to display Instructions
function displayInstructions() {
  toolOutput.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Instructions</h2>
      <p>Follow these instructions to use Compass AI effectively:</p>
      <ol class="list-decimal list-inside">
        <li>Enter your message in the input area and click the send button.</li>
        <li>Use the menu to access different sections like Guides, Memories, and Settings.</li>
        <li>Manage your memories to keep track of important information.</li>
        <li>Customize the theme from the Settings section.</li>
      </ol>
    </div>
  `;
}

// Function to display Notes
function displayNotes() {
  toolOutput.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Notes</h2>
      <p>This is the Notes section. You can jot down important information here.</p>
      <textarea class="w-full p-2 rounded bg-gray-700 text-white focus:outline-none resize-none h-32" placeholder="Write your notes here..."></textarea>
    </div>
  `;
}

// Function to display Tools
function displayTools() {
  toolOutput.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Tools</h2>
      <p>Explore the various AI tools available:</p>
      <ul class="list-disc list-inside">
        <li><strong>Chatty:</strong> Engage in conversations with the AI.</li>
        <li><strong>Summarizer:</strong> Summarize long texts into concise points.</li>
        <li><strong>Articulator:</strong> Enhance your explanations and communications.</li>
      </ul>
    </div>
  `;
}

// Function to display Conversations
function displayConversations() {
  // Fetch conversations from conversationsList
  const conversations = Array.from(conversationsList.children).map(child => ({
    title: child.textContent
  }));

  let conversationsHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Conversations</h2>
      ${conversations.map(convo => `
        <div class="bg-gray-600 p-2 rounded-lg cursor-pointer hover:bg-gray-700">
          <p>${convo.title}</p>
        </div>
      `).join('')}
    </div>
  `;

  toolOutput.innerHTML = conversationsHTML;
}

// Function to display Settings
function displaySettings() {
  toolOutput.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Settings</h2>
      <div class="space-y-4">
        <!-- Theme Settings -->
        <div>
          <h3 class="font-semibold">Theme</h3>
          <div class="flex space-x-2 mt-2">
            <button id="settingsThemeLight" class="px-3 py-1 bg-white text-gray-800 rounded">Light</button>
            <button id="settingsThemeDark" class="px-3 py-1 bg-gray-800 text-white rounded">Dark</button>
          </div>
        </div>
        <!-- Add more settings here -->
      </div>
    </div>
  `;

  // Add event listeners for theme buttons in Settings
  const settingsThemeLight = document.getElementById('settingsThemeLight');
  const settingsThemeDark = document.getElementById('settingsThemeDark');

  settingsThemeLight.addEventListener('click', () => {
    applyLightTheme();
    appendMessage('system', 'Light theme applied.');
  });

  settingsThemeDark.addEventListener('click', () => {
    applyDarkTheme();
    appendMessage('system', 'Dark theme applied.');
  });
}

// Popout Menu Buttons Functionality (Clipboard, Code, Clock, Bookmark, Refresh, Close)
const clipboardButton = document.querySelector('#popoutMenuHotBar .menu-button:nth-child(1)');
const codeButton = document.querySelector('#popoutMenuHotBar .menu-button:nth-child(2)');
const clockButton = document.querySelector('#popoutMenuHotBar .menu-button:nth-child(3)');
const bookmarkButton = document.querySelector('#popoutMenuHotBar .menu-button:nth-child(4)');
const refreshButton = document.querySelector('#popoutMenuHotBar .menu-button:nth-child(5)');

// Clipboard Button - Mock Functionality
clipboardButton.addEventListener('click', () => {
  appendMessage('system', 'Clipboard functionality is not implemented yet.');
});

// Code Button - Mock Functionality
codeButton.addEventListener('click', () => {
  appendMessage('system', 'Code editor functionality is not implemented yet.');
});

// Clock Button - Mock Functionality
clockButton.addEventListener('click', () => {
  const currentTime = new Date().toLocaleTimeString();
  appendMessage('system', `Current Time: ${currentTime}`);
});

// Bookmark Button - Mock Functionality
bookmarkButton.addEventListener('click', () => {
  appendMessage('system', 'Bookmark functionality is not implemented yet.');
});

// Refresh Button - Mock Functionality
refreshButton.addEventListener('click', () => {
  appendMessage('system', 'Application has been refreshed (mock).');
});

// Initialize Memories and Conversations with Mock Data
const memoriesListInitial = [
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

const conversationsListInitial = [
  {
    title: "App Introduction"
  },
  {
    title: "Project Discussion"
  },
  {
    title: "Support Chat"
  }
];

// Populate Memories
memoriesListInitial.forEach(memory => addMemory(memory));

// Populate Conversations
conversationsListInitial.forEach(convo => addConversation(convo));
