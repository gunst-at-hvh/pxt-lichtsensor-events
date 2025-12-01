// Tests für die Lichtsensor-Extension

// === VARIANTE 1: Einfacher Block (ohne Hysterese) ===
// Referenzlicht setzen (Schüler messen vorher mit Lichtwert-Block)
// Beispiel: Gemessener Wert ist 180, Abstand standardmäßig 10
// Schwellenwert wird: 180 - 10 = 170
// ≤ 170: dunkel, > 170: hell
lichtsensor.setzeReferenzlicht(180);

// HINWEIS: Dieser Block nutzt KEINE Hysterese!
// Bei Lichtwerten genau am Schwellenwert (z.B. 170) kann es flackern.
// Das ist didaktisch gewollt - Schüler sollen das Problem erleben!

// === VARIANTE 2: Mit Hysterese (stabil) ===
// Wenn Flackern auftritt, Experten-Block nutzen:
// lichtsensor.setzeLichtschwellen(170, 180);
// Reihenfolge ist egal - funktioniert auch nach setzeReferenzlicht()!

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
