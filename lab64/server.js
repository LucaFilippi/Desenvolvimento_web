const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuração do Multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Função para servir arquivos HTML e CSS
function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erro interno no servidor.');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
}

// Função principal para lidar com as requisições
function handleRequest(req, res) {
    if (req.url === '/' && req.method === 'GET') {
        serveFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else if (req.url === '/upload' && req.method === 'GET') {
        serveFile(res, path.join(__dirname, 'public', 'upload.html'), 'text/html');
    } else if (req.url === '/about' && req.method === 'GET') {
        serveFile(res, path.join(__dirname, 'public', 'about.html'), 'text/html');
    } else if (req.url === '/style.css' && req.method === 'GET') {
        serveFile(res, path.join(__dirname, 'public', 'style.css'), 'text/css');
    } else if (req.url === '/upload' && req.method === 'POST') {
        // Manipular o upload de arquivos
        upload.single('file')(req, res, function (err) {
            if (err) {
                return res.end('Erro no upload.');
            }
            // Após o upload, redirecionar para a página de sucesso
            res.writeHead(302, { 'Location': '/upload-success' });
            res.end();
        });
    } else if (req.url === '/upload-success' && req.method === 'GET') {
        serveFile(res, path.join(__dirname, 'public', 'upload-success.html'), 'text/html');
    } else {
        // Rota desconhecida: Servir a página 404
        serveFile(res, path.join(__dirname, 'public', '404.html'), 'text/html');
    }
}

// Criar o servidor
const server = http.createServer(handleRequest);

// Iniciar o servidor na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
