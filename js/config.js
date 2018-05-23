(function() {

	

//console.log('loading动画已关闭，请完成后再打开，在config.js中注释相应功能');

onLoaded();//开发期打开

load(ready,onLoaded); //完成后打开

document.addEventListener("WeixinJSBridgeReady", function() {playmusic.play();}, false);// Apple wx play music; 

function onLoaded() {
	//隐藏load
       $('.posa').hide();

       playmusic.play();//default music play;  

//       Swiper
//	var mianSwiper = new Swiper('.swiper-container-v', {
//
//            onInit: function(swiper) {
//				返回主页
//                $('.press').on('touchstart',function(){
//
//                    swiper.slideTo($(this).data('into'), 500, true);
//
//                    $('.w_kk').scrollTop(0);
//
//                });
//
//                newAnimate('.swiper-container-v',0);
//
//            },
//
//            onSlideChangeEnd: function(swiper) {  
//
//              var i = swiper.activeIndex;//当页索引
//
//                 newAnimate('.swiper-container-v',i);
//
//                 // debug(i)
//
//            },
//
//            autoHeight: true,
//
//            setWrapperSize: true,
//
//            direction: 'vertical',//默认横屏,vertical:竖屏
//
//            mousewheelControl: false, //给鼠标添加控制。
//
//            keyboardControl : true,//键盘控制
//
//            preventClicks: false,//值为true，swiper里的a标签在滑动事件不会跳转，点击才跳转。
//
//        });



//FSW






//阻止页面滚动
	
//	$('.page1,.w_kk').on('touchmove',function(e){
//
//		 e.stopPropagation();
//
//	});



//  $('.w_btn').children().click(function(){
//
//    var oindex=$(this).index();
//
//    
//
//    $('.w_btn').find('.mmp1').css('zIndex','0');
//
//    $(this).children('.mmp1').css('zIndex','2');
//
//    $('.w_xk').children().eq(oindex).css('display','block').siblings().css('display','none');
//
//    
//
//  })



}







// 微信分享

function ready(){ 

   // wx share

  share({

   title:document.title,

   desc: '雅培运营管理培训生项目',

   link: location.href,

   imgUrl: '/images/share.jpg',

   debug: false

   });

}

})();