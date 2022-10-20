# Bazar
## Prerequisiti
- [Nodejs](https://nodejs.org/en/)
- Un account su [Mongo Atlas](https://www.mongodb.com/it-it/atlas/database)
- Clonare la repository con http `git clone https://github.com/LorenzoSpina/Bazar.git` con ssh `git clone git@github.com:LorenzoSpina/Bazar.git`
## Installazione
### Server
1. Aprire la cartella backend `cd backend`
2. Installare tutti i pacchetti npm presenti `npm install`
3. Eseguire il server `npm start`
### Client
1. Aprire la cartella frontend `cd frontend`
2. Installare tutti i pacchetti npm presenti `npm install`
3. Eseguire il server `npm start`
## Sviluppo
### Chat
La chat è stata sviluppata utilizzando la libreria [socket.io](socket.io), la quale permette una comunicazione bidirezionale, tra server e client usando il protocollo [websocket](https://en.wikipedia.org/wiki/WebSocket).
![socket communication!](/assets/images/bidirectional-communication-socket-dark.png "socket communication")
### Sicurezza
La web application è stata testata tramite analisi di vulnerabilità a diverse tipologie di attacco. Per un analisi più dettagliata consultare il Vulnerability Assessment.
- [x] Sql Injection (SQLi)
- [x] Cross Site Scripting (XSS)
- [x] Cross-site Request Forgery (CSRF)
- [x] Sanitize and render HTML 
- [x] Broken authentication
- [x] Brute force prevention
- [x] DDos Protection