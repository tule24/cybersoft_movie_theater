import {BaseServices} from "./BaseServices"

class QuanLyDatVeServices extends BaseServices{
    getDanhSachPhongVe = (maLichChieu) => {
        return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    postDatVe = (thongTinDatVe) => {
        return this.post(`QuanLyDatVe/DatVe`, thongTinDatVe)
    }
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
    }
}

export const quanLyDatVeService = new QuanLyDatVeServices();