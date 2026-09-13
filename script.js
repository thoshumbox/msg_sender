const FUCKING_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1541638515077685288/WY-isvl6ymHdmcbc-4HqzSNZN1qnp4eFlivtcxTnZamstDXkp7oqCeMBvS_l_ViAP9vQ";

const FUCKING_FORM =
  document.getElementById("messageForm");

const FUCKING_USERNAME_INPUT =
  document.getElementById("username");

const FUCKING_MESSAGE =
  document.getElementById("message");

const FUCKING_IMAGE =
  document.getElementById("image");

const FUCKING_PROFILE_PIC =
  document.getElementById("profilePic");

const FUCKING_RESET_PROFILE =
  document.getElementById("resetProfile");

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


// ========================================
// PROFILE
// ========================================

const PROFILE_STORAGE_KEY = "discordWebhookProfile";

const DEFAULT_PROFILE = {
  username: "",
  avatar: ""
};


function loadFuckingProfile() {
  try {
    const saved =
      localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!saved) {
      return DEFAULT_PROFILE;
    }

    const profile = JSON.parse(saved);

    return {
      username:
        typeof profile.username === "string"
          ? profile.username
          : "",
      avatar:
        typeof profile.avatar === "string"
          ? profile.avatar
          : ""
    };

  } catch {
    return DEFAULT_PROFILE;
  }
}


function saveFuckingProfile() {
  const profile = {
    username:
      FUCKING_USERNAME_INPUT.value.trim(),

    avatar:
      FUCKING_PROFILE_PIC.value.trim()
  };

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(profile)
  );
}


function applyFuckingProfile() {
  const profile =
    loadFuckingProfile();

  FUCKING_USERNAME_INPUT.value =
    profile.username;

  FUCKING_PROFILE_PIC.value =
    profile.avatar;
}


function resetFuckingProfile() {
  localStorage.removeItem(
    PROFILE_STORAGE_KEY
  );

  FUCKING_USERNAME_INPUT.value = "";
  FUCKING_PROFILE_PIC.value = "";

  FUCKING_STATUS.textContent =
    "profile reset";

  showFuckingResult(
    "profile reset back to normal",
    "success"
  );
}


// Save profile whenever either profile field changes.

FUCKING_USERNAME_INPUT.addEventListener(
  "input",
  saveFuckingProfile
);

FUCKING_PROFILE_PIC.addEventListener(
  "input",
  saveFuckingProfile
);


// Reset profile button.

FUCKING_RESET_PROFILE.addEventListener(
  "click",
  resetFuckingProfile
);


// Load saved profile when page opens.

applyFuckingProfile();


// ========================================
// CHARACTER COUNT
// ========================================

function updateFuckingCharacterCount() {
  FUCKING_CHAR_COUNT.textContent =
    FUCKING_MESSAGE.value.length;
}


// ========================================
// RESULT
// ========================================

function showFuckingResult(
  message,
  type
) {
  FUCKING_RESULT.textContent =
    message;

  FUCKING_RESULT.className =
    `result ${type}`;

  FUCKING_RESULT.classList.remove(
    "hidden"
  );
}


// ========================================
// LOADING
// ========================================

function fuckingSetLoading(
  loading
) {
  FUCKING_SEND_BUTTON.disabled =
    loading;

  FUCKING_SPINNER.classList.toggle(
    "hidden",
    !loading
  );

  FUCKING_BUTTON_TEXT.textContent =
    loading
      ? "sending"
      : "send msg ig";
}


// ========================================
// FILE SIZE
// ========================================

function whatTheFuckIsTheFileSize(
  bytes
) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}


// ========================================
// IMAGE SELECT
// ========================================

FUCKING_IMAGE.addEventListener(
  "change",
  () => {

    const HOLY_FUCKING_FILE =
      FUCKING_IMAGE.files[0];


    // Clean up old preview URL.

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


    // No image selected.

    if (!HOLY_FUCKING_FILE) {

      FUCKING_STATUS.textContent =
        FUCKING_MESSAGE.value.trim()
          ? "message ready"
          : "ready";

      return;
    }


    // Only allow images.

    if (
      !HOLY_FUCKING_FILE.type.startsWith(
        "image/"
      )
    ) {

      showFuckingResult(
        "please select an image",
        "error"
      );

      FUCKING_IMAGE.value = "";

      return;
    }


    // 10 MB limit.

    if (
      HOLY_FUCKING_FILE.size >
      10 * 1024 * 1024
    ) {

      showFuckingResult(
        "image is too large — keep it under 10 MB",
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
      "image ready";
  }
);


// ========================================
// MESSAGE INPUT
// ========================================

FUCKING_MESSAGE.addEventListener(
  "input",
  () => {

    updateFuckingCharacterCount();

    if (
      FUCKING_MESSAGE.value.trim()
    ) {

      FUCKING_STATUS.textContent =
        "message ready";

    } else if (
      HOLY_SHIT_IMAGE
    ) {

      FUCKING_STATUS.textContent =
        "image ready";

    } else {

      FUCKING_STATUS.textContent =
        "ready";
    }
  }
);


// ========================================
// SUBMIT
// ========================================

FUCKING_FORM.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const FUCKING_TEXT =
      FUCKING_MESSAGE.value.trim();

    const FUCKING_USERNAME =
      FUCKING_USERNAME_INPUT.value.trim();

    const FUCKING_AVATAR =
      FUCKING_PROFILE_PIC.value.trim();


    // ------------------------------------
    // Message OR image is required.
    // ------------------------------------

    if (
      !FUCKING_TEXT &&
      !HOLY_SHIT_IMAGE
    ) {

      showFuckingResult(
        "add a message or an image",
        "error"
      );

      FUCKING_STATUS.textContent =
        "nothing to send";

      return;
    }


    // ------------------------------------
    // Message max length.
    // ------------------------------------

    if (
      FUCKING_TEXT.length > 2000
    ) {

      showFuckingResult(
        "your message is too long — keep it under 2000 characters",
        "error"
      );

      return;
    }


    // ------------------------------------
    // Save profile BEFORE sending.
    //
    // This means the profile survives
    // after the message is sent.
    // ------------------------------------

    saveFuckingProfile();


    fuckingSetLoading(true);

    FUCKING_STATUS.textContent =
      "sending...";

    FUCKING_RESULT.classList.add(
      "hidden"
    );


    try {

      const FUCKING_FORM_DATA =
        new FormData();

      const FUCKING_PAYLOAD = {};


      // ----------------------------------
      // Add message if one exists.
      // ----------------------------------

      if (FUCKING_TEXT) {

        FUCKING_PAYLOAD.content =
          FUCKING_TEXT;
      }


      // ----------------------------------
      // Add custom username if provided.
      // ----------------------------------

      if (FUCKING_USERNAME) {

        FUCKING_PAYLOAD.username =
          FUCKING_USERNAME;
      }


      // ----------------------------------
      // Add profile picture if provided.
      //
      // Discord requires this to be a
      // publicly accessible image URL.
      // ----------------------------------

      if (FUCKING_AVATAR) {

        FUCKING_PAYLOAD.avatar_url =
          FUCKING_AVATAR;
      }


      FUCKING_FORM_DATA.append(
        "payload_json",
        JSON.stringify(
          FUCKING_PAYLOAD
        )
      );


      // ----------------------------------
      // Add image if one exists.
      //
      // This works even when there is
      // NO message.
      // ----------------------------------

      if (HOLY_SHIT_IMAGE) {

        FUCKING_FORM_DATA.append(
          "files[0]",
          HOLY_SHIT_IMAGE,
          HOLY_SHIT_IMAGE.name
        );
      }


      // ----------------------------------
      // Send to Discord.
      // ----------------------------------

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
          `Discord returned HTTP ${FUCKING_RESPONSE.status}.`;

        try {

          const FUCKING_DATA =
            await FUCKING_RESPONSE.json();

          if (
            FUCKING_DATA.message
          ) {

            FUCKING_ERROR +=
              ` ${FUCKING_DATA.message}`;
          }

        } catch {
          // Response wasn't JSON.
        }

        throw new Error(
          FUCKING_ERROR
        );
      }


      // ==================================
      // SUCCESS
      // ==================================

      showFuckingResult(
        "message sent",
        "success"
      );

      FUCKING_STATUS.textContent =
        "sent";


      // ----------------------------------
      // IMPORTANT:
      //
      // We DO NOT reset:
      // - username
      // - profile picture
      //
      // They stay saved.
      // ----------------------------------


      // Clear message.

      FUCKING_MESSAGE.value = "";


      // Clear selected message image.

      FUCKING_IMAGE.value = "";

      HOLY_SHIT_IMAGE = null;


      // Clean preview URL.

      if (
        GODDAMN_PREVIEW_URL
      ) {

        URL.revokeObjectURL(
          GODDAMN_PREVIEW_URL
        );

        GODDAMN_PREVIEW_URL =
          null;
      }


      FUCKING_PREVIEW_IMAGE
        .removeAttribute("src");

      FUCKING_PREVIEW
        .classList.add("hidden");

      FUCKING_FILE_NAME
        .classList.add("hidden");

      FUCKING_FILE_NAME.textContent =
        "";


      updateFuckingCharacterCount();

    } catch (
      FUCKING_ERROR
    ) {

      console.error(
        "Something broke:",
        FUCKING_ERROR
      );

      showFuckingResult(
        `could not send it: ${FUCKING_ERROR.message}`,
        "error"
      );

      FUCKING_STATUS.textContent =
        "failed";

    } finally {

      fuckingSetLoading(false);
    }
  }
);

updateFuckingCharacterCount();
