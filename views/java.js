const loginBtn = document.getElementById("loginBtn");
const resultDiv = document.getElementById("result");
const tokenField = document.getElementById("token");
const igIdField = document.getElementById("igId");

loginBtn.addEventListener("click", () => {
  window.location.href = "http://localhost:3000/auth/facebook";
});

async function checkAuthResult() {
  try {
    const res = await fetch("http://localhost:3000/auth/facebook/callback", {
      credentials: "include"
    });

    if (!res.ok) return;

    const data = await res.json();

    tokenField.value = data.token;
    igIdField.value = data.instagramBusinessId;

    resultDiv.classList.remove("hidden");
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
  }
}

