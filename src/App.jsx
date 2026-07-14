import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("produtos"));
    if (dados) {
      setProdutos(dados);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  function cadastrarProduto(e) {
    e.preventDefault();

    if (!nome || !categoria || !preco) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      categoria,
      preco,
    };

    setProdutos([...produtos, novoProduto]);

    setNome("");
    setCategoria("");
    setPreco("");
  }

  function excluirProduto(id) {
    const lista = produtos.filter((produto) => produto.id !== id);
    setProdutos(lista);
  }

  return (
    <div className="container">
      <h1>Sistema de Cadastro de Produtos</h1>

      <form onSubmit={cadastrarProduto}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <h2>Produtos Cadastrados</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>R$ {produto.preco}</td>
                <td>
                  <button onClick={() => excluirProduto(produto.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;