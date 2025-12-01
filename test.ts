// Tests für die Lichtsensor-Extension

// Referenzlicht setzen (Schüler messen vorher mit Lichtwert-Block)
// Beispiel: Gemessener Wert ist 180, Abstand standardmäßig 10
lichtsensor.setzeReferenzlicht(180);

// Mit individuellem Abstand (optional)
// lichtsensor.setzeReferenzlicht(180, 20);

// Event-Handler registrieren
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function() {
    basic.showIcon(IconNames.No);
    basic.pause(500);
});

lichtsensor.wennLichtWechselt(LichtZustand.Hell, function() {
    basic.showIcon(IconNames.Yes);
    basic.pause(500);
});

// Lichtwert kontinuierlich anzeigen
basic.forever(function() {
    basic.showNumber(lichtsensor.lichtwert());
    basic.pause(1000);
});
