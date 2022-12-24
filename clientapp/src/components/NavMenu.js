import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/ncr.jpg'
import '../custom.css';
import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown, Row, Col, Form, Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = axios.create({
    baseURL: "http://127.0.0.1:5006",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
            //   'Authorization': 'inherit'},
  })

function NavMenu() {
    var usernameSession =  sessionStorage.getItem('USERNAME');
    var userpicture = sessionStorage.getItem('USERPIC');
    var userid = sessionStorage.getItem('USERID');
    var token = sessionStorage.getItem('TOKEN');

    useEffect(() => {

        console.log("Exucute useEffect");
      });

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

    const submitUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
      }
  
      const submitPasswordChange = (e) => {
        e.preventDefault();
        setcurrentPassword(e.target.value);
      }
      
      const [show_2fa, setShow_2fa] = useState(false);
      const [otpcode, setOtpcode] = useState("");
      const [otp_msg, setOtp_msg] = useState("");

      const close_2fa = () => {
        setShow_2fa(false);
        handleLogOut(); 
      }

      const handleLogOut = () => {
        usernameSession = null;
        userpicture = null;
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('ROLE');
        sessionStorage.removeItem('USERPIC');
        sessionStorage.clear();
        window.location="/";
      }
  
      const verifyOTP = (e) => {
        e.preventDefault();
        api.put("/validatetoken/" + userid + "/"+otpcode, null, {headers: {
            Authorization: `Bearer ${token}`
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
              console.log("May Error : " + error.message);
              return;
        });
    }

      const handleLoginClose = () => {
        setUsername("");
        setcurrentPassword("");
        setLoginShow("");
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
  
      const clickSubmitLogin = (event) => {
        event.preventDefault();      
        
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
               if (res.data.username != null) {
                  setloginMessage(res.data.username + ", " + res.data.password);
                  return;
                }
                if (res.data.otp > 0) {
                  setLoginShow(false);  
                  sessionStorage.setItem('USERID',res.data.id);
                  sessionStorage.setItem('TOKEN',res.data.token);
                  sessionStorage.setItem('ROLE',res.data.role);
                } else {
                  sessionStorage.setItem('TOKEN',res.data.token);
                  sessionStorage.setItem('USERID',res.data.id);
                  sessionStorage.setItem('USERNAME',res.data.username);
                  sessionStorage.setItem('ROLE',res.data.role);
                  sessionStorage.setItem('USERPIC',res.data.userpicture);
                  setLoginShow(false);  
                }
  
              }, (error) => {
  
              setloginMessage(error.message);         
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
              setregisterMessage(error.message);
        });
      }
  
      

    return (
        <Container fluid>
            <Row>
                <Col>
                    {/* USER REGISTRATION */}
                    <Modal
                    size="sm"
                    show={showregister}
                    onHide={handleRegisterClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className="modal-register">
                    <Modal.Title>&#9997; Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autoComplete='off'>
                        <div className='row'>
                        <div className='col'>
                            <Form.Group className="mb-3" id="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                required
                                defaultValue={lastname}
                                name="lastname"
                                onChange={e => setLastname(e.target.value)}
                                type="text" 
                                />
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group className="mb-3" id="lastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control 
                                required
                                defaultValue={firstname}
                                name="firstname"
                                onChange={e => setFirstname(e.target.value)}
                                type="text" 
                                />
                            </Form.Group>        
                        </div>        
                        </div>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                            required={true}
                            defaultValue={email}
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            type="email" 
                            />
                        </Form.Group>        
                        <Form.Group className="mb-3" id="mobile">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                            required
                            defaultValue={mobile}
                            name="mobile"
                            onChange={e => setMobile(e.target.value)}
                            type="text" 
                            />
                        </Form.Group>        

                        <div className='row'>
                        <div className='col'>
                            <Form.Group className="mb-3" id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                required
                                defaultValue={username}
                                name="username"
                                onChange={e => setUsername(e.target.value)}
                                type="text" 
                                />
                            </Form.Group>                
                        </div>
                        <div className='col'>
                            <Form.Group className="mb-3" id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                required= {true}
                                defaultValue={currentpassword}
                                name="current-password"
                                onChange={e => setcurrentPassword(e.target.value)}
                                type="password" 
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

            <Row>
                <Col>
                    <Modal
                        size="sm"
                        show={showlogin}
                        onHide={handleLoginClose}
                        backdrop="static"
                        keyboard={false}
                        centered>
                        <Modal.Header closeButton className="modal-login">
                            <Modal.Title>&#128275; Account Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form autoComplete='off'>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                type="text" 
                                defaultValue={username}
                                name="username"
                                onChange={submitUsernameChange}
                                required = {true} />
                            </Form.Group>                
                    
                            <Form.Group className="mb-3" id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                type="password" 
                                defaultValue={currentpassword}
                                name="currentpassword"
                                onChange={submitPasswordChange}
                                required = {true} />
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
            <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
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

                <Nav className='mr-1'>
                    {
                        usernameSession ? 
                          <>
                            <img src={userpicture} className='usrpic' alt="'" />
                            <NavDropdown className="text-white item-r" title={usernameSession} id="basic-nav-dropdown">
                            
                            <NavDropdown.Item onClick={() => handleLogOut()} className='drop-size'>LogOut</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='drop-size' as={Link} to="/profile">Profile</NavDropdown.Item>
                            </NavDropdown>
                          </>
                    :
                    <>
                            <Nav.Link onClick={() => setLoginShow(true)} className="text-dark item-r" id="login">Login</Nav.Link>
                            <Nav.Link onClick={() => setRegisterShow(true)} className="text-dark item-r" id="register">Register</Nav.Link>  
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
        </Container>

        );
    }

export default NavMenu;