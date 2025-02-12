import config from "./config.js";
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const newChatButton = document.querySelector("#new-chat-btn"); // New button
const faq = document.querySelector("#faq_section");
const faqbutton = document.querySelectorAll(".faq-btn");
const faqNav = document.querySelector(".faq_section");
const faqSection = document.querySelector("#faq_section");
let userText = null;

const API_KEY = config.API_KEY; // Paste your API key here

const loadDataFromLocalstorage = () => {
  // Load saved chats and theme from local storage and apply/add on the page
  const themeColor = localStorage.getItem("themeColor");
  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
  const defaultText = `<div class="default-text">
                            <h1>ZOVE Ai</h1>
                            <h2>Hello, Welcome!</h2>
                            <h4>How can I help you today?</h4>
                        </div>`;
  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
};
const createChatElement = (content, className) => {
  // Create new div and apply chat, specified class and set html content of div
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv; // Return the created chat div
};
const getChatResponse = async (incomingChatDiv) => {
  // const API_URL = "https://api.openai.com/v1/completions"
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const pElement = document.createElement("p");
  // Define the properties and data for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: userText }],
        },
      ],
    }),
  };
  // Send POST request to API, get response and set the reponse as paragraph element text
  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    console.log(response);

    pElement.textContent =
      response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g);
  } catch (error) {
    // Add error class to the paragraph element and set error text
    pElement.classList.add("error");
    pElement.textContent =
      "Oops! Something went wrong while retrieving the response. Please try again.";
  }
  // console.log("API Response:", data);
  // Remove the typing animation, append the paragraph element and save the chats to local storage
  incomingChatDiv.querySelector(".typing-animation").remove();
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
  localStorage.setItem("all-chats", chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};
const copyResponse = (copyBtn) => {
  // Copy the text content of the response to the clipboard
  const reponseTextElement = copyBtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(reponseTextElement.textContent);
  copyBtn.textContent = "done";
  setTimeout(() => (copyBtn.textContent = "content_copy"), 100);
};
const showTypingAnimation = () => {
  // Display the typing animation and call the getChatResponse function
  const html = `<div class="chat-content">
                    <div class="chat-details">
                  <img src="https://res.cloudinary.com/de5sm2jjl/image/upload/v1739154920/DALL_E_2025-02-10_03.34.32_-_A_futuristic_AI_logo_for_ZOVE_in_dark_blue._The_logo_features_a_sleek_geometric_brain_icon_symbolizing_artificial_intelligence_with_interconnected_scw0bu.webp" alt="user-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span class=" copy-btn material-symbols-rounded">content_copy</span>
                </div>`;
  // Create an incoming chat div with typing animation and append it to chat container
  const incomingChatDiv = createChatElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  const copyButton = incomingChatDiv.querySelector(".copy-btn");
  copyButton.addEventListener("click", () => copyResponse(copyButton));
  getChatResponse(incomingChatDiv);
};
const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
  if (!userText) return; // If chatInput is empty return from here
  // Clear the input field and reset its height
  chatInput.value = "";
  chatInput.style.height = `${initialInputHeight}px`;
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="https://res.cloudinary.com/de5sm2jjl/image/upload/v1739265730/user_kjpbvs.jpg" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;
  // Create an outgoing chat div with user's message and append it to chat container
  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};
//   / Add new function to handle new chat creation
const createNewChat = () => {
  const defaultText = `<div class="default-text">
                            <h1>ZOVE Ai</h1>
                            <h2>Hello, Welcome!</h2>
                            <h4>How can I help you today?</h4>
                        </div>`;
  // Save current chat if needed
  const currentChat = localStorage.getItem("all-chats");
  if (currentChat) {
    const timestamp = new Date().getTime();
    localStorage.setItem(`chat-${timestamp}`, currentChat);
  }

  // Clear current chat and show default message
  localStorage.removeItem("all-chats");
  chatContainer.innerHTML = defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};
// Add event listener for new chat button
newChatButton.addEventListener("click", createNewChat);

deleteButton.addEventListener("click", () => {
  // Remove the chats from local storage and call loadDataFromLocalstorage function
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
});
themeButton.addEventListener("click", () => {
  // Toggle body's class for the theme mode and save the updated theme to the local storage
  document.body.classList.toggle("light-mode");
  localStorage.setItem("themeColor", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});
const initialInputHeight = chatInput.scrollHeight;
chatInput.addEventListener("input", () => {
  // Adjust the height of the input field dynamically based on its content
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
  // If the Enter key is pressed without Shift and the window width is larger
  // than 800 pixels, handle the outgoing chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});
loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);

faq.addEventListener("click", function (e) {
  const clicked = e.target.closest(".faq-btn");

  if (!clicked) return;

  faqbutton.forEach((btn) => {
    if (btn !== clicked) {
      btn.nextElementSibling.classList.remove("open");
      btn.querySelector(".icon").textContent = "+";
    }
  });

  const detail = clicked.nextElementSibling;
  const icon = clicked.querySelector(".icon");

  detail.classList.toggle("open");
  icon.textContent = detail.classList.contains("open") ? "-" : "+";
});

faqNav.addEventListener("click", function (e) {
  e.preventDefault();
  faqSection.scrollIntoView({ behavior: "smooth" });
});
