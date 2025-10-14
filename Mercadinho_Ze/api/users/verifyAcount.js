document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("verificarConta");
    if (!btn) return console.warn('Elemento #verificarConta não encontrado');

    btn.addEventListener("click", (e) => {
      // Se o botão estiver dentro de um <form>, evita o submit/reload:
      e.preventDefault();
      console.log("TESTE LOGIN");
    });
  });