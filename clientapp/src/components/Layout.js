import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavMenu from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

// const Layout = () => {
//   // static displayName = Layout.name;

//     /* eslint-disable */
//     const [connection, setConnection] = useState();

//     const joinRoom = async (user, room) => {

    
//       try {
    
//         const connection = new HubConnectionBuilder()
//         .withUrl("http://127.0.0.1:5006/chat")
//         .configureLoggin(LogLevel.Information)
//         .build();
    
//         connection.on("ReceivedMessage", (user, message) => {
//           console.log("message received : ", message);
//         });
        
//         await connection.start();
//         await connection.invoke("JoinRoom", {user, room});
//         setConnection(connection);
    
//       } catch(e) {
//         console.log(e);
//       }
//     }
  

