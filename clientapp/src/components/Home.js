import React, { Component } from 'react'
import {Carousel, Container, Row, Col } from 'react-bootstrap';
import prod1 from '../assets/images/prod1.png';
import prod2 from '../assets/images/prod2.png';
import prod3 from '../assets/images/prod3.png';
import prod4 from '../assets/images/prod4.png';
import prod5 from '../assets/images/prod5.png';
import prod6 from '../assets/images/prod6.png';
import prod7 from '../assets/images/prod7.png';

export class Home extends Component {
    render() {
        return(
            <Container fluid>
                <Row>
                    <Col>

                    <Carousel fade indicators={false}>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod1} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod2} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod3} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod4} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod5} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod6} alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={prod7} alt=""/>
                        </Carousel.Item>
                    </Carousel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src="data:image/png;base64,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" alt="qrcode" />
                    </Col>
                </Row>
            </Container>
            );
    }
}