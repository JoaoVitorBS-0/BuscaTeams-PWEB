async function buscarTime() {
    const nomeTime = document.getElementById('inputTime').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const mensagemErro = document.getElementById('mensagemErro');

    // Limpa resultados e mensagens anteriores
    resultadoDiv.innerHTML = '';
    mensagemErro.innerText = '';

    if (!nomeTime) {
        mensagemErro.innerText = 'Por favor, digite o nome de um time.';
        return;
    }

    const url = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(nomeTime)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.teams) {
            mensagemErro.innerText = 'Time não encontrado. Tente outro nome.';
            return;
        }

        const time = data.teams[0];

        let escudoUrl = time.strBadge || 'https://images.thesportsdb.com/images/media/league/badge/default.png';
        escudoUrl = escudoUrl.replace('http://', 'https://');
        if (escudoUrl.includes('thesportsdb.com') && !escudoUrl.endsWith('/preview')) {
            escudoUrl = escudoUrl + '/preview';
        }

        resultadoDiv.innerHTML = `
            <div class="card-time">
                <img class="escudo" src="${escudoUrl}" alt="Escudo do ${time.strTeam}">
                
                <h2 class="nome-time">${time.strTeam}</h2>

                <div class="info-list">
                    <div class="info-item">
                        <span class="info-label">Estádio</span>
                        <span class="info-valor">${time.strStadium || 'Não informado'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Capacidade</span>
                        <span class="info-valor">
                        ${time.intStadiumCapacity ? Number(time.intStadiumCapacity).toLocaleString('pt-BR') : 'Não informada'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Cidade</span>
                        <span class="info-valor">${time.strLocation || 'Não informada'}</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        mensagemErro.innerText = 'Ocorreu um erro ao buscar as informações. Tente novamente.';
    }
}