$(function(){
    let href = location.href;
    if(href.indexOf('/admin/categories') != -1
    ||href.indexOf('/admin/post-add') != -1
    ||href.indexOf('/admin/posts') != -1
    ){
        $('#posts-top').attr('aria-expanded','true').removeClass('collapsed');
        $('#menu-posts').addClass('show');
    }
    if(href.indexOf('/admin/slides') != -1
    ||href.indexOf('/admin/settings') != -1)
    {
        $('#posts-down').attr('aria-expanded','true').removeClass('collapsed');
        $('#menu-settings').addClass('show');
    }
    let index = href.indexOf('/admin');
    let eleId = href.substring(index + 7);
    eleId = eleId || 'index';
    $('#'+ eleId).addClass('active');
    $.get('/admin_get_head_and_name',(res)=>{
        if(res.code == 200){
            // console.log(res)
            $('.profile > .avatar').attr('src',res.data.avatar);
            $('.profile > .name').html(res.data.nickname)
        }
    });
})