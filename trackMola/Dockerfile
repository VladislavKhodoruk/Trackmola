# Angular Build
FROM node:15.10.0-alpine3.10 AS appBuild
WORKDIR /app
COPY . .
RUN npm i && node ./node_modules/@angular/cli/bin/ng build --prod --output-path dist/lavds45jlmhi1pgafg6v6lc8e5mwajnr --base-href /lavds45jlmhi1pgafg6v6lc8e5mwajnr/

# Copy to image
FROM nginx:1.19.7-alpine
RUN rm /usr/share/nginx/html/index.html
COPY --from=appBuild /app/dist/ /usr/share/nginx/html
RUN echo 'server { listen 80; root /usr/share/nginx/html/lavds45jlmhi1pgafg6v6lc8e5mwajnr; location / { rewrite /lavds45jlmhi1pgafg6v6lc8e5mwajnr(/.*) $1; try_files $uri $uri/ /index.html =404;}}' > /etc/nginx/conf.d/default.conf
EXPOSE 80