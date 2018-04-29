var oSliderPage = document.getElementById('sp');
var oLeftBtn = document.getElementById('lBtn');
var oRightBtn = document.getElementById('rBtn');
var oIArray = document.getElementsByTagName('i');
var delayTimer = null;
var len = oSliderPage.children.length - 1;//记录几张图片在轮播
var moveWidth = oSliderPage.children[0].offsetWidth;//记录轮播图每次移动的真实距离
var index = 0;//等于0让第一个i的class是active，等于1让第二个i的class是active
var locked = true;//设定一个门，先开着的
oLeftBtn.onclick = function(){
     controllMove('leftToRight');
}
oRightBtn.onclick = function(){
     controllMove('rightToleft');
}
for (var i = 0; i < oIArray.length; i++) {
	(function(thisIndex){
		oIArray[i].onclick = function(){
			//alert(thisIndex);//闭包式的写法，你点第一张图，就跳0，
               index = thisIndex;//等于全局的index
               locked = false;//锁上锁
               clearTimeout(delayTimer);
               changeIndex(index);//改变索引
               startMove(oSliderPage, {left: -index * moveWidth}, function(){
               	locked = true;
               	delayTimer = setTimeout(controllMove, 1500);

               });
	         }
	})(i)
	
}



//这个函数第一个参数是方向，当你传的是'rightToleft'，默认从右向左
//如果点击左侧按钮leftBtn，那么方向相反 'leftToRight'变成从左向右
function controllMove(direction){
	if (locked) {
		locked = false;//一旦进去就把门关上
		clearTimeout(delayTimer);
	if (!direction || direction == 'rightToleft') {
		index++;
		//从1到2
		startMove(oSliderPage, {left: oSliderPage.offsetLeft - moveWidth}, function(){
			if (oSliderPage.offsetLeft == -len * moveWidth) {
				oSliderPage.style.left = '0px';
				index = 0;
			}
			changeIndex(index);
			delayTimer = setTimeout(controllMove, 1500);
			locked = true;
		});

	}else if(direction === 'leftToRight'){
		//从2到1
		if (oSliderPage.offsetLeft == 0) {
			oSliderPage.style.left = -len * moveWidth + 'px';
			index = len;
		}
		index--;
		startMove(oSliderPage, {left: oSliderPage.offsetLeft + moveWidth}, function(){
			changeIndex(index);
			delayTimer = setTimeout(controllMove, 1500);
			locked = true;
		})
		

	}


	}
	
}

function changeIndex(index){
	for(var i = 0; i < oIArray.length; i++){
		oIArray[i].className = '';
	}
	oIArray[index].className = 'active';
}

delayTimer = setTimeout(controllMove, 1500);




//没完呢，我们要做个轮播图生成器
//
//让任何div都具有下面的功能
//
//var config = {
//   imgSrc: ['图片1.jpg', '图片2.jpg',],
//   width: 500,
//   height: 500
//   
//   };
//   
//   HTMLDivElement.prototype.creatTurnPage = function(config){
//       
//       
//      this.appendchild(dom);
//   
//   
//   }
//   
//   oDiv.creatTurnPage(config)
//   
//   
//   
//   最后当某个div调用了这个函数的时候，它就在这个div里面产生几张图片的轮播图
//