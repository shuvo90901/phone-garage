import React from 'react';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import ExtraSection from '../ExtraSection/ExtraSection';

const Home = () => {
    return (
        <div>
            <div className='flex justify-center mb-32'>
                <Banner></Banner>
            </div>
            <ExtraSection></ExtraSection>
            <CategorySection></CategorySection>
        </div>
    );
};

export default Home;