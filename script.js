const WEBHOOK_URL = "https://discord.com/api/webhooks/1541638515077685288/WY-isvl6ymHdmcbc-4HqzSNZN1qnp4eFlivtcxTnZamstDXkp7oqCeMBvS_l_ViAP9vQ";

const form = document.getElementById("messageForm");

const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const imageInput = document.getElementById("image");

const charCount = document.getElementById("charCount");
const statusText = document.getElementById("status");

const sendButton = document.getElementById("sendButton");
const buttonText = document.getElementById("buttonText");
const spinner = document.getElementById("spinner");

const result = document.getElementById("result");

const preview = document.getElementById("preview");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");

let selectedImage = null;
let previewUrl = null;


// -------------------------
// Character counter
// -------------------------

function updateCharacterCount() {
  charCount.textContent = messageInput.value.length;
}


// -------------------------
// Result message
// -------------------------

function showResult(message, type) {
  result.textContent = message;
  result.className = `result ${type}`;
}


// -------------------------
// Loading state
// -------------------------

function setLoading(loading) {
  sendButton.disabled = loading;

  spinner.classList.toggle(
    "hidden",
    !loading
  );

  buttonText.textContent = loading
    ? "sending"
    : "send msg ig";
}


// -------------------------
// Image selection
// -------------------------

imageInput.addEventListener("change", () => {

  const file = imageInput.files[0];

  // Remove old preview URL
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }

  selectedImage = null;

  preview.classList.add("hidden");
  fileName.classList.add("hidden");

  previewImage.removeAttribute("src");
  fileName.textContent = "";

  if (!file) {
    return;
  }

  // Make sure it is actually an image
  if (!file.type.startsWith("image/")) {

    showResult(
      "please select an image file",
      "error"
    );

    imageInput.value = "";
    return;
  }


  // 10 MB limit
  if (file.size > 10 * 1024 * 1024) {

    showResult(
      "image is too fucking big. keep it under 10 MB",
      "error"
    );

    imageInput.value = "";
    return;
  }


  selectedImage = file;


  // Show filename
  fileName.textContent =
    `${file.name} (${formatFileSize(file.size)})`;

  fileName.classList.remove("hidden");


  // Create local preview
  previewUrl = URL.createObjectURL(file);

  previewImage.src = previewUrl;

  preview.classList.remove("hidden");
});


// -------------------------
// File size formatting
// -------------------------

function formatFileSize(bytes) {

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


// -------------------------
// Message input
// -------------------------

messageInput.addEventListener("input", () => {

  updateCharacterCount();

  statusText.textContent =
    messageInput.value.trim()
      ? "Message ready"
      : "Ready";
});


// -------------------------
// Submit
// -------------------------

form.addEventListener("submit", async (event) => {

  event.preventDefault();


  const username =
    usernameInput.value.trim();

  const message =
    messageInput.value.trim();


  // -------------------------
  // Validation
  // -------------------------

  if (!message) {

    showResult(
      "bro you didnt even type a message",
      "error"
    );

    return;
  }


  if (message.length > 2000) {

    showResult(
      "innit your fucking mssage is too fucking long.",
      "error"
    );

    return;
  }


  // -------------------------
  // Start loading
  // -------------------------

  setLoading(true);

  statusText.textContent =
    "sending ok js wait";

  result.classList.add("hidden");


  try {

    // Discord webhook uses multipart/form-data
    // when uploading files.

    const formData = new FormData();


    // -------------------------
    // Discord message payload
    // -------------------------

    const payload = {
      content: message
    };


    // Custom webhook username
    if (username) {
      payload.username = username;
    }


    // -------------------------
    // Attach image
    // -------------------------

    if (selectedImage) {

      payload.embeds = [
        {
          image: {
            url:
              `attachment://${selectedImage.name}`
          }
        }
      ];
    }


    // Discord expects the JSON payload
    // under "payload_json".

    formData.append(
      "payload_json",
      JSON.stringify(payload)
    );


    // Add actual image file
    if (selectedImage) {

      formData.append(
        "files[0]",
        selectedImage,
        selectedImage.name
      );
    }


    // -------------------------
    // Send to Discord
    // -------------------------

    const response = await fetch(
      WEBHOOK_URL,
      {
        method: "POST",
        body: formData
      }
    );


    // -------------------------
    // Handle errors
    // -------------------------

    if (!response.ok) {

      let errorMessage =
        `Webhook returned HTTP ${response.status}.`;


      try {

        const data =
          await response.json();

        if (data.message) {
          errorMessage +=
            ` ${data.message}`;
        }

      } catch {
        // Response wasn't JSON
      }


      throw new Error(errorMessage);
    }


    // -------------------------
    // Success
    // -------------------------

    showResult(
      "msg sent",
      "success"
    );

    statusText.textContent =
      "Sent";


    // Clear message
    messageInput.value = "";


    // Clear image
    imageInput.value = "";

    selectedImage = null;


    // Remove preview
    if (previewUrl) {

      URL.revokeObjectURL(
        previewUrl
      );

      previewUrl = null;
    }

    previewImage.removeAttribute("src");

    preview.classList.add("hidden");

    fileName.classList.add("hidden");

    fileName.textContent = "";


    updateCharacterCount();

  } catch (error) {

    console.error(error);


    showResult(
      `couldnt even send the fucking message. ${error.message}`,
      "error"
    );

    statusText.textContent =
      "Failed";

  } finally {

    setLoading(false);
  }

});


// -------------------------
// Initial setup
// -------------------------

updateCharacterCount();
