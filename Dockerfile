FROM node:10.16.3 as build
WORKDIR /polydesk-www
ENV PATH /polydesk-www/node_modules/.bin:$PATH
COPY package.json /polydesk-www/package.json
RUN npm install
RUN npm install -g @angular/cli@9.1.6
COPY . /polydesk-www
RUN ng build --output-path=dist --configuration=docker

FROM nginx:1.16.0
COPY --from=build /polydesk-www/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
