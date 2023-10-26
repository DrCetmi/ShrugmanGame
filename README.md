# Shrugman Game

## Einführung

Shrugman Game ist ein textbasiertes Spiel, entwickelt in JavaScript und ausgeführt in einer Node.js-Umgebung, bei dem eine Person versucht, ein geheimes Wort zu erraten. Jede falsche Vermutung bringt Sie jedoch einen Schritt näher zur Niederlage.

Das zu erratende Wort wird bis auf Leerzeichen mit Buchstaben und Zeichen `_` maskiert. Jede richtige Vermutung führt dazu, dass alle Wiederholungen des Wortes geöffnet werden.

Am Ende des Spiels werden alle gespielten Spiele aufgelistet und der Gewinn- oder Verluststatus wird angezeigt. Außerdem können Sie das Spiel in Kategorien unterteilen und wählen, ob Sie ein weiteres Spiel in derselben Kategorie spielen möchten.

## Spielstart

Um das Spiel zu starten, führen Sie die Datei `index.js` aus und befolgen Sie die folgenden Schritte:

1. Zu Beginn des Spiels werden Sie aufgefordert, den Schwierigkeitsgrad auszuwählen. Sie haben die Wahl zwischen "Einfach" und "Schwer". Ihre Entscheidung wird den Verlauf des Spiels beeinflussen.

2. Danach werden Sie aufgefordert, eine Kategorie auszuwählen. Wählen Sie Ihre Kategorie entweder als "movies" oder "books".

3. Nach Ihrer Kategorieauswahl wird ein zufälliges geheimes Wort ausgewählt, und die Anzahl der Buchstaben im Wort wird Ihnen angezeigt. Sie können jetzt Ihre Vermutungen abgeben.

4. Jede falsche Vermutung führt dazu, dass ein "Shrugman"-Charakter gezeichnet wird und Ihre Anzahl an Versuchen abnimmt. Sie haben insgesamt 10 Versuche.

```bash
¯\_(:/)_/¯
```

4. Mit korrekten Buchstabenvermutungen sehen Sie, welche Buchstaben im Wort richtig sind.

5. Wenn Sie alle Buchstaben korrekt erraten und das Wort vervollständigen, haben Sie das Spiel gewonnen. Wenn Sie jedoch 10 Versuche verbrauchen, verlieren Sie das Spiel.

6. Am Ende des Spiels werden gewonnene und verlorene Spiele aufgelistet, und Sie werden gefragt, ob Sie ein weiteres Spiel spielen möchten.

## Entwicklerinformation

Das Spiel wurde mit JavaScript entwickelt. Verwendete Bibliotheken sind "readline"- "chalk".
Das Spiel verwendet Klassen für Shrugman für "movies" und "books".

- Die Befehle, die in der Konsole installiert sein sollten:

```bash
npm init es6
npm install readline-sync
npm install chalk
npm install chalk-animation
npm install timers/promises
npm install figlet
npm install gradient-string
```

## Viel Spaß beim Spielen!
