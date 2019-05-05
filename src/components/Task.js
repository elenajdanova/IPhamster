import React from 'react';

class Task extends React.Component {

  render(){
      return (
          <div className="column">
              <h1>Test your subnetting skills!</h1>
              <h3>Hello Stranger!</h3>
              <p>Here you can train your subnetting and CLI skills. You have linux machine and will mainly use ifconfig command</p>
              <p>ifconfig stands for interface configuration. It is used to view and change the configuration of the network interfaces on your system.</p>
              <p>To assign a static IP address to an interface, specify the interface name and the IP address. For example, to assign the IP address 69.72.169.1 to the interface wlan0, use the command:
              <pre>sudo ifconfig wlan0 69.72.169.1/26 up</pre></p>
              <p>Here, wlan0 is name of the active network interface on the system. Traditional naming conventions for network interfaces under Linux: eth0, lo and wlan0.</p>
          </div>
      );
  }
}

export default Task;
