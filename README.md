# Bazar

## Introduzione
Bazar è una web application, single page, che permette di pubblicare un servizio che si è disposti ad offrire o che è richiesto da colui che l'ha pubblicato. I servizi possono essere di ogni tipo, dal web developer all'idraulico e due sono i tipi di utente che possono registrarsi:

#### Privato
Durante la fase di registrazione è libero di scegliere fino a 3 piani:
- free: in questo caso può pubblicare un solo servizio da offrire
- cheap: può pubblicare fino a 3 servizi da offrire
- premium: può pubblicare tutti i servizi da offrire che vuole
Tutti e tre i piani non impongono limiti per l'aggiunta di servizi da richiedere.

#### Azienda
L'azienda può pubblicare solo i servizi da offrire e non ha limiti
___

L'applicazione permette agli utenti di modificare o eliminare i propri servizi, lo stesso vale per il proprio profilo che, nel caso in cui venisse eliminato vengono automaticamente rimossi tutti i post proprietari dell'utente in questione.
Tra le altre features troviamo:
- la possibilità di ricercare un servizio offerto o richiesto digitando il nome del servizio o il luogo in cui viene svolto
- la possibilità di contattare tramite messaggio gli utenti iscritti a Bazar

## Tecnologie utilizzate
- [Express js](https://expressjs.com/): web framework usato per lo sviluppo del backend
- [MongoDB](https://www.mongodb.com/it-it): database non relazionale per mantenere i dati persistenti
- [React](https://it.reactjs.org/): libreria javascript per lo sviluppo del frontend

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

### Autenticazione


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
- [] DDos Protection
