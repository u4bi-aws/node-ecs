From node:6.10.2

ADD ./package.json /tmp/

RUN cd /tmp/ && npm install

RUN npm install -g pm2

ADD ./ /webapp/

RUN cp -r /tmp/node_modules/ /webapp/

EXPOSE 80

WORKDIR /webapp

# RUN ls -la

ENTRYPOINT [ "pm2-docker", "app.js" ]