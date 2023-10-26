import readlineSync from 'readline-sync';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { setTimeout as sleep } from 'timers/promises';
import figlet from "figlet";
import gradient from "gradient-string";
import readline from 'readline';

console.clear();
figlet('Willkommen!', function(err, data) {const rainbow = chalkAnimation.rainbow(data);});
const rainbow = chalkAnimation.rainbow('Willkommen');
await sleep(1000); 
rainbow.stop();

const userName = readlineSync.question(chalk.bgYellow('Hallooo, Benutzername eingeben: '));
console.clear();
const nachricht = `Hallo ${userName}!`;
figlet(nachricht, (err, data) => {console.log(gradient.pastel.multiline(data));});

const knowsGame = readlineSync.question(chalk.bgBlue(`${userName} weißt du, wie man Shrugman spielt? (Ja/Nein) `));
if (knowsGame.toLowerCase() === 'ja') { console.log(chalk.bgGreen('Toll! Du kennst das Spiel bereits.'));
        const difficulty = readlineSync.question(chalk.bgBlue('Welchem Schwierigkeitsgrad möchtest du spielen? (Einfach/Schwer) '));
        if (difficulty.toLowerCase() === 'einfach') { console.clear(); console.log('Du hast Einfach gewählt.');  
            figlet('Vorbereitung...', function(err, data) { console.log(data);
            function countdownWithRainbow(seconds) {
                if (seconds > 0) { const rainbowText = chalkAnimation.rainbow(` ${seconds} `);
                setTimeout(() => {rainbowText.stop();
                countdownWithRainbow(seconds - 1);}, 1000);
                } else { console.clear(); 
                const rl = readline.createInterface({input: process.stdin, output: process.stdout});
            }
            }
            countdownWithRainbow(3);});
        } else if (difficulty.toLowerCase() === 'schwer') {console.clear(); console.log('Du hast Schwer gewählt.');
            figlet('Vorbereitung...', function(err, data) {console.log(data);
            function countdownWithRainbow(seconds) {
                if (seconds > 0) {const rainbowText = chalkAnimation.rainbow(` ${seconds} `);
                setTimeout(() => {rainbowText.stop();
                countdownWithRainbow(seconds - 1);}, 1000);
                } else {console.clear();
                const rl = readline.createInterface({input: process.stdin,output: process.stdout});
              }
            }
            countdownWithRainbow(3);});
        } else {console.log('Bitte wähle einen gültigen Schwierigkeitsgrad (Einfach/Schwer).');}

} else if (knowsGame.toLowerCase() === 'nein') {console.log(chalk.yellow('Kein Problem! Lass uns das Spiel lernen.'));
        console.log(chalk.red('REGELN:'));
        function typeTextWithRainbow(textArray, index) {
            if (index < textArray.length) {
                const rainbowText = chalkAnimation.rainbow(textArray[index]);
                setTimeout(() => {
                rainbowText.stop();
                typeTextWithRainbow(textArray, index + 1);
                }, 1000); 
            } else {
                const difficulty = readlineSync.question(chalk.bgBlue('Welchem Schwierigkeitsgrad möchtest du spielen? (Einfach/Schwer) '));
                if (difficulty.toLowerCase() === 'einfach') {
                    console.clear();
                    console.log('Du hast Einfach gewählt.');
            figlet('Vorbereitung...', function(err, data) {console.log(data);
            function countdownWithRainbow(seconds) {
                if (seconds > 0) {
                const rainbowText = chalkAnimation.rainbow(` ${seconds} `);
                setTimeout(() => {
                rainbowText.stop();
                countdownWithRainbow(seconds - 1);}, 1000);
                } else {console.clear();
              }
            }
            countdownWithRainbow(3);});
             } else if (difficulty.toLowerCase() === 'schwer') {console.clear();console.log('Du hast Schwer gewählt.');
            figlet('Vorbereitung...', function(err, data) {console.log(data);
            function countdownWithRainbow(seconds) {
                if (seconds > 0) {
                const rainbowText = chalkAnimation.rainbow(` ${seconds} `);
                setTimeout(() => {
                rainbowText.stop();
                countdownWithRainbow(seconds - 1);}, 1000);
                } else {console.clear();
              }
            }
            countdownWithRainbow(3);});
            } else {console.log('Bitte wähle einen gültigen Schwierigkeitsgrad (Einfach/Schwer).');}
                }
        }
        const textArray = [
                ' -----------------------------***------------------------------- ',
                '|| Hallo! Heute werde ich Ihnen ein großartiges Shrugman-Spiel  ||',
                '|| vorstellen.                                                  ||',
                '|| In diesem Spiel wird eine Person ein geheimes Wort oder eine ||',
                '|| geheime Wortgruppe auswählen,                                ||',
                '|| und die andere Person wird versuchen, dieses Wort zu erraten.||',
                '|| Jede falsche Vermutung wird jedoch dazu führen, dass ein     ||', 
                '|| Schritt näher an der Niederlage gemacht wird.                ||',
                '|| Das geratene Wort wird außer Leerzeichen mit allen Buchstaben||',
                '|| und Zeichen maskiert.                                        ||',
                '|| Jede richtige Vermutung wird dazu führen, dass alle Wieder-  ||',
                '|| holungen des Wortes geöffnet werden.                         ||',
                '|| Am Ende des Spiels werden wir alle gespielten Spiele als Lis-||',
                '|| te anzeigen und ihren Gewinn- oder Verluststatus anzeigen.   ||',
                '|| Zusätzlich können Sie das Spiel in Kategorien unterteilen und||',
                '|| wählen, ob Sie ein weiteres Spiel in derselben Kategorie     ||',
                '|| spielen möchten.                                             ||',
                '||                Lassen Sie uns anfangen und                   ||',
                '||            den Spaß am Shrugman-Spiel genießen!              ||',
                ' -----------------------------***------------------------------- ',
        ];
        const startIndex = 0;
        typeTextWithRainbow(textArray, startIndex);
} else {console.log('Bitte antworte mit "ja" oder "nein".');}