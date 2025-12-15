/* ================= ELEMENTOS EXISTENTES ================= */
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

/* ================= FUNÇÕES EXISTENTES ================= */
function filtrar() {
  const valor = searchInput.value.toLowerCase().trim();
  let encontrou = false;

  document.querySelectorAll(".item").forEach(item => {
    const nome = item.dataset.nome.toLowerCase();

    if (nome.includes(valor) && valor !== "") {
      item.style.display = "block";
      encontrou = true;
    } else {
      item.style.display = "none";
    }
  });

  if (valor === "") {
    document.querySelectorAll(".item").forEach(item => item.style.display = "block");
  }

  return encontrou;
}

function pesquisarComAlerta() {
  const encontrou = filtrar();
  if (!encontrou && searchInput.value.trim() !== "") {
    alert("❌ Código não encontrado");
  }
}

/* ================= EVENTOS EXISTENTES ================= */
searchInput.addEventListener("keyup", filtrar);
btnSearch.addEventListener("click", pesquisarComAlerta);
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") pesquisarComAlerta();
});

/* ================= NOVO: ESPELHAMENTO BACKEND ================= */
const API_URL = "https://cadastrocatagoloesfera.infinityfreeapp.com/API/upload.php";
const galeria = document.getElementById("galeria");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalNome = document.getElementById("modalNome");
const modalPreco = document.getElementById("modalPreco");
const modalDesc = document.getElementById("modalDesc");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    if (!data.produtos) return;
    data.produtos.forEach(produto => criarItem(produto));
  });

function criarItem(produto) {
  const item = document.createElement("div");
  item.className = "item";

  /* ESSENCIAL PARA SUA BUSCA */
  item.dataset.nome = (produto.codigo || produto.nome).toLowerCase();

  item.innerHTML = `
    <img src="${produto.imagem}">
    <div class="info">
      <h3>${produto.nome}</h3>
      <span>R$ ${produto.preco}</span>
    </div>
  `;

  item.onclick = () => {
    modalImg.src = produto.imagem;
    modalNome.textContent = produto.nome;
    modalPreco.textContent = "R$ " + produto.preco;
    modalDesc.textContent = produto.descricao || "";
    modal.style.display = "flex";
  };

  galeria.appendChild(item);
}

/* FECHAR MODAL */
closeModal.onclick = () => modal.style.display = "none";
modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};
