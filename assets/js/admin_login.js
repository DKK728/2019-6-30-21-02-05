$(function () {
    $('#login').on('click', () => {
        if (tools.validateEmpty('#email')) {
            $('.modal-body > .container-fluid').text('邮箱不能为空！')
            $('#modelId').modal()
            return;
        }
        if (tools.validateEmpty('#password')) {
            $('.modal-body > .container-fluid').text('密码不能为空！')
            $('#modelId').modal()
            return;
        }
        let regexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!regexp.test($('#email').val())) {
            $('.modal-body > .container-fluid').text('邮箱格式错误！')
            $('#modelId').modal()
            return;
        }
        let data = $('.login-wrap').serialize();
        $.post('/admin_do_login', data, (res) => {
            if (res.code == 200) {
                $('.modal-body > .container-fluid').text('登录成功！')
                isSuccess = true;
                $('#modelId').modal()
            } else {
                $('.modal-body > .container-fluid').text('邮箱或者密码错误！')
                $('#modelId').modal()
                return;
            }
        })
    });
    let isSuccess = false;
    $('#modelId').on('hide.bs.modal', () => {
        if (isSuccess) {
            var prevLink = document.referrer;
            if ($.trim(prevLink) == '') {
                location.href = '/admin/index';//直接打开该页面
            } else {
                if (prevLink.indexOf('127.0.0.1:8080') == -1) {	//来自其它站点
                    location.href = '/admin/index';
                }
                location.href = prevLink;
            }
        }
    });
})