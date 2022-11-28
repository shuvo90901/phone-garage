import React from 'react';
import Advertises from '../Advertises/Advertises';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import ExtraSection from '../ExtraSection/ExtraSection';

const Home = () => {
    return (
        <div>
            <div className='flex justify-center mb-32'>
                <Banner></Banner>
            </div>
            <CategorySection></CategorySection>
            <Advertises></Advertises>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;