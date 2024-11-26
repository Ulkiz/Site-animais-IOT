// Função para fazer upload da imagem e mostrar a prévia
function preview(event) {
  const photo = document.getElementById('petfoto');
  const file = event.target.files[0];  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photo.src = e.target.result;  // Exibe a imagem selecionada como prévia
    };
    reader.readAsDataURL(file);  // Lê o arquivo de imagem e converte para uma URL
  }
}

// Função para salvar na API local
function salvarPet() {
  const nome = document.getElementById('petnome').value;
  const idade = document.getElementById('petidade').value;
  const tipo = document.getElementById('petraca').value;
  const foto = document.getElementById('petfoto').src;

  const pet = { nome, idade, tipo, foto };

  // Enviar o pet para a API local
  fetch('http://localhost:3000/api/pets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),  // Envia para o servidor
  })
  .then(response => response.json())  // resposta seja um JSON
  .then(data => {
    console.log(data);  // Isso deve exibir o pet adicionado no console para depuração
    alert('Pet salvo com sucesso!');  // Confirmação de que o pet foi salvo no site
    limparFormulario()
  })
  .catch(error => {
    console.error('Erro ao salvar o pet:', error); // caso aconteça de dar errado
    alert('Erro ao salvar o pet!');
  });
}


// reseta o formulario dps de enviar
function limparFormulario() {
  document.getElementById('petnome').value = '';
  document.getElementById('petidade').value = '';
  document.getElementById('petraca').value = '';
  document.getElementById('petfoto').src = 'https://via.placeholder.com/100';
}

