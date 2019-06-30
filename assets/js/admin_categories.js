$(function () {
    $('.table').on('click', '.btn-info', function () {
        let id = $(this).parents('tr').attr('data-id');
        $.post('/get_categories_by_id', { id: id }, (res) => {
            if (res.code == 200) {
                $('#btn-add').attr('hidden', 'true');
                $('#btn-finish').removeAttr('hidden');
                $('#btn-cancel').removeAttr('hidden');
                $('#name').val(res.name);
                $('#slug').val(res.slug);
                let classname = 'fa ' + res.classname;
                $('.icons > span').attr('class', classname)
                $('#classname').val(res.classname)
                //隐藏域存当前修改的id
                let form = $('form');
                let first = form.children().eq(0);
                if (first.attr('type') === 'hidden') {
                    first.val(id);
                } else {
                    let hiddenId = $(`<input type="hidden" name="id" value=${id} id="update">`)
                    form.prepend(hiddenId);
                }
            }
        })
    });
    $('#btn-cancel').on('click', () => {
        clear();
    });
    $('.table').on('click', '.btn-danger', function () {
        if (confirm('确定要删除吗？')) {
            let id = $(this).parents('tr').attr('data-id');
            $.post('/admin_remover_category_by_id', { id: id }, (res) => {
                if (res.code == 200) {
                    $('.modal-body > .container-fluid').text('删除成功！');
                    $('#modelId').modal();
                    $(this).parents('tr').remove();
                }
            })
        }
    });
    $('.icons').on('click', function () {
        $('.icons-contain').toggle();
    });
    $('.icons-inner').on('click', '.fa', function () {
        let clickItem = $(this).attr('class');
        let classname = clickItem.substring(3);
        // console.log(classname)
        $('#classname').val(classname)
        $('.icons > span').attr('class', clickItem)
    });
    $('#btn-add').on('click', () => {
        if (tools.validateEmpty('#name')) {
            $('.modal-body > .container-fluid').text('名称不能为空！')
            $('#modelId').modal()
            return;
        }
        if (tools.validateEmpty('#slug')) {
            $('.modal-body > .container-fluid').text('别名不能为空！')
            $('#modelId').modal()
            return;
        }
        let data = $('form').serialize();
        $.post('/admin_add_new_category', data, (res) => {
            if (res.code == 200) {
                alert('添加成功！')
                location.href = '/admin/users'
            } else {
                $('.modal-body > .container-fluid').text('添加失败！')
                $('#modelId').modal()
            }
        })
    });
    $('#btn-finish').on('click', () => {
        if (tools.validateEmpty('#name')) {
            $('.modal-body > .container-fluid').text('名称不能为空！')
            $('#modelId').modal()
            return;
        }
        if (tools.validateEmpty('#slug')) {
            $('.modal-body > .container-fluid').text('别名不能为空！')
            $('#modelId').modal()
            return;
        }
        let data = $('form').serialize();
        $.post('/admin_update_category_by_id', data, (res) => {
            if (res.code == 200) {
                $('.modal-body > .container-fluid').text('更新成功！')
                $('#modelId').modal()
                clear();
                let updateId = $('#update').val();
                let changeEle = {};
                $("tbody tr").each(function(i,e){
                    let changeId ='';
                    changeId = $(e).attr('data-id');
                    console.log($(e).attr('data-id'));
                    if (changeId == updateId) {
                        changeEle = $(e);
                    }
                })
                $.post('/get_categories_by_id', { id: updateId }, (res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        changeEle.children().eq(1).text(res.name);
                        changeEle.children().eq(2).text(res.slug);
                        let classname = 'fa '+ res.classname;
                        changeEle.children().eq(3).find('.fa').attr('class',classname);
                    } else {
                        location.reload();
                    }
                })
            }
        })
    })
    var clear = function () {
        $('#btn-add').removeAttr('hidden');
        $('#btn-finish').attr('hidden', 'true');
        $('#btn-cancel').attr('hidden', 'true');
        $('#name').val('');
        $('#slug').val('');
        $('.icons > span').attr('class', 'fa fa-glass');
    }
})