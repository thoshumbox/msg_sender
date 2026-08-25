const WEBHOOK_URL = "YOUR_NEW_DISCORD_WEBHOOK_URL";

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

function updateCharacterCount() {
  charCount.textContent = messageInput.value.length;
}

function showResult(message, type) {
  result.textContent = message;
  result.className = `result ${type}`;
}

function setLoading(loading) {
  sendButton.disabled = loading;
  spinner.classList.toggle("hidden", !loading);
  buttonText.textContent = loading
    ? "sending"
    : "send msg ig";
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

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
    statusText.textContent = messageInput.value.trim()
      ? "message ready innit"
      : "ready";
    return;
  }

  if (!file.type.startsWith("image/")) {
    showResult(
      "go select image file or something",
      "error"
    );

    imageInput.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showResult(
      "image is too fucking big nigga keep it under 10 MB",
      "error"
    );

    imageInput.value = "";
    return;
  }

  selectedImage = file;

  fileName.textContent =
    `${file.name} (${formatFileSize(file.size)})`;

  fileName.classList.remove("hidden");

  previewUrl = URL.createObjectURL(file);

  previewImage.src = previewUrl;
  preview.classList.remove("hidden");

  statusText.textContent = "Image ready";
});

messageInput.addEventListener("input", () => {
  updateCharacterCount();

  if (messageInput.value.trim()) {
    statusText.textContent = "message ready";
  } else if (selectedImage) {
    statusText.textContent = "image ready";
  } else {
    statusText.textContent = "ready";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!message && !selectedImage) {
    showResult(
      "bitch add a message or an image",
      "error"
    );

    statusText.textContent = "nothing to send (omg lobcorp ref)";
    return;
  }

  if (message.length > 2000) {
    showResult(
      "innit your fucking mssage is too fucking long.",
      "error"
    );

    return;
  }

  setLoading(true);

  statusText.textContent = "sending ok js wait";
  result.classList.add("hidden");

  try {
    const formData = new FormData();

    const payload = {};

    if (message) {
      payload.content = message;
    }

    if (username) {
      payload.username = username;
    }

    formData.append(
      "payload_json",
      JSON.stringify(payload)
    );

    if (selectedImage) {
      formData.append(
        "files[0]",
        selectedImage,
        selectedImage.name
      );
    }

    const response = await fetch(
      WEBHOOK_URL,
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      let errorMessage =
        `Webhook returned HTTP ${response.status}.`;

      try {
        const data = await response.json();

        if (data.message) {
          errorMessage += ` ${data.message}`;
        }
      } catch {
      }

      throw new Error(errorMessage);
    }

    showResult(
      "msg sent",
      "success"
    );

    statusText.textContent = "Sent";

    messageInput.value = "";
    imageInput.value = "";

    selectedImage = null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
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

    statusText.textContent = "failed";

  } finally {
    setLoading(false);
  }
});

updateCharacterCount();
