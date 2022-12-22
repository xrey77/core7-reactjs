import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/ncr.jpg'
import '../custom.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown, Row, Col, Form, Modal, Button} from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5006",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
            //   'Authorization': 'inherit'},
  })

function NavMenu() {
    // var usernamex =  sessionStorage.getItem('USERNAME');
    // var userpicture = sessionStorage.getItem('USERPIC');
    // var userid = sessionStorage.getItem('USERID');
    // var token = sessionStorage.getItem('TOKEN');

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
                // if (res.data.otp > 0) {
                //   setLoginShow(false);  
                //   sessionStorage.setItem('USERID',res.data.id);
                //   sessionStorage.setItem('TOKEN',res.data.token);
                //   sessionStorage.setItem('ROLE',res.data.role);
                // } else {
                //   sessionStorage.setItem('TOKEN',res.data.token);
                //   sessionStorage.setItem('USERID',res.data.id);
                //   sessionStorage.setItem('USERNAME',res.data.username);
                //   sessionStorage.setItem('ROLE',res.data.role);
                //   sessionStorage.setItem('USERPIC',res.data.userpicture);
                //   setLoginShow(false);  
                // }
  
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
                    {/* USER LOGIN */}
                    <Modal
                        size="sm"
                        show={showlogin}
                        onHide={handleLoginClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
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
                  <>
                    <Nav.Link onClick={() => setLoginShow(true)} className="text-dark item-r" id="login">Login</Nav.Link>
                    <Nav.Link onClick={() => setRegisterShow(true)} className="text-dark item-r" id="register">Register</Nav.Link>  
                  </>
                </Nav>

                </Navbar.Collapse>

            </Container>


            </Navbar>

            </Col>
            </Row>            
        </Container>

        );
    }

export default NavMenu;