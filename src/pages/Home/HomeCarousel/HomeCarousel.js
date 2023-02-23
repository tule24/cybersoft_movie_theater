import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import './HomeCarousel.css'
import { fetchDataCarouselAction } from '../../../redux/actions_thunk/CarouselAction';

export default function HomeCarousel(props) {
    const { arrCarousel } = useSelector(state => state.CarouselReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataCarouselAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Carousel>
            {arrCarousel.map((item, index) => {
                const contentStyle = {
                    height: '95vh',
                    width: '100vw',
                    color: '#fff',
                    lineHeight: '160px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0,0,0,.5)',
                    backgroundImage: `url(${item.hinhAnh})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                };
                return <div key={index}>
                    <div style={contentStyle}>
                    </div>
                </div>
            })}

        </Carousel>
    );
}
