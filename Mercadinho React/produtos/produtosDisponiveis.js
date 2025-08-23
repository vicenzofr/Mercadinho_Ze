
function ProdutosDisponiveis() {
  const listaProdutos = [
    { 
        imagem: "./assets/food/hamburger.png",
        nome: "Hambúrguer",
        valor: 25.00 
    },

    {
      imagem: "./assets/food/taco.png",
      nome: "Taco",
      valor: 13
    },

    {
      imagem: "./assets/food/donut.png",
      nome: "Donut",
      valor: 5
    },

    {
      imagem: "./assets/food/pizza.png",
      nome: "Pizza",
      valor: 26
    },

     {
      imagem: "./assets/food/french-fries.png",
      nome: "Batata Frita",
      valor: 13
    },
    
    {
      imagem: "./assets/food/orange.png",
      nome: "Laranja",
      valor: 2
    },

    {
      imagem: "./assets/food/juice-box.png",
      nome: "Suco",
      valor: 7
    },

    {
      imagem: "./assets/food/cola.png",
      nome: "CocaCola",
      valor: 4
    },

    {
      imagem: "./assets/food/coffee-cup.png",
      nome: "Café",
      valor: 3
    },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {listaProdutos.map((produto, index) => (
            <window.Produtos
                key={index}
                imagem={produto.imagem}
                nome={produto.nome}
                valor={produto.valor}
            />
        ))}
    </div>

  );
}
window.ProdutosDisponiveis = ProdutosDisponiveis;
