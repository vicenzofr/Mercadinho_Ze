function App() {
  const [tela, setTela] = React.useState("site");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [painel, setPainel] = React.useState("cart");
  const [removeMode, setRemoveMode] = React.useState(false);

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
          <window.Header
            onLoginClick={() => setTela("login")}
            onMenuClick={() => setMenuOpen(v => !v)}
          />
        </div>

        {/* menu aparece só quando menuOpen == true */} 
        {menuOpen && (
          <div 
            className="w-full flex justify-end px-4 relative">
            <window.Menu
            onUserClick={() => setTela("login")}
            onCartClick={() => { setPainel("cart"); setMenuOpen(false); setRemoveMode(false)}}
            onAddClick={() => { setPainel("add"); setMenuOpen(false); setRemoveMode(false) }}
            onCloseClick={() => { setRemoveMode(v => !v); setMenuOpen(false); }}/>
          </div>
        )}
      
         <div className="mt-6 flex gap-8 items-start">
            <div className="flex-1">
              <window.ProdutosDisponiveis showRemove={removeMode} />
            </div>
            <div className="flex flex-col gap-4">
              {painel === 'cart' ? <window.Carrinho /> : <window.AdicionarProdutos />}
            </div>
          </div>
      </>
      )}
    </main>    
  );
}

ReactDOM.createRoot(document.getElementById("mercado")).render(<App />);