import Question from '../services/question';

let question = new Question();
let cmds = {
    start: {value: 'start', help: 'help on start'},
    whoami: {value: 'whoami', help:'help on whoami'},
    IPv4: {value: 'ipv4', help:'help on IPv4'},
    IPv6: {value: 'ipv6', help:'help on IPv6'},
    exit: {value: 'exit', help:'help on exit'},
    help: {value: 'help', help:'help !!!'}
}

/**
* Represents engine of the whole game. Onlu this class is linked with React components
* @class GameEngine
* @return {object} with all methods
*/

export default class GameEngine {
    constructor () {
        this.isPlaying = false;
        this.qAsked = 0;
        this.qAnsweredCorrectly = 0;
        this.curAnswer = '';
        this.curVersion = 0;
    }


    /**
     * handleCommand - handles user's input
     *
     * @param  {string} command takes user's command
     * @return {string}         and returns reaction to it
     */
    handleCommand (command) {
        if (this.isPlaying) {
            switch (command) {
                case cmds.exit.value:
                    return this.stop();
                case this.curAnswer:
                    this.qAnsweredCorrectly++;
                    return 'WoW! Good hooman! Next one: ' + this.nextQuestion(this.curVersion);
                case cmds.help.value:
                    return cmds.help.help;
                default:
                    return 'Owh, thats wrong! Try this: ' + this.nextQuestion(this.curVersion);
            }
        } else {
            switch (command) {
                case cmds.IPv4.value:
                    return this.nextQuestion(4);
                case cmds.IPv6.value:
                    return this.nextQuestion(6);
                case cmds.help.value:
                    return cmds.help.help;
                default:
                    return this.invalidCMD();
            }
        }
    }


    /**
     * stop - stops game mode
     *
     * @return {string}  with stats og the last game
     */
    stop () {
        let asked = this.qAsked - 1;
        let answered = this.qAnsweredCorrectly;

        this.isPlaying = false;
        this.qAsked = 0;
        this.qAnsweredCorrectly = 0;
        return 'Thats it! Youve been asked ' + asked + ' questions. Correct were ' + answered;
    }


    /**
     * nextQuestion - asks next question and answer to it and handles class props
     *
     * @param  {number} v version
     * @return {string}   generated questuin
     */
    nextQuestion (v) {
        this.isPlaying = true;
        this.qAsked++;
        this.curVersion = v;
        let [q, a] = question.generate(this.curVersion);
        this.curAnswer = a;
        console.log('answ ' + this.curAnswer);
        return q;
    }


    /**
     * invalidCMD - returns error message if inapropriate command was entered by user
     *
     * @return {string}  error msg
     */
    invalidCMD () {
        return 'Command not found';
    }

}
