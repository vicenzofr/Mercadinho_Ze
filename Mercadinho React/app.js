function App() {
  const [tela, setTela] = React.useState("site");

  return (
    <main className="flex flex-col items-center">
      {tela === "login" && (
        <window.Forms
          onClose={() => setTela("site")}
          onCreateAccount={() => setTela("signup")}
          onforgotPassword={() => setTela("forgot")}
        />
      )}

      {tela === "signup" && (
        <window.CreateAccount onClose={() => setTela("login")} />
      )}

       {tela === "forgot" && (
        <window.forgotPassword onClose={() => setTela("login")} />
      )}
      
      {tela === "site" && (
        <>
          <Header onLoginClick={() => setTela("login")} />
          <div className="mt-6 flex gap-8 items-start">
            <div className="flex-1">
              <window.ProdutosDisponiveis />
            </div>
            <window.Carrinho />
          </div>
        </>
      )}

      {/* <window.Footer /> */}
    </main>

    
  );
}

ReactDOM.createRoot(document.getElementById("mercado")).render(<App />);
