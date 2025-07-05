import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '@mui/material/Button';
import speaker from '/public/heroimages/speaker.png'
function Hero() {
  const slideStyle = { backgroundColor: "#4FC4CA", color: "white" };

  return (
    <div className="p-3">
      <Carousel data-bs-theme="dark" controls={false}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor: "#4FC4CA"}}>
            {/* Caption on the left */}
            <div className="w-50">
              <h4 className='rounded p-2' style={{backgroundColor:'white',width:'fit-content', color:'black'}}>30% OFF</h4>
              <h3 style={{color:'#121212'}} className='fs-2 w-50 fw-bold'>Feel Every Beat. Hear the Difference.</h3>
              <p style={{color:'#454343'}} className='w-50 fw-lighter'>Experience immersive sound with our premium speaker collection</p>
            <Button style={{color:'#312D5F' ,backgroundColor:'white'}} className='rounded py-2 px-4'>Buy now</Button>
            </div>

            {/* Image on the right */}
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src={speaker}
                alt="First slide"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor:"#6862A0"}}>
            <div className="w-50">
              <h4 className='rounded p-2' style={{backgroundColor:'white',width:'fit-content', color:'black'}}>30% OFF</h4>
              <h3 style={{color:'#121212'}} className='fs-2 w-50 fw-bold'>Feel Every Beat. Hear the Difference.</h3>
              <p style={{color:'#454343'}} className='w-50 fw-lighter'>Experience immersive sound with our premium speaker collection</p>
             <Button style={{color:'#312D5F' ,backgroundColor:'white'}} className='rounded py-2 px-4'>Buy now</Button>
            </div>
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src={speaker}
                alt="Second slide"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor: "#9E97E1"}}>
            <div className="w-50">
              <h4 className='rounded p-2' style={{backgroundColor:'white',width:'fit-content', color:'black'}}>30% OFF</h4>
              <h3 style={{color:'#121212'}} className='fs-2 w-50 fw-bold'>Feel Every Beat. Hear the Difference.</h3>
              <p style={{color:'#454343'}} className='w-50 fw-lighter'>Experience immersive sound with our premium speaker collection</p>
              <Button style={{color:'#312D5F' ,backgroundColor:'white'}} className='rounded py-2 px-4'>Buy now</Button>
             </div>
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src={speaker}
                alt="Third slide"
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Hero;