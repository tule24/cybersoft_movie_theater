import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import { fetchDataPhimAction } from '../../redux/actions_thunk/QuanLyPhimAction';
import { fetchDataLichChieuHeThongRapAction } from '../../redux/actions_thunk/QuanLyRapAction';
import HomeMenu from './HomeMenu/HomeMenu'
import './Home.css'
import HomeCarousel from './HomeCarousel/HomeCarousel';

export default function Home(props) {
  const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
  const { arrLichChieuHeThongRap } = useSelector(state => state.QuanLyRapReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataPhimAction());
    dispatch(fetchDataLichChieuHeThongRapAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <HomeCarousel />
      <div className='mt-5 w-5/6 mx-auto'>
        <MultipleRowSlick arrPhim={arrPhim} />
        <HomeMenu arrLichChieuHeThongRap={arrLichChieuHeThongRap}/>
      </div>
    </div>
  )
}
