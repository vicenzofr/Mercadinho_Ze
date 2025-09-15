function ProdutosDisponiveis({ removivel }) {
  const [listaProdutos, setListaProdutos] = useState([]);

  // função reutilizável que busca a lista do backend
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

  // busca inicial
  useEffect(() => {
    fetchProdutos();
  }, []);

  // quando um produto é adicionado em outro lugar, atualiza a lista
  useEffect(() => {
    const handleProdutoAdicionado = (e) => {
      // opção simples e robusta: refetch (garante consistência)
      fetchProdutos();
      // se preferir usar o objeto retornado pelo backend:
      // const novo = e?.detail;
      // if (novo) setListaProdutos(prev => [...prev, novo]);
    };

    window.addEventListener("produtoAdicionado", handleProdutoAdicionado);
    return () => window.removeEventListener("produtoAdicionado", handleProdutoAdicionado);
  }, []); // vazio: só registra uma vez

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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {listaProdutos.map((produto) => (
        <window.Produtos
          key={produto.id}
          imagem={produto.img ? `data:image/png;base64,${produto.img}` : `./assets/food/${produto.nome}.png`}
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
