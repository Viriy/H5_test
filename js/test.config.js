(function() {

	$(window).on('load',function(){
		TweenMax.to($("#toploader"),0.5,{autoAlpha:0,delay:.6});
		playmusic.play();
	});
    document.addEventListener("WeixinJSBridgeReady", function() { playmusic.play(); }, false); // Apple wx play music;
	
	

	
    // 微信分享
     function ready(){
       share({
        title:document.title,
        desc: '分享描述',
        link: location.href,
        imgUrl: '/images/share.jpg',//显示小图标
        debug: false
        });
     }

})();
