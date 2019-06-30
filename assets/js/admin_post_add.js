$(function(){
    $('#feature').on('change',function(){
        let img = this.files[0];
        let fd = new FormData();
        fd.append("pic",img);
        $.ajax({
            type :'post',
            url :'/uploadImage',
            data : fd ,
            contentType : false ,
            processData : false,
            success(res){
                if(res.code == 200){
                    $('.thumbnail').attr('src',res.data).show()
                }
            }
        })
    })
    CKEDITOR.replace('content')
})