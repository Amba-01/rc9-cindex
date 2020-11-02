# Build Stage
FROM node:15.0.1-alpine3.10 As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@latest
COPY . .
RUN ng build --prod

# Production Stage
FROM nginx:1.19.3-alpine
COPY --from=builder /usr/src/app/dist/cindex-web/ /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/configs/prod
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
