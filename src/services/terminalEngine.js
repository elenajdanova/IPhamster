let cmds = {
    start: {value: 'start', help: 'help on start'},
    whoami: {value: 'whoami', help:'help on whoami'}
}

export default class TerminalEngine {
    constructor (command) {
        this.command = command;
        this.result = this.handleCMD();
    }

    handleCMD () {
        switch (this.command) {
            case cmds.start.value:
                return this.start();
            default:
                return this.invalidCMD();
        }
    }

    start () {
        return ('What IP version do you want to master? Type "IPv4", "IPv6" or "both" if you want to make it really hard! ');
    }

    invalidCMD () {
        return 'Command not found';
    }

}
