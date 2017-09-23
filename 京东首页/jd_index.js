/**
 * Created by KIVIN on 2017/7/01.
 */
/*广告图片数组*/
var imgs=[
  {"i":0,"img":"images/index/banner_01.jpg"},
  {"i":1,"img":"images/index/banner_02.jpg"},
  {"i":2,"img":"images/index/banner_03.jpg"},
  {"i":3,"img":"images/index/banner_04.jpg"},
  {"i":4,"img":"images/index/banner_05.jpg"},
];
//创建广告轮播对象
var slider = {
  LIWIDTH: 0,//保存每个li的宽度
  $ulImgs: null,//保存id为imgs的ul
  $ulIndex: null,//保存index的ul
  DURATION: 500,//保存移动动画的时间
  WAIT:3000,//保存轮播的时间
  moved: 0,//保存向左移动的图片数
  init(){
    var me = this;
    me.LIWIDTH = parseFloat($('#slider').css('width'));
    me.$ulImgs = $('#imgs');
    me.$ulIndex = $('#indexs');
    me.initView();//初始化界面
    me.autoMove();//开启轮播
    //当鼠标进入slider就停止轮播
    $('#slider').hover(function () {
      me.$ulImgs.stop(true);
    }, function () {
      me.autoMove();
    });
    //监听鼠标进入事件
    me.$ulImgs.on('mouseenter', 'li>img', function (e) {
      var $target = $(e.target);
      me.moved = $target.index('#imgs img');//修改moved为index
      me.moved >= imgs.length && (me.moved = 0);//防止错位
      me.$ulImgs.css('left', -me.moved*me.LIWIDTH);
      me.changeHover();
    });
    
    //鼠标悬停在index上切换到相应的图片
    me.$ulIndex.on('mouseenter', 'li', function (e) {
      //moved的距离是事件源的index-原来hover的index
      var $target = $(e.target);
      if(!$target.is('.hover')){
        var endI  = $target.index('#indexs>li');
        var startI = $('.hover').index('#indexs>li');
        me.moved += (endI - startI);
        if(me.moved >= 0){
          me.changeHover();
          me.$ulImgs.stop(true).animate({
            left: -me.moved * me.LIWIDTH
          }, me.DURATION);
        }
      }
    });
    
  },
  autoMove(){//让图片开始自动轮播
    var me = this;//留住this
    me.moved++;
    me.$ulImgs.animate({"null":1}, me.WAIT, function () {
      me.$ulImgs.animate({
        left: -me.moved*me.LIWIDTH
      }, me.DURATION, function () {
        //先判断移动的个数
        if(me.moved === imgs.length){
          me.$ulImgs.css('left', 0);
          me.moved = 0;
        }
        //再判断index中moved位置的元素添加hover
        me.changeHover();
        me.autoMove();//再启动自动轮播
      });
    });
  },
  changeHover(){
    this.$ulIndex.children().eq(this.moved).addClass('hover')
      .siblings().removeClass('hover');
  },
  initView(){//将广告数组更新到页面里
    var htmlImgs = '',
      htmlIndex = '';
    for (var i=0; i<imgs.length; i++){
      htmlImgs += '<li><img src='+imgs[i].img+'></li>';
      htmlIndex += '<li><span>'+(i+1)+'</span></li>'
    }
    //设置ulImgs和ulIndex
    this.$ulImgs.html(htmlImgs).css('width', (imgs.length+1)*this.LIWIDTH);
    this.$ulImgs.append(this.$ulImgs.children(':first').clone());
    this.$ulIndex.html(htmlIndex).children(':first').addClass('hover');
  }
};
slider.init();