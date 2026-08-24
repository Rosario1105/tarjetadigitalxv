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

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);

  const guestData = {
    name: formData.get("guestName"),
    guestCount: formData.get("guestCount"),
    foodRestrictions: formData.get("foodRestrictions"),
  };

  console.log(guestData);

  rsvpFeedback.textContent =
    "¡Gracias! Tu confirmación fue registrada ✨";
});

function setupGiftSection() {
  giftAlias.textContent = invitationConfig.gift.alias;

  giftButton.addEventListener("click", () => {
    giftDetails.classList.toggle("hidden");
  });

  copyAliasButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(invitationConfig.gift.alias);

      copyFeedback.textContent = "Alias copiado ✨";
    } catch (error) {
      copyFeedback.textContent = "No se pudo copiar el alias.";
      console.error(error);
    }
  });
}

setupGiftSection();
function setupVenue(){ 
  const { name, address, mapsUrl } = invitationConfig.venue;

  venueName.textContent = name;
  venueAddress.textContent = address;
  mapsButton.href = mapsUrl;
}

setupVenue();


let isMusicPlaying = false;

enterButton.addEventListener("click", async () => {
  welcomeScreen.classList.add(
    "opacity-0",
    "-translate-y-full"
  );

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