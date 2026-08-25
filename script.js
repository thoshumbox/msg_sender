const FUCKING_WEBHOOK_URL = "https://discord.com/api/webhooks/1541638515077685288/WY-isvl6ymHdmcbc-4HqzSNZN1qnp4eFlivtcxTnZamstDXkp7oqCeMBvS_l_ViAP9vQ";

const FUCKING_FORM = document.getElementById("messageForm");

const FUCKING_USERNAME =
  document.getElementById("username");
const FUCKING_MESSAGE =
  document.getElementById("message");
const FUCKING_IMAGE =
  document.getElementById("image");
const FUCKING_CHAR_COUNT =
  document.getElementById("charCount");
const FUCKING_STATUS =
  document.getElementById("status");
const FUCKING_SEND_BUTTON =
  document.getElementById("sendButton");
const FUCKING_BUTTON_TEXT =
  document.getElementById("buttonText");
const FUCKING_SPINNER =
  document.getElementById("spinner");
const FUCKING_RESULT =
  document.getElementById("result");
const FUCKING_PREVIEW =
  document.getElementById("preview");
const FUCKING_PREVIEW_IMAGE =
  document.getElementById("previewImage");
const FUCKING_FILE_NAME =
  document.getElementById("fileName");

let HOLY_SHIT_IMAGE = null;
let GODDAMN_PREVIEW_URL = null;

function updateFuckingCharacterCount() {
  FUCKING_CHAR_COUNT.textContent =
    FUCKING_MESSAGE.value.length;
}

function showFuckingResult(message, type) {
  FUCKING_RESULT.textContent = message;
  FUCKING_RESULT.className =
    `result ${type}`;
}

function fuckingSetLoading(loading) {
  FUCKING_SEND_BUTTON.disabled = loading;

  FUCKING_SPINNER.classList.toggle(
    "hidden",
    !loading
  );

  FUCKING_BUTTON_TEXT.textContent =
    loading
      ? "sending"
      : "send msg ig";
}

function whatTheFuckIsTheFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

FUCKING_IMAGE.addEventListener(
  "change",
  () => {

    const HOLY_FUCKING_FILE =
      FUCKING_IMAGE.files[0];

    if (GODDAMN_PREVIEW_URL) {
      URL.revokeObjectURL(
        GODDAMN_PREVIEW_URL
      );

      GODDAMN_PREVIEW_URL = null;
    }

    HOLY_SHIT_IMAGE = null;

    FUCKING_PREVIEW.classList.add(
      "hidden"
    );

    FUCKING_FILE_NAME.classList.add(
      "hidden"
    );

    FUCKING_PREVIEW_IMAGE.removeAttribute(
      "src"
    );

    FUCKING_FILE_NAME.textContent = "";

    if (!HOLY_FUCKING_FILE) {
      FUCKING_STATUS.textContent =
        FUCKING_MESSAGE.value.trim()
          ? "message ready innit"
          : "ready";

      return;
    }

    if (
      !HOLY_FUCKING_FILE.type.startsWith(
        "image/"
      )
    ) {

      showFuckingResult(
        "go select a fucking image",
        "error"
      );

      FUCKING_IMAGE.value = "";

      return;
    }

    if (
      HOLY_FUCKING_FILE.size >
      10 * 1024 * 1024
    ) {

      showFuckingResult(
        "nigga image too big like yo mama go under 10mb or something",
        "error"
      );

      FUCKING_IMAGE.value = "";

      return;
    }

    HOLY_SHIT_IMAGE =
      HOLY_FUCKING_FILE;

    FUCKING_FILE_NAME.textContent =
      `${HOLY_FUCKING_FILE.name} (${whatTheFuckIsTheFileSize(
        HOLY_FUCKING_FILE.size
      )})`;

    FUCKING_FILE_NAME.classList.remove(
      "hidden"
    );

    GODDAMN_PREVIEW_URL =
      URL.createObjectURL(
        HOLY_FUCKING_FILE
      );

    FUCKING_PREVIEW_IMAGE.src =
      GODDAMN_PREVIEW_URL;

    FUCKING_PREVIEW.classList.remove(
      "hidden"
    );

    FUCKING_STATUS.textContent =
      "image ready, fucking finally";
  }
);

FUCKING_MESSAGE.addEventListener(
  "input",
  () => {

    updateFuckingCharacterCount();

    if (FUCKING_MESSAGE.value.trim()) {

      FUCKING_STATUS.textContent =
        "message ready";

    } else if (HOLY_SHIT_IMAGE) {

      FUCKING_STATUS.textContent =
        "image ready";

    } else {

      FUCKING_STATUS.textContent =
        "ready, apparently";
    }
  }
);

FUCKING_FORM.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const FUCKING_USERNAME =
      FUCKING_USERNAME_INPUT_VALUE();

    const FUCKING_TEXT =
      FUCKING_MESSAGE.value.trim();

    if (
      !FUCKING_TEXT &&
      !HOLY_SHIT_IMAGE
    ) {

      showFuckingResult(
        "add a fuckin msg or image",
        "error"
      );

      FUCKING_STATUS.textContent =
        "nothing to fucking send";

      return;
    }

    if (
      FUCKING_TEXT.length > 2000
    ) {

      showFuckingResult(
        "your fucking message fucking is fucking too fucking long",
        "error"
      );

      return;
    }

    fuckingSetLoading(true);

    FUCKING_STATUS.textContent =
      "sending shit";

    FUCKING_RESULT.classList.add(
      "hidden"
    );

    try {

      const FUCKING_FORM_DATA =
        new FormData();

      const FUCKING_PAYLOAD = {};

      if (FUCKING_TEXT) {
        FUCKING_PAYLOAD.content =
          FUCKING_TEXT;
      }

      if (FUCKING_USERNAME) {
        FUCKING_PAYLOAD.username =
          FUCKING_USERNAME;
      }

      FUCKING_FORM_DATA.append(
        "payload_json",
        JSON.stringify(
          FUCKING_PAYLOAD
        )
      );

      if (HOLY_SHIT_IMAGE) {

        FUCKING_FORM_DATA.append(
          "files[0]",
          HOLY_SHIT_IMAGE,
          HOLY_SHIT_IMAGE.name
        );
      }

      const FUCKING_RESPONSE =
        await fetch(
          FUCKING_WEBHOOK_URL,
          {
            method: "POST",
            body: FUCKING_FORM_DATA
          }
        );

      if (!FUCKING_RESPONSE.ok) {

        let FUCKING_ERROR =
          `discord said fuck off with HTTP ${FUCKING_RESPONSE.status}.`;

        try {

          const FUCKING_DATA =
            await FUCKING_RESPONSE.json();

          if (FUCKING_DATA.message) {
            FUCKING_ERROR +=
              ` ${FUCKING_DATA.message}`;
          }

        } catch {
        }

        throw new Error(
          FUCKING_ERROR
        );
      }

      showFuckingResult(
        "msg sent wow",
        "success"
      );

      FUCKING_STATUS.textContent =
        "sent somehow ig";

      FUCKING_MESSAGE.value = "";
      FUCKING_IMAGE.value = "";

      HOLY_SHIT_IMAGE = null;

      if (GODDAMN_PREVIEW_URL) {

        URL.revokeObjectURL(
          GODDAMN_PREVIEW_URL
        );

        GODDAMN_PREVIEW_URL = null;
      }

      FUCKING_PREVIEW_IMAGE
        .removeAttribute("src");

      FUCKING_PREVIEW
        .classList.add("hidden");

      FUCKING_FILE_NAME
        .classList.add("hidden");

      FUCKING_FILE_NAME.textContent = "";

      updateFuckingCharacterCount();

    } catch (FUCKING_ERROR) {

      console.error(
        "something broke nigga:",
        FUCKING_ERROR
      );

      showFuckingResult(
        `ccould not even send the fucking thing ${FUCKING_ERROR.message}`,
        "error"
      );

      FUCKING_STATUS.textContent =
        "failed boohoo";

    } finally {

      fuckingSetLoading(false);
    }
  }
);

function FUCKING_USERNAME_INPUT_VALUE() {
  return document
    .getElementById("username")
    .value
    .trim();
}

updateFuckingCharacterCount();
