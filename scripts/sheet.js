 // https://docs.google.com/spreadsheets/d/1pnlEf_VL0x0FSbt-fMOFrkl0JsNOXsk3QOOp4qYPRzE/edit#gid=0


// const { google } = require('googleapis');
// const fs = require('fs');

// // Carregar as credenciais do arquivo JSON
// const credentials = JSON.parse(fs.readFileSync('./auth/credentials.json'));

// // Configurar o cliente de autenticação
// const auth = new google.auth.GoogleAuth({
//   credentials: credentials,
//   scopes: ['https://www.googleapis.com/auth/spreadsheets']
// });

// // Criar uma instância do cliente Google Sheets
// const sheets = google.sheets({ version: 'v4', auth });

// // ID da planilha
// const spreadsheetId = '1pnlEf_VL0x0FSbt-fMOFrkl0JsNOXsk3QOOp4qYPRzE';

// // Nome da folha dentro da planilha
// const sheetName = 'testes';

// // Função para enviar dados para a planilha
// async function updateSheet() {
//     try {
//       // Dados das pessoas que você deseja enviar para a planilha
//       const peopleData = [
//         ['Nome', 'Idade'],
//         ['rapha', 28],
//         ['Maria', 25],
//         ['José', 35]
//         // Adicione mais linhas de dados conforme necessário
//       ];
  
//       // Fazer a solicitação para atualizar a planilha
//       const response = await sheets.spreadsheets.values.update({
//         spreadsheetId: spreadsheetId,
//         range: `${sheetName}!A1:B${peopleData.length}`, // Define a faixa para abranger todas as linhas de dados
//         valueInputOption: 'RAW',
//         requestBody: {
//           values: peopleData
//         }
//       });
  
//       console.log('Dados enviados para a planilha com sucesso:', response.data);
//     } catch (error) {
//       console.error('Erro ao enviar dados para a planilha:', error);
//     }
//   }
  
//   // Chamar a função para enviar os dados para a planilha
//   updateSheet();
  





const { google } = require('googleapis');
const fs = require('fs');

// Carregar as credenciais do arquivo JSON
const credentials = JSON.parse(fs.readFileSync('./auth/credentials.json'));

// Configurar o cliente de autenticação
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// Criar uma instância do cliente Google Sheets
const sheets = google.sheets({ version: 'v4', auth });

// ID da planilha
const spreadsheetId = '1pnlEf_VL0x0FSbt-fMOFrkl0JsNOXsk3QOOp4qYPRzE';

// Nome da folha dentro da planilha
const sheetName = 'testes';

// Função para enviar dados para a planilha
async function updateSheet() {
    try {
      // Ler o arquivo de texto e procurar por informações de árvores
      const caminhoDoArquivo = './texto.txt';
      const textoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8');
      const timestampRegex = /lastChop\s*­(\d{13})/g;
      const timestamps = Array.from(textoDoArquivo.matchAll(timestampRegex));

      // Criar os dados a serem enviados para a planilha
      const treeData = timestamps.map((timestamp, index) => {
        const dataTimestamp = new Date(parseInt(timestamp[1]));
        const hora = dataTimestamp.getHours().toString().padStart(2, '0');
        const minutos = dataTimestamp.getMinutes().toString().padStart(2, '0');
        const segundos = dataTimestamp.getSeconds().toString().padStart(2, '0');
        return [`Árvore ${index + 1}`, `${hora}:${minutos}:${segundos}`];
      });

      // Fazer a solicitação para atualizar a planilha
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: `${sheetName}!A1:B${treeData.length}`, // Define a faixa para abranger todas as linhas de dados
        valueInputOption: 'RAW',
        requestBody: {
          values: treeData
        }
      });

      console.log('Dados das árvores enviados para a planilha com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para a planilha:', error);
    }
}

// Chamar a função para enviar os dados para a planilha
updateSheet();
