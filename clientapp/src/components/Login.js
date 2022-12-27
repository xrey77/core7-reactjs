import React, {useState} from "react"
import { Form, Modal, Button }  from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5006",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'inherit'},
  })
  

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginmsg, setloginMessage] = useState("");
    const [showlogin, setLoginShow] = useState(false);


    const submitUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
      }
  
      const submitPasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
      }
  
      const handleLoginClose = () => {
        setUsername("");
        setPassword("");
        setLoginShow("");
        setloginMessage("");
      }
  
      const clickSubmitLogin = (event) => {
        event.preventDefault();      
        if ((username == null) && (password == null)) {
            alert("please enter username and password");
           return;
        } else {
  
          const data =JSON.stringify({ username: username, password: password });   
          api.post("/user/login", data)
             .then((res) => {    
               if (res.data.message != null) {
                  setloginMessage(res.data.message);
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
  

        return(
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
                      required />
                </Form.Group>                
        
                <Form.Group className="mb-3" id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password" 
                      defaultValue={password}
                      name="password"
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
        
        
            );
}

export default Login;