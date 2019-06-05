// export default class TerminalEngine {
//     constructor (command, gameON) {
//         this.terminal = gameON ? new GameTerminal() : new ClassicTerminal();
//         this.terminal.handleCommand(command, gameON);
//     }
//
//       getOutput () {
//         return this.terminal.getOutput();
//       }
//
//       isGameON () {
//         return this.terminal.isGameON();
//       }
//   }


let cmds = {
    start: {value: 'start', help: 'help on start'},
    whoami: {value: 'whoami', help:'help on whoami'},
    IPv4: {value: 'ipv4', help:'help on IPv4'},
    IPv6: {value: 'ipv6', help:'help on IPv6'},
    both: {value: 'both', help:'help on both'}
}

export default class TerminalEngine {
    constructor (command) {
        this.command = command;
        this.output = this.handleCommand();
    }

    handleCommand () {
        switch (this.command) {
            case cmds.start.value:
                return this.start();
            case cmds.IPv4.value:
                return this.generateQuestion(4);
            case cmds.IPv6.value:
                return this.generateIPv6();
            default:
                return this.invalidCMD();
        }
    }

    start () {
        return ('What IP version do you want to master? Type "IPv4", "IPv6" or "both" if you want to make it really hard! ;)');
    }

    generateQuestion (v) {
        let addr = this.generateIPv4() + ' / ' + this.generatePrefix(v);
        let prefix = this.generatePrefix(v);
        let address = this.generateIPv4();
        let questionBase = [
            `Assign first address from network ${addr} to eth0`,
            `Assign last address from network ${addr} to eth2`,
            `Assign second address from network ${addr} to eth1`,
            `Assign this mask ${address} to eth0 using short mask notation`,
            `Assign ${prefix} to eth0 using long mask notation`,
            `You know that ${address} is on ${prefix} network. Add a route to that network via ${address} (doesnt matter/network)`
        ];
        return questionBase[this.getRandomInt( 0, (questionBase.length - 1) )];
    }

    generateIPv4 () {
        let iter = 4;
        let octs = [];
        let address = '';

        while (iter > 0) {
            octs.push(this.getRandomInt(0,255));
            iter--;
        }
        address = octs.join('.');
        return address;
    }

    generatePrefix (v) {
        return v === 4 ? this.getRandomInt(1,32) : this.getRandomInt(1,128);
    }

    generateIPv6 () {
      let iter = 8;
      let hexes = [];
      let address = '';

      while (iter > 0) {
          hexes.push(this.getRandomInt(0,65535).toString(16));
          iter--;
      }
      address = hexes.join(':');
      return address;
    }

    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    invalidCMD () {
        return 'Command not found';
    }

}
