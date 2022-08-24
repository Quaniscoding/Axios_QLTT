var services = new Services();
var validation = new Validation();
var product = new Products();
function getEle(id) {
    return document.getElementById(id);
}
function fetchData() {
    services
        .getListProduct()
        .then(function (result) {
            renderHTML(result.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
fetchData();
function renderHTML(data) {
    content = ``;
    data.forEach(function (products, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${products.taiKhoan}</td>
        <td>${products.hoTen}</td>
        <td>${products.matKhau}</td>
        <td>${products.email}</td>
        <td>${products.ngonNgu}</td>
        <td>${products.loaiND}</td>
        <td>${products.moTa}</td>
        <td>${products.hinhAnh}</td>
        <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${products.id
            })">Edit</button>

              <button class="btn btn-danger" onclick="deleteProduct(${products.id
            })">Delete</button>
            </td>
        </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = content;
};

function deleteProduct(id) {
    services
        .deleteProduct(id)
        .then(function () {
            //render list data
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
        });
}
getEle("btnThemNguoiDung").addEventListener("click", function () {
    //Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

    //Tạo nút "Add"
    var btnAdd = `<button class="btn btn-success" onclick="add()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});
function add() {

    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;

    var isValid = true;
    //taiKhoan
    isValid &= validation.kiemTraRong(
        taiKhoan,
        "tbTK",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraTaiKhoanTonTai(
            taiKhoan,
            "tbTK",
            "Tài khoản đã tồn tại ! Vui lòng nhập tài khoản mới !"
        );
    //hoTen
    isValid &= validation.kiemTraRong(
        hoTen,
        "tbHoten",
        "Vui lòng không để trống!"
    ) && validation.kiemTraKiTuChuoi(
        hoTen,
        "tbHoten",
        "Vui lòng không nhập số và kí tự đặc biệt !"
    );
    //matKhau
    isValid &= validation.kiemTraRong(
        matKhau,
        "tbMatKhau",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraMatKhau(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, một kí tự số "
        )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập 6-8 ký tự !",
            6,
            8
        );
    //email
    isValid &= validation.kiemTraRong(
        email,
        "tbEmail",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraEmail(
            email,
            "tbEmail",
            "Vui lòng nhập đúng kiểu định dạng email!Vd: email@gmail.com"
        );
    //ngonNgu
    isValid &= validation.kiemTraLoaiNguoiDung(
        "loaiNgonNgu",
        "tbLoaiNgonNgu",
        "Vui lòng chọn ngôn ngữ !"
    )
    //nguoiDung
    isValid &= validation.kiemTraLoaiNguoiDung(
        "loaiNguoiDung",
        "tbLoaiNd",
        "Vui lòng chọn loại người dùng !"
    )
    //moTa
    isValid &= validation.kiemTraRong(
        moTa,
        "tbMoTa",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "tbMatKhau",
            "Vui lòng nhập không quá 60 ký tự !",
            1,
            60
        );;
    //hinhAnh
    isValid &= validation.kiemTraRong(
        hinhAnh,
        "tbHinhAnh",
        "Vui lòng không để trống!"
    );
    if (!isValid) return null;
    var product = new Products("", taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh,);

    services
        .addProduct(product)
        .then(function () {
            fetchData();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Chỉnh sửa Thông Tin";

    var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

    services
        .getProductById(id)
        .then(function (result) {
            //show thông ra các thẻ input
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function updateProduct(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;
    var product = new Products(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh,);
    services
        .updateProduct(product)
        .then(function () {
            fetchData();
            //close modal
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
}