import { quanLyRapService } from '../../services/QuanLyRapServices';
import { STATUS_CODE } from '../../utils/Constant/settingSystem';
import {getLichChieuHeThongRap, getLichChieuPhimDetail} from '../reducers/QuanLyRapSlice'

export const fetchDataLichChieuHeThongRapAction = () => async(dispatch) => {
    try{
        const {data, status} = await quanLyRapService.getLichChieuHeThongRap();
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getLichChieuHeThongRap(data.content));
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}

export const fetchDataLichChieuPhimDetailAction = (id) => async(dispatch) => {
    try{
        const {data, status} = await quanLyRapService.getLichChieuPhim(id);
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getLichChieuPhimDetail(data.content));
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}