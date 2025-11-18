document.addEventListener('DOMContentLoaded', () => {
    const cep = document.querySelector('#cep');
    const rua = document.querySelector('#rua');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const message = document.querySelector('#message'); // Agora o elemento existe

    // Evento para quando o campo CEP perde o foco
    cep.addEventListener('focusout', () => {
        const cepValue = cep.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cepValue.length === 8) {  // Verifica se o CEP tem 8 dígitos
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        message.textContent = "CEP não encontrado!";
                        message.style.color = "red";
                    } else {
                        rua.value = data.logradouro;
                        bairro.value = data.bairro;
                        cidade.value = data.localidade;
                        message.textContent = ""; // Limpa a mensagem de erro
                    }
                })
                .catch(error => {
                    message.textContent = "Erro ao buscar CEP. Tente novamente.";
                    message.style.color = "red";
                });
        } else {
            message.textContent = "CEP inválido!";
            message.style.color = "red";
        }
    });
});
