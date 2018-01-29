function Carousel(){
	this.init();
	this.bind();
	this.autoPlay();
};

Carousel.prototype = {
	constructor : Carousel,
    init : function(){
    	this.$carousel = $('.carousel');
		this.$container = $('.carousel .container');
		this.$li = $('.carousel .container li');
		this.$arrow = $('.carousel .arrow');
		this.$bullet = $('.carousel .bullet');
	    this.$pre = $('.carousel .pre');
	    this.$next = $('.carousel .next');
	    this.imgWidth = this.$li.width();
	    this.imgCount = this.$li.length;
	    this.index = 0;
	    this.isAnimate = false;

    	var first = this.$li.first().clone();
    	var last = this.$li.last().clone();
        this.$container.prepend(last);
    	this.$container.append(first);

        this.$container.width((this.imgCount+2)*this.imgWidth);
    	this.$container.css('left',-this.imgWidth);
    	
    },

	bind : function(){
	    	var _this = this;
	    	this.$next.on('click',function(){
	                _this.playNext(1);
	        })

	        this.$pre.on('click',function(){
	        	_this.playPre(1);
	        })

	        this.$bullet.on('click','li',function(){
	        	var index = $(this).index();

                if(index < _this.index){
                	_this.playPre(_this.index - index)
                } else {
                	_this.playNext(index - _this.index)
                }
	        }) 
	},

    playPre : function(len){
    	var _this = this;
        //先行测试
    	console.log('playPre');
    	if(this.isAnimate) return;
    		this.isAnimate = true;

    	this.$container.animate({
    		left : '+=' + _this.imgWidth*len
    	},function(){
    		_this.index -= len;
    	
    		if(_this.index < 0 ){
    			_this.$container.css('left',-_this.imgWidth*_this.imgCount);
    			_this.index  = _this.imgCount - 1;
    		}

    		_this.setBullet();
    		_this.isAnimate = false;
    	})

    },

    playNext : function(len){
    	var _this = this;
    	//先行测试
    	console.log('playNext');
    	//防抖动
        if(this.isAnimate) return;
        this.isAnimate = true;

    	this.$container.animate({
    		left : '-=' + _this.imgWidth*len

    	},function(){
    		_this.index += len
    	
    		console.log(_this.index)
    		if(_this.index === _this.imgCount){
    			_this.$container.css('left',-_this.imgWidth);
    			_this.index = 0;
    		}

    		_this.setBullet();
    		_this.isAnimate = false;
    	})

    },

    setBullet : function(){
    	console.log($)
    	this.$bullet.children('li').eq(this.index).addClass('active')
    	            .siblings('li').removeClass('active');
    },

    autoPlay : function(){
    	var _this = this;
    	setInterval(function(){
           _this.playNext(1);
    	},2000)
    }

}

new Carousel();