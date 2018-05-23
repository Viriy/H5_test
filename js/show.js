(function () {
	//来源网址
	var url = {
		referrer:'',
		entry:'',
		domain:'',
		type:''
	};
	//初始化主流搜索引擎分类数组
	//var searchEnginer = new Array('baidu','google','sogou','haosou');
	var searchEnginer = new Array('baidu','haosou','sogou','google','yahoo','xunlei','youdao','bing','ask','dogpile');
	//访客及设备信息
	mt = {},
	//被监控站点信息
	site = {
		id:'',
		domain:'',
		time:''
	};
	//记录站点标识和页面进入时间
	site.id = sId;
	site.time = new Date().getTime();
	
	//获取来源网址
	url.ref = {};
	url.ref.getRef = function(){
		var ref = '';  
		if (document.referrer.length > 0) {  
			ref = document.referrer;  
		}  
		try {  
		    if (ref.length == 0 && opener.location.href.length > 0) {  
		    	ref = opener.location.href;  
		    }  
		} catch (e) {}
		return ref;
	};
	//来源网址
	url.referrer = url.ref.getRef();
//	console.log(url.referrer);
	
	//获取当前网址
	url.cul = {};
	//获取当前网址完整路径
	url.cul.getCul = function(){
		return window.location.href;
	};
	url.cul.getDomain = function(){
		return document.domain;
	};
	//获取来源网址域名
	url.domain = url.cul.getDomain();
	url.entry = url.cul.getCul();
//  console.log(url.domain);
	
	//根据来源网址域名判断来源类型是搜索引擎（百度3、谷歌6、搜狗5、好搜（360）4）、外部链接访问2、直接访问1
	url.ref.getRefType = function(refDomain)
	{
		if(refDomain=='' || refDomain==null){
			return 1//代表是直接访问
		}else{
			for(var i=0;i<searchEnginer.length;i++){
				if(refDomain.indexOf(searchEnginer[i]) > -1){
					if(i<4){
						return i+3;//代表来源搜索引擎，3百度，6谷歌，5搜狗，4好搜等
					}else{
						return 7;//代表其他
					}
					
				}
			}
			return 2;//代表外部链接
		}
	}
	url.type=url.ref.getRefType(url.referrer);
	//console.log(url.type);
	
	//检测设备信息
	mt.i = {};
    mt.i.Ba = /msie (\d+\.\d+)/i.test(navigator.userAgent);
    mt.i.cookieEnabled = navigator.cookieEnabled;
    if(mt.i.cookieEnabled){
    	mt.i.cookieEnabled=1;
    }else{
    	mt.i.cookieEnabled=0;
    }
    mt.i.javaEnabled = navigator.javaEnabled();
    mt.i.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
    mt.i.Ea = (window.screen.width || 0) + "x" + (window.screen.height || 0);
    mt.i.colorDepth = window.screen.colorDepth || 0;
//    console.log(mt.i);
    
    // 设置、获取cookie
    mt.cookie = {};
    mt.cookie.set = function (site,value) {
        var Days = 999;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = site + "="+ escape (value) + ";expires=" + exp.toGMTString();
    };
    mt.cookie.get = function (site) {
    	var arr,reg=new RegExp("(^| )"+site+"=([^;]*)(;|$)");
    	if(arr=document.cookie.match(reg)){
    		return unescape(arr[2]);
    	}else{
    		return null;
    	}
    };
    
    //根据站点标识码和访问时间及随机数生成访客标识码并存到cookies中
    mt.viewer = {};
    var viewIdCode = 'viewIdCode';
    mt.viewer.vc = mt.cookie.get(viewIdCode);
    if (mt.viewer.vc == undefined || mt.viewer.vc == null || mt.viewer.vc == ''){
    	mt.viewer.vc = site.id + Math.floor(site.time * Math.random()).toString(36);
    	mt.cookie.set(viewIdCode,mt.viewer.vc);
    	mt.viewer.viewType = 1;//新访客
    }else{
    	mt.viewer.viewType = 2;//老访客
    }
	
	
	
    
    //获取浏览器信息
    mt.browser = {};
    mt.browser.getInfo = function(){
    	var document = window.document,
        navigator = window.navigator,
        agent = navigator.userAgent.toLowerCase(),
        //IE8+支持.返回浏览器渲染当前文档所用的模式
        //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
        //IE10:10(兼容模式7||8||9)
        IEMode = document.documentMode,     
        //chorme
        chrome = window.chrome || false,
        System = {
            //user-agent
            agent : agent,
            //是否为IE
            isIE : /msie/.test(agent),
            //Gecko内核
            isGecko: agent.indexOf("gecko")>0 && agent.indexOf("like gecko")<0,
            //webkit内核
            isWebkit: agent.indexOf("webkit")>0,
            //是否为标准模式
            isStrict: document.compatMode === "CSS1Compat",
            //是否支持subtitle
            supportSubTitle:function(){
                return "track" in document.createElement("track");
            },
            //是否支持scoped
            supportScope:function(){
                return "scoped" in document.createElement("style");
            },
            //获取IE的版本号
            ieVersion:function(){
                try {
                   return agent.match(/msie ([\d.]+)/)[1] || 0;
                } catch(e) {
                   console.log("error");
                   return IEMode;
                }
            },
            //Opera版本号
            operaVersion:function(){
                try {
                    if(window.opera) {
                        return agent.match(/opera.([\d.]+)/)[1];
                    } else if(agent.indexOf("opr") > 0) {
                        return agent.match(/opr\/([\d.]+)/)[1];
                    }
                } catch(e) {
                    console.log("error");
                    return 0;
                }
            },
            //描述:version过滤.如31.0.252.152 只保留31.0
            versionFilter:function(){
                if(arguments.length === 1 && typeof arguments[0] === "string") {
                    var version = arguments[0];
                        start = version.indexOf(".");
                    if(start>0){
                        end = version.indexOf(".",start+1);
                        if(end !== -1) {
                            return version.substr(0,end);
                        }
                    }
                    return version;
                } else if(arguments.length === 1) {
                    return arguments[0];
                }
                return 0;
            }
        };
         
    try {
        //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
        System.type = System.isIE?"IE":
            window.opera || (agent.indexOf("opr") > 0)?"Opera": 
            (agent.indexOf("chrome")>0)?"Chrome":
            //safari也提供了专门的判定方式
            window.openDatabase?"Safari":
            (agent.indexOf("firefox")>0)?"Firefox":      
            'unknow';
             
        //版本号   
        System.version = (System.type === "IE")?System.ieVersion():
            (System.type === "Firefox")?agent.match(/firefox\/([\d.]+)/)[1]:
            (System.type === "Chrome")?agent.match(/chrome\/([\d.]+)/)[1]:
            (System.type === "Opera")?System.operaVersion():
            (System.type === "Safari")?agent.match(/version\/([\d.]+)/)[1]:
            "0";
         
        //浏览器外壳
        System.shell=function(){
            //遨游浏览器
            if(agent.indexOf("maxthon") > 0) {
                System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version ;
                return "傲游浏览器";
            }
            //QQ浏览器
            if(agent.indexOf("qqbrowser") > 0) {
                System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version ;
                return "QQ浏览器";
            }
             
            //搜狗浏览器
            if( agent.indexOf("se 2.x")>0) {
                return '搜狗浏览器';
            }
             
            //Chrome:也可以使用window.chrome && window.chrome.webstore判断
            if(chrome && System.type !== "Opera") {
                var external = window.external,
                    clientInfo = window.clientInformation,
                    //客户端语言:zh-cn,zh.360下面会返回undefined
                    clientLanguage = clientInfo.languages;
                 
                //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                if( external && 'LiebaoGetVersion' in external) {
                     return '猎豹浏览器';
                }
                //百度浏览器
                if (agent.indexOf("bidubrowser")>0) {
                    System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] || 
                        agent.match(/chrome\/([\d.]+)/)[1];
                    return "百度浏览器";
                }
                //360极速浏览器和360安全浏览器
                if( System.supportSubTitle() && typeof clientLanguage === "undefined") {
                    //object.key()返回一个数组.包含可枚举属性和方法名称
                    var storeKeyLen = Object.keys(chrome.webstore).length,
                        v8Locale = "v8Locale" in window;
                    return storeKeyLen > 1? '360极速浏览器':'360安全浏览器';   
                }
                return "Chrome";
            } 
            return System.type;       
        };
        //浏览器名称(如果是壳浏览器,则返回壳名称)
        System.name = System.shell();
        //对版本号进行过滤过处理
        System.version = System.versionFilter(System.version);  
    } catch(e) {
        console.log("error");
    }
    return {
        client:System
    };
   } 
    //获取浏览器名称和版本号
    mt.browser.info = mt.browser.getInfo();
//  console.log(mt.browser.info.client.name);
    
    //获取访客系统类型pc/android/ios
    mt.system = {};
    mt.system.getInfo = function(){
    	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    	    return 'ios';
    	} else if (/(Android)/i.test(navigator.userAgent)) {
    		return 'android';
    	} else {
    	    return 'pc';
    	};
    }
    mt.system.info = mt.system.getInfo();
    
    
    /*
     * js获取相关参数
     * wd webId，vd viewDate,vc viewIdCode,sc source,ty sourceType,et entry,sn screen,ic isCookieEnable,lang language,bt browserType,sys system,vt viewType,time time
     * 
     * */
    //获取站点标识码
    var wd = site.id,vd = site.time,vc = mt.viewer.vc,sc = url.referrer,ty=url.type,et = url.entry,sn = mt.i.Ea,ic= mt.i.cookieEnabled,
    lang = mt.i.language ,bt = mt.browser.info.client.name,sys = mt.system.info ,vt = mt.viewer.viewType ,time = '';
    //访客系统类型
    mt.system.info = mt.system.getInfo();
//  alert(mt.system.info);
    mt.log = {};
    mt.log.send = function(){
    	var log = new Image();
    	log.src = "http://analysis.51family.com.cn/index.php/log?wd=" + wd + "&vd=" + vd +"&vc=" 
    	+ vc + "&sc=" + sc + "&ty="+ ty + "&et=" + et + "&sn=" + sn + "&ic=" + ic + "&lang=" + lang + "&bt=" + bt + "&sys=" + sys + "&vt=" + vt + "&time=" + time;
   	//console.log(log.src);
    }();
    
  //页面刷新或关闭触发事件
    /*window.onbeforeunload = function () { 
    	var time1=new Date().getTime();
        var url="http://analysis.51family.com.cn/index.php/log/ajaxLog?wd=" + wd + "&vd=" + vd +"&vc=" 
    	+ vc + "&sc=" + sc + "&ty="+ ty + "&et=" + et + "&sn=" + sn + "&ic=" + ic + "&lang=" + lang + "&bt=" + bt + "&sys=" + sys + "&vt=" + vt + "&time=" + time1;;
    	log = {};
	    log.send = function(){
	    var log = new Image();
	    	log.src = url;
	   	//console.log(log.src);
	    }();
    };  */ 
})();