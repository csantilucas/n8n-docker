const items = $input.all();
const linhasConversa = [];
const contagemNomes = {};
let cnpjEncontrado = null;
let avaliacaoEncontrada = null;
let mensagensPosAvaliacao = 0;

// Lista de usuários já com o ID e Nome do Departamento mapeados
const users = [
    { "id": "88d9017411e1193efddc41261e5b0978", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Lucas Coimbra" },
    { "id": "0720a2f0cdb88d3ce20cc5fb0ff1facc", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Julia Gonçalves" },
    { "id": "a009602369b96774a9fe91df10878bd7", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Nei Neri" },
    { "id": "30e93a7a868bcc4e883f55fa0fd9bbd7", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Fernando Silva" },
    { "id": "1c1460c7111c735a48bd74e7c56a253d", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Pedro Mittmann" },
    { "id": "47330795a4e381bb7ec0107268844721", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Gabriel Henrique" },
    { "id": "d1147111ee07c84b9d1f0932bb96050c", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Geneses Souza" },
    { "id": "b7493715e9fc105eb8c789b38ab31de6", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Edmilson Júnior" },
    { "id": "c9a61fe4e48236b7527a7bacb839b19d", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Gustavo Maciel" },
    { "id": "600c5502c892d8d6e0944415a134abfa", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Thiago José" },
    { "id": "4d978d684d1d656c39911bbfe518fd1d", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Guilherme Dalanhol" },
    { "id": "21f1ed495062105b6d207626316b9626", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Tainara" },
    { "id": "37a2b3203d2b93aae2d3bd9123044d53", "departmentId": "19284e98480603eb12016def694ccfdd", "departmentName": "Suporte Técnico", "name": "Kariny Moreira de Paula" }
];

const mensagens = items[0]?.json?.data || [];
mensagens.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

mensagens.forEach(msg => {
    const data = new Date(msg.createdAt);
    const dataFormatada = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    let autor = msg.fromMe ? "Atendente" : "Cliente";
    if (msg.sendType === "bot") autor = "Bot";

    if (msg.body && msg.sendType !== "transfer") {
        let texto = msg.body;

        if (msg.mediaType === "button") {
            texto = texto.replace("Body: ", "").replace(/, Btn\d+: /g, " | ");
        }

        if (msg.mediaType === "vcard") {
            const nomeMatch = texto.match(/FN:(.+)/);
            const nome = nomeMatch ? nomeMatch[1] : "Contato";
            texto = `[Contato Enviado: ${nome}]`;
        }

        if (!msg.fromMe) {
            const regexCNPJ = /(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|(?:\b\d{14}\b)/;
            const matchCNPJ = texto.match(regexCNPJ);
            if (matchCNPJ) {
                cnpjEncontrado = matchCNPJ[0].replace(/\D/g, "");
            }
        }

        texto = texto.replace(/\n/g, " ");

        // Lógica de captura da avaliação
        if (mensagensPosAvaliacao > 0 && !msg.fromMe) {
            const matchNota = texto.match(/\b([0-5])\b/);
            if (matchNota) {
                avaliacaoEncontrada = parseInt(matchNota[1], 10);
                mensagensPosAvaliacao = 0;
            } else {
                mensagensPosAvaliacao--;
            }
        }

        if (msg.fromMe && texto.includes("Avalie este atendimento")) {
            mensagensPosAvaliacao = 2;
        }

        if (msg.fromMe) {
            const regexNome = /\*([A-Za-zÀ-ÿ\s]+)\*:/g;
            let match;
            while ((match = regexNome.exec(texto)) !== null) {
                const nomeEncontrado = match[1].trim();
                contagemNomes[nomeEncontrado] = (contagemNomes[nomeEncontrado] || 0) + 1;
            }
        }

        linhasConversa.push(`[${dataFormatada}] ${autor}: ${texto}`);
    }
});

let nomeMaisFrequente = "Não identificado";
let maiorQuantidade = 0;

for (const [nome, quantidade] of Object.entries(contagemNomes)) {
    if (quantidade > maiorQuantidade) {
        maiorQuantidade = quantidade;
        nomeMaisFrequente = nome;
    }
}

const usuarioEncontrado = users.find(u => 
    u.name.toLowerCase().includes(nomeMaisFrequente.toLowerCase()) || 
    nomeMaisFrequente.toLowerCase().includes(u.name.toLowerCase())
);

// Extração direta das informações do usuário mapeado
const userId = usuarioEncontrado ? usuarioEncontrado.id : null;
const userName = usuarioEncontrado ? usuarioEncontrado.name : nomeMaisFrequente;
const departmentId = usuarioEncontrado ? usuarioEncontrado.departmentId : null;
const departmentName = usuarioEncontrado ? usuarioEncontrado.departmentName : null;

return [{
  json: {
    userId: userId,
    userName: userName,
    departmentId: departmentId,
    departmentName: departmentName,
    cnpj: cnpjEncontrado,
    avaliacao: avaliacaoEncontrada,
    total_interacoes: maiorQuantidade,
    conversation_text: linhasConversa.join('\n'),
    conversation_list: linhasConversa,
    ranking_atendentes: contagemNomes
  }
}];