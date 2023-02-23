import { quanLyPhimService } from "../../services/QuanLyPhimServices";
import { STATUS_CODE } from "../../utils/Constant/settingSystem";
import { getDataCarousel } from "../reducers/CarouselSlice";

export const fetchDataCarouselAction = () => async (dispatch) => {
    try {
        const {data, status} = await quanLyPhimService.getDanhSachBanner();
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getDataCarousel(data.content));
        }
    } catch (err) {
        console.log(err);
    }
}