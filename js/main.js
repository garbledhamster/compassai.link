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
  });

  themeDark.addEventListener('click', () => {
    document.documentElement.classList.add('dark');
    document.body.classList.remove('bg-gray-200', 'text-gray-800');
    document.body.classList.add('bg-gray-800', 'text-white');
  });

  // Theme Toggle Logic for Mobile (if applicable)
  // If you have mobile theme buttons, add similar logic here
});

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

      // Define mock content based on menu name
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
            <p><em>Note: Currently, this is mock content.</em></p>
            <ul class="list-disc list-inside">
              <li>Memory 1: Remember to check the project status.</li>
              <li>Memory 2: Schedule a meeting with the team.</li>
              <li>Memory 3: Update the documentation.</li>
            </ul>
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
            <p><em>Note: Currently, this is mock content.</em></p>
            <textarea class="w-full p-2 rounded bg-gray-200 text-gray-800" placeholder="Write your notes here..."></textarea>
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
            <p><em>Note: Currently, this is mock content.</em></p>
            <ul class="list-disc list-inside">
              <li>Conversation 1: Discussed project timelines.</li>
              <li>Conversation 2: Brainstormed marketing strategies.</li>
              <li>Conversation 3: Reviewed product features.</li>
            </ul>
          `;
          break;
        case 'settings':
          title = 'Settings';
          content = `
            <p>Adjust your Compass AI settings:</p>
            <ul class="list-disc list-inside">
              <li><strong>Theme:</strong> Switch between Light and Dark modes.</li>
              <li><strong>Notifications:</strong> Manage notification preferences.</li>
              <li><strong>Account:</strong> Update your account details.</li>
            </ul>
            <div class="mt-4">
              <h3 class="font-semibold">Account Settings</h3>
              <button class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Change Password</button>
              <button class="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Delete Account</button>
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
});
