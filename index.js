const fs = require('fs');
const caminhoDoArquivo = './texto.txt';


function procurarPalavraFiltrada(caminhoDoArquivo) {
    try {
        const textoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8');
        const timestampRegex = /lastChop\s*­(\d{13})/g;
        const timestamps = Array.from(textoDoArquivo.matchAll(timestampRegex));

        if (timestamps.length) {
            console.log(`Árvores encontradas: ${timestamps.length}`)
            timestamps.forEach((timestamp, index) => {
                // Converta o timestamp para data
                const dataTimestamp = new Date(parseInt(timestamp[1]));

                // Obtenha apenas a hora
                const hora = dataTimestamp.getHours().toString().padStart(2, '0');
                const minutos = dataTimestamp.getMinutes().toString().padStart(2, '0');
                const segundos = dataTimestamp.getSeconds().toString().padStart(2, '0');

                console.log(`Árvore ${index + 1}: ${hora}:${minutos}:${segundos}`);
            });
        } else {
            console.log('Nenhum timestamp encontrado para "lastChop".');
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }
}


procurarPalavraFiltrada(caminhoDoArquivo);