//--ELEMENTOS DEL DOM

const welcomeScreen = document.getElementById("welcome");
const enterButton = document.getElementById("enter-button");

const backgroundMusic = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");

const venueName = document.getElementById("venue-name");
const venueAddress = document.getElementById("venue-address");
const mapsButton = document.getElementById("maps-button");

const giftButton = document.getElementById("gift-button");
const giftDetails = document.getElementById("gift-details");
const giftAlias = document.getElementById("gift-alias");
const copyAliasButton = document.getElementById("copy-alias");
const copyFeedback = document.getElementById("copy-feedback");

const rsvpForm = document.getElementById("rsvp-form");
const rsvpFeedback = document.getElementById("rsvp-feedback");

const attendanceOptions = document.querySelectorAll('input[name="attendance"]');

const foodSection = document.getElementById("food-section");
const foodRestrictions = document.getElementById("food-restrictions");

//BIENVENIDA
let isMusicPlaying = false;

enterButton.addEventListener("click", async () => {
  welcomeScreen.classList.add("opacity-0", "-translate-y-full");

  try {
    await backgroundMusic.play();

    isMusicPlaying = true;

    musicButton.textContent = "Ⅱ";

    musicButton.setAttribute("aria-label", "Pausar música");
  } catch (error) {
    console.error("No se pudo reproducir la música:", error);
  }

  musicButton.classList.remove("hidden");
  musicButton.classList.add("flex");

  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
  }, 700);
});

musicButton.addEventListener("click", async () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();

    isMusicPlaying = false;

    musicButton.textContent = "♪";

    musicButton.setAttribute("aria-label", "Reproducir música");

    return;
  }

  try {
    await backgroundMusic.play();

    isMusicPlaying = true;

    musicButton.textContent = "Ⅱ";

    musicButton.setAttribute("aria-label", "Pausar música");
  } catch (error) {
    console.error("No se pudo reproducir la música:", error);
  }
});

//CUENTA REGRESIVA
const eventDate = new Date(invitationConfig.eventDate);

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();

  const difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    Object.values(countdownElements).forEach((element) => {
      element.textContent = "00";
    });

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  countdownElements.days.textContent = formatNumber(days);

  countdownElements.hours.textContent = formatNumber(hours);

  countdownElements.minutes.textContent = formatNumber(minutes);

  countdownElements.seconds.textContent = formatNumber(seconds);
}

updateCountdown();

setInterval(updateCountdown, 1000);

//UBICACION
function setupVenue() {
  const { name, address, mapsUrl } = invitationConfig.venue;

  venueName.textContent = name;

  venueAddress.textContent = address;

  mapsButton.href = mapsUrl;
}

setupVenue();

//REGALOS

function setupGiftSection() {
  giftAlias.textContent = invitationConfig.gift.alias;

  // Mostrar / ocultar datos bancarios
  giftButton.addEventListener("click", () => {
    giftDetails.classList.toggle("hidden");
  });

  // Copiar alias
  copyAliasButton.addEventListener("click", async () => {
    const alias = invitationConfig.gift.alias;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(alias);
      } else {
      

        const tempInput = document.createElement("textarea");

        tempInput.value = alias;

        tempInput.style.position = "fixed";
        tempInput.style.left = "-9999px";
        tempInput.style.top = "0";

        document.body.appendChild(tempInput);

        tempInput.focus();
        tempInput.select();

        const copied = document.execCommand("copy");

        document.body.removeChild(tempInput);

        if (!copied) {
          throw new Error("El navegador bloqueó el copiado.");
        }
      }

      copyFeedback.textContent = "Alias copiado ✨";
    } catch (error) {
      copyFeedback.textContent =
        "No se pudo copiar automáticamente. Seleccioná el alias para copiarlo.";

      console.error("No se pudo copiar el alias:", error);
    }
  });
}

setupGiftSection();

// ASISTENCIA

// Mostrar u ocultar restricciones alimentarias
attendanceOptions.forEach((option) => {
  option.addEventListener("change", () => {
    if (option.value === "no" && option.checked) {
      foodSection.classList.add("hidden");

      foodRestrictions.value = "";
    }

    if (option.value === "yes" && option.checked) {
      foodSection.classList.remove("hidden");
    }
  });
});

// Enviar confirmación por WhatsApp
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);

  const guestName = formData.get("guestName");

  const attendance = formData.get("attendance");

  const restrictions = formData.get("foodRestrictions")?.trim() || "Ninguna";

  let message;

  if (attendance === "yes") {
    message = `
Hola Cami 

Quiero confirmar mi asistencia a tus XV.

Nombre: ${guestName}
Asistencia: Sí, voy 
Restricciones alimentarias: ${restrictions}

¡Nos vemos!
    `.trim();
  } else {
    message = `
Hola Cami 

Gracias por invitarme a tus XV.

Nombre: ${guestName}
Asistencia: No podré asistir.

Espero que tengas una noche hermosa 
    `.trim();
  }

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${invitationConfig.rsvp.whatsappNumber}?text=${encodedMessage}`;

  rsvpFeedback.textContent =
    "Te llevamos a WhatsApp para enviar tu respuesta ";

  window.open(whatsappUrl, "_blank");
});
