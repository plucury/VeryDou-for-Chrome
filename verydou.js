 $(document).ready(function() {
	 //获取关键词
	var kw=$("TITLE").html().substr(0,$("TITLE").html().indexOf(' ')); 
    if (kw.length<=2 || /^[a-zA-Z0-9]+$/.test(kw)) {
        kw=$("TITLE").html().substr(0,$("TITLE").html().length-5)
    } 
    kw=encodeURIComponent(kw);

	//判断分类
	var find_cat=null;
    var nav=$("#nav>.now");
	var n_href=(nav.attr("href"));
	if (n_href=='/movie/') {
		//find_cat='%E7%94%B5%E5%BD%B1';
    } else if (n_href=='/music/') {
		//find_cat='%E9%9F%B3%E4%B9%90';
    } else if (n_href='/book/') {
		//find_cat='%E6%9D%82%E5%BF%97';
    }
	
	//构建url
    var url='http://www.verycd.com/search/folders?status=elite&rev=1&kw='+kw+'&format=xml';
    if (find_cat) {
        url+='&catalog='+find_cat;
    }


	var port = chrome.extension.connect({name:'port'}); 
	port.onMessage.addListener(onMessageRecieved); 
	port.postMessage({message: url});  
	function onMessageRecieved(data) { 
		addResult(data.message);
	}
	
	//将查询结果加入到页面中
	function addResult(array){
		var innerString="<h2>VeryDou for Chrome</h2><div class='indent'><ul class='bs'>";
		for(var i in array){
			innerString+=toListString(array[i]);
		}
		innerString+="</ul></div>";
		$(".aside").prepend(innerString);
	}
	function toListString(result){
		return "<li style='border:none'><a target='_blank' href='"+result.link+"' >"+result.title+"</a></li>";
	}
 });
