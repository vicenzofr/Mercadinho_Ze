function App() {
  const [tela, setTela] = React.useState("site");
  const [menuOpen, setMenuOpen] = React.useState(false);

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
        <div className="w-full">
          <Header
            onLoginClick={() => setTela("login")}
            onMenuClick={() => setMenuOpen(v => !v)}
          />
        </div>

        {/* menu aparece só quando menuOpen == true */}
        {menuOpen && (
          <div 
            className="w-full flex justify-end px-4 relative">
            <window.Menu
            onUserClick={() => setTela("login")}/>
          </div>
        )}
      
        <div className="mt-6 flex gap-8 items-start">
          <div className="flex-1">
            <window.ProdutosDisponiveis />              
          </div>
          <div className="flex flex-col gap-4">
            <window.Carrinho />
            <window.AdicionarProdutos />
          </div>
        </div>
      </>
      )}
    </main>    
  );
}

ReactDOM.createRoot(document.getElementById("mercado")).render(<App />);
