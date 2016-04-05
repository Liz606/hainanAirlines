'use strict';

　// true or false
$(function (){
	$('body').show();
	var pageIndex=0,
		pageLen=7,
		pageNow,
		pageNext,
		animating=false,
		direction= "vertical",//滑动的方向 horizontal,vertical,
		start={},
		current={};
	$(document).on('touchstart','',pageStart);
	$(document).on('touchmove','',pageMove);
	$(document).on('touchend','',pageEnd);
	/*function*/

	function pageMove(e)
		{
			e.preventDefault();
		}

	//pageStart
	function pageStart(e){
		console.log('pageStart');
		// alert('pageStart');
		if(start.active) return;
	    if( e.originalEvent.touches.length < 2 ) {
	      start.x = e.originalEvent.touches[0].pageX;
	      start.y = e.originalEvent.touches[0].pageY;
	      start.when = new Date().getTime();
	      start.active = true;
	    }

	}
	//pageEnd
	  function pageEnd(e){
	  	// alert('pageEnd');
	  	console.log('pageEnd');
		current.x = e.originalEvent.changedTouches[0].pageX;         
		current.y = e.originalEvent.changedTouches[0].pageY;     
    	start.active = false;	
    	if(isSwipe(e) ){
    		 if (direction == "horizontal"){
		    	 if(current.x-start.x<0){
	    			turnPage(1);
	    		  }else{
	    			turnPage(-1);
	    		}
	    	}else{
		    	if(current.y-start.y<0){
	    			turnPage(1);
	    		}else{
	    			turnPage(-1);
	    		}
	    	}
    	}	
	}


	// pageClick
	  function pageClick(){
		console.log('click');
		turnPage(1);
	}
	//是否到达滑动的条件
	  function isSwipe(e) {
	    var duration = new Date().getTime()-start.when;
	    var xdist;
	    if (direction == "horizontal") {
	    	 xdist    = current.x - start.x;
	    	}else{
	    	 xdist    = current.y - start.y;
	    	}
	    console.log(xdist);
	    return duration < 500 && 100 < Math.abs( xdist );
	}	
	//changePage
	function changePage(from,to,add){
		if(0>to||to>=pageLen) return;
		if(animating){
			console.log('anmating...');
			return;
		};
		animating=true;
		pageNow=$('.page:eq('+from+')');
		pageNext=$('.page:eq('+to+')');
		if(from>to) {
				pageNow.addClass("page"+(from+1)+"-prev");
			}else {
				pageNow.addClass("page"+(from+1)+"-next");
			}
			if(from==5){
				 if (!myVideo.paused) {  
		       		 myVideo.pause(); // 暂停  
		       		 $(".page6-video").hide();
		       		 $(".page6-play")[0].style.display='block';
					$(".page6-videoImg")[0].style.display='block';
		       		 console.log("pause")
		          }  
		      }
		switch(from){
			case 0:
				$("#page1 .page1-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;
			case 1:
				$("#page2 .page2-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;
			case 2:
				$("#page3 .page3-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;
			case 3:
				$("#page4 .page4-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;	
			case 4:
				$("#page5 .page5-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;
			case 5:
				$("#page6 .page6-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);
				break;
			case 6:
				$("#page7 .page7-leave:eq(0)").one('webkitAnimationEnd',pageAniEnd);			
				break;
		}
		function pageAniEnd(event){
			console.log('pageAniEnd...');
			animating=false;
			pageNow
			  .removeClass("page"+(from+1)+"-prev")
			  .removeClass("page"+(from+1)+"-next")
			  .removeClass("page"+(from+1))
			  .hide();
			pageNext.addClass("page"+(to+1)).show();/*显示下一个页面，启动动画*/
			pageIndex=to;	
		}		
	}

	//turnPage
	function turnPage(add){
		if(pageIndex==pageLen-1 && add==1) return;
		if(pageIndex==0 && add==-1) return;
		changePage(pageIndex,pageIndex+add,add);
	}

})

