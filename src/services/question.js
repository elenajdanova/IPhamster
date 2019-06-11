/* global BigInt */
import Network from './ip_calculator/src/network.js';

/**
* Represents part of the game engine, that is responsible for generating questions and get answers for them
* @class Question
* @return {object} with all methods
*/
export default class Question {

  /**
   * generate - generate question and answer
   *
   * @param  {number} v IP version
   * @return {array}
   */
  generate (v) {
      let prefix = this.generatePrefix(v);
      let address = this.generateIP(v);
      let address2 = this.generateIP(v);
      let fullAddr = address + ' / ' + prefix;
      let net = new Network(address, prefix);
      let longmask = net.getMask();
      let questionBase = {
          0 : `Assign last address from network ${fullAddr} to eth2`,
          1 : `Assign first address from network ${fullAddr} to eth0`,
          2 : `Assign second address from network ${fullAddr} to eth1`,
          3 : `Assign this IP ${address} / ${longmask} to eth0 using short mask notation`,
          4 : `Assign ${prefix} to eth0 using long mask notation`,
          5 : `You know that ${address} is on ${prefix} network. Add a route to that network via ${address2} (dnt m/network)`
      };
      let qKeys = Object.keys(questionBase);
      //let getRandomQ = this.getRandomInt(0, qKeys.length-1);
      let getRandomQ = 3;
      let question = questionBase[getRandomQ];
      let answer;

      switch (getRandomQ) {
          case 0 :
              answer = net.hostLast();
              console.log(getRandomQ, answer);
              break;
          case 1 :
              answer = net.hostFirst();
              console.log(getRandomQ, answer);
              break;
          case 2 :
              answer = net.toDottedNotation(net.networkToInteger() + BigInt(2));
              console.log(getRandomQ, answer);
              break;
          case 3 :
              answer = prefix;
              console.log(getRandomQ, answer);
              break;
          case 4 :
              answer = longmask;
              console.log(getRandomQ, answer);
              break;
          case 5 :
              answer = net.getNetwork();
              console.log(getRandomQ, answer);
              break;
          default:
              answer = 'oops! we have a problem. Answer is undefined';
      }

      return [question, answer];
  }

  /**
   * generateIP - generate random IP address
   *
   * @param  {number} v version
   * @return {string}   address
   */
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

  /**
   * generatePrefix - generate random prefix
   *
   * @param  {number} v version
   * @return {number}   prefix
   */
  generatePrefix (v) {
      return v === 4 ? this.getRandomInt(2,30) : this.getRandomInt(2,126);
  }

  /**
   * getRandomInt - generate random integer
   *
   * @param  {number} min from inclusive
   * @param  {number} max to inclusive
   * @return {number}
   */
  getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
