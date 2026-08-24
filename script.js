const WEBHOOK_URL = "https://discord.com/api/webhooks/1495800910792753257/PnW9TWGmtOoMFN5F3LKPDrl3bJztBbZsnB1VQcCUvQk_ky92X81FTltUBwbaC1uBhgBN";

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
  buttonText.textContent = loading ? "sending" : "send msg ig";
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

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  const image = imageInput.value.trim();

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

  const payload = {
    content: message
  };

  if (username) {
    payload.username = username;
  }

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
        "halaa image url not valid",
        "error"
      );
      return;
    }
  }

  setLoading(true);
  statusText.textContent = "sending ok js wait";
  result.classList.add("hidden");

  try {
    const response = await fetch(WEBHOOK_URL, {
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
      "msg sent",
      "success"
    );

    statusText.textContent = "Sent";
    messageInput.value = "";
    updateCharacterCount();

  } catch (error) {
    console.error(error);

    showResult(
      `couldnt even send the fucking message. ${error.message}`,
      "error"
    );

    statusText.textContent = "Failed";
  } finally {
    setLoading(false);
  }
});

updateCharacterCount();
