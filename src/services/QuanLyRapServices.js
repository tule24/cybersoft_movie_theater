import {BaseServices} from "./BaseServices"

class QuanLyRapServices extends BaseServices{
    getLichChieuHeThongRap = () => {
        return this.get('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01')
    }
    getLichChieuPhim = (id) => {
        return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }
    getHeThongRap = () => {
        return this.get(`QuanLyRap/LayThongTinHeThongRap`);
    }
    getCumRapTheoHeThong = (maHeThong) => {
        return this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`);
    }
}

export const quanLyRapService = new QuanLyRapServices();