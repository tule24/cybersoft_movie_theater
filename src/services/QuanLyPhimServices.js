import {BaseServices} from "./BaseServices"

class QuanLyPhimServices extends BaseServices{
    getDanhSachBanner = () => {
        return this.get(`QuanLyPhim/LayDanhSachBanner`);
    }
    getDanhSachPhim = (keyword) => {
        return keyword ? this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${keyword}`) : this.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`);
    }
    getThongTinPhim = (id) => {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    }
    themPhim = (formData) => {
        return this.post(`QuanLyPhim/ThemPhimUploadHinh`, formData);
    }
    updatePhim = (formData) => {
        return this.post('QuanLyPhim/CapNhatPhimUpload', formData);
    }
    deletePhim = (maPhim) => {
        return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimServices();