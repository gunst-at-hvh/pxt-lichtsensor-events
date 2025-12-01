// DEBUG-TEST: Prüft ob Hysterese-Überschreiben funktioniert

// Start: Referenzwert setzen
lichtsensor.setzeReferenzlicht(150);
// → Sollte schwelleDunkel = 140, schwelleHell = 140 setzen

// Event-Handler
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function() {
    basic.showIcon(IconNames.No);
});

lichtsensor.wennLichtWechselt(LichtZustand.Hell, function() {
    basic.showIcon(IconNames.Yes);
});

// Button A: Zeige aktuelle Schwellenwerte (DEBUG!)
input.onButtonPressed(Button.A, function() {
    basic.showString("D");
    basic.showNumber(lichtsensor.dunkelSchwelle());
    basic.pause(500);
    basic.showString("H");
    basic.showNumber(lichtsensor.hellSchwelle());
    basic.pause(500);
    basic.clearScreen();
});

// Button B: Setze Hysterese basierend auf aktuellem Lichtwert
input.onButtonPressed(Button.B, function() {
    const aktuell = lichtsensor.lichtwert();
    lichtsensor.setzeLichtschwellen(aktuell - 20, aktuell + 20);
    // Zeige was gesetzt wurde
    basic.showString("OK");
    basic.pause(500);
    // Zeige neue Werte
    basic.showString("D");
    basic.showNumber(lichtsensor.dunkelSchwelle());
    basic.pause(500);
    basic.showString("H");
    basic.showNumber(lichtsensor.hellSchwelle());
    basic.pause(500);
    basic.clearScreen();
});

// Zeige kontinuierlich den aktuellen Lichtwert
basic.forever(function() {
    basic.showNumber(lichtsensor.lichtwert());
    basic.pause(1000);
});
