function CreateAccount({ onClose }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const addProductList = async (e) => {
    if (e) e.preventDefault();
    try {
      const conteudo = JSON.stringify({ email, password });
      console.log("Usuario adicionado: pre post", conteudo);

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: conteudo,
      });

      if (!response.ok) throw new Error("Erro ao adicionar Usuario");

      const data = await response.json();
      console.log("Usuario adicionado: pos post", data);

      setEmail("");
      setPassword("");
      window.dispatchEvent(new CustomEvent("UsuarioAdicionado", { detail: data }));
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  return (
    <div className="w-100 h-120 bg-[#F9FAFB] mt-46 rounded-lg border-1 border-[#898989]">
      <div className="relative flex justify-center items-center mt-7">
        <button onClick={onClose} className="absolute left-10 w-6 h-6 bg-cover bg-[url('./assets/icons/arrow.png')] cursor-pointer"></button>
        <h1 className="text-3xl font-bold text-[#4EB352]">Create Account</h1>
      </div>

      <div className="flex flex-col mt-12 justify-center items-center">
        <label className="flex flex-col font-bold text-[15px] text-black">
          Email
          <input
            id="emailcreate"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-70 h-8 border-1 border-[#898989] rounded-md text-sm pl-2 mt-2 font-normal"
            placeholder="user@gmail.com"
          />
        </label>
      </div>

      <div className="flex flex-col mt-7 justify-center items-center">
        <label className="flex flex-col font-bold text-[15px] text-black">
          Password
          <input
            id="passwordcreate"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-70 h-8 border-1 border-[#898989] rounded-md text-sm pl-2 mt-2 font-normal"
            placeholder="••••••••••"
          />
        </label>
      </div>

      <div className="justify-center items-center flex mt-14">
        <button
          type="button"
          onClick={addProductList}
          className="w-50 h-10 bg-[#4EB352] rounded-lg cursor-pointer font-bold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

window.CreateAccount = CreateAccount;
