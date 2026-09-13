const FUCKING_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1541638515077685288/WY-isvl6ymHdmcbc-4HqzSNZN1qnp4eFlivtcxTnZamstDXkp7oqCeMBvS_l_ViAP9vQ";


// ========================================
// ELEMENTS
// ========================================

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


// ========================================
// VARIABLES
// ========================================

let HOLY_SHIT_IMAGE = null;

let GODDAMN_PREVIEW_URL = null;

let FUCKING_PROFILE_IMAGE_URL = null;


// ========================================
// STORAGE KEY
// ========================================

const FUCKING_PROFILE_STORAGE_KEY =
  "sendMsgIgProfile";


// ========================================
// CHARACTER COUNT
// ========================================

function updateFuckingCharacterCount() {

  FUCKING_CHAR_COUNT.textContent =
    FUCKING_MESSAGE.value.length;
}


// ========================================
// RESULT MESSAGE
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
// LOADING STATE
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

  if (
    bytes <
    1024 * 1024
  ) {

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
// READ FILE AS DATA URL
// ========================================

function fuckingReadFileAsDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const FUCKING_READER =
        new FileReader();

      FUCKING_READER.onload = () => {
        resolve(
          FUCKING_READER.result
        );
      };

      FUCKING_READER.onerror = () => {
        reject(
          new Error(
            "could not read the profile picture"
          )
        );
      };

      FUCKING_READER.readAsDataURL(
        file
      );
    }
  );
}


// ========================================
// SAVE PROFILE
// ========================================

async function saveFuckingProfile() {

  const FUCKING_USERNAME =
    FUCKING_USERNAME_INPUT.value.trim();

  let FUCKING_AVATAR =
    null;


  /*
    If the profile picture was changed,
    convert it to a data URL so it can
    survive page refreshes.
  */

  if (
    FUCKING_PROFILE_PIC.files &&
    FUCKING_PROFILE_PIC.files[0]
  ) {

    try {

      FUCKING_AVATAR =
        await fuckingReadFileAsDataURL(
          FUCKING_PROFILE_PIC.files[0]
        );

    } catch (FUCKING_ERROR) {

      console.error(
        FUCKING_ERROR
      );

      return;
    }

  } else {

    /*
      If no new file was selected,
      keep the existing saved avatar.
    */

    const FUCKING_EXISTING =
      localStorage.getItem(
        FUCKING_PROFILE_STORAGE_KEY
      );

    if (FUCKING_EXISTING) {

      try {

        const FUCKING_PROFILE =
          JSON.parse(
            FUCKING_EXISTING
          );

        FUCKING_AVATAR =
          FUCKING_PROFILE.avatar || null;

      } catch {
        FUCKING_AVATAR = null;
      }
    }
  }


  const FUCKING_PROFILE = {

    username:
      FUCKING_USERNAME,

    avatar:
      FUCKING_AVATAR
  };


  localStorage.setItem(
    FUCKING_PROFILE_STORAGE_KEY,
    JSON.stringify(
      FUCKING_PROFILE
    )
  );
}


// ========================================
// LOAD PROFILE
// ========================================

function loadFuckingProfile() {

  const FUCKING_SAVED_PROFILE =
    localStorage.getItem(
      FUCKING_PROFILE_STORAGE_KEY
    );


  if (
    !FUCKING_SAVED_PROFILE
  ) {

    return;
  }


  try {

    const FUCKING_PROFILE =
      JSON.parse(
        FUCKING_SAVED_PROFILE
      );


    // Restore username.

    FUCKING_USERNAME_INPUT.value =
      FUCKING_PROFILE.username || "";


    // Restore profile picture.

    if (
      FUCKING_PROFILE.avatar
    ) {

      FUCKING_PROFILE_PREVIEW_IMAGE.src =
        FUCKING_PROFILE.avatar;

      FUCKING_PROFILE_PREVIEW.classList.remove(
        "hidden"
      );

      FUCKING_PROFILE_FILE_NAME.textContent =
        "saved profile picture";

      FUCKING_PROFILE_FILE_NAME.classList.remove(
        "hidden"
      );
    }

  } catch (
    FUCKING_ERROR
  ) {

    console.error(
      "Could not load profile:",
      FUCKING_ERROR
    );

    localStorage.removeItem(
      FUCKING_PROFILE_STORAGE_KEY
    );
  }
}


// ========================================
// RESET PROFILE
// ========================================

FUCKING_RESET_PROFILE.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      FUCKING_PROFILE_STORAGE_KEY
    );


    FUCKING_USERNAME_INPUT.value =
      "";

    FUCKING_PROFILE_PIC.value =
      "";


    if (
      FUCKING_PROFILE_IMAGE_URL
    ) {

      URL.revokeObjectURL(
        FUCKING_PROFILE_IMAGE_URL
      );

      FUCKING_PROFILE_IMAGE_URL =
        null;
    }


    FUCKING_PROFILE_PREVIEW_IMAGE
      .removeAttribute("src");


    FUCKING_PROFILE_PREVIEW
      .classList.add("hidden");


    FUCKING_PROFILE_FILE_NAME
      .classList.add("hidden");


    FUCKING_PROFILE_FILE_NAME.textContent =
      "";


    FUCKING_STATUS.textContent =
      "profile reset";


    showFuckingResult(
      "profile reset back to normal",
      "success"
    );
  }
);


// ========================================
// PROFILE NAME CHANGE
// ========================================

FUCKING_USERNAME_INPUT.addEventListener(
  "input",
  async () => {

    await saveFuckingProfile();

    FUCKING_STATUS.textContent =
      "profile saved";
  }
);


// ========================================
// PROFILE PICTURE CHANGE
// ========================================

FUCKING_PROFILE_PIC.addEventListener(
  "change",
  async () => {

    const FUCKING_FILE =
      FUCKING_PROFILE_PIC.files[0];


    if (!FUCKING_FILE) {

      return;
    }


    // Make sure it is an image.

    if (
      !FUCKING_FILE.type.startsWith(
        "image/"
      )
    ) {

      showFuckingResult(
        "please select an image",
        "error"
      );

      FUCKING_PROFILE_PIC.value =
        "";

      return;
    }


    // Maximum 10 MB.

    if (
      FUCKING_FILE.size >
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


    // Remove old object URL.

    if (
      FUCKING_PROFILE_IMAGE_URL
    ) {

      URL.revokeObjectURL(
        FUCKING_PROFILE_IMAGE_URL
      );
    }


    // Create preview.

    FUCKING_PROFILE_IMAGE_URL =
      URL.createObjectURL(
        FUCKING_FILE
      );


    FUCKING_PROFILE_PREVIEW_IMAGE.src =
      FUCKING_PROFILE_IMAGE_URL;


    FUCKING_PROFILE_PREVIEW
      .classList.remove("hidden");


    FUCKING_PROFILE_FILE_NAME.textContent =
      `${FUCKING_FILE.name} (${whatTheFuckIsTheFileSize(
        FUCKING_FILE.size
      )})`;


    FUCKING_PROFILE_FILE_NAME
      .classList.remove("hidden");


    // Permanently save it.

    await saveFuckingProfile();


    FUCKING_STATUS.textContent =
      "profile picture saved";


    showFuckingResult(
      "profile updated",
      "success"
    );
  }
);


// ========================================
// MESSAGE IMAGE
// ========================================

FUCKING_IMAGE.addEventListener(
  "change",
  () => {

    const HOLY_FUCKING_FILE =
      FUCKING_IMAGE.files[0];


    // Clean old preview URL.

    if (
      GODDAMN_PREVIEW_URL
    ) {

      URL.revokeObjectURL(
        GODDAMN_PREVIEW_URL
      );

      GODDAMN_PREVIEW_URL =
        null;
    }


    HOLY_SHIT_IMAGE =
      null;


    FUCKING_PREVIEW
      .classList.add("hidden");


    FUCKING_FILE_NAME
      .classList.add("hidden");


    FUCKING_PREVIEW_IMAGE
      .removeAttribute("src");


    FUCKING_FILE_NAME.textContent =
      "";


    // No image selected.

    if (
      !HOLY_FUCKING_FILE
    ) {

      FUCKING_STATUS.textContent =
        FUCKING_MESSAGE.value.trim()
          ? "message ready"
          : "ready";

      return;
    }


    // Must be image.

    if (
      !HOLY_FUCKING_FILE.type.startsWith(
        "image/"
      )
    ) {

      showFuckingResult(
        "go select a fucking image",
        "error"
      );

      FUCKING_IMAGE.value =
        "";

      return;
    }


    // Maximum 10 MB.

    if (
      HOLY_FUCKING_FILE.size >
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
      HOLY_FUCKING_FILE;


    FUCKING_FILE_NAME.textContent =
      `${HOLY_FUCKING_FILE.name} (${whatTheFuckIsTheFileSize(
        HOLY_FUCKING_FILE.size
      )})`;


    FUCKING_FILE_NAME
      .classList.remove("hidden");


    GODDAMN_PREVIEW_URL =
      URL.createObjectURL(
        HOLY_FUCKING_FILE
      );


    FUCKING_PREVIEW_IMAGE.src =
      GODDAMN_PREVIEW_URL;


    FUCKING_PREVIEW
      .classList.remove("hidden");


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


    /*
      IMPORTANT:

      Message OR image is enough.

      Both empty = reject.
    */

    if (
      !FUCKING_TEXT &&
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


    // Maximum 2000 characters.

    if (
      FUCKING_TEXT.length > 2000
    ) {

      showFuckingResult(
        "your message is too long — keep it under 2000 characters",
        "error"
      );

      return;
    }


    // Save profile before sending.

    await saveFuckingProfile();


    // Loading state.

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


      // --------------------------------
      // Message
      // --------------------------------

      if (
        FUCKING_TEXT
      ) {

        FUCKING_PAYLOAD.content =
          FUCKING_TEXT;
      }


      // --------------------------------
      // Profile name
      // --------------------------------

      if (
        FUCKING_USERNAME
      ) {

        FUCKING_PAYLOAD.username =
          FUCKING_USERNAME;
      }


      /*
        We intentionally DON'T put the
        local profile image into avatar_url.

        Discord cannot use a browser
        localStorage data URL as a normal
        hosted avatar URL.
      */


      // --------------------------------
      // Payload
      // --------------------------------

      FUCKING_FORM_DATA.append(
        "payload_json",
        JSON.stringify(
          FUCKING_PAYLOAD
        )
      );


      // --------------------------------
      // Message image
      //
      // This works even if there is
      // NO message.
      // --------------------------------

      if (
        HOLY_SHIT_IMAGE
      ) {

        FUCKING_FORM_DATA.append(
          "files[0]",
          HOLY_SHIT_IMAGE,
          HOLY_SHIT_IMAGE.name
        );
      }


      // --------------------------------
      // SEND
      // --------------------------------

      const FUCKING_RESPONSE =
        await fetch(
          FUCKING_WEBHOOK_URL,
          {
            method: "POST",
            body: FUCKING_FORM_DATA
          }
        );


      // --------------------------------
      // Discord error
      // --------------------------------

      if (
        !FUCKING_RESPONSE.ok
      ) {

        let FUCKING_ERROR =
          `Discord said no — HTTP ${FUCKING_RESPONSE.status}.`;


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
          // Not JSON.
        }


        throw new Error(
          FUCKING_ERROR
        );
      }


      // =================================
      // SUCCESS
      // =================================

      showFuckingResult(
        "msg sent wow",
        "success"
      );


      FUCKING_STATUS.textContent =
        "sent somehow ig";


      /*
        IMPORTANT:

        We ONLY clear the message and
        message image.

        PROFILE STAYS.
      */


      FUCKING_MESSAGE.value =
        "";


      FUCKING_IMAGE.value =
        "";


      HOLY_SHIT_IMAGE =
        null;


      // Clean message image preview.

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


      // Character counter.

      updateFuckingCharacterCount();


      /*
        Re-load profile preview just
        in case anything changed.
      */

      loadFuckingProfile();


    } catch (
      FUCKING_ERROR
    ) {

      console.error(
        "something broke:",
        FUCKING_ERROR
      );


      showFuckingResult(
        `could not send the fucking thing: ${FUCKING_ERROR.message}`,
        "error"
      );


      FUCKING_STATUS.textContent =
        "failed boohoo";


    } finally {

      fuckingSetLoading(
        false
      );
    }
  }
);


// ========================================
// INITIALIZE
// ========================================

loadFuckingProfile();

updateFuckingCharacterCount();
