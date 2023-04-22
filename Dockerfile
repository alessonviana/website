# Use a imagem do Nginx como base
FROM nginx:latest

# Copie os arquivos do projeto para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx para acesso externo
EXPOSE 80
