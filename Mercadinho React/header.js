function Header({ onLoginClick }) {
  return (
    <header className="flex items-center p-4 text-white w-full border-b-2 border-gray-300 ">
      <img src="./assets/icons/carrinho.png" alt="Logo Mercadinho" className="w-10 h-10 mr-3"/>
      <h1 className="text-xl font-bold text-[#4EB352]">MERCADINHO DO ZÉ</h1>
      <button 
        onClick={onLoginClick}
        className="w-40 h-12 bg-[#4EB352] rounded-lg cursor-pointer ml-auto mr-4 flex justify-center items-center gap-10 font-bold">
        Login
      </button>
    </header>
  );
}
window.Header = Header;
