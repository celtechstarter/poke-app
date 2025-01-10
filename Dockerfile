# Basis-Image
FROM node:18

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Restlichen Code kopieren
COPY . .

# Port freigeben
EXPOSE 5000

# Startbefehl
CMD ["node", "server.js"]
