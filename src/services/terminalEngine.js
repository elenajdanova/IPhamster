let cmds = {
    start: {value: 'start', help: 'help on start'},
    whoami: {value: 'whoami', help:'help on whoami'},
    IPv4: {value: 'ipv4', help:'help on IPv4'},
    IPv6: {value: 'ipv6', help:'help on IPv6'},
    both: {value: 'both', help:'help on both'}
}

export default class TerminalEngine {
    constructor (command) {
        this.command = command.toLowerCase();
        this.result = this.handleCMD();
    }

    handleCMD () {
        switch (this.command) {
            case cmds.start.value:
                return this.start();
            case cmds.IPv4.value:
                return this.generateIPv4();
            case cmds.IPv6.value:
                return this.generateIPv6();
            default:
                return this.invalidCMD();
        }
    }

    start () {
        return ('What IP version do you want to master? Type "IPv4", "IPv6" or "both" if you want to make it really hard! ');
    }

    generateIPv4 () {
        let iter = 4;
        let octs = [];
        let prefix = 0;
        let address = '';

        while (iter > 0) {
            octs.push(this.getRandomInt(0,255));
            iter--;
        }
        address = octs.join('.');
        prefix = this.getRandomInt(1,32);
        return address + ' / ' + prefix;
    }

    generateIPv6 () {
      let iter = 8;
      let hexes = [];
      let prefix = 0;
      let address = '';

      while (iter > 0) {
          hexes.push(this.getRandomInt(0,65535).toString(16));
          iter--;
      }
      address = hexes.join(':');
      prefix = this.getRandomInt(1,128);
      return address + ' / ' + prefix;
    }

    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    invalidCMD () {
        return 'Command not found';
    }

}
