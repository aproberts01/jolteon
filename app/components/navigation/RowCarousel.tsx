import React from 'react';
import { Carousel } from '@mantine/carousel';

const RowCarousel: React.FC = () => {
    return (
        <Carousel
            slideSize="25%"
            slideGap="md"
            align="start"
            loop
            withControls
            withIndicators
        >
        </Carousel>
    );
};

export default RowCarousel;