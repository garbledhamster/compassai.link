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
document.addEventListener('DOMContentLoaded', () => {
  const popoutMenu = document.getElementById('popoutMenu');
  const menuButton = document.getElementById('menuButton');
  const closeMenuButton = document.getElementById('closeMenuButton');

  // Toggle Popout Menu Visibility
  menuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event bubbling
    popoutMenu.classList.toggle('hidden');
  });

  // Close Popout Menu
  closeMenuButton.addEventListener('click', () => {
    popoutMenu.classList.add('hidden');
  });

  // Close Popout Menu when clicking outside
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

  // Theme Toggle Logic for Desktop
  const themeLight = document.getElementById('themeLight');
  const themeDark = document.getElementById('themeDark');

  themeLight.addEventListener('click', () => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('bg-gray-800', 'text-white');
    document.body.classList.add('bg-gray-200', 'text-gray-800');
    saveThemePreference('light');
  });

  themeDark.addEventListener('click', () => {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-gray-200', 'text-gray-800');
    document.body.classList.add('bg-gray-800', 'text-white');
    saveThemePreference('dark');
  });

  // Load Theme Preference on Page Load
  loadThemePreference();
});

// Function to save theme preference
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
}

// Function to load theme preference
function loadThemePreference() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-gray-200', 'text-gray-800');
    document.body.classList.add('bg-gray-800', 'text-white');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('bg-gray-800', 'text-white');
    document.body.classList.add('bg-gray-200', 'text-gray-800');
  }
}

// Submit Button Logic
document.addEventListener('DOMContentLoaded', () => {
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
    } else if (role === 'system') {
      messageDiv.className = 'self-center bg-yellow-500 text-white p-2 rounded-lg max-w-2/3';
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
});

// Modal Functionality for Popout Menu Items
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const closeModalButton = document.getElementById('closeModalButton');

  // Function to open modal with specific content
  function openModal(title, content) {
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
    feather.replace(); // Reinitialize Feather Icons in modal content
  }

  // Function to close modal
  function closeModal() {
    modal.classList.add('hidden');
    modalTitle.textContent = '';
    modalContent.innerHTML = '';
  }

  // Attach event listeners to all menu-item buttons
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      const menuName = item.getAttribute('data-menu');
      let title = '';
      let content = '';

      // Define content based on menu name
      switch (menuName) {
        case 'guides':
          title = 'Guides';
          content = `
            <p>Welcome to the Guides section. Here you can find tutorials and documentation to help you get the most out of Compass AI.</p>
            <ul class="list-disc list-inside">
              <li><strong>Getting Started:</strong> Learn how to set up and use Compass AI.</li>
              <li><strong>Advanced Features:</strong> Explore the advanced capabilities of the tool.</li>
              <li><strong>FAQs:</strong> Find answers to common questions.</li>
            </ul>
          `;
          break;
        case 'memories':
          title = 'Memories';
          content = `
            <p>This is the Memories section. Here you can review and manage your saved memories.</p>
            <div id="memoriesListModal" class="space-y-2">
              <!-- Memory Items will be appended here dynamically -->
            </div>
            <button id="addMemoryButton" class="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Add Memory
            </button>
          `;
          break;
        case 'instructions':
          title = 'Instructions';
          content = `
            <p>Instructions on how to use Compass AI:</p>
            <ol class="list-decimal list-inside">
              <li>Enter your query in the input area.</li>
              <li>Click the submit button or press Enter to send.</li>
              <li>View responses in the output area.</li>
              <li>Use the menu for additional tools and settings.</li>
            </ol>
          `;
          break;
        case 'notes':
          title = 'Notes';
          content = `
            <p>This is the Notes section. You can add personal notes and reminders here.</p>
            <textarea id="userNote" class="w-full p-2 rounded bg-gray-200 text-gray-800" placeholder="Write your notes here..."></textarea>
            <button id="saveNoteButton" class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Save Note
            </button>
            <div id="savedNotes" class="mt-4 space-y-2">
              <!-- Saved Notes will be displayed here -->
            </div>
          `;
          break;
        case 'tools':
          title = 'Tools';
          content = `
            <p>Explore various AI tools available within Compass AI:</p>
            <ul class="list-disc list-inside">
              <li><strong>Summarizer:</strong> Condense lengthy texts into concise summaries.</li>
              <li><strong>Chatty:</strong> Engage in interactive conversations.</li>
              <li><strong>Articulator:</strong> Enhance your explanations and communications.</li>
            </ul>
          `;
          break;
        case 'conversations':
          title = 'Conversations';
          content = `
            <p>Review your past conversations and interactions here.</p>
            <div id="conversationsListModal" class="space-y-2">
              <!-- Conversation Items will be appended here dynamically -->
            </div>
            <button id="addConversationButton" class="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Add Conversation
            </button>
          `;
          break;
        case 'settings':
          title = 'Settings';
          content = `
            <p>Adjust your Compass AI settings:</p>
            <div class="space-y-4">
              <!-- Theme Settings -->
              <div>
                <h3 class="font-semibold">Theme</h3>
                <div class="flex space-x-2 mt-2">
                  <button id="modalThemeLight" class="px-3 py-1 bg-white text-gray-800 rounded">Light</button>
                  <button id="modalThemeDark" class="px-3 py-1 bg-gray-800 text-white rounded">Dark</button>
                </div>
              </div>
              <!-- Conversation History Settings -->
              <div>
                <h3 class="font-semibold">Conversation History</h3>
                <div class="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="conversationHistoryToggle" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="conversationHistoryToggle" class="cursor-pointer">Enable Conversation History</label>
                </div>
              </div>
              <!-- Additional Settings -->
              <div>
                <h3 class="font-semibold">Advanced Settings</h3>
                <button id="resetSettingsButton" class="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
                  Reset to Defaults
                </button>
              </div>
            </div>
          `;
          break;
        default:
          title = 'Unknown Menu';
          content = `<p>No content available for this menu.</p>`;
      }

      openModal(title, content);
      // Optionally, hide the popout menu after selection
      popoutMenu.classList.add('hidden');
    });
  });

  // Close modal when close button is clicked
  closeModalButton.addEventListener('click', () => {
    closeModal();
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Additional Mock Functionality for Menu Buttons
document.addEventListener('DOMContentLoaded', () => {
  const toolOutput = document.getElementById('tool-output');

  // Function to append system messages
  function appendSystemMessage(content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'self-center bg-yellow-500 text-white p-2 rounded-lg max-w-2/3';
    messageDiv.textContent = content;
    toolOutput.appendChild(messageDiv);
    toolOutput.scrollTop = toolOutput.scrollHeight;
  }

  // Attach event listeners to menu hotbar buttons
  const hotbarButtons = document.querySelectorAll('#popoutMenuHotBar .menu-button');
  hotbarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const menuAction = button.getAttribute('data-menu');
      let message = '';

      switch (menuAction) {
        case 'clipboard':
          message = 'Clipboard functionality is currently under development.';
          break;
        case 'code':
          message = 'Code testing feature is coming soon!';
          break;
        case 'clock':
          message = 'Clock feature is under construction.';
          break;
        case 'bookmark':
          message = 'Bookmarking is not yet available.';
          break;
        case 'refresh':
          message = 'Resetting settings to default...';
          resetSettings();
          break;
        case 'close':
          // Already handled in menu toggle logic
          return;
        default:
          message = 'This feature is not implemented yet.';
      }

      appendSystemMessage(message);
    });
  });

  // Function to reset settings to default
  function resetSettings() {
    localStorage.removeItem('theme');
    localStorage.removeItem('termsAccepted');
    // Reset other settings as needed
    location.reload(); // Reload the page to apply defaults
  }
});

// Dynamic Content Handling for Modal Pages

// Memories Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (event) => {
    if (event.target.id === 'addMemoryButton') {
      const memoryContent = prompt('Enter memory content:');
      if (memoryContent) {
        addMemory(memoryContent);
        loadMemoriesModal();
      }
    }

    if (event.target.id === 'saveNoteButton') {
      const noteContent = document.getElementById('userNote').value.trim();
      if (noteContent) {
        saveNote(noteContent);
        loadNotesModal();
      }
    }

    if (event.target.id === 'addConversationButton') {
      const conversationTitle = prompt('Enter conversation title:');
      if (conversationTitle) {
        addConversation(conversationTitle);
        loadConversationsModal();
      }
    }

    if (event.target.id === 'resetSettingsButton') {
      if (confirm('Are you sure you want to reset all settings to default?')) {
        resetSettings();
      }
    }

    if (event.target.id === 'modalThemeLight') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-800', 'text-white');
      document.body.classList.add('bg-gray-200', 'text-gray-800');
      saveThemePreference('light');
    }

    if (event.target.id === 'modalThemeDark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-gray-200', 'text-gray-800');
      document.body.classList.add('bg-gray-800', 'text-white');
      saveThemePreference('dark');
    }

    if (event.target.id === 'conversationHistoryToggle') {
      toggleConversationHistory(event.target.checked);
    }
  });
});

// Function to add a memory
function addMemory(content) {
  const memoriesListModal = document.getElementById('memoriesListModal');
  const memoryItem = document.createElement('div');
  memoryItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
  memoryItem.innerHTML = `
    <span>${content}</span>
    <button class="removeMemoryButton text-red-500 hover:text-red-700" title="Remove Memory">
      <i data-feather="trash-2"></i>
    </button>
  `;
  memoriesListModal.appendChild(memoryItem);
  feather.replace();
}

// Function to load memories into modal
function loadMemoriesModal() {
  const memoriesListModal = document.getElementById('memoriesListModal');
  memoriesListModal.innerHTML = '';
  // Fetch memories from localStorage or a data source
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.forEach((memory) => {
    const memoryItem = document.createElement('div');
    memoryItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    memoryItem.innerHTML = `
      <span>${memory}</span>
      <button class="removeMemoryButton text-red-500 hover:text-red-700" title="Remove Memory">
        <i data-feather="trash-2"></i>
      </button>
    `;
    memoriesListModal.appendChild(memoryItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = memoriesListModal.querySelectorAll('.removeMemoryButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeMemory(index);
      loadMemoriesModal();
    });
  });
}

// Function to remove a memory
function removeMemory(index) {
  let memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.splice(index, 1);
  localStorage.setItem('memories', JSON.stringify(memories));
}

// Function to save a note
function saveNote(content) {
  const notesList = document.getElementById('savedNotes');
  const noteItem = document.createElement('div');
  noteItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
  noteItem.innerHTML = `
    <span>${content}</span>
    <button class="removeNoteButton text-red-500 hover:text-red-700" title="Remove Note">
      <i data-feather="trash-2"></i>
    </button>
  `;
  notesList.appendChild(noteItem);
  feather.replace();

  // Save to localStorage
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(content);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes into modal
function loadNotesModal() {
  const savedNotes = document.getElementById('savedNotes');
  savedNotes.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    noteItem.innerHTML = `
      <span>${note}</span>
      <button class="removeNoteButton text-red-500 hover:text-red-700" title="Remove Note">
        <i data-feather="trash-2"></i>
      </button>
    `;
    savedNotes.appendChild(noteItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = savedNotes.querySelectorAll('.removeNoteButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeNote(index);
      loadNotesModal();
    });
  });
}

// Function to remove a note
function removeNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add a conversation
function addConversation(title) {
  const conversationsListModal = document.getElementById('conversationsListModal');
  const conversationItem = document.createElement('div');
  conversationItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
  conversationItem.innerHTML = `
    <span>${title}</span>
    <button class="removeConversationButton text-red-500 hover:text-red-700" title="Remove Conversation">
      <i data-feather="trash-2"></i>
    </button>
  `;
  conversationsListModal.appendChild(conversationItem);
  feather.replace();
}

// Function to load conversations into modal
function loadConversationsModal() {
  const conversationsListModal = document.getElementById('conversationsListModal');
  conversationsListModal.innerHTML = '';
  const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
  conversations.forEach((conversation) => {
    const conversationItem = document.createElement('div');
    conversationItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    conversationItem.innerHTML = `
      <span>${conversation}</span>
      <button class="removeConversationButton text-red-500 hover:text-red-700" title="Remove Conversation">
        <i data-feather="trash-2"></i>
      </button>
    `;
    conversationsListModal.appendChild(conversationItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = conversationsListModal.querySelectorAll('.removeConversationButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeConversation(index);
      loadConversationsModal();
    });
  });
}

// Function to remove a conversation
function removeConversation(index) {
  let conversations = JSON.parse(localStorage.getItem('conversations')) || [];
  conversations.splice(index, 1);
  localStorage.setItem('conversations', JSON.stringify(conversations));
}

// Function to toggle conversation history
function toggleConversationHistory(enabled) {
  localStorage.setItem('conversationHistory', enabled);
  if (!enabled) {
    // Clear existing conversations
    localStorage.removeItem('conversations');
    document.getElementById('conversationsList').innerHTML = '';
    document.getElementById('conversationsListModal').innerHTML = '';
  }
}

// Function to reset settings to default
function resetSettings() {
  localStorage.removeItem('theme');
  localStorage.removeItem('termsAccepted');
  localStorage.removeItem('memories');
  localStorage.removeItem('notes');
  localStorage.removeItem('conversations');
  localStorage.removeItem('conversationHistory');
  // Reload the page to apply defaults
  location.reload();
}

// Function to save theme preference
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
}

// Load memories and conversations on page load
document.addEventListener('DOMContentLoaded', () => {
  loadMemories();
  loadConversations();
  loadNotes();
});

// Function to load memories into sidebar
function loadMemories() {
  const memoriesList = document.getElementById('memoriesList');
  memoriesList.innerHTML = '';
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.forEach((memory, index) => {
    const memoryItem = document.createElement('div');
    memoryItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    memoryItem.innerHTML = `
      <span>${memory}</span>
      <button class="removeMemoryButton text-red-500 hover:text-red-700" title="Remove Memory">
        <i data-feather="trash-2"></i>
      </button>
    `;
    memoriesList.appendChild(memoryItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = memoriesList.querySelectorAll('.removeMemoryButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeMemory(index);
      loadMemories();
      loadMemoriesModal();
    });
  });
}

// Function to load conversations into sidebar
function loadConversations() {
  const conversationsList = document.getElementById('conversationsList');
  conversationsList.innerHTML = '';
  const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
  conversations.forEach((conversation, index) => {
    const conversationItem = document.createElement('div');
    conversationItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    conversationItem.innerHTML = `
      <span>${conversation}</span>
      <button class="removeConversationButton text-red-500 hover:text-red-700" title="Remove Conversation">
        <i data-feather="trash-2"></i>
      </button>
    `;
    conversationsList.appendChild(conversationItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = conversationsList.querySelectorAll('.removeConversationButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeConversation(index);
      loadConversations();
      loadConversationsModal();
    });
  });
}

// Function to load notes into sidebar (if applicable)
function loadNotes() {
  const savedNotes = document.getElementById('savedNotes');
  savedNotes.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'flex items-center justify-between bg-gray-200 text-gray-800 p-2 rounded';
    noteItem.innerHTML = `
      <span>${note}</span>
      <button class="removeNoteButton text-red-500 hover:text-red-700" title="Remove Note">
        <i data-feather="trash-2"></i>
      </button>
    `;
    savedNotes.appendChild(noteItem);
  });
  feather.replace();

  // Attach event listeners to remove buttons
  const removeButtons = savedNotes.querySelectorAll('.removeNoteButton');
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      removeNote(index);
      loadNotes();
      loadNotesModal();
    });
  });
}
