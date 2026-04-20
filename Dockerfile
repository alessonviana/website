# Use uma imagem enxuta e versionada do Nginx como base.
FROM nginx:1.27-alpine

# Copie apenas os arquivos públicos do site para a pasta padrão do Nginx.
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY fonts/ /usr/share/nginx/html/fonts/
COPY img/ /usr/share/nginx/html/img/
COPY js/ /usr/share/nginx/html/js/

# Expõe a porta padrão do Nginx para acesso externo.
EXPOSE 80
