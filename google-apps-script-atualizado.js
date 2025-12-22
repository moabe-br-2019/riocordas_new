function doPost(e) {
  try {
    // 1. VALIDACAO DE DADOS
    if (!e.postData || !e.postData.contents) {
      return ContentService.createTextOutput("Nenhum dado enviado.")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    const data = JSON.parse(e.postData.contents);

    // ======================================================
    // CONFIGURAÇÕES
    // ======================================================
    const DB_SPREADSHEET_ID = "1AOWo-vvmWl5S1fy6XAjgPlzw4l0Pz4m7B3nzF43nL3M";
    const TEMPLATE_ID = "18Q5owlJcQGFsBo-rKPW0Kphaz2fsVgsE9CcYZ-ZzDkw";
    const FOLDER_ID = "1N398d-U-SOyUjq9FILI6B_ib52r2CMIQ";

    // ======================================================
    // ETAPA 1: PREENCHER O BANCO DE DADOS
    // ======================================================

    const spreadsheet = SpreadsheetApp.openById(DB_SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName("dados");

    if (!sheet) {
      throw new Error("Aba 'dados' não encontrada na planilha Banco de Dados.");
    }

    const timestamp = new Date();

    // MODIFICADO: Adiciona os novos campos de valores
    const row = [
      timestamp,
      data.nome_completo || "",
      data.cpf || "",
      data.rg || "",
      data.endereco_residencial || "",
      data.celular || "",
      data.email || "",
      data.nome_casa || "",
      data.endereco_casa || "",
      data.data_evento || "",
      data.horario_cerimonia || "",
      data.horario_convidados || "",
      data.pacote || "",
      data.instrumentos_escolhidos || "",
      data.trompete || "",
      data.sonorizacao || "",
      data.forma_pagamento || "",
      // NOVOS CAMPOS DE VALORES
      data.preco_pacote || 0,
      data.preco_trompete || 0,
      data.preco_sonorizacao || 0,
      data.valor_total || 0,
      data.ano_evento || "",
      data.observacoes || ""
    ];

    sheet.appendRow(row);

    // ======================================================
    // ETAPA 2: GERAR O CONTRATO
    // ======================================================

    const templateFile = DriveApp.getFileById(TEMPLATE_ID);
    const newFileName = "Contrato - " + (data.nome_completo || "Cliente Sem Nome");

    let newFile;
    if (FOLDER_ID && FOLDER_ID.length > 5) {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      newFile = templateFile.makeCopy(newFileName, folder);
    } else {
      newFile = templateFile.makeCopy(newFileName);
    }

    const newSpreadsheet = SpreadsheetApp.openById(newFile.getId());
    const contractSheet = newSpreadsheet.getSheets()[0];

    const keys = Object.keys(data);

    // Regex para identificar formato de data YYYY-MM-DD
    const regexData = /^\d{4}-\d{2}-\d{2}$/;

    keys.forEach(key => {
      const placeholder = "{{" + key + "}}";
      let value = data[key] || "";

      // SE for uma data no formato YYYY-MM-DD (ex: 2025-11-21), formata para extenso
      if (typeof value === 'string' && regexData.test(value)) {
        value = formatarDataPorExtenso(value);
      }

      // NOVO: Se for um campo de preço numérico, formata como moeda
      if (key === 'preco_pacote' || key === 'preco_trompete' ||
          key === 'preco_sonorizacao' || key === 'valor_total') {
        value = formatarMoeda(value);
      }

      contractSheet.createTextFinder(placeholder).replaceAllWith(String(value));
    });

    // ------------------------------------------------------
    // MODIFICAÇÃO SOLICITADA: FORMATAR TIMESTAMP
    // ------------------------------------------------------
    const hojeExtenso = formatarDataHojeExtenso();

    // Substitui {{data_hoje}} (caso você use)
    contractSheet.createTextFinder("{{data_hoje}}").replaceAllWith(hojeExtenso);

    // Substitui {{timestamp}} pela data formatada (ex: 04 de dezembro de 2025)
    contractSheet.createTextFinder("{{timestamp}}").replaceAllWith(hojeExtenso);

    SpreadsheetApp.flush();

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "sucesso",
        message: "Cliente cadastrado e contrato gerado!"
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "erro", message: err.message, stack: err.stack })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==========================================================
// FUNÇÕES AUXILIARES DE DATA
// ==========================================================

// Transforma "2025-11-21" em "21 de novembro de 2025"
function formatarDataPorExtenso(dataString) {
  if (!dataString) return "";
  const partes = dataString.split('-'); // [2025, 11, 21]
  const ano = partes[0];
  const mesIndex = parseInt(partes[1]) - 1; // Meses em array começam em 0
  const dia = partes[2];

  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  return `${dia} de ${meses[mesIndex]} de ${ano}`;
}

// Retorna a data de hoje por extenso
function formatarDataHojeExtenso() {
  const hoje = new Date();
  const dia = hoje.getDate(); // Dia do mês (1-31)
  const mes = hoje.getMonth(); // 0 a 11
  const ano = hoje.getFullYear();

  // Garante zero à esquerda se necessário (opcional, mas comum em dia < 10)
  const diaFormatado = dia < 10 ? '0' + dia : dia;

  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  return `${diaFormatado} de ${meses[mes]} de ${ano}`;
}

// ==========================================================
// NOVA FUNÇÃO: FORMATAR MOEDA
// ==========================================================

// Formata número para moeda brasileira (ex: 1799 -> "R$ 1.799,00")
function formatarMoeda(valor) {
  if (!valor && valor !== 0) return "R$ 0,00";

  const numero = typeof valor === 'string' ? parseFloat(valor) : valor;

  if (isNaN(numero)) return "R$ 0,00";

  return "R$ " + numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ==========================================================
// PRECISAR DE PERMISSÃO? EXECUTE ESTA FUNÇÃO
// ==========================================================
function forcarAutorizacao() {
  DriveApp.createFile("temp.txt", "teste").setTrashed(true);
  SpreadsheetApp.getActive();
  console.log("Permissões Ok.");
}
