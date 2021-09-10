//一个表单实现多submit按钮不同URL请求
/* function toQueryOne() {
    document.form_device.action = "/queryOneDevice.do";
    document.form_device.submit();
} */

function toAdd() {
    document.form_device.action = "/addDevice.do";
    document.form_device.submit();
}

function toUpdate() {
    document.form_device.action = "/updateDevice.do";
    document.form_device.submit();
}