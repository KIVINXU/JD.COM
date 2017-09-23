/**
 * Created by KIVIN on 2017/7/01.
 */
var elevator = {
  FHEIGHT: 414,//保存楼层的高度
  UPLEVEL: 0,//点亮楼层按钮上限
  DOWNLEVEL: 0,//点亮楼层按钮下限
  $spans: null,//保存所有楼层气泡
  $elevator: null,//保存电梯按钮
  init(){
    var me = this;
    me.UPLEVEL = (innerHeight - me.FHEIGHT)/2;
    me.DOWNLEVEL = me.UPLEVEL + me.FHEIGHT;
    //找到楼层所有气泡
    me.$spans = $('.floor>header>span');
    me.$elevator = $('#elevator');
    //为窗口添加滚动事件
    $(window).scroll(function () {
      me.checkSpan();
      if(me.$spans.is('.hover')){
        me.$elevator.show();
      }else {
        me.$elevator.hide();
      }
    });
    //为elevator绑定鼠标进入，只允许li响应
    me.$elevator.children('ul').on('mouseenter', 'li', function () {
      $(this).children(':first').hide()
        .next().show()
    }).on('mouseleave', 'li', function () {
      var i = $(this).index('#elevator>ul>li');
      if(!me.$spans.eq(i).is('.hover')){
        $(this).children(':first').show()
          .next().hide();
      }
    }).on('click', 'li', function () {
      var i = $(this).index('#elevator>ul>li');
      var offsetTop = me.$spans.eq(i).offset().top;
      var scroll = offsetTop - me.UPLEVEL;//楼层滚动距离
      $(document.body).stop(true).animate({
        scrollTop: scroll
      }, 1000);
    });
    
    
  },
  checkSpan(){//检查每个楼层的span是否亮灯
    var me = this;
    me.$spans.each(function (i) {
      var offsetTop = $(this).offset().top;
      var scrollTop = $(document.body).scrollTop();
      //如果span距离顶部的距离>滚动的距离加上限的距离且
      //<=滚动距离加下限的距离
      if(offsetTop >= (scrollTop + me.UPLEVEL)
        && offsetTop < (scrollTop + me.DOWNLEVEL)){
        $(this).addClass('hover');
        //找到elevator下的li
        me.$elevator.find('ul>li').eq(i)
          .children(':first').hide()
          .next().show();
      }else {
        $(this).removeClass('hover');
        //找到elevator下的li
        me.$elevator.find('ul>li').eq(i)
          .children(':first').show()
          .next().hide();
      }
    });
  }
};
elevator.init();