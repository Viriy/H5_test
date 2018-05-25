(function() {

document.addEventListener("WeixinJSBridgeReady", function() {playmusic.play();}, false);// Apple wx play music; 

function onLoaded() {
       playmusic.play();//default music play;
}

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