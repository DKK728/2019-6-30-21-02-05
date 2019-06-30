$('tbody').on('click','.btn-danger',function(){
    $('#modelId').modal();
    let id = $(this).parents('tr').attr('data-id');
    let tr = $(this).parents('tr');
    $('.btn-primary').on('click',()=>{
        isDelete = true;
        if(isDelete){
            console.log(id);
            $.post('/admin_remove_user',{id : id},(res)=>{
                if(res.code==200){
                    tr.remove();
                    alert('删除成功')
                }else{
                    alert('删除失败')
                }
            })
            return;
        }
    })
})
let isDelete = false;
$('tbody').on('click','.btn-default',function(){
    let id = $(this).parents('tr').attr('data-id');
    $.get('/admin_get_user_by_id',{id:id},(res)=>{
        // console.log(res);
        $('#btn-add').attr('hidden','true');
        $('#btn-finish').removeAttr('hidden');
        $('#btn-cancel').removeAttr('hidden');
        $('#email').val(res.email);
        $('#slug').val(res.slug);
        $('#nickname').val(res.nickname);
        //↑显示数据
        //↓判断有没有隐藏域，有就修改id，没有就生成隐藏域
        let form = $('form');
        let first = form.children().eq(0);
        if(first.attr('type')==='hidden'){
            first.val(id);
        }else{
        let hiddenId = $(`<input type="hidden" name="id" value=${id} id="update">`)
        form.prepend(hiddenId);
        }
    })
});
// $.get('/admin_get_head_and_name',(res)=>{
//     if(res.code == 200){
//         // console.log(res)
//         $('.profile > .avatar').attr('src',res.data.avatar);
//         $('.profile > .name').html(res.data.nickname)
//     }
// });
$('#btn-cancel').on('click',()=>{
    clear();
});
var clear = function(){
    $('#btn-add').removeAttr('hidden');
    $('#btn-finish').attr('hidden','true');
    $('#btn-cancel').attr('hidden','true');
    $('#email').val('');
    $('#slug').val('');
    $('#nickname').val('');
    $('#password').val('');
}
$('#btn-finish').on('click',()=>{
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

    if (tools.validateEmpty('#slug')) {
        $('.modal-body > .container-fluid').text('别名不能为空！')
        $('#modelId').modal()
        return;
    }

    if (tools.validateEmpty('#nickname')) {
        $('.modal-body > .container-fluid').text('昵称不能为空！')
        $('#modelId').modal()
        return;
    }
    let regexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regexp.test($('#email').val())) {
        $('.modal-body > .container-fluid').text('邮箱格式错误！')
        $('#modelId').modal()
        return;
    }
    let data = $('form').serialize();
    $.post('/admin_update_user',data,(res)=>{
        if(res.code==200){
        $('.modal-body > .container-fluid').text('更新成功！')
        $('#modelId').modal()
        clear();
        let updateId = $('#update').val()
        let changeEle = {};
        $("tbody tr").each((i,e)=>{
            let changeId = "";
            changeId = $(e).attr('data-id');
            if(updateId == changeId){
                changeEle = $(e);
            }
        })
        console.dir(changeEle);
        $.get('/admin_get_user_by_id',{id : updateId},(res)=>{
            // console.log(res)
            if(res.code == 200){
            changeEle.children().eq(1).attr('src',res.avatar);
            changeEle.children().eq(2).text(res.email);
            changeEle.children().eq(3).text(res.slug);
            changeEle.children().eq(4).text(res.nickname);
            changeEle.children().eq(5).text(res.status);
            }else{
                location.reload();
            }
        })
        }else{
            $('.modal-body > .container-fluid').text('编辑失败！')
            $('#modelId').modal()
            return;
        }
    })
});
$('#btn-add').on('click',()=>{
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

    if (tools.validateEmpty('#slug')) {
        $('.modal-body > .container-fluid').text('别名不能为空！')
        $('#modelId').modal()
        return;
    }

    if (tools.validateEmpty('#nickname')) {
        $('.modal-body > .container-fluid').text('昵称不能为空！')
        $('#modelId').modal()
        return;
    }
    let regexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regexp.test($('#email').val())) {
        $('.modal-body > .container-fluid').text('邮箱格式错误！')
        $('#modelId').modal()
        return;
    }
    let data = $('form').serialize();
    // data += '&status=activated&isDelete=0'
    $.post('/admin_add_new_user',data,(res)=>{
        if(res.code == 200){
            alert('添加成功！')
            location.href='/admin/users'
        }else{
            $('.modal-body > .container-fluid').text('添加失败！')
            $('#modelId').modal()
        }
    })
})
