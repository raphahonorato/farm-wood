
function procurarPalavraFiltrada(texto) {
    const timestampRegex = /lastChop\s*­(\d{13})/g;
    const timestamps = Array.from(texto.matchAll(timestampRegex));
    const timestampsFormatados = [];

    timestamps.forEach((timestamp, index) => {
        const dataTimestamp = new Date(parseInt(timestamp[1]));
        // Adiciona 7 horas e 15 minutos ao timestamp capturado
        dataTimestamp.setHours(dataTimestamp.getHours() + 7);
        dataTimestamp.setMinutes(dataTimestamp.getMinutes() + 15);
        const hora = dataTimestamp.getHours().toString().padStart(2, '0');
        const minutos = dataTimestamp.getMinutes().toString().padStart(2, '0');
        const segundos = dataTimestamp.getSeconds().toString().padStart(2, '0');
        timestampsFormatados.push(`${hora}:${minutos}:${segundos}`);
    });

    return timestampsFormatados;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botao').addEventListener('click', function () {
        const texto = document.getElementById('texto').value;
        const timestamps = procurarPalavraFiltrada(texto);
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        if (timestamps.length > 0) {
            const listaResultados = document.createElement('ul');
            timestamps.forEach((timestamp, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Árvore ${index + 1}: ${timestamp}`;
                listaResultados.appendChild(listItem);
            });
            resultadosDiv.appendChild(listaResultados);
        } else {
            resultadosDiv.textContent = 'Nenhuma árvore encontrada!';
        }
    });
});