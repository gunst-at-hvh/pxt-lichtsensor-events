// Tests für die Lichtsensor-Extension

// Schwellenwerte konfigurieren
lichtsensor.setzeSchwellenwert(LichtZustand.Dunkel, 30);
lichtsensor.setzeSchwellenwert(LichtZustand.Hell, 180);

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
