import { HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/ncr.jpg'
import '../custom.css';
import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import { Table, Nav, Navbar, NavDropdown, Row, Col, Form, Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App';

const api = axios.create({
    baseURL: "http://127.0.0.1:5006",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'inherit'}
  })

const NavMenu = () => {


    const [UserNamex, setUsernamex] = useState("");
    const [UserPicture, setUserPicture] = useState("");
    const [UserId, setUserId] = useState("");
    const [UserToken, setUserToken] = useState("");

    //FOR CHAT
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMesssages] = useState("");
    const [messagelist, setMesssagelist] = useState("");

    const [chatconnection, setChatConnection] = useState();
    
    const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5006/chatclient")
    .configureLogging(LogLevel.Information)
    .build();

    async function start() {
        try {
            await connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.log("May Error!");
        }
    };

    const joinRoom = async (user1, room1) => {
        connection.onclose(async () => {
            await start();
        });
        
        connection.on("ReceiveMessage", (user1, message) => {
            console.log("user....",user1);
            console.log("new msg...." + message);

            // setMesssagelist(messages => [...messages, {user1, message1}]);
            // setRoom(user1);
            // setRoom(room1)            
          });
  
        await start();

        try {
            await connection.invoke("JoinRoom", {user1, room});
            console.log("new room : ", room);
            setRoom(room1);
        } catch (err) {
            console.log("Hindi ma-join and user....");
        }
        setChatConnection(connection);
    }

    useEffect(() => {
        if (window.sessionStorage.getItem('USERNAME') != null) {
            setUsernamex(window.sessionStorage.getItem('USERNAME'));
            setUserPicture(window.sessionStorage.getItem('USERPIC'));
            setUserId(window.sessionStorage.getItem('USERID'));
            setUserToken(window.sessionStorage.getItem('TOKEN')); 
        }
    }, []);


    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const [username, setUsername] = useState("");
    const [currentpassword, setcurrentPassword] = useState("");
    const [loginmsg, setloginMessage] = useState("");
    const [registermsg, setregisterMessage] = useState("");

    const [showlogin, setLoginShow] = useState(false);
    const [showregister, setRegisterShow] = useState(false);
    const [showChat, setchatShow] = useState(false);
    // const [chatmessage, setChatMessage] = useState("");
    const [chatrecipient, setChatRecipiend] = useState("");
    // const [chatErrorMsg, setChatErrorMsg] = useState("");

    const [show_2fa, setShow_2fa] = useState(false);
    const [otpcode, setOtpcode] = useState("");
    const [otp_msg, setOtp_msg] = useState("");

    const submitUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }
  
    const submitPasswordChange = (e) => {
        e.preventDefault();
        setcurrentPassword(e.target.value);
    }

    const showChatbox = () => {
        setchatShow(true);
        setUser(window.sessionStorage.getItem('USERNAME'));
        setRoom(window.sessionStorage.getItem('ROOM'));
        setMesssagelist(window.sessionStorage.getItem('USERNAME') + " has joined the " + window.sessionStorage.getItem('ROOM'));

    }

    const closeChatbox = () => {
        setchatShow(false);
        
    }

    const sendChatmessage = async(msg) => {
        try {
            await chatconnection.invoke("SendMessage", msg);
            setMesssagelist(msg);
        } catch(e) {
            console.log(e);
        }
    }

    const close_2fa = () => {
        setShow_2fa(false);
        handleLogOut(); 
    }

    const handleLogOut = () => {
        setUsernamex("");
        setUserPicture("");
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('ROLE');
        sessionStorage.removeItem('USERPIC');
        sessionStorage.removeItem('ROOM');
        sessionStorage.removeItem('USER');
        sessionStorage.removeItem('MSG');
        sessionStorage.clear();
        window.location="/";
    }
  
    const verifyOTP = (e) => {
        e.preventDefault();
        api.put("/validatetoken/" + UserId + "/"+otpcode, null, {headers: {
            Authorization: `Bearer ${UserToken}`
        }})
        .then((res) => {
            if (res.data.message != null) {
                setOtp_msg(res.data.message);
                return;
            }
            console.log(res.data.users.username);
            
            sessionStorage.setItem('USERNAME',res.data.users.username);
            sessionStorage.setItem('USERPIC',res.data.users.userpicture);
            setShow_2fa(false);

            }, (error) => {
              setOtp_msg("Invalid OTP Code.");
              console.log("May Error : " + error);
              return;
        });
    }

    const handleLoginClose = () => {
        setUsername("");
        setcurrentPassword("");
        setLoginShow(false);
        setloginMessage("");
    }
  
    const handleRegisterClose = () => {
        setUsername("");
        setcurrentPassword("");
        setLastname("");
        setFirstname("");
        setEmail("");
        setMobile("");
        setregisterMessage("");
        setRegisterShow(false);
    }
  
    const clickSubmitLogin = (e) => {        
        e.preventDefault();    
        if ((username == null) && (currentpassword == null)) {
            alert("please enter username and password");
            return;
        } else {
  
           const formData =JSON.stringify({ username: username, password: currentpassword });   
     
        //   const formData = new FormData();
        //   formData.append("username", username);
        //   formData.append("password", currentpassword);
          api.post("/login", formData)
             .then((res) => {    
               if (res.data.username == null) {
                  setloginMessage("Please enter your username");
                  return;
                } else {                    
                    if (res.data.otp > 0) {

                        setLoginShow(false);  
                        sessionStorage.setItem('USERID',res.data.id);
                        sessionStorage.setItem('TOKEN',res.data.token);
                        sessionStorage.setItem('ROLE',res.data.role);
                        setShow_2fa(true);
                        // JOIN CHATROOM
                        // setUser(res.data.username);
                        // setRoom("Reynald Room");
                        // joinRoom(user, room);
            
                    } else {

                    window.sessionStorage.setItem('USERID',res.data.id);
                    window.sessionStorage.setItem('USERNAME',res.data.username);
                    window.sessionStorage.setItem('TOKEN',res.data.token);
                    window.sessionStorage.setItem('ROLE',res.data.role);
                    window.sessionStorage.setItem('USERPIC',res.data.profilepic);
                    setLoginShow(false);  

                    // JOIN CHATROOM
                    joinRoom(window.sessionStorage.getItem('USERNAME'));
                    window.sessionStorage.setItem('ROOM',"Room");
                    setUser(window.sessionStorage.getItem('USERNAME'));
                    window.location.href="http://localhost:3000";


                    }
                }
              }, (error) => {  
                setloginMessage(error);         
                return;
          });
        }
        return;
    };

    const clickSubmitRegister = (e) => {
        e.preventDefault();
        const data =JSON.stringify({ lastname: lastname, firstname: firstname, email: email, username: username, password: currentpassword, mobile: mobile });
        api.post("/user/register", data)
           .then((res) => { 
             if (res.data.message != null) {
                setregisterMessage(res.data.message);
              }            
            }, (error) => {
              setregisterMessage(error);
        });
    }
  
      
    return (
        <Container className='full-width'>
            <Row>
                <Col>
                    {/* USER REGISTRATION */}
                    <Modal
                    backdrop="static"
                    size="sm"
                    show={showregister}
                    onHide={handleRegisterClose}
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className="modal-register">
                    <Modal.Title>&#9997; Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <div className='row'>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId='firstname'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                type="text" 
                                required
                                defaultValue={lastname}
                                autoComplete="false"
                                name="lastname"
                                onChange={e => setLastname(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                type="text" 
                                required
                                defaultValue={firstname}
                                autoComplete="false"
                                name="firstname"
                                onChange={e => setFirstname(e.target.value)}
                                />
                            </Form.Group>        
                        </div>        
                        </div>
                        <Form.Group className="mb-3" controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                            type="email" 
                            required={true}
                            defaultValue={email}
                            autoComplete="false"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>        
                        <Form.Group className="mb-3" controlId='mobile'>
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                            type="text" 
                            required
                            defaultValue={mobile}
                            autoComplete="false"
                            name="mobile"
                            onChange={e => setMobile(e.target.value)}
                            />
                        </Form.Group>        

                        <div className='row'>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                type="text" 
                                required
                                defaultValue={username}
                                autoComplete="false"
                                name="username"
                                onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>                
                        </div>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                value={currentpassword}
                                required
                                autoComplete="false"
                                defaultValue={currentpassword}
                                name="current-password"
                                onChange={e => setcurrentPassword(e.target.value)}
                                />
                            </Form.Group>        
                        </div>
                        </div>        
                        <Button onClick={clickSubmitRegister} variant="success" type="submit">
                            Submit
                        </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <div id="registerMsg" name="registerMsg" className='w-100 text-left text-danger' style={{fontSize: 12}}>{registermsg}</div>
                    </Modal.Footer>
                </Modal>
                
                </Col>
            </Row>
            {/* LOGIN */}
            <Row>
                <Col>
                    <Modal
                        backdrop="static"
                        size="sm"
                        show={showlogin}
                        onHide={handleLoginClose}
                        keyboard={false}
                        centered>
                        <Modal.Header closeButton className="modal-login">
                            <Modal.Title>&#128275; Account Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form autoComplete='off'>
                            <Form.Group className="mb-3" controlId='username'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                type="text" 
                                defaultValue={username}
                                autoComplete="false"
                                name="username"
                                onChange={submitUsernameChange}
                                required />
                            </Form.Group>                
                    
                            <Form.Group className="mb-3" controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                type="password" 
                                defaultValue={currentpassword}
                                autoComplete="false"
                                name="currentpassword"
                                onChange={submitPasswordChange}
                                required />
                            </Form.Group>                
                            <Button onClick={clickSubmitLogin} variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <div id="loginMsg" name="loginMsg" className='w-100 text-left text-danger' style={{fontSize: 12}}>{loginmsg}</div>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row>
            <Col>
            <Navbar className='bg-nav' expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='hamburger' />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto ul-1">
                    <Nav.Link href="/aboutus" className='text-dark'>About Us</Nav.Link>
                    <Nav.Link href="/services" className='text-dark'>Services</Nav.Link>
                    <NavDropdown title="Products" id="products-dropdown">
                    <NavDropdown.Item href="/products">Self Service Terminals</NavDropdown.Item>
                    <NavDropdown.Item href="/products">
                        Laptops
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/products">Cars</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/products">
                        Womens Dress
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav className='mr-1 ul-2'>
                    {
                        !UserNamex ? 
                          <>
                            <Nav.Link onClick={() => setLoginShow(true)} className="text-dark item-r" id="login">Login</Nav.Link>
                            <Nav.Link onClick={() => setRegisterShow(true)} className="text-dark item-r" id="register">Register</Nav.Link>  
                          </>
                    :
                    <>
                            <img src={UserPicture} className='usrpic' alt="'" />
                            <NavDropdown className="text-white item-r" title={UserNamex} id="basic-nav-dropdown">                            
                            <NavDropdown.Item onClick={() => handleLogOut()} className='drop-size'>LogOut</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='drop-size' as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => showChatbox()} className='drop-size' as={Link} to="#">Chat</NavDropdown.Item>
                            </NavDropdown>

                    </>
                    }
                    
                </Nav>

                </Navbar.Collapse>
            </Container>

            </Navbar>
            </Col>
            </Row>           
            <Row>
                <Col>
                  <Modal 
                    backdrop="static"
                    show={show_2fa} 
                    size="sm"
                    centered
                    onHide={close_2fa} 
                    animation={false}>
                    <Modal.Header closeButton className='bg-warning'>
                    <Modal.Title className='text-white mfa-size'>2-Factor Authentication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                    <Form.Group className="mb-3" id="otpcode">
                        <Form.Label>Enter 6 digits OTP Code</Form.Label>
                        <Form.Control 
                        required
                        defaultValue={otpcode}
                        onChange={e => setOtpcode(e.target.value)}
                        type="text" />
                    </Form.Group>
                    <Button variant="warning" className='text-white' onClick={verifyOTP}>
                        verify
                    </Button>

                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <div className='w-100 text-left text-danger mfa-msg'>{otp_msg}</div>
                    </Modal.Footer>
                </Modal>
                
                </Col>
            </Row> 

            <Row>
                <Col>
                 <Modal 
                    backdrop="static"
                    show={showChat} 
                    size="lg"
                    centered
                    onHide={closeChatbox} 
                    animation={false}>                        
                    <Modal.Header closeButton className='bg-chat'>
                    <Modal.Title className='text-white mfa-size'>ONLINE CHAT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Table className='border-white'>
                        <tbody>
                        <tr>
                            <td style={{backgroundColor: "blanchedalmond", borderRadius: 10, width: 150, textAlign: 'center'}} className="text-center">
                                <div className="room">{room}</div><br/>
                                {/* <div className='text-dark w-50 text-center'>{user}</div> */}
                                <Form.Group className="mb-3 text-dark w-200" controlId="users">
                                        <Form.Control as="textarea"
                                            disabled
                                            defaultValue={user}                                            
                                            rows={18} />
                                    </Form.Group> 

                            </td>
                            <td className='bg-white'>
                                <Form>
                                     <Form.Group className="mb-3" id="userInput">
                                        <Form.Label>Recipient</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        placeholder="Type recipient"
                                        required
                                        defaultValue={chatrecipient}
                                        onChange={e => setChatRecipiend(e.target.value)}
                                        />
                                    </Form.Group>
 

                                    <Form.Group className="mb-3 text-dark" controlId="messagelist">
                                        <Form.Control as="textarea"
                                            disabled
                                            defaultValue={messagelist}                                            
                                            rows={12} />
                                    </Form.Group> 
                                     <Table>
                                        <tbody>
                                            <tr>
                                            <td className='col-msg'>
                                                
                                                    <Form.Group className="mb-3" id="messageInput">
                                                        <Form.Control 
                                                        type="text"
                                                        placeholder='Type a message'
                                                        required
                                                        defaultValue={messages}
                                                        onChange={e => setMesssages(e.target.value)}
                                                        />
                                                    </Form.Group>

                                                </td> 
                                                <td className='col-btn'>
                                                    <Button className='bg-chat text-white' onClick={e => sendChatmessage(e.target.value)}>
                                                        Send
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </Form>

                            </td>
                        </tr>

                        </tbody>
                    </Table>


                    </Modal.Body>
                    {/* <Modal.Footer>
                    <div className='w-100 text-left text-danger chat-msg'>{user} has joined the {room}.</div>
                    </Modal.Footer> */}
                </Modal>
                
                </Col>
            </Row> 

        </Container>

        );
    }

export default NavMenu;