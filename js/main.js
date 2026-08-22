const welcomeScreen = document.getElementById("welcome");
const enterButton = document.getElementById("enter-button");

enterButton.addEventListener("click", () => {
  welcomeScreen.classList.add(
    "opacity-0",
    "-translate-y-full"
  );

  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
  }, 700);
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