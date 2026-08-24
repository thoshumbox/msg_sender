const form = document.getElementById("messageForm");

const webhookInput = document.getElementById("webhook");
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
  buttonText.textContent = loading ? "Sending..." : "Send Message";
}

function isValidWebhook(url) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "https:" &&
      (
        parsed.hostname === "discord.com" ||
        parsed.hostname === "discordapp.com"
      ) &&
      parsed.pathname.includes("/api/webhooks/")
    );
  } catch {
    return false;
  }
}

function updateImagePreview() {
  const url = imageInput.value.trim();

  if (!url) {
    preview.classList.add("hidden");
    previewImage.removeAttribute("src");
    return;
  }

  try {
    new URL(url);
  } catch {
    preview.classList.add("hidden");
    return;
  }

  previewImage.src = url;
  preview.classList.remove("hidden");
}

imageInput.addEventListener("input", updateImagePreview);

previewImage.addEventListener("error", () => {
  preview.classList.add("hidden");
});

messageInput.addEventListener("input", () => {
  updateCharacterCount();
  statusText.textContent = messageInput.value.trim()
    ? "Message ready"
    : "Ready";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const webhook = webhookInput.value.trim();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  const image = imageInput.value.trim();

  if (!isValidWebhook(webhook)) {
    showResult(
      "Please enter a valid Discord webhook URL.",
      "error"
    );
    return;
  }

  if (!message) {
    showResult(
      "Please enter a message.",
      "error"
    );
    return;
  }

  if (message.length > 2000) {
    showResult(
      "Your message is longer than 2000 characters.",
      "error"
    );
    return;
  }

  const payload = {
    content: message
  };

  if (username) {
    payload.username = username;
  }

  // Optional image using a Discord embed.
  if (image) {
    try {
      new URL(image);

      payload.embeds = [
        {
          image: {
            url: image
          }
        }
      ];
    } catch {
      showResult(
        "The image URL is not valid.",
        "error"
      );
      return;
    }
  }

  setLoading(true);
  statusText.textContent = "Sending...";
  result.classList.add("hidden");

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = `Webhook returned HTTP ${response.status}.`;

      try {
        const data = await response.json();

        if (data.message) {
          errorMessage += ` ${data.message}`;
        }
      } catch {
        // Response wasn't JSON.
      }

      throw new Error(errorMessage);
    }

    showResult(
      "Message sent successfully.",
      "success"
    );

    statusText.textContent = "Sent";
  } catch (error) {
    console.error(error);

    showResult(
      `Could not send the message. ${error.message}`,
      "error"
    );

    statusText.textContent = "Failed";
  } finally {
    setLoading(false);
  }
});

updateCharacterCount();
