var tools = {};
/**
*@description 验证非空
*@parma selector {string}要验证的表单元素的选择器
*@returns {boolean}是否为空
*/ 
tools.validateEmpty = function(selector){
    let ele = document.querySelector(selector);
    let val = ele.value.trim();
    return val.length === 0;
}
