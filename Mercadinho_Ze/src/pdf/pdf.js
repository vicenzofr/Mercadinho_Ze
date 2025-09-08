import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Corrigindo __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const doc = new PDFDocument({ size: 'A4' });

doc.pipe(fs.createWriteStream('boleto.pdf'));

//title 

const startyX = 150; // ponto inicial horizontal
const startyY = 100; // ponto inicial vertical

// Primeiro a imagem
doc.image(path.join(__dirname, "../../assets/icons/logo.png"), startyX, startyY, { width: 50 });

// Depois o texto, ajustando o x para não sobrepor a imagem
doc.font('Helvetica-Bold').fillColor('#4EB352').fontSize(27).text('Mercadinho do Zé', startyX + 60, startyY + 13);



// --- QUADRO PRINCIPAL (como uma div) ---
const pageWidth = doc.page.width;
const pageHeight = doc.page.height;

const boxWidth = 400;
const boxHeight = 200;
const boxX = (pageWidth - boxWidth) / 2;
const boxY = 300; // um pouco abaixo do topo

// Fundo roxo e cantos arredondados
doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 8) // 15 = raio dos cantos
   .fill('#F9FAFB'); // cor de fundo

// --- DADOS DA TABELA ---
const data = [
  ['Produto', 'Quantidade', 'Valor'],
  ['Arroz', '2', 'R$10'],
  ['Feijão', '1', 'R$8'],
  ['Macarrão', '3', 'R$12'],
];

const total = 'R$30';

// Posições iniciais
const startX = boxX + 20; // margem interna horizontal
let startY = boxY + 20;   // margem interna vertical
const colWidth = 120;
const rowHeight = 25;

// --- CABEÇALHO ---
doc.font('Helvetica-Bold')
   .fontSize(12)
   .fillColor('#000000');

let colX = startX;
data[0].forEach((cell) => {
  doc.text(cell, colX, startY, { width: colWidth, align: 'center' });
  colX += colWidth;
});

startY += rowHeight; // próxima linha

// --- CORPO DA TABELA ---
doc.font('Helvetica')
   .fontSize(10)
   .fillColor('#000000');

for (let i = 1; i < data.length; i++) {
  colX = startX;
  data[i].forEach((cell, j) => {
    // centraliza quantidade e valor, produto à esquerda
    let options = { width: colWidth, align: j === 0 ? 'left' : 'center' };
    doc.text(cell, colX, startY, options);
    colX += colWidth;
  });
  startY += rowHeight;
}

// --- LINHA TOTAL ---
startY += 10; // pequeno espaçamento
doc.moveTo(startX, startY)
   .lineTo(startX + colWidth * 3 - 10, startY)
   .stroke('#000000');

startY += 5;

doc.font('Helvetica-Bold')
   .fontSize(12)
   .text('TOTAL', startX, startY, { width: colWidth * 2, align: 'left' })
   .text(total, startX + colWidth * 2, startY, { width: colWidth, align: 'center' });

doc.end();