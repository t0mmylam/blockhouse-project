FROM node:21.1.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Build the app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
