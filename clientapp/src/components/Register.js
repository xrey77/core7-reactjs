import { Component } from "react"
import { Form }  from 'react-bootstrap';

export class Register extends Component {
    render() {
        return(
            <div className="modal fade" id="staticBackdropRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabelRegister">Account Registration</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <Form onSubmit={this.registerSubmit} autoComplete="off">
                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" name="lastname"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstname" name="firstname"/>
                                </div>
                            </Form>
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    </div>
                </div>
            </div>            
        );
    }
}