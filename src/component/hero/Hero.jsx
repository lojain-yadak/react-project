import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DarkVariantExample() {
  const slideStyle = { backgroundColor: "#4FC4CA", color: "white" };

  return (
    <div className="p-3">
      <Carousel data-bs-theme="dark" controls={false}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor: "#4FC4CA"}}>
            {/* Caption on the left */}
            <div className="w-50">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>

            {/* Image on the right */}
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src="./public/heroimages/speaker.png"
                alt="First slide"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor:"#6862A0"}}>
            <div className="w-50">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src="./public/heroimages/speaker.png"
                alt="Second slide"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="d-flex align-items-center justify-content-between px-5 py-4 text-white" style={{backgroundColor: "#9E97E1"}}>
            <div className="w-50">
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
            <div className="w-50">
              <img
                className="d-block w-0 rounded"
                src="./public/heroimages/speaker.png"
                alt="Third slide"
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;