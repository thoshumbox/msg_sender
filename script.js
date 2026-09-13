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

const FUCKING_PROFILE_PREVIEW =
  document.getElementById("profilePreview");

const FUCKING_PROFILE_PREVIEW_IMAGE =
  document.getElementById("profilePreviewImage");

const FUCKING_PROFILE_FILE_NAME =
  document.getElementById("profileFileName");

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
let FUCKING_PROFILE_IMAGE_URL = null;

const FUCKING_PROFILE_STORAGE_KEY =
  "sendMsgIgProfile";


/* ========================================
   HELPERS
   ======================================== */

function updateFuckingCharacterCount() {
  FUCKING_CHAR_COUNT.textContent =
    FUCKING_MESSAGE.value.length;
}


function showFuckingResult(message, type) {
  FUCKING_RESULT.textContent = message;

  FUCKING_RESULT.className =
    `result ${type}`;

  FUCKING_RESULT.classList.remove(
    "hidden"
  );
}


function fuckingSetLoading(loading) {
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


function whatTheFuckIsTheFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}


function fuckingReadFileAsDataURL(file) {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(
          new Error(
            "could not read profile picture"
          )
        );
      };

      reader.readAsDataURL(file);
    }
  );
}


/* ========================================
   SAVE / LOAD PROFILE
   ======================================== */

async function saveFuckingProfile() {
  const username =
    FUCKING_USERNAME_INPUT.value.trim();

  let avatar = null;

  if (
    FUCKING_PROFILE_PIC.files &&
    FUCKING_PROFILE_PIC.files[0]
  ) {
    avatar =
      await fuckingReadFileAsDataURL(
        FUCKING_PROFILE_PIC.files[0]
      );
  } else {
    const saved =
      localStorage.getItem(
        FUCKING_PROFILE_STORAGE_KEY
      );

    if (saved) {
      try {
        const profile =
          JSON.parse(saved);

        avatar =
          profile.avatar || null;

      } catch {
        avatar = null;
      }
    }
  }

  const profile = {
    username,
    avatar
  };

  localStorage.setItem(
    FUCKING_PROFILE_STORAGE_KEY,
    JSON.stringify(profile)
  );
}


function loadFuckingProfile() {
  const saved =
    localStorage.getItem(
      FUCKING_PROFILE_STORAGE_KEY
    );

  if (!saved) {
    return;
  }

  try {
    const profile =
      JSON.parse(saved);

    FUCKING_USERNAME_INPUT.value =
      profile.username || "";

    if (profile.avatar) {
      FUCKING_PROFILE_PREVIEW_IMAGE.src =
        profile.avatar;

      FUCKING_PROFILE_PREVIEW.classList.remove(
        "hidden"
      );

      FUCKING_PROFILE_FILE_NAME.textContent =
        "saved profile picture";

      FUCKING_PROFILE_FILE_NAME.classList.remove(
        "hidden"
      );
    }

  } catch (error) {
    console.error(
      "could not load profile:",
      error
    );

    localStorage.removeItem(
      FUCKING_PROFILE_STORAGE_KEY
    );
  }
}


/* ========================================
   CHANGE WEBHOOK PROFILE
   ======================================== */

async function changeFuckingWebhookProfile() {
  const username =
    FUCKING_USERNAME_INPUT.value.trim();

  let avatar = null;

  /*
   * Get the selected local profile file.
   */
  if (
    FUCKING_PROFILE_PIC.files &&
    FUCKING_PROFILE_PIC.files[0]
  ) {
    avatar =
      await fuckingReadFileAsDataURL(
        FUCKING_PROFILE_PIC.files[0]
      );
  } else {
    /*
     * If the page was refreshed, get
     * the saved local profile image.
     */
    const saved =
      localStorage.getItem(
        FUCKING_PROFILE_STORAGE_KEY
      );

    if (saved) {
      try {
        const profile =
          JSON.parse(saved);

        avatar =
          profile.avatar || null;

      } catch {
        avatar = null;
      }
    }
  }


  /*
   * Only change the webhook if we
   * actually have something to change.
   */
  if (!username && !avatar) {
    return;
  }


  const webhookProfile = {};


  if (username) {
    webhookProfile.name =
      username;
  }


  if (avatar) {
    webhookProfile.avatar =
      avatar;
  }


  /*
   * Discord's Modify Webhook endpoint.
   *
   * This changes the actual webhook
   * profile, not just the message.
   */
  const response =
    await fetch(
      FUCKING_WEBHOOK_URL,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(
            webhookProfile
          )
      }
    );


  if (!response.ok) {
    let errorMessage =
      `Discord could not update the webhook profile (HTTP ${response.status}).`;

    try {
      const data =
        await response.json();

      if (data.message) {
        errorMessage +=
          ` ${data.message}`;
      }

    } catch {
      // Nothing to parse.
    }

    throw new Error(
      errorMessage
    );
  }
}


/* ========================================
   PROFILE NAME
   ======================================== */

FUCKING_USERNAME_INPUT.addEventListener(
  "input",
  async () => {
    try {
      await saveFuckingProfile();

      FUCKING_STATUS.textContent =
        "profile saved";

    } catch (error) {
      console.error(error);
    }
  }
);


/* ========================================
   PROFILE PICTURE
   ======================================== */

FUCKING_PROFILE_PIC.addEventListener(
  "change",
  async () => {
    const file =
      FUCKING_PROFILE_PIC.files[0];

    if (!file) {
      return;
    }


    if (!file.type.startsWith("image/")) {
      showFuckingResult(
        "please select an image",
        "error"
      );

      FUCKING_PROFILE_PIC.value =
        "";

      return;
    }


    if (
      file.size >
      10 * 1024 * 1024
    ) {
      showFuckingResult(
        "profile picture is too big — keep it under 10 MB",
        "error"
      );

      FUCKING_PROFILE_PIC.value =
        "";

      return;
    }


    if (FUCKING_PROFILE_IMAGE_URL) {
      URL.revokeObjectURL(
        FUCKING_PROFILE_IMAGE_URL
      );
    }


    FUCKING_PROFILE_IMAGE_URL =
      URL.createObjectURL(file);


    FUCKING_PROFILE_PREVIEW_IMAGE.src =
      FUCKING_PROFILE_IMAGE_URL;


    FUCKING_PROFILE_PREVIEW.classList.remove(
      "hidden"
    );


    FUCKING_PROFILE_FILE_NAME.textContent =
      `${file.name} (${whatTheFuckIsTheFileSize(
        file.size
      )})`;


    FUCKING_PROFILE_FILE_NAME.classList.remove(
      "hidden"
    );


    try {
      /*
       * Save it locally.
       */
      await saveFuckingProfile();


      /*
       * Immediately update the actual
       * Discord webhook profile.
       */
      FUCKING_STATUS.textContent =
        "updating webhook profile";


      await changeFuckingWebhookProfile();


      FUCKING_STATUS.textContent =
        "webhook profile updated";


      showFuckingResult(
        "webhook profile updated",
        "success"
      );

    } catch (error) {
      console.error(error);

      showFuckingResult(
        `could not update webhook profile: ${error.message}`,
        "error"
      );

      FUCKING_STATUS.textContent =
        "profile update failed";
    }
  }
);


/* ========================================
   RESET PROFILE
   ======================================== */

FUCKING_RESET_PROFILE.addEventListener(
  "click",
  async () => {

    try {

      /*
       * Reset the actual Discord
       * webhook back to its default
       * name/avatar.
       */
      const response =
        await fetch(
          FUCKING_WEBHOOK_URL,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              name: "send msg ig",
              avatar: null
            })
          }
        );


      if (!response.ok) {
        throw new Error(
          `Discord returned HTTP ${response.status}`
        );
      }


      /*
       * Remove locally saved profile.
       */
      localStorage.removeItem(
        FUCKING_PROFILE_STORAGE_KEY
      );


      FUCKING_USERNAME_INPUT.value =
        "";

      FUCKING_PROFILE_PIC.value =
        "";


      if (FUCKING_PROFILE_IMAGE_URL) {
        URL.revokeObjectURL(
          FUCKING_PROFILE_IMAGE_URL
        );

        FUCKING_PROFILE_IMAGE_URL =
          null;
      }


      FUCKING_PROFILE_PREVIEW_IMAGE
        .removeAttribute("src");


      FUCKING_PROFILE_PREVIEW.classList.add(
        "hidden"
      );


      FUCKING_PROFILE_FILE_NAME.classList.add(
        "hidden"
      );


      FUCKING_PROFILE_FILE_NAME.textContent =
        "";


      FUCKING_STATUS.textContent =
        "profile reset";


      showFuckingResult(
        "webhook profile reset",
        "success"
      );

    } catch (error) {
      console.error(error);

      showFuckingResult(
        `could not reset webhook profile: ${error.message}`,
        "error"
      );
    }
  }
);


/* ========================================
   MESSAGE IMAGE
   ======================================== */

FUCKING_IMAGE.addEventListener(
  "change",
  () => {
    const file =
      FUCKING_IMAGE.files[0];


    if (GODDAMN_PREVIEW_URL) {
      URL.revokeObjectURL(
        GODDAMN_PREVIEW_URL
      );

      GODDAMN_PREVIEW_URL =
        null;
    }


    HOLY_SHIT_IMAGE =
      null;


    FUCKING_PREVIEW.classList.add(
      "hidden"
    );


    FUCKING_FILE_NAME.classList.add(
      "hidden"
    );


    FUCKING_PREVIEW_IMAGE
      .removeAttribute("src");


    FUCKING_FILE_NAME.textContent =
      "";


    if (!file) {
      FUCKING_STATUS.textContent =
        FUCKING_MESSAGE.value.trim()
          ? "message ready"
          : "ready";

      return;
    }


    if (!file.type.startsWith("image/")) {
      showFuckingResult(
        "go select a fucking image",
        "error"
      );

      FUCKING_IMAGE.value =
        "";

      return;
    }


    if (
      file.size >
      10 * 1024 * 1024
    ) {
      showFuckingResult(
        "image too big — keep it under 10 MB",
        "error"
      );

      FUCKING_IMAGE.value =
        "";

      return;
    }


    HOLY_SHIT_IMAGE =
      file;


    FUCKING_FILE_NAME.textContent =
      `${file.name} (${whatTheFuckIsTheFileSize(
        file.size
      )})`;


    FUCKING_FILE_NAME.classList.remove(
      "hidden"
    );


    GODDAMN_PREVIEW_URL =
      URL.createObjectURL(file);


    FUCKING_PREVIEW_IMAGE.src =
      GODDAMN_PREVIEW_URL;


    FUCKING_PREVIEW.classList.remove(
      "hidden"
    );


    FUCKING_STATUS.textContent =
      "image ready";
  }
);


/* ========================================
   MESSAGE COUNTER
   ======================================== */

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


/* ========================================
   SEND
   ======================================== */

FUCKING_FORM.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const text =
      FUCKING_MESSAGE.value.trim();


    const username =
      FUCKING_USERNAME_INPUT.value.trim();


    /*
     * Message OR image is enough.
     */
    if (
      !text &&
      !HOLY_SHIT_IMAGE
    ) {
      showFuckingResult(
        "add a message or image",
        "error"
      );

      FUCKING_STATUS.textContent =
        "nothing to send";

      return;
    }


    if (text.length > 2000) {
      showFuckingResult(
        "your message is too long — keep it under 2000 characters",
        "error"
      );

      return;
    }


    fuckingSetLoading(true);


    FUCKING_STATUS.textContent =
      "updating profile";


    FUCKING_RESULT.classList.add(
      "hidden"
    );


    try {

      /*
       * Make sure the selected profile
       * is the Discord webhook profile.
       */
      await changeFuckingWebhookProfile();


      FUCKING_STATUS.textContent =
        "sending shit";


      /*
       * Build Discord multipart request.
       */
      const formData =
        new FormData();


      const payload = {};


      if (text) {
        payload.content =
          text;
      }


      /*
       * We DON'T need username/avatar_url
       * here because the actual webhook
       * profile was already changed above.
       */


      formData.append(
        "payload_json",
        JSON.stringify(payload)
      );


      if (HOLY_SHIT_IMAGE) {
        formData.append(
          "files[0]",
          HOLY_SHIT_IMAGE,
          HOLY_SHIT_IMAGE.name
        );
      }


      const response =
        await fetch(
          FUCKING_WEBHOOK_URL,
          {
            method: "POST",
            body: formData
          }
        );


      if (!response.ok) {

        let errorMessage =
          `Discord returned HTTP ${response.status}.`;


        try {
          const data =
            await response.json();

          if (data.message) {
            errorMessage +=
              ` ${data.message}`;
          }

        } catch {
          // Nothing to parse.
        }


        throw new Error(
          errorMessage
        );
      }


      showFuckingResult(
        "msg sent wow",
        "success"
      );


      FUCKING_STATUS.textContent =
        "sent somehow ig";


      /*
       * Clear ONLY the message.
       *
       * Profile stays saved and the
       * Discord webhook keeps its profile.
       */

      FUCKING_MESSAGE.value =
        "";

      FUCKING_IMAGE.value =
        "";

      HOLY_SHIT_IMAGE =
        null;


      if (GODDAMN_PREVIEW_URL) {
        URL.revokeObjectURL(
          GODDAMN_PREVIEW_URL
        );

        GODDAMN_PREVIEW_URL =
          null;
      }


      FUCKING_PREVIEW_IMAGE
        .removeAttribute("src");


      FUCKING_PREVIEW.classList.add(
        "hidden"
      );


      FUCKING_FILE_NAME.classList.add(
        "hidden"
      );


      FUCKING_FILE_NAME.textContent =
        "";


      updateFuckingCharacterCount();


    } catch (error) {

      console.error(
        "something broke:",
        error
      );


      showFuckingResult(
        `could not send the fucking thing: ${error.message}`,
        "error"
      );


      FUCKING_STATUS.textContent =
        "failed boohoo";

    } finally {

      fuckingSetLoading(false);

    }
  }
);


/* ========================================
   START
   ======================================== */

loadFuckingProfile();

updateFuckingCharacterCount();
