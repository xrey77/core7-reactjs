import React from 'react'
import {Carousel, Container } from 'react-bootstrap';
import prod1 from '../assets/images/prod1.png';
import prod2 from '../assets/images/prod2.png';
import prod3 from '../assets/images/prod3.png';
import prod4 from '../assets/images/prod4.png';
import prod5 from '../assets/images/prod5.png';
import prod6 from '../assets/images/prod6.png';
import prod7 from '../assets/images/prod7.png';
import '../custom.css';

const Home = () => {
        return(
            <Container className='full-carousel'>
                
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
            </Container>
            );    
}

export default Home
