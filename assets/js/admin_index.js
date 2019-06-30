$(function(){
    let test = location.href;
    if(test.indexOf("/index")<= 0 &&
    test.indexOf("/admin/") == -1){
        history.pushState("", "Title", test + "/");
    }
})