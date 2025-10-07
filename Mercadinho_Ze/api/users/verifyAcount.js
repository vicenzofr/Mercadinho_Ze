async function verificarUsuario() {
    try {
      const emailEl = document.getElementById("email");
      const passEl = document.getElementById("password");

      if (!emailEl || !passEl) {
        throw new Error("Campos de email/senha não encontrados no DOM.");
      }

      const email = emailEl.value.trim();
      const password = passEl.value;

      if (!email || !password) {
        alert("Preencha email e senha.");
        return { success: false, message: "Campos vazios" };
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Envie a senha pura; o servidor faz o hash/compare.
        body: JSON.stringify({ email, password }),
        credentials: "include", // se você usar cookies/sessão
      });

      // Pode haver responses sem JSON válido (ex.: 204 ou erro HTML)
      let data = null;
      try { data = await response.json(); } catch (_) { data = {}; }

      if (!response.ok) {
        const message = data?.message || "Falha ao entrar.";
        alert(message);
        return { success: false, message };
      }

      alert("LOGADO COM SUCESSO!");
      return { success: true, user: data.user ?? null };
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro inesperado. Veja o console.");
      return { success: false, message: error?.message || "Erro inesperado" };
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("verificarConta");
    if (!btn) return;

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      try {
        const result = await verificarUsuario();
        console.log(result);
      } finally {
        btn.disabled = false;
      }
    });
  });