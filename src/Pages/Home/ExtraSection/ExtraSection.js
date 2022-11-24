import React from 'react';
import img from '../../../images/secondhand.jpg'

const ExtraSection = () => {
    return (
        <div className='flex justify-evenly items-center my-40'>
            <div className='w-1/3'>
                <img className='rounded-lg' src={img} alt="" />
            </div>
            <div>
                <h2 className="text-4xl font-bold mb-10"><i>Buy and Sell Secondhand Phone</i></h2>
                <p className="text-xl">You can buy any mobile phone in low price.<br />Also you can Sell mobile phone with well profit.</p>
            </div>
        </div>
    );
};

export default ExtraSection;