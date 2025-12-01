/**
 * Licht-Zustände für Event-Handler
 */
enum LichtZustand {
    //% block="dunkel"
    Dunkel = 1,
    //% block="hell"
    Hell = 2
}

/**
 * Lichtsensor-Ereignisse für Calliope mini
 */
//% color=#f59e42 weight=100 icon="\uf0eb" block="Lichtsensor"
//% groups=['Ereignisse', 'Schwellenwerte']
namespace lichtsensor {
    // Event-Quelle ID (benutzerdefiniert, muss einzigartig sein)
    const LICHT_EVENT_ID = 0x6001;

    // Schwellenwert-Speicher
    let schwelleDunkel = 50;
    let schwelleHell = 150;
    let letzterZustand: LichtZustand = null;
    let pollingGestartet = false;

    /**
     * Wird ausgeführt wenn sich der Licht-Zustand ändert
     * @param zustand der zu erkennende Lichtzustand
     * @param handler Code der ausgeführt wird
     */
    //% blockId=lichtsensor_on_changed
    //% block="wenn Licht $zustand"
    //% weight=100 group="Ereignisse"
    export function wennLichtWechselt(
        zustand: LichtZustand, 
        handler: () => void
    ): void {
        // Event-Handler registrieren
        control.onEvent(LICHT_EVENT_ID, zustand, handler);
        
        // Polling starten (nur einmal)
        if (!pollingGestartet) {
            pollingGestartet = true;
            startePolling();
        }
    }

    /**
     * Setzt den Schwellenwert für einen Lichtzustand
     * @param zustand der Zustand für den der Schwellenwert gilt
     * @param wert Schwellenwert (0-255)
     */
    //% blockId=lichtsensor_set_threshold
    //% block="setze $zustand Schwellenwert auf $wert"
    //% wert.min=0 wert.max=255 wert.defl=100
    //% weight=90 group="Schwellenwerte"
    export function setzeSchwellenwert(zustand: LichtZustand, wert: number): void {
        if (zustand === LichtZustand.Dunkel) {
            schwelleDunkel = wert;
        } else {
            schwelleHell = wert;
        }
    }

    /**
     * Gibt den aktuellen Lichtwert zurück (0-255)
     */
    //% blockId=lichtsensor_wert
    //% block="Lichtwert"
    //% weight=85 group="Schwellenwerte"
    export function lichtwert(): number {
        return input.lightLevel();
    }

    /**
     * Prüft ob es aktuell dunkel ist
     */
    //% blockId=lichtsensor_ist_dunkel
    //% block="ist dunkel"
    //% weight=80 group="Schwellenwerte"
    export function istDunkel(): boolean {
        return input.lightLevel() <= schwelleDunkel;
    }

    /**
     * Prüft ob es aktuell hell ist
     */
    //% blockId=lichtsensor_ist_hell
    //% block="ist hell"
    //% weight=79 group="Schwellenwerte"
    export function istHell(): boolean {
        return input.lightLevel() >= schwelleHell;
    }

    // Interne Polling-Funktion
    function startePolling(): void {
        control.inBackground(() => {
            // Erster Aufruf aktiviert Sensor
            input.lightLevel();
            basic.pause(100);
            
            while (true) {
                const level = input.lightLevel();
                let aktuellerZustand: LichtZustand = null;

                // Zustand basierend auf Schwellenwerten bestimmen
                // Hysterese: Werte zwischen Schwellen lösen kein Event aus
                if (level <= schwelleDunkel) {
                    aktuellerZustand = LichtZustand.Dunkel;
                } else if (level >= schwelleHell) {
                    aktuellerZustand = LichtZustand.Hell;
                }

                // Event nur bei Zustandswechsel auslösen
                if (aktuellerZustand !== null && 
                    aktuellerZustand !== letzterZustand) {
                    letzterZustand = aktuellerZustand;
                    control.raiseEvent(LICHT_EVENT_ID, aktuellerZustand);
                }

                // Polling-Intervall (100ms = 10 Prüfungen/Sekunde)
                basic.pause(100);
            }
        });
    }
}
