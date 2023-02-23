import {BaseServices} from "./BaseServices"

class QuanLyNguoiDungServices extends BaseServices{
    dangNhap = (userObj) => {
        return this.post(`QuanLyNguoiDung/DangNhap`, userObj);
    }
    dangKy = (userObj) => {
        return this.post(`QuanLyNguoiDung/DangKy`, userObj);
    }
    getThongTinNguoiDung = () => {
        return this.post(`QuanLyNguoiDung/ThongTinTaiKhoan`);
    }
    updateThongTinNguoiDung = (userObj) => {
        return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,userObj)
    }
    getDanhSachLoaiNguoiDung = () => {
        return this.get(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
    getDanhSachNguoiDung= (keyword) => {
        return keyword ? this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`) : this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`);
    }
    updateThongTinNguoiDungPost = (userObj) => {
        return this.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,userObj)
    }
    deleteNguoiDung = (taiKhoan) => {
        return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    themNguoiDung = (userObj) => {
        return this.post(`QuanLyNguoiDung/ThemNguoiDung`, userObj);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungServices();