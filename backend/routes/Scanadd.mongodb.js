const objectId = 0; // Id des gescannten Objekts.
// const item = cardn [Gescannter Kartenname in String; Evtl. auch Lvl einlesen, da das manchmal wichtig zur Unterscheidung innerhalb derselben Edition ist]
// const cardId = cardi [Gescrappte Karten-Id]
// const price = money [Von der Karte gescrappter Preis von entsprechender Seite]
// const quantity = howmu[Optionale Angabe der Anzahl der Karten]
const scandate = Date;
use('scanlist');

objectId += 1; // Id wird immer draufgerechnet bevor es in die Tabelle übergeht.


//Hinzufügen der Variabeln
//db.getCollection('card-prices').insertMany([
//  { 'Scan-Id': objectId, 'item': cardn, 'Item-Id': cardi, 'Preis': money, 'quantity': howmu, 'date': new Date('2014-03-01T08:00:00Z') },
// ]);
