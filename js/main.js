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
  function appendMessage(role, content, imageUrl = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-2 mb-2';

    const imgElement = document.createElement('img');
    imgElement.className = 'w-10 h-10 rounded-full';
    imgElement.src = imageUrl || 'https://picsum.photos/40'; // Default image
    imgElement.alt = `${role} avatar`;

    const textDiv = document.createElement('div');
    textDiv.className = 'flex flex-col';

    const contentDiv = document.createElement('div');
    if (role === 'user') {
      contentDiv.className = 'bg-blue-500 text-white p-2 rounded-lg max-w-xs';
    } else if (role === 'assistant') {
      contentDiv.className = 'bg-gray-700 text-white p-2 rounded-lg max-w-xs';
    } else if (role === 'system') {
      contentDiv.className = 'bg-yellow-500 text-white p-2 rounded-lg max-w-xs';
    }
    contentDiv.textContent = content;

    textDiv.appendChild(contentDiv);
    messageDiv.appendChild(imgElement);
    messageDiv.appendChild(textDiv);
    toolOutput.appendChild(messageDiv);
    toolOutput.scrollTop = toolOutput.scrollHeight;
  }

  submitButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message === '') return;

    // Append user message with a user avatar
    appendMessage('user', message, 'https://picsum.photos/seed/user/40');
    userInput.value = '';

    // Placeholder for AI response
    setTimeout(() => {
      const aiResponse = `You said: "${message}"`;
      appendMessage('assistant', aiResponse, 'https://picsum.photos/seed/assistant/40');
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
  const popoutMenu = document.getElementById('popoutMenu');

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
            <div class="p-4">
              <p class="mb-4">Welcome to the Guides section. Here you can find tutorials and documentation to help you get the most out of Compass AI.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/guide1/60" alt="Getting Started" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Getting Started</h4>
                    <p class="text-sm text-gray-600">Learn how to set up and use Compass AI.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/guide2/60" alt="Advanced Features" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Advanced Features</h4>
                    <p class="text-sm text-gray-600">Explore the advanced capabilities of the tool.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/guide3/60" alt="FAQs" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">FAQs</h4>
                    <p class="text-sm text-gray-600">Find answers to common questions.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/guide4/60" alt="User Tips" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">User Tips</h4>
                    <p class="text-sm text-gray-600">Optimize your experience with expert tips.</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;
        case 'memories':
          title = 'Memories';
          content = `
            <div class="p-4">
              <p class="mb-4">This is the Memories section. Here you can review and manage your saved memories.</p>
              <div id="memoriesListModal" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Memory Items will be appended here dynamically -->
              </div>
              <button id="addMemoryButton" class="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center space-x-2">
                <i data-feather="plus"></i>
                <span>Add Memory</span>
              </button>
            </div>
          `;
          break;
        case 'instructions':
          title = 'Instructions';
          content = `
            <div class="p-4">
              <p class="mb-4">Instructions on how to use Compass AI:</p>
              <ol class="list-decimal list-inside space-y-2">
                <li>Enter your query in the input area.</li>
                <li>Click the submit button or press Enter to send.</li>
                <li>View responses in the output area.</li>
                <li>Use the menu for additional tools and settings.</li>
              </ol>
              <img src="https://picsum.photos/seed/instructions/400/200" alt="Instructions Image" class="mt-4 w-full rounded">
            </div>
          `;
          break;
        case 'notes':
          title = 'Notes';
          content = `
            <div class="p-4">
              <p class="mb-4">This is the Notes section. You can add personal notes and reminders here.</p>
              <div class="flex flex-col space-y-4">
                <textarea id="userNote" class="w-full p-2 rounded bg-gray-200 text-gray-800" rows="4" placeholder="Write your notes here..."></textarea>
                <button id="saveNoteButton" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center space-x-2">
                  <i data-feather="save"></i>
                  <span>Save Note</span>
                </button>
              </div>
              <div id="savedNotes" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Saved Notes will be displayed here -->
              </div>
            </div>
          `;
          break;
        case 'tools':
          title = 'Tools';
          content = `
            <div class="p-4">
              <p class="mb-4">Explore various AI tools available within Compass AI:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/tool1/60" alt="Summarizer" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Summarizer</h4>
                    <p class="text-sm text-gray-600">Condense lengthy texts into concise summaries.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/tool2/60" alt="Chatty" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Chatty</h4>
                    <p class="text-sm text-gray-600">Engage in interactive conversations.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/tool3/60" alt="Articulator" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Articulator</h4>
                    <p class="text-sm text-gray-600">Enhance your explanations and communications.</p>
                  </div>
                </div>
                <div class="bg-white rounded shadow p-4 flex items-center space-x-4">
                  <img src="https://picsum.photos/seed/tool4/60" alt="Translator" class="w-16 h-16 rounded">
                  <div>
                    <h4 class="font-semibold">Translator</h4>
                    <p class="text-sm text-gray-600">Translate text between multiple languages.</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          break;
        case 'conversations':
          title = 'Conversations';
          content = `
            <div class="p-4">
              <p class="mb-4">Review your past conversations and interactions here.</p>
              <div id="conversationsListModal" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Conversation Items will be appended here dynamically -->
              </div>
              <button id="addConversationButton" class="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center space-x-2">
                <i data-feather="plus"></i>
                <span>Add Conversation</span>
              </button>
            </div>
          `;
          break;
        case 'settings':
          title = 'Settings';
          content = `
            <div class="p-4">
              <p class="mb-4">Adjust your Compass AI settings:</p>
              <div class="space-y-6">
                <!-- Theme Settings -->
                <div>
                  <h3 class="font-semibold mb-2">Theme</h3>
                  <div class="flex space-x-4">
                    <button id="modalThemeLight" class="px-4 py-2 bg-white text-gray-800 rounded shadow flex items-center space-x-2">
                      <i data-feather="sun"></i>
                      <span>Light</span>
                    </button>
                    <button id="modalThemeDark" class="px-4 py-2 bg-gray-800 text-white rounded shadow flex items-center space-x-2">
                      <i data-feather="moon"></i>
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
                <!-- Conversation History Settings -->
                <div>
                  <h3 class="font-semibold mb-2">Conversation History</h3>
                  <div class="flex items-center space-x-2">
                    <input type="checkbox" id="conversationHistoryToggle" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    <label for="conversationHistoryToggle" class="cursor-pointer">Enable Conversation History</label>
                  </div>
                </div>
                <!-- Additional Settings -->
                <div>
                  <h3 class="font-semibold mb-2">Advanced Settings</h3>
                  <button id="resetSettingsButton" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center space-x-2">
                    <i data-feather="refresh-cw"></i>
                    <span>Reset to Defaults</span>
                  </button>
                </div>
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
      feather.replace(); // Reinitialize Feather Icons
      // Load dynamic content if necessary
      if (menuName === 'memories') {
        loadMemoriesModal();
      } else if (menuName === 'notes') {
        loadNotesModal();
      } else if (menuName === 'conversations') {
        loadConversationsModal();
      }
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
        loadMemories(); // Update sidebar if applicable
      }
    }

    if (event.target.id === 'saveNoteButton') {
      const noteContent = document.getElementById('userNote').value.trim();
      if (noteContent) {
        saveNote(noteContent);
        loadNotesModal();
        loadNotes(); // Update sidebar if applicable
      }
    }

    if (event.target.id === 'addConversationButton') {
      const conversationTitle = prompt('Enter conversation title:');
      if (conversationTitle) {
        addConversation(conversationTitle);
        loadConversationsModal();
        loadConversations(); // Update sidebar if applicable
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

    // Handle removing memories, notes, and conversations
    if (event.target.closest('.removeMemoryButton')) {
      const index = Array.from(document.querySelectorAll('.removeMemoryButton')).indexOf(event.target.closest('.removeMemoryButton'));
      removeMemory(index);
      loadMemoriesModal();
      loadMemories();
    }

    if (event.target.closest('.removeNoteButton')) {
      const index = Array.from(document.querySelectorAll('.removeNoteButton')).indexOf(event.target.closest('.removeNoteButton'));
      removeNote(index);
      loadNotesModal();
      loadNotes();
    }

    if (event.target.closest('.removeConversationButton')) {
      const index = Array.from(document.querySelectorAll('.removeConversationButton')).indexOf(event.target.closest('.removeConversationButton'));
      removeConversation(index);
      loadConversationsModal();
      loadConversations();
    }
  });
});

// Function to add a memory with an image
function addMemory(content) {
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  const memory = {
    id: Date.now(),
    content: content,
    image: `https://picsum.photos/seed/memory${Date.now()}/200/150`,
  };
  memories.push(memory);
  localStorage.setItem('memories', JSON.stringify(memories));
}

// Function to load memories into modal
function loadMemoriesModal() {
  const memoriesListModal = document.getElementById('memoriesListModal');
  memoriesListModal.innerHTML = '';
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.forEach((memory, index) => {
    const memoryItem = document.createElement('div');
    memoryItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    memoryItem.innerHTML = `
      <img src="${memory.image}" alt="Memory Image" class="w-24 h-24 rounded object-cover">
      <div class="flex-1">
        <p class="text-gray-800">${memory.content}</p>
        <button class="removeMemoryButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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
      loadMemories();
    });
  });
}

// Function to remove a memory
function removeMemory(index) {
  let memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.splice(index, 1);
  localStorage.setItem('memories', JSON.stringify(memories));
}

// Function to save a note with an image
function saveNote(content) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const note = {
    id: Date.now(),
    content: content,
    image: `https://picsum.photos/seed/note${Date.now()}/200/150`,
  };
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes into modal
function loadNotesModal() {
  const savedNotes = document.getElementById('savedNotes');
  savedNotes.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    noteItem.innerHTML = `
      <img src="${note.image}" alt="Note Image" class="w-24 h-24 rounded object-cover">
      <div class="flex-1">
        <p class="text-gray-800">${note.content}</p>
        <button class="removeNoteButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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
      loadNotes();
    });
  });
}

// Function to remove a note
function removeNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add a conversation with an image
function addConversation(title) {
  const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
  const conversation = {
    id: Date.now(),
    title: title,
    image: `https://picsum.photos/seed/conversation${Date.now()}/200/150`,
  };
  conversations.push(conversation);
  localStorage.setItem('conversations', JSON.stringify(conversations));
}

// Function to load conversations into modal
function loadConversationsModal() {
  const conversationsListModal = document.getElementById('conversationsListModal');
  conversationsListModal.innerHTML = '';
  const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
  conversations.forEach((conversation, index) => {
    const conversationItem = document.createElement('div');
    conversationItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    conversationItem.innerHTML = `
      <img src="${conversation.image}" alt="Conversation Image" class="w-24 h-24 rounded object-cover">
      <div class="flex-1">
        <h4 class="text-gray-800 font-semibold">${conversation.title}</h4>
        <button class="removeConversationButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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
      loadConversations();
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
    memoryItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    memoryItem.innerHTML = `
      <img src="${memory.image}" alt="Memory Image" class="w-16 h-16 rounded object-cover">
      <div class="flex-1">
        <p class="text-gray-800">${memory.content}</p>
        <button class="removeMemoryButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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
    conversationItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    conversationItem.innerHTML = `
      <img src="${conversation.image}" alt="Conversation Image" class="w-16 h-16 rounded object-cover">
      <div class="flex-1">
        <h4 class="text-gray-800 font-semibold">${conversation.title}</h4>
        <button class="removeConversationButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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

// Function to load notes into sidebar
function loadNotes() {
  const savedNotes = document.getElementById('savedNotes');
  savedNotes.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'bg-white rounded shadow p-4 flex items-start space-x-4';
    noteItem.innerHTML = `
      <img src="${note.image}" alt="Note Image" class="w-16 h-16 rounded object-cover">
      <div class="flex-1">
        <p class="text-gray-800">${note.content}</p>
        <button class="removeNoteButton text-red-500 hover:text-red-700 mt-2 flex items-center space-x-1">
          <i data-feather="trash-2"></i>
          <span>Remove</span>
        </button>
      </div>
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
