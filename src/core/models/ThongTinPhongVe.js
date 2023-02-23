export class ThongTinPhim {
    maLichChieu = '';
    tenCumRap = "";
    tenRap = '';
    diaChi = '';
    tenPhim = '';
    hinhAnh = '';
    ngayChieu = '';
    gioChieu = '';
}

export class DanhSachGhe{
    maGhe = '';
    tenGhe = '';
    maRap = '';
    loaiGhe = '';
    stt = '';
    giaVe = '';
    daDat = '';
    taiKhoanNguoiDat = '';
}

export class ThongTinLichChieu {
    thongTinPhim = new ThongTinPhim();
    danhSachGhe = [];
}