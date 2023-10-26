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
                class ShrugmanGame {
                  constructor() {
                    this.categories = {
                      movies: ['matrix','inception', 'the godfather'],
                      books: ['the hobbit', 'harry potter', 'the da vinci code'],
                    };
                    this.category = '';
                    this.secretWord = '';
                    this.guesses = 10;
                    this.usedLetters = new Set();
                    this.maskedWord = '';
                    this.shrugmanParts = '¯\\_(:/)_/¯'.split('');
                  }
                  getRandomWord() {
                    const categoryWords = this.categories[this.category];
                    const randomIndex = Math.floor(Math.random() * categoryWords.length);
                    return categoryWords[randomIndex];
                  }
                  maskWord(word) {
                    return word.replace(/[A-Za-z]/g, '_');
                  }
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
                  unmaskWord(letter) {
                    const wordArray = this.secretWord.split('');
                    for (let i = 0; i < wordArray.length; i++) {
                      if (wordArray[i] === letter) {
                        this.maskedWord = this.maskedWord.substr(0, i) + letter + this.maskedWord.substr(i + 1);
                      }
                    }
                  }
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
                        console.log(chalk.bgYellow(`|Stufe: einfach    |`));
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
                      console.log(chalk.bgGreen.white(`   ${userName}  hat  gewonnen!     `));
                    } else {
                      console.log(' ');
                      console.log(chalk.bgRed.white(`     ${userName}  hat  verloren!     `));
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
                  getRandomWord() {
                    const categoryWords = this.categories[this.category];
                    const randomIndex = Math.floor(Math.random() * categoryWords.length);
                    return categoryWords[randomIndex];
                  }
                  maskWord(word) {
                    return word.replace(/[A-Za-z]/g, '_');
                  }
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
                  unmaskWord(letter) {
                    const wordArray = this.secretWord.split('');
                    for (let i = 0; i < wordArray.length; i++) {
                      if (wordArray[i] === letter) {
                        this.maskedWord = this.maskedWord.substr(0, i) + letter + this.maskedWord.substr(i + 1);
                      }
                    }
                  }
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
                        console.log(`Es tut mir leid, du hast verloren. Richtige Antwort: ${this.secretWord}`);
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
                      console.log(chalk.bgGreen.white(`   ${userName}  hat  gewonnen!     `));
                    } else {
                      console.log(' ');
                      console.log(chalk.bgRed.white(`     ${userName}  hat  verloren!     `));
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
                game.playGame();}
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
                const rl = readline.createInterface({input: process.stdin, output: process.stdout});
                class ShrugmanGame {
                constructor() {
                  this.categories = {
                    movies: ['matrix','inception', 'the godfather'],
                    books: ['the hobbit', 'harry potter', 'the da vinci code'],
                  };
                  this.category = '';
                  this.secretWord = '';
                  this.guesses = 10;
                  this.usedLetters = new Set();
                  this.maskedWord = '';
                  this.shrugmanParts = '¯\\_(:/)_/¯'.split('');
                }
                getRandomWord() {
                  const categoryWords = this.categories[this.category];
                  const randomIndex = Math.floor(Math.random() * categoryWords.length);
                  return categoryWords[randomIndex];
                }
                maskWord(word) {
                  return word.replace(/[A-Za-z]/g, '_');
                }
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
                unmaskWord(letter) {
                  const wordArray = this.secretWord.split('');
                  for (let i = 0; i < wordArray.length; i++) {
                    if (wordArray[i] === letter) {
                      this.maskedWord = this.maskedWord.substr(0, i) + letter + this.maskedWord.substr(i + 1);
                    }
                  }
                }
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
                      console.log(chalk.bgYellow(`|Stufe: einfach    |`));
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
                    console.log(chalk.bgGreen.white(`   ${userName}  hat  gewonnen!     `));
                  } else {
                    console.log(' ');
                    console.log(chalk.bgRed.white(`     ${userName}  hat  verloren!     `));
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
                game.playGame();}
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
                const rl = readline.createInterface({input: process.stdin, output: process.stdout});
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
                        getRandomWord() {
                          const categoryWords = this.categories[this.category];
                          const randomIndex = Math.floor(Math.random() * categoryWords.length);
                          return categoryWords[randomIndex];
                        }
                        maskWord(word) {
                          return word.replace(/[A-Za-z]/g, '_');
                        }
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
                        unmaskWord(letter) {
                          const wordArray = this.secretWord.split('');
                          for (let i = 0; i < wordArray.length; i++) {
                            if (wordArray[i] === letter) {
                              this.maskedWord = this.maskedWord.substr(0, i) + letter + this.maskedWord.substr(i + 1);
                            }
                          }
                        }
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
                            console.log(chalk.bgGreen.white(`   ${userName}  hat  gewonnen!     `));
                          } else {
                            console.log(' ');
                            console.log(chalk.bgRed.white(`     ${userName}  hat  verloren!     `));
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
                game.playGame();}
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