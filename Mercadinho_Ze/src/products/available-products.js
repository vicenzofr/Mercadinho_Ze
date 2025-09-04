function ProdutosDisponiveis({removivel}) {
  const [listaProdutos, setListaProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const produtos = await response.json();
        setListaProdutos(produtos);
        console.log("Produtos no banco:", produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
      }
    };

    fetchProdutos();
  }, []);
  const handleRemove = async (produto) => {
    try {
      const confirmar = window.confirm(`Certeza que deseja remover o produto ${produto.nome}?`);
      if (!confirmar) return;
      const response = await fetch(`http://localhost:3000/product/delete/${produto.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Status:", response.status);
        throw new Error("Erro ao remover o produto");
      }

      const removeData = await response.json();
      console.log("Produto removido:", removeData);

      // Atualiza lista
      const productsResponse = await fetch("http://localhost:3000/products");
      const products = await productsResponse.json();
      setListaProdutos(products);

    } catch (error) {
      console.error("Erro ao deletar o produto:", error.message);
    }
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {listaProdutos.map((produto) => (
        <window.Produtos
          key={produto.id}
          imagem={`./assets/food/${produto.nome}.png`}
          nome={produto.nome}
          valor={produto.preco}
          removivel={removivel}
          onRemove={() => handleRemove(produto)}
        />
      ))}
    </div>
  );
}

window.ProdutosDisponiveis = ProdutosDisponiveis;
