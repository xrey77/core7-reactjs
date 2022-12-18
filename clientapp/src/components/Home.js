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
            </Container>
            );
    }
}