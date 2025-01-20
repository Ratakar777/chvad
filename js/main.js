

var canvas;
var ctx;

var imageSize = 512;

var imgCount = 0;
var imgLoaded = 0;

var consoleOutput;
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---
var assets_bg = {id:'assets_bg',
			src:['img_01.png',
				'img_02.png',
				'img_04.png',
				'img_05.png',
				'img_06.png',
				'img_07.png',
				'img_08.png',
				'img_10.png',
				'img_11.png',
				'img_13.png',
				'img_14.png',
				'img_15.png',
				'img_16.png',
				'img_17.png',
				'img_b_01.png',
				'img_b_02.png',
				'img_b_03.png',
				'img_b_04.png',
				'img_b_05.png',
				'img_b_06.png',
				'img_b_07.png',
				'img_b_08.png',
				'img_b_10.png',
				'img_b_11.png']
			};
// ---
var assets_body = {id:'assets_body',
			src:['img_01.png',
				'img_02.png',
				'img_03.png',
				'img_04.png',
				'img_05.png',
				'img_06.png',
				'img_07.png',
				'img_08.png',
				'img_09.png',
				'img_10.png',
				'img_11.png',
				'img_12.png']
			};
// ---
var assets_face = {
			id:'assets_face',
			src:['img_01.png',
				'img_02.png',
				'img_03.png',
				'img_04.png',
				'img_05.png',
				'img_06.png',
				'img_07.png',
				'img_08.png',
				'img_09.png']
			};
// ---
var assets_head = {
			id:'assets_head',
			src:['img_00.png',
				'img_02.png',
				'img_03.png',
				'img_04.png',
				'img_05.png',
				'img_06.png',
				'img_08.png',
				'img_09.png',
				'img_10.png',
				'img_11.png',
				'img_12.png',
				'img_13.png',
				'img_14.png',
				'img_15.png',
				'img_16.png',
				'img_17.png']
			};
// ---
var assets_outfit = {
			id:'assets_outfit',
			src:['img_00.png',
				'img_01.png',
				'img_02.png',
				'img_03.png',
				'img_04.png',
				'img_05.png',
				'img_06.png',
				'img_07.png',
				'img_08.png',
				'img_09.png',
				'img_11.png',
				'img_12.png']
			};
// ---
var layers = [{id:'assets_bg', img:null, arr:assets_bg},
				{id:'assets_body', img:null, arr:assets_body},
				{id:'assets_face', img:null, arr:assets_face},
				{id:'assets_outfit', img:null, arr:assets_outfit},
				{id:'assets_head', img:null, arr:assets_head}
			];
// ---
var assets = [assets_bg, assets_body, assets_face, assets_head, assets_outfit];



// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

window.addEventListener("resize", handleEvent)
// ---
function handleEvent(event){
	positionElements();
};
// ---
function positionElements(){
	setSize()
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function setSize(){
	cw = window.innerWidth;
	w = cw * .9;
	// ---
	if(w > 512) w = 512;
	// ---
	document.getElementById('memecreator_container').style.width = w+4 + 'px';
	document.getElementById('mcGraphics').style.width = (w) + 'px';
	document.getElementById('mcGraphics').style.height = (w) + 'px';
	document.getElementById('mcGraphics_scroll').style.width = (w) + 'px';
	document.getElementById('mcGraphics_scroll').style.height = (w) + 'px';
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function setup(){
	
	consoleOutput = document.getElementById('textAreaConsole');
	consoleLog('START');	
	// ---
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');    
	// ---	
	positionElements();
	// ---
	for(var i = 0; i < assets.length; i++){
		loadImages(assets[i]);
	};
	// ---
	const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
	if(isMobileDevice){
		document.getElementById('btn_download').innerHTML = 'SHARE'
	};
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function loadImages(assets){
	// ---
	var id = assets.id;
	var arr = assets.src;
	// ---
	var container = document.getElementById(id);
	// ---
	for(var i = 0; i < arr.length; i++){

		imgCount ++;
		// ---
		var img = new Image();
		img.id = id
		// ---
		var src = 'PFP/' + imageSize + '/' + id.split('_')[1] + '/images/' + arr[i];
		img.src = src;
		// ---
		arr[i] = img
		// ---
		img.addEventListener("load", countLoaded, false); 
		img.addEventListener('click', addImage.bind(null, img, id), false);
		// ---
		container.appendChild(img);
	};
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function countLoaded(){
	imgLoaded ++;
	// --- 
	if(imgCount == imgLoaded){
		document.getElementById('loadingGif').style.display = 'none';
		document.getElementById('memecreator_container').style.display = 'block';
		// ---
		document.getElementById('mcGraphics').style.display = 'none';
		// ---
		autoAddLayers('start');
	};
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function addImage(img,  id){
	var item = layers.filter(function(a){ return a.id == id })[0]
	item.img = img;
	// ---
	if(item.id == 'assets_bg') document.getElementById('checkbox_transparent').checked = false;
	// ---
  	renderCanvas();	
  	// ---
	tabClick('close')
};	

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function autoAddLayers(task){
	document.getElementById('checkbox_transparent').checked = false;
	// ---
	tabClick('close')
	// ---
	for(var i = 0; i < layers.length; i++){
		var layer = layers[i];
		// ---
		if(task != 'random'){
			layer.img = layer.arr.src[0];
		}else{
			var rand = Math.floor( layer.arr.src.length * Math.random());
			layer.img = layer.arr.src[rand];
		};
	};
	// ---
	renderCanvas();

};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function renderCanvas(task){
	ctx.clearRect(0, 0, 512, 512);
	// ---
	for(var i = 0; i < layers.length; i++){
		var id = layers[i].id;
		var imgLayer = layers[i].img;
		// ---
		if(imgLayer){
			var w =  Number(imgLayer.naturalWidth);
			var h =  Number(imgLayer.naturalHeight);
			// ---
			var newH = 512;
			var newW = 512;
			var offsetX = 0;
			var offsetY = 0;
			var scale = 1;
			// ---		
			if(id == 'assets_bg'){
				if(w > h){
					scale = Math.abs(512/h);
					offsetX = -Math.floor(((w-h)*.5)*scale);
					offsetY = 0;
				}else{
					scale = Math.abs(512/w);
					offsetX = 0;
					offsetY = -Math.floor(((h-w)*.5)*scale);
				};			
				// ---
				newH = Math.floor(w*scale);
				newW = Math.floor(h*scale);
				// ---
				/*
				console.log('scale: ' + scale)
				console.log('w: ' + w)
				console.log('h: ' + h)
				console.log('newH: ' + newH)
				console.log('newW: ' + newW)
				console.log('offsetX: ' + offsetX)
				console.log('offsetY: ' + offsetY)
				console.log('------------------')
				*/
			};
			// ---
			if((id == 'assets_bg' && document.getElementById('checkbox_transparent').checked)){
				console.log('no background');
			}else{
				ctx.drawImage(imgLayer, 0, 0, w, h, offsetX, offsetY, newH, newW);	
			};		
		};
	};
	// ---
	console.log('---')
	
};



function renderCanvasDELETE(task){
	ctx.clearRect(0, 0, 512, 512);
	// ---
	for(var i = 0; i < layers.length; i++){
		var id = layers[i].id;
		var imgLayer = layers[i].img;
		// ---
		if(imgLayer){
			var w =  Number(imgLayer.width);
			var h =  Number(imgLayer.height);
			// ---
			var newW = 512;
			var newH = 512;
			var offsetX = 0;
			var offsetY = 0;
			// ---
			if(w > 512 || h > 512){
				if(w > h){
					// landscape
					newH = h
					newW = h
				}else{
					// portrait
					newH = w
					newW = w
				};
				// ---
				var offsetX = Math.floor((w-newW)*.5);
				var offsetY = Math.floor((h-newH)*.5);
			};
			// ---
			console.log(id)
			if((id == 'assets_bg' && document.getElementById('checkbox_transparent').checked)){
				console.log('no background');
			}else{
				ctx.drawImage(imgLayer, offsetX, offsetY, newW, newH, 0,0, 512, 512);	
			};		
		};
	};
	// ---
	console.log('---')
	
};


// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---
function addBackground(e){
	tabClick('close');
	// ---
	canvas.setBackgroundImage( e.src, function() {
		let img = canvas.backgroundImage;
		img.originX = 'left';
		img.originY = 'top';
		img.scaleX = canvas.getWidth() / img.width;
		img.scaleY = canvas.getHeight() / img.height;
		canvas.renderAll();
	});
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------


// UPLOAD IMAGE
function uploaderBackground(e){
	document.getElementById('checkbox_transparent').checked = false;
	// ---
	var img = new Image()
	// ---	
	var selectedFile = event.target.files[0];
	var reader = new FileReader();
	// ---
	reader.onload = function(event) {
		console.log('LOADED')
		img.src = event.target.result;
		// ---
		bgImageLoaded(img)
	};
	// ---
	reader.readAsDataURL(selectedFile);
};


// BG IMAGE
function bgImageLoaded(img){
	var newImg = new Image();
	newImg.src = img.src;
	// ---
	layers[0].img = newImg;
	// ---
	newImg.onload = function(){
		renderCanvas();	
		tabClick('close');
	};
};


// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------


function checkboxClicked(){
	var cb = document.getElementById('checkbox_transparent');
  	// ---
  	if(document.getElementById('checkbox_transparent').checked){
		
  	};
  	tabClick('close');
	// ---
  	renderCanvas();
};


// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------


function tabClick(tab){
	// ---
	var mcGraphics = document.getElementById('mcGraphics');
	document.getElementById('mcGraphics_scroll').scrollTop = 0;
	// ---
	var tabArray = [
		document.getElementById('mcTab_bg'),
		document.getElementById('mcTab_chwad'),
		document.getElementById('mcTab_style')
		]
	var graphicsArray = [
		document.getElementById('mcGraphics_bg'),
		document.getElementById('mcGraphics_chwad'),
		document.getElementById('mcGraphics_style')
		]
	// ---
	for(var i = 0; i < tabArray.length; i++){ 
		var clear = tabArray[i];
		clear.style.backgroundColor = '#f0f0f0'
	};
	// ---
	if(tab != 'close'){
		tab.style.backgroundColor = '#a386ff'
		mcGraphics.style.display = 'block'
		// ---
		for(var i = 0; i < graphicsArray.length; i++){
			var graphics = graphicsArray[i];
			// ---
			if(tab.id.split('_')[1] == graphics.id.split('_')[1]){
				graphics.style.display = 'block';
				if(tab.id.split('_')[1] == 'bg') document.getElementById("uploaderBackground").onchange = function(e){
					uploaderBackground(e);
				}
			}else{
				graphics.style.display = 'none';
			};
		};
	}else{
		mcGraphics.style.display = 'none';
	};
};

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function shareImg(e){
	var canvasX = document.getElementById('canvas')
	// ---
	canvasX.toBlob(
			blob => {
			  	const file = new File([blob], "CHWAD_PFP.png", { type: blob.type });
			  	// ---
			  	shareImg2(canvasX, file)
			},
			'image/png',
			0.9,
		);
};
// ---
function shareImg2(canvasX, file){
	const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
	var shareData = {
			title: "CHWAD Meme",
		    text: "Check out my $CHWAD PFP!",
		    files: [file],
			}
	// ---
	consoleLog('file = ' + file );
	consoleLog('isMobileDevice = ' + isMobileDevice);
	// ---
	if(isMobileDevice) {
		navigator.share(shareData);
	}else{
		var dataURL = canvasX.toDataURL("image/png");
	    var a = document.createElement('a');
	    a.href = dataURL
	    a.download = 'CHWAD_PFP.png';
	    a.click();
	};
};
// ---
function consoleLog(txt){
	console.log(txt)
	document.getElementById('consoleOutput').innerHTML += '<br> - ' + txt;
	
};

