var httpRequest=null;

function getXMLHttpRequest(){
	if(window.ActiveXObject){//IE

		try{
			//6.0 ���� ����
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				//6.0 ���� ����
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e1){
				//����
				return null;
			}
		}
	}else if(window.XMLHttpRequest){//IE�� ������ ������ ������
		return new XMLHttpRequest();
	}else{
		return null;
	}
}

//dispatcher??
function load(url){
	httpRequest=getXMLHttpRequest();
	httpRequest.onreadystatechange=viewMessage;
	httpRequest.open("GET", url, true); //true�� �񵿱��. 
	//������� open�ϰ��� ���������� �ƹ��͵�����
	httpRequest.send(null);
}//load

//action(controller)??
function viewMessage(){//call back �Լ� load�� �Ҹ������� viewMessage�� �Ҹ�
	if(httpRequest.readyState==4){
		if(httpRequest.status==200){
			var result=document.getElementById('result');
			var xmlDoc=httpRequest.responseXML;	//responseXML, responseText...
			var bookList=xmlDoc.getElementsByTagName("book");
			var bookCount="�� : "+bookList.length+"���Դϴ�.";
			result.innerHTML=bookCount+"<br><hr>";

			for(var i=0;i<bookList.length; i++){
				var book=bookList.item(i);
				//title �ؿ� text�� �� �ٸ� �� �׷��� item(0) �ؿ� firstChild.nodeValue�� ����
				var titleStr="���� : "+book.getElementsByTagName("title").item(0).firstChild.nodeValue;
				var authorStr="���� : "+book.getElementsByTagName("author").item(0).firstChild.nodeValue;
				result.innerHTML+=titleStr+"<br>";
				result.innerHTML+=authorStr+"<br><br><hr>";
			}
		}
	}
}