import React from 'react';
import img1 from '../../../images/phones.jpg'
import img2 from '../../../images/phones2.jpg'
import img3 from '../../../images/phones3.jpg'
import './Banner.css'

const Banner = () => {
    return (
        <div className='w-3/4'>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className='carousel-img'>
                        <img src={img1} className="w-full rounded-xl" alt='' />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div className='carousel-img'>
                        <img src={img2} className="w-full rounded-xl" alt='' />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div className='carousel-img'>
                        <img src={img3} className="w-full rounded-xl" alt='' />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;