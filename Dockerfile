FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/alianzas
COPY dist/alianzas /usr/share/nginx/html/alianzas/
