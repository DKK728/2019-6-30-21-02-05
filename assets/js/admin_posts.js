$(function(){
    // $.post('/getPostsByPage',{pageIndex : 1, pageSize : 10},function(res){
    //     if(res.code == 200){
    //         let html = template('tp',res.data);
    //         // console.log(res.data)
    //         $('tbody').html(html)
    //         initPagination(1,res.maxPage);
    //     }
    // });
    getPageData({
        filter : 'all',
        status : 'all',
        pageIndex : 1,
        pageSize : 10
    });
    $('.pagination').on('click','.page-link',function(){
        let pageIndex = parseInt($(this).attr('data-index'));
        let pageSize = 10;
        // $.post('/getPostsByPage',{pageIndex , pageSize},function(res){
        //     if(res.code == 200){
        //         let html = template('tp',res.data);
        //         $('tbody').html(html)
        //         initPagination(pageIndex,res.maxPage);
        //     }
        // })
        let filter =$('#categories').val();
        let status = $('#status').val();
        getPageData({
            filter,status,pageIndex,pageSize
        });
    });
    $.get('/getAllCategories',(res)=>{
        // console.log(res);
        let html = `<option value="all">所有分类</option>`;
        for(let i = 0;i < res.data.length;i++ ){
            html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
        }
        $('#categories').html(html);
    })
    $('#btn-filter').on('click',()=>{
        let filter = $('#categories').val();
        // console.log(filter);
        let status = $('#status').val();
        // console.log(status);
        // $.post('/getPostsByFilter',{filter,status,pageIndex:1,pageSize:10},(res)=>{
        //     if(res.code == 200){
        //         let html = template('tp',res.data);
        //         $('tbody').html(html)
        //     }
        // })
        getPageData({
            filter,status,pageIndex : 1,pageSize : 10
        })
    })
    function initPagination (currentIndex,maxpage){
        //根据当前页和按钮数量动态生成分页按钮
    // let currentIndex = 10;
    // let maxpage = 11;
    let buttonCount = 5;
    //根据当前页确定第一个按钮页数
    let start = currentIndex - Math.floor((buttonCount - 1)/2);
    if(start <= 1){
        start = 1;
    }
    //根据第一个按钮确定最后一个按钮页数
    let end = start + (buttonCount -1);
    if(end >=  maxpage){
        end = maxpage;
        start = end - (buttonCount -1);
        if(start <= 1){
            start = 1;
        }
    }
    let html = '';
    if(currentIndex != 1){
    html += `<li class="page-item"><a href="javascript:void(0);" class="page-link" data-index="${currentIndex-1}">上一页</a></li>`;
    }
    for(var i = start; i <= end ; i++){
        if(i==currentIndex){
            html += `<li class="page-item active"><a href="javascript:void(0);" class="page-link" data-index="${i}">${i}</a></li>`
        }else {
            html += `<li class="page-item"><a href="javascript:void(0);" class="page-link" data-index="${i}">${i}</a></li>`
        }
    }
    if(currentIndex != maxpage){
    html += `<li class="page-item"><a href="javascript:void(0);" class="page-link" data-index="${currentIndex+1}">下一页</a></li>`;
    }
    $('.pagination').html(html)
    };
    /*
    *@param {object} params
    *@example {
    *           categoryID : 分类id
    *           status ： 状态
    *           pageIndex ： 获取第几页
    *           pageSize ： 页容量
     */
    function getPageData (params){
        $.post('/getPostsByFilter',params,function(res){
            if(res.code == 200){
                let html = template('tp',res.data);
                $('tbody').html(html)
                initPagination(params.pageIndex,res.maxPage);
            }
        })
    };
})