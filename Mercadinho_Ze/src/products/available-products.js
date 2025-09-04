function ProdutosDisponiveis({ showRemove }) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {listaProdutos.map((produto) => (
        <window.Produtos
          key={produto.id}
          imagem={url=`./assets/food/${produto.nome}.png`}
          nome={produto.nome}
          valor={produto.preco}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
}

window.ProdutosDisponiveis = ProdutosDisponiveis;
