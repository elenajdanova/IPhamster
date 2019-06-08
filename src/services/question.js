export default class Question {

  generate (v) {
      let prefix = this.generatePrefix(v);
      let address = this.generateIP(v);
      let addr = address + ' / ' + prefix;
      let questionBase = [
          `Assign first address from network ${addr} to eth0`,
          `Assign last address from network ${addr} to eth2`,
          `Assign second address from network ${addr} to eth1`,
          `Assign this IP ${address} / {longMask} to eth0 using short mask notation`,
          `Assign ${prefix} to eth0 using long mask notation`,
          `You know that ${address} is on ${prefix} network. Add a route to that network via ${address} (dnt m/network)`
      ];
      return questionBase[this.getRandomInt( 0, (questionBase.length - 1) )];
  }

  generateIP (v) {
      let marks =  {
          4: [4, '.'],
          6: [8, ':']
      };
      let chunks = [];
      let address = '';

      while (marks[v][0] > 0) {
          v === 4 ? chunks.push(this.getRandomInt(0, 255)) :
                    chunks.push(this.getRandomInt(0, 65535).toString(16));
          marks[v][0] --;
      }
      address = chunks.join(marks[v][1]);
      return address;
  }

  generatePrefix (v) {
      return v === 4 ? this.getRandomInt(1,32) : this.getRandomInt(1,128);
  }

  getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}
