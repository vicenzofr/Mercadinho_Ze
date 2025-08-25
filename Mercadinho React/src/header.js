function Header({ onLoginClick, onMenuClick }) {
  return (
    <header className="flex items-center p-4 w-full border-b-2 border-gray-300">
      <img src="./assets/icons/logo.png" alt="Logo Mercadinho" className="w-20 h-20 mr-3"/>
      <h1 className="text-[27px] font-bold text-[#4EB352]">MERCADINHO DO ZÉ</h1>
      
      <button
        aria-label="Abrir menu"
        onClick={onMenuClick}
        className="h-7 w-7 bg-center bg-no-repeat bg-contain cursor-pointer bg-[url('./assets/icons/menu.png')] ml-auto mr-5flex justify-center items-center gap-10"
      />
    </header>
  );
}
window.Header = Header;
