# PokeScan

PokeScan ist eine Applikation, die es Benutzern ermöglicht, eine Pokémon-Karte zu scannen und deren gegenwärtigen Marktpreiswert zu ermitteln.
Diese Ergebnisse können immer wieder eingesehen und genutzt werden, um Karten, die man nicht mehr persönlich benutzen will, in einen angemessenen Gewinn zu verwandeln!


## Features

- **Karten-Scanner:**: Halten sie einfach und bequem ihre Karte in ihre integrierte Webcam und drücken Sie ansonsten nur einen Knopf, und der Rest wird erledigt.
- **Echtzeitgetreuer Marktwert**: Es wird nach Scannen der Karte der aktuelle Marktpreis ermittelt und für Sie auf dem Bildschirm ausgegeben.
- **Auf Datenbank sichern**: Die gescannte Karte wird auf einer Datenbank gesichert und kann jederzeit wieder aufgerufen werden, was mehrmaliges Scannen vermeidet.


## Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/celtechstarter/poke-app.git

2. **In das Projektverzeichnis wechseln**:
	```bash
	cd ./poke-app

3. **Abhängigkeiten installieren**:
	```bash
    cd ./frontend
    npm install // warten bis installiert wurde
    cd ..
    cd ./backend
    npm install


Backend starten:
cd backend
node server.js

Frontend starten:
cd frontend
npm run dev

**4. Ausführung**
    
    ```bash
    node server.js //falls Sie noch nach der Installation im Backend-Ordner sind, ansonsten navigieren sie 	dahin zurück
    cd ..
    cd ./frontend
    npm run


## Nutzung

- **Login** - Loggen sie sich simpel mit Ihrem Google-Account per Knopfdruck ein (Ein Google-Account wird leider vorausgesetzt).
- **Scannen** - Mit einem Knopfdruck wird Ihre Webcam geöffnet, danach halten Sie ihre Pokémon-Karte in die Webcam und drücken Speichern.
- **Speichern** - Die Karte wird in einer Datenbank abgelegt, so dass sie wieder aufgerufen werden kann, sollten Sie noch einmal die Informationen über diese Karte benötigen.
- **OPR** - Scannen Sie die Karte und lassen Sie sich für die Karte den aktuellen Preiswert ermitteln aus vertrauenswürdigen Quellen.

## Technologie-Stack

- **Frontend**: React, Redux, Radix UI, Vite, Axios, Mongoose, Multer(-S3), Tesseract
- **Backend**: Node.js, Express(-Session)
- **Echtzeit-Kommunikation**: MQTT über WebSockets
- **Datenbank**: MongoDB


## Einen Beitrag leisten?

Beiträge sind willkommen! Bitte folgen Sie diesen Schritten:

1. **Forken** Sie das Repository.
2. Erstellen Sie einen neuen Branch:
   ```bash
   git checkout -b feature/neues-feature

Nehmen Sie Ihre Änderungen vor und committen Sie sie:

	```bash
    git commit -m 'Füge neues Feature hinzu'

Pushen Sie den Branch:

	```bash
    git push origin feature/neues-feature



**7. Lizenz**


## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

## Kontakt

Bei Fragen oder Feedback wenden Sie sich bitte an [marcel.welk87@gmail.com](mailto:marcel.welk87@gmail.com), [sawatzkychristian@gmail.com](mailto:sawatzkychristian@gmail.com), oder [Willy].