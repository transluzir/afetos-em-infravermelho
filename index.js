(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"index_atlas_1", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_2", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_3", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_4", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_5", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_6", frames: [[0,0,1722,1158]]},
		{name:"index_atlas_7", frames: [[0,1160,1004,499],[1006,1160,1004,499],[0,0,1722,1158]]},
		{name:"index_atlas_8", frames: [[0,0,1004,499],[1006,0,1004,499],[0,501,1004,499],[1006,501,1004,499],[0,1002,1004,499],[0,1503,103,23],[1006,1002,1004,499]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3592,2016);


(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3592,2016);


(lib.CachedBmp_9 = function() {
	this.initialize(img.CachedBmp_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3592,2016);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2362,1035);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2627,1156);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3032,1319);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2627,1218);


(lib._27 = function() {
	this.initialize(img._27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3984,2988);


(lib.anna_0 = function() {
	this.initialize(ss["index_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.anna_2 = function() {
	this.initialize(ss["index_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.anna_3 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.anna_5 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.anna_6 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.anna_4 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.anna_7 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Data2 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_0 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_2 = function() {
	this.initialize(ss["index_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_1 = function() {
	this.initialize(ss["index_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_3 = function() {
	this.initialize(ss["index_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_4 = function() {
	this.initialize(ss["index_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_6 = function() {
	this.initialize(ss["index_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.piupiu31_5 = function() {
	this.initialize(ss["index_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.anna_1 = function() {
	this.initialize(ss["index_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2213,982);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2927,1403);


(lib.clica = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada_1
	this.instance = new lib.Data2();
	this.instance.setTransform(0,0,5.8107,9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,598.5,207);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Clique para ir para a página da Web
		Clicar na instância do símbolo especificada carrega o URL em uma nova janela do navegador.
		
		Instruções:
		1. Substitua http://www.adobe.com pelo endereço URL desejado.
		      Mantenha as aspas ("").
		*/
		
		this.button_5.addEventListener("click", fl_ClickToGoToWebPage_7);
		
		function fl_ClickToGoToWebPage_7() {
			window.open("pagina1.html", "_blank");
		}
		/* 
		
		responsive scale code as expressed by @davegamez 
		and modified by @josephLabrecque 
		
		*/
		
		
		var page_body = document.getElementsByTagName("body")[0];
		page_body.style.backgroundColor = "#3C0600";
		page_body.style.overflow = "hidden";
		page_body.style.position = "fixed";
		
		var page_canvas = document.getElementsByTagName("canvas")[0];
		stageWidth = page_canvas.width;
		stageHeight = page_canvas.height;
		
		var viewport = document.querySelector('meta[name=viewport]');
		var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';
		
		if (viewport === null) {
		 var head = document.getElementsByTagName('head')[0];
		 viewport = document.createElement('meta');
		 viewport.setAttribute('name', 'viewport');
		 head.appendChild(viewport);
		}
		
		viewport.setAttribute('content', viewportContent);
		
		function onResize() {
		 var newWidth = window.innerWidth;
		 var newHeight = window.innerHeight;
		 page_canvas.style.height = newHeight + "px";
		 page_canvas.style.width = newWidth + "px";
		 stage.width = newWidth;
		 stage.height = newHeight;
		}
		
		window.onresize = function () {
		 onResize();
		}
		
		onResize();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(46));

	// Camada_3
	this.button_5 = new lib.clica();
	this.button_5.name = "button_5";
	this.button_5.setTransform(1807.4,330.5,0.6013,0.5937,0,0,0,299.2,103.5);
	new cjs.ButtonHelper(this.button_5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.button_5).wait(46));

	// Camada_2
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(76.95,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(280.5,438.8,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(266.65,421.85,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_4();
	this.instance_3.setTransform(285.05,431.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_5();
	this.instance_4.setTransform(280.5,438.8,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_6();
	this.instance_5.setTransform(266.65,452.65,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_7();
	this.instance_6.setTransform(133.75,288.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:76.95,y:0}}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},8).to({state:[{t:this.instance,p:{x:285.05,y:431.8}}]},11).wait(6));

	// Camada_5
	this.instance_7 = new lib.anna_6();
	this.instance_7.setTransform(827,535,0.8163,0.9026);

	this.instance_8 = new lib.anna_1();
	this.instance_8.setTransform(906,535,1.1111,1.1111);

	this.instance_9 = new lib.anna_2();
	this.instance_9.setTransform(0,0,1.1111,1.1111);

	this.instance_10 = new lib.anna_3();
	this.instance_10.setTransform(947,554,1.1111,1.1111);

	this.instance_11 = new lib.anna_7();
	this.instance_11.setTransform(467,61,0.6887,0.7421);

	this.instance_12 = new lib.anna_4();
	this.instance_12.setTransform(1129,680,1.1111,1.1111);

	this.instance_13 = new lib.anna_5();
	this.instance_13.setTransform(706,782,1.1111,1.1111);

	this.instance_14 = new lib.anna_6();
	this.instance_14.setTransform(293,658,1.1111,1.1111);

	this.instance_15 = new lib.CachedBmp_9();
	this.instance_15.setTransform(-33.9,-11.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7,p:{scaleX:0.8163,scaleY:0.9026,x:827,y:535}}]}).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_12},{t:this.instance_7,p:{scaleX:0.3575,scaleY:0.4536,x:1721,y:929}},{t:this.instance_11,p:{scaleX:0.6887,scaleY:0.7421,x:467,y:61}}]},5).to({state:[{t:this.instance_13}]},5).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_7,p:{scaleX:0.7126,scaleY:0.7905,x:91,y:341}}]},5).to({state:[{t:this.instance_11,p:{scaleX:1.1111,scaleY:1.1111,x:1167,y:203}}]},5).wait(20));

	// Camada_8
	this.instance_16 = new lib.anna_6();
	this.instance_16.setTransform(791,375,0.7126,0.7905);

	this.instance_17 = new lib.anna_6();
	this.instance_17.setTransform(993,692,1.1111,1.1111);

	this.instance_18 = new lib.piupiu31_0();
	this.instance_18.setTransform(608,59,1.1111,1.1111);

	this.instance_19 = new lib.piupiu31_0();
	this.instance_19.setTransform(664,660,0.8927,0.807);

	this.instance_20 = new lib.piupiu31_0();
	this.instance_20.setTransform(77,-43,1.1111,1.1111);

	this.instance_21 = new lib.CachedBmp_10();
	this.instance_21.setTransform(666.25,22.1,0.5,0.5);

	this.instance_22 = new lib.piupiu31_1();
	this.instance_22.setTransform(0,0,1.1111,1.1111);

	this.instance_23 = new lib.piupiu31_2();
	this.instance_23.setTransform(0,0,1.1111,1.1111);

	this.instance_24 = new lib.piupiu31_3();
	this.instance_24.setTransform(0,0,1.1111,1.1111);

	this.instance_25 = new lib.piupiu31_4();
	this.instance_25.setTransform(0,0,1.1111,1.1111);

	this.instance_26 = new lib.piupiu31_5();
	this.instance_26.setTransform(-60,-136,1.1111,1.1111);

	this.instance_27 = new lib.piupiu31_6();
	this.instance_27.setTransform(0,0,1.1111,1.1111);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18,p:{x:608,y:59}},{t:this.instance_17},{t:this.instance_16}]}).to({state:[{t:this.instance_22}]},5).to({state:[{t:this.instance_23},{t:this.instance_18,p:{x:-144,y:496}}]},3).to({state:[{t:this.instance_24},{t:this.instance_18,p:{x:608,y:0}}]},5).to({state:[{t:this.instance_25}]},8).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_27}]},11).wait(9));

	// Camada_1
	this.instance_28 = new lib.anna_0();
	this.instance_28.setTransform(0,0,1.1111,1.1111);

	this.instance_29 = new lib._27();
	this.instance_29.setTransform(-649,-1209,1.1111,1.1111);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_29},{t:this.instance_28}]}).wait(46));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(417.5,-609,3360.1,2719.9);
// library properties:
lib.properties = {
	id: 'AA2811B1BD402B44A63381F7B599D827',
	width: 2133,
	height: 1200,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_10.png?1606946832306", id:"CachedBmp_10"},
		{src:"images/CachedBmp_7.png?1606946832306", id:"CachedBmp_7"},
		{src:"images/CachedBmp_9.png?1606946832306", id:"CachedBmp_9"},
		{src:"images/CachedBmp_5.png?1606946832306", id:"CachedBmp_5"},
		{src:"images/CachedBmp_6.png?1606946832306", id:"CachedBmp_6"},
		{src:"images/CachedBmp_4.png?1606946832306", id:"CachedBmp_4"},
		{src:"images/CachedBmp_3.png?1606946832306", id:"CachedBmp_3"},
		{src:"images/_27.jpg?1606946832306", id:"_27"},
		{src:"images/CachedBmp_8.png?1606946832306", id:"CachedBmp_8"},
		{src:"images/CachedBmp_2.png?1606946832306", id:"CachedBmp_2"},
		{src:"images/index_atlas_1.png?1606946831996", id:"index_atlas_1"},
		{src:"images/index_atlas_2.png?1606946831996", id:"index_atlas_2"},
		{src:"images/index_atlas_3.png?1606946831997", id:"index_atlas_3"},
		{src:"images/index_atlas_4.png?1606946831997", id:"index_atlas_4"},
		{src:"images/index_atlas_5.png?1606946831997", id:"index_atlas_5"},
		{src:"images/index_atlas_6.png?1606946831997", id:"index_atlas_6"},
		{src:"images/index_atlas_7.png?1606946831997", id:"index_atlas_7"},
		{src:"images/index_atlas_8.png?1606946831997", id:"index_atlas_8"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['AA2811B1BD402B44A63381F7B599D827'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;