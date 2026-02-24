console.log("🔥 script.js loaded");
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);

  if (theme === "gay") {
    startSparkles();
  } else {
    stopSparkles();
  }
}

/* Load saved theme */
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
};
let sparkleInterval;

function startSparkles() {
  const container = document.getElementById("sparkle-container");
  sparkleInterval = setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = 3 + Math.random() * 2 + "s";

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 5000);
  }, 150);
}

function stopSparkles() {
  clearInterval(sparkleInterval);
  document.getElementById("sparkle-container").innerHTML = "";
}
async function getLie() {
  const situation = document.getElementById("situation").value;

  if (!situation) {
    alert("Please select a situation");
    return;
  }
function generateLie() {
  const situation = document.getElementById("situation").value;
  const theme = document.body.className || "default";

  fetch("/lie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation, theme })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("lie").textContent = data.lie;
    });
}
  const res = await fetch("/lie", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation })
  });

  const data = await res.json();
  document.getElementById("lie").innerText = data.lie;
}