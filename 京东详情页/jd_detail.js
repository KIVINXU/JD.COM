
$(function () {
  //页面顶部下拉菜单
  $('.app_jd,.service').hover(function () {
    //切换子菜单的显示隐藏
    $(this).children('[id$="_items"]').toggle()
      .prev().toggleClass('hover');//切换前面a元素的hover,维持hover状态
  });
  
  //为全部商品分类菜单
  //为一级菜单添加hover
  $('#category').hover(function () {
    //切换子菜单显示隐藏
    $(this).children('#cate_box').toggle();
  });
  //为子菜单添加事件委托，只允许li触发事件
  $('#cate_box').on('mouseenter', 'li', showSub)
    .on('mouseleave', 'li', showSub);
  //定义函数showSub，切换二级子菜单的显示和隐藏
  function showSub() {
    $(this).children('.sub_cate_box').toggle()
      //为二级子菜单前面的h3维持hover状态
      .prev().toggleClass('hover');
  }
  
  //放大镜
  var preview = {
    LIWIDTH: 62,//每个li的宽
    $ul: null,//保存小图片移动前的状态
    moved: 0,//已经移动的小图片个数
    $mask: null,//保存半透明遮罩
    MSIZE: 175,//保存mask的尺寸
    SMSIZE: 350,//保存superMask的尺寸
    MAX: 0,//可移动最大距离
    $lg: null,//保存大图片
    init(){
      //为id为icon_list查找ul保存刀$ul中
      this.$ul = $('#icon_list');
      //为两个按钮绑定事件
      $('#preview>h1>a').click(function (e) {
        //选择不以disabled结尾的按钮
        if(!$(e.target).is('[class$="_disabled"]')) {
          if($(e.target).is('.forward')) {
            this.$ul.css('left', parseFloat(this.$ul.css('left'))
              - this .LIWIDTH);
            this.moved++;
          }else {
            this.$ul.css('left', parseFloat(this.$ul.css('left'))
              + this .LIWIDTH);
            this.moved--;
          }
          this.checkA();//检查按钮的状态
        }
      }.bind(this));
      
      //为ul添加事件委托，只允许li下的img响应事件
      this.$ul.on('mouseover', 'li>img', function (e) {
        var src = $(e.target).attr('src');
        //查找src里.的位置
        var point = src.lastIndexOf('.');
        //在.之前加一个-m作为mImg的新src
        src = src.slice(0, point) + '-m' + src.slice(point);
        $('#mImg').attr('src', src);
      });
      
      //选择id为mask的半透明遮罩保存在$mask中
      this.$mask = $('#mask');
      this.$lg = $('#largeDiv');
      //为id为superMask绑定hover
      $('#superMask').hover(function () {
        //切换id为显示隐藏
        this.$mask.toggle();
        this.$lg.toggle();
        //获得mImg的src
        var src = $('#mImg').attr('src');
        var point = src.lastIndexOf('.');
        src = src.slice(0, point-1) + 'l' + src.slice(point);
        this.$lg.css('backgroundImage', 'url(' + src + ')');
      }.bind(this))
      .mousemove(function (e) {
        //获得鼠标的x y
        var x = e.offsetX, y = e.offsetY;
        var top = y - this.MSIZE/2,
            left = x - this.MSIZE/2;
        this.MAX = this.SMSIZE - this.MSIZE;
        if(top > this.MAX){
          top = this.MAX
        }else if(top < 0) {
          top = 0;
        }
        if(left > this.MAX){
          left = this.MAX
        }else if(left < 0) {
          left = 0;
        }
        this.$mask.css({
          top, left
        });
        //修改背景图片位置
        this.$lg.css('backgroundPosition',  (-16/7*left) + 'px ' + (-16/7*top) + 'px');
      }.bind(this));
    },
    checkA(){
      var totleLi = this.$ul.children().size();
      if(this.moved === 0){
        $('[class^="backward"]').attr('class', 'backward_disabled');
      }else if((totleLi - this.moved) === 5){
        $('[class^="forward"]').attr('class', 'forward_disabled');
      }else{
        $('[class^="backward"]').attr('class', 'backward');
        $('[class^="forward"]').attr('class', 'forward');
      }
    }
  };
  preview.init();
  
  //右侧产品信息 标签切换
  $('#product_detail>.main_tabs').on('click', 'li:not(.current)', function () {
    $(this).addClass('current')
      .siblings().removeClass('current');
    //内容切换
    //找到所有容器并移除
    var $divs = $('#product_detail>[id^="product"]');
    $divs.removeClass('show');
    //如果不是商品评价
    if(!$(this).is(':contains("商品评价")')){
      var i = $(this).index('#product_detail>.main_tabs>li:not(:contains("商品评价"))');
      //为所有div中相同下标位置的div添加show
      $divs.eq(i).addClass('show');
    }
  });
  
});
