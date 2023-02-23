import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState } from 'react'
import styleSlick from './MultipleRowSlick.module.css';
import Films from "../films/Films";
import _ from "lodash";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} styleSlick ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} styleSlick ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}
export default function MultipleRowSlick(props) {
    const [option, setOption] = useState(0);
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000
    };

    let { arrPhim } = props

    if (option === 1) {
        arrPhim = _.filter(arrPhim, 'dangChieu')
    } else if (option === 2) {
        arrPhim = _.filter(arrPhim, 'sapChieu')
    }
    return (
        <div>
            <div>
                <button className={`tabFilm rounded-md p-2 border-2 duration-300 hover:bg-violet-500 hover:text-white text-lg ${option === 0 ? 'active' : ''} `} onClick={() => { setOption(0) }}>Tất Cả Phim</button>
                <button className={`tabFilm rounded-md p-2 border-2 duration-300 hover:bg-violet-500 hover:text-white text-lg ${option === 1 ? 'active' : ''} mx-2`} onClick={() => { setOption(1) }}>Phim Đang Chiếu</button>
                <button className={`tabFilm rounded-md p-2 border-2 duration-300 hover:bg-violet-500 hover:text-white text-lg ${option === 2 ? 'active' : ''} `} onClick={() => { setOption(2) }}>Phim Sắp Chiếu</button>
            </div>
            <Slider {...settings}>
                {arrPhim.map((item, index) => {
                    return <Films item={item} key={index} />
                })}
            </Slider>
        </div>
    )
}