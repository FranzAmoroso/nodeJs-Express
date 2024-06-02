FROM node:16

# Imposta la directory di lavoro
WORKDIR /app

# Copia il package.json e il package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Copia il file .env
COPY .env .env

# Espone la porta 3000
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["npm", "run", "dev"]