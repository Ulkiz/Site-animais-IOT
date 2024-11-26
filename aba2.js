// Função para exibir os pets
function exibirPets() {
  const container = document.getElementById('pets-container');

  // Carregar pets da API local
  fetch('http://localhost:3000/api/pets')
    .then(response => response.json())
    .then(pets => {
      if (pets.length === 0) {
        container.innerHTML = '<p>Nenhum pet registrado ainda.</p>';
      } else {
        container.innerHTML = '';
        pets.forEach(pet => exibirCardPet(pet, container)); // Exibe cada pet
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os pets da API:', error);
      container.innerHTML = '<p>Erro ao carregar os pets da API.</p>';
    });
}

// Função para exibir o card de cada pet
function exibirCardPet(pet, container) {
  const petCard = document.createElement('div');
  petCard.classList.add('pet-card');

  const img = document.createElement('img');
  img.src = pet.foto;
  img.alt = 'Foto do Pet';
  img.classList.add('pet-foto');

  const info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = `
    <h3>${pet.nome}</h3>
    <p><strong>Idade:</strong> ${pet.idade} anos</p>
    <p><strong>Tipo:</strong> ${pet.tipo}</p>
  `;

  petCard.appendChild(img);
  petCard.appendChild(info);

  const verMaisBtn = document.createElement('button');
  verMaisBtn.textContent = 'Ver mais';
  verMaisBtn.classList.add('ver-mais-botao');
  verMaisBtn.onclick = () => alternarInformacoes(pet, petCard); // Alterna as informações ao clicar "ver mais"

  petCard.appendChild(verMaisBtn);

  container.appendChild(petCard);
}

// Função para alternar a exibição das informações adicionais
function alternarInformacoes(pet, petCard) {
  let infoAdicional = petCard.querySelector('.info-adicional');

  if (!infoAdicional) {
    infoAdicional = document.createElement('div');
    infoAdicional.classList.add('info-adicional');
    infoAdicional.innerHTML = `
      <p><strong>Temperatura:</strong> ${pet.temperatura || 'N/D'}</p>
      <p><strong>Frequência cardíaca:</strong> ${pet.saude || 'N/D'}</p>
    `;
    petCard.appendChild(infoAdicional);
  } else {
    petCard.removeChild(infoAdicional);
  }
}

window.onload = exibirPets;  // Carregar os pets assim que a página carregar
