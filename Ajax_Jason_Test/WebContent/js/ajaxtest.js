var httpRequest=null;

function getXMLHttpRequest(){
	if(window.ActiveXObject){//IE

		try{
			//6.0 상위 버전
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				//6.0 하위 버전
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e1){
				//오류
				return null;
			}
		}
	}else if(window.XMLHttpRequest){//IE를 제외한 나머지 브라우저
		return new XMLHttpRequest();
	}else{
		return null;
	}
}

//dispatcher??
function load(url){
	httpRequest=getXMLHttpRequest();
	httpRequest.onreadystatechange=viewMessage;
	httpRequest.open("GET", url, true); //true가 비동기식. 
	//동기식은 open하고나서 받을때까지 아무것도안함
	httpRequest.send(null);
}//load

//action(controller)??
function viewMessage(){//call back 함수 load가 불릴때마다 viewMessage가 불림
	if(httpRequest.readyState==4){
		if(httpRequest.status==200){
			var result=document.getElementById('result');
			var xmlDoc=httpRequest.responseXML;	//responseXML, responseText...
			var bookList=xmlDoc.getElementsByTagName("book");
			var bookCount="총 : "+bookList.length+"권입니다.";
			result.innerHTML=bookCount+"<br><hr>";

			for(var i=0;i<bookList.length; i++){
				var book=bookList.item(i);
				//title 밑에 text는 또 다른 값 그래서 item(0) 밑에 firstChild.nodeValue를 쳐줌
				var titleStr="제목 : "+book.getElementsByTagName("title").item(0).firstChild.nodeValue;
				var authorStr="저자 : "+book.getElementsByTagName("author").item(0).firstChild.nodeValue;
				result.innerHTML+=titleStr+"<br>";
				result.innerHTML+=authorStr+"<br><br><hr>";
			}
		}
	}
}