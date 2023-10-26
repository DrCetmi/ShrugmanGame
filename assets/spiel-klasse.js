import readline from 'readline';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
class ShrugmanGame {
  constructor() {
    this.categories = {
      movies: ['the lord of the rings', 'the shawshank redemption', 'pulp fiction'],
      books: ['war and peace', 'moby-dick','to kill a mockingbird'],
    };
    this.category = '';
    this.secretWord = '';
    this.guesses = 10;
    this.usedLetters = new Set();
    this.maskedWord = '';
    this.shrugmanParts = '¯\\_(:/)_/¯'.split('');
  }
// Diese Funktion wählt zufällig aus der Kategorie "movies" und "books" aus.
  getRandomWord() {
    const categoryWords = this.categories[this.category];
    const randomIndex = Math.floor(Math.random() * categoryWords.length);
    return categoryWords[randomIndex];
  }
//ersetzt die Buchstaben durch Unterstriche (_). 
  maskWord(word) {
    return word.replace(/[A-Za-z]/g, '_');
  }
  // diese Funktion, die Benutzereingaben für Buchstaben überprüft und basierend darauf entscheidet, ob die Vermutung korrekt ist und wie das Spiel fortgesetzt wird.
  makeGuess(letter) {
    if (this.usedLetters.has(letter)) {
      console.log(chalk.bgRedBright(`Diesen Buchstaben hast du bereits versucht: ${letter}`));
      return;
    }
    this.usedLetters.add(letter);
    if (this.secretWord.includes(letter)) {
      this.unmaskWord(letter);
      console.log(chalk.bgGreenBright(`Richtige Vermutung: ${letter}`));
    } else {
      this.guesses--;
      console.log(chalk.bgRedBright(`Falsche Vermutung.`));
      this.drawShrugman();
    }
  }
  //diese Funktion verwendet wird, um die richtig erratenen Buchstaben anzuzeigen und dem Spieler zu zeigen, welche Buchstaben er richtig erraten hat.
  unmaskWord(letter) {
    const wordArray = this.secretWord.split('');
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === letter) {
        this.maskedWord = this.maskedWord.substr(0, i) + letter + this.maskedWord.substr(i + 1);
      }
    }
  }
  //wird verwendet, um dem Spieler zu zeigen, wie Shrugman in Etappen gezeichnet wird.
  drawShrugman() {
    const shrugmanParts = this.shrugmanParts.slice(0, 10 - this.guesses);
    console.log(' ');
    console.log(chalk.red(shrugmanParts.join('')));
  }
  playGame() {
    this.startGame();
  }
  startGame(){
    console.clear();
    console.log(chalk.bgGreen.red('====//==== Kategorie auswählen ====//======'));
    console.log(chalk.bgGreen.red('||   *___________*      *____________*   ||'));
    console.log(chalk.bgGreen.red('||   |  Movies  |       |   Books   |    ||'));
    console.log(chalk.bgGreen.red('||   *¯¯¯¯¯¯¯¯¯¯¯*      *¯¯¯¯¯¯¯¯¯¯¯¯*   ||'));
    console.log(chalk.bgGreen.red('==========================================='));
    rl.question('Kategorie: ', (category) => {
      if (category in this.categories) {
        this.category = category;
        this.secretWord = this.getRandomWord();
        this.maskedWord = this.maskWord(this.secretWord);
        console.clear();
        console.log(' ');
        console.log(chalk.yellow(`* _________________ *`));
        console.log(chalk.bgYellow(`|Kategorie: ${this.category} |`));
        console.log(chalk.bgYellow(`|Stufe: schwer     |`));
        console.log(chalk.yellow(`¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`));
        console.log(' ');
        console.log(chalk.green(`[ ${this.maskedWord} ]`));
        console.log(' ');
        console.log(' ');
        this.askForAction();
      } else {
        console.log('Ungültige Kategorie. Bitte geben Sie movies oder books ein.');
        this.startGame();
      }
    });
  }
  askForAction() {
    rl.question(chalk.bgBlueBright('Rate einen Buchstaben: '), (letter) => {
      if (letter.length === 1 && letter.match(/[a-z]/i)) {
        this.askForLetter(letter.toLowerCase());
      } else {
        console.log('Error.. Bitte geben Sie einen Buchstaben ein.');
        this.askForAction();
      }
    });
  }
  askForLetter(letter) {
    console.clear();
    console.log(' ');
    console.log(chalk.yellow(`* _________________ *`));
    console.log(chalk.bgYellow(`|Kategorie: ${this.category} |`));
    console.log(chalk.bgYellow(`|Stufe: einfach    |`));
    console.log(chalk.yellow(`¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`));
    console.log(' ');
    if (letter === this.secretWord.toLowerCase()) {
      console.log(`Herzlichen Glückwunsch! Richtige Vermutung: ${this.secretWord}`);
      this.endGame(true);
    } else {
      this.makeGuess(letter);
      console.log(' ');
      console.log(chalk.green(`[ ${this.maskedWord} ]`));
      console.log(' ');
      console.log(' ');
      if (this.maskedWord === this.secretWord) {
        console.log(' ');
        console.log(`Herzlichen Glückwunsch! Richtige Vermutung: ${this.secretWord}`);
        console.log(' ');
        this.endGame(true);
      } else if (this.guesses === 0) {
        console.log(' ');
        console.log(`Es tut mir leid! Richtige Antwort: ${this.secretWord}`);
        console.log(' ');
        this.endGame(false);
      } else {
        setTimeout(() => {
          this.askForAction();
        }, 1000);
      }
    }
  }
  endGame(isWin) {
    if (isWin) {
      console.log(' ');
      console.log(chalk.bgGreen.white(`${userName} hat gewonnen! `));
    } else {
      console.log(' ');
      console.log(chalk.bgRed.white(`${userName}  hat verloren! `));
    }
console.log(' ');
    rl.question(chalk.green('Möchtest du ein weiteres Spiel spielen? (J/N): '), (answer) => {
      if (answer.toLowerCase() === 'j') {
        this.resetGame();
      } else {
        console.clear();
        const goodbyeText = figlet.textSync('Auf Wiedersehen!', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
        });
        console.log(goodbyeText);
        rl.close();
      }
    });
  }
  resetGame() {
    this.category = '';
    this.secretWord = '';
    this.guesses = 10;
    this.usedLetters.clear();
    this.maskedWord = '';
    this.shrugmanParts = '¯\\_(:/)_/¯'.split('');
    this.startGame();
  }
}
const game = new ShrugmanGame();
game.playGame();

