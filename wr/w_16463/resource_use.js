var movieWidth;
var movieHeight;
var lcap;
window.quizscope = 0;
var width
var height
var m_movieProps
var filename

var listboxPanelDiv

var isDevice;
var parentDeviceMotion;
var parentOrientation;
var lastOrientation;

var isResponsiveProject = false;
var mainCPNamespace;
var evtHandle;
var longestWidthScaled = 132;
var paddingScaled = 2;

var myWidgetiFrame,listboxInteraction
var	defFontFamily,defFontStyle,defFontSize,setTextColor,setUpStateColor,setOverStateColor,setDownStateColor,setSelectedStateColor,setTextThemeColor,setUpStateThemeColor,setOverStateThemeColor,setDownStateThemeColor,setSelectedStateThemeColor,defBoldState,defItalicState,defUnderlineState,useThemeColors,selectedItemNum,variableTxt
var listTextColor,listUpStateColor,listOverStateColor,listDownStateColor,listSelectedStateColor
var listArray,selectedItemText

isDevice = {
	Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	IOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
		return (isDevice.Android() || isDevice.BlackBerry() || isDevice.IOS() || isDevice.Windows());
	}
};

resourceUse = {
	onLoad: function() {

		if (!this.captivate) return;
		lcap = this.captivate;

		handle = this.captivate.CPMovieHandle;
		//if (handle.isWidgetVisible() == true) {

			var lInteractiveWidgetHandle = this.captivate.CPMovieHandle.getInteractiveWidgetHandle();
			if (lInteractiveWidgetHandle) {
				if (lInteractiveWidgetHandle.shouldDisable()) this.disable();
			}

			this.movieProps = this.captivate.CPMovieHandle.getMovieProps();
			if (!this.movieProps) return;
			m_movieProps = this.movieProps;
			this.varHandle = this.movieProps.variablesHandle;
			m_VariableHandle = this.varHandle;
			//this.eventDisp = this.movieProps.eventDispatcher;
			evtHandle = this.movieProps.eventDispatcher;
			mainCPNamespace = this.movieProps.getCpHandle();
			isResponsiveProject = mainCPNamespace.responsive;
			this.xmlStr = this.captivate.CPMovieHandle.widgetParams();
			var size = this.OpenAjax.getSize();
			width = size.width;
			height = size.height;
			this.externalImage = '';
			this.description = '';

			movieWidth = parseInt(size.width.split("px")[0]);
			movieHeight = parseInt(size.height.split("px")[0]);
			
			//Captivate Event listener
			evtHandle.addEventListener(mainCPNamespace.WINDOWRESIZECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );
			evtHandle.addEventListener(mainCPNamespace.ORIENTATIONCHANGECOMPLETEDEVENT,updateSizeNPositionOnResizeComplete, false );

			this.updateData();
			this.doUpdate();

			//if (parent.cpInQuizScope == true) {
				//id = setInterval(checkval, 100)
				//window.quizscope = 1
			//} else {
			//}
			//console.log(parent.cpInQuizScope)
		//}
	},

	//Handle Click, if Clicked Outside Widget ( will be called from captivate internally)
	onClickExternal: function(e) {
		var lMsg = 'On Click Received in Widget';
		if (e) {
			lMsg += "x=" + e.pageX + "y=" + e.pageY;
		}
		if (!this.captivate) return;
		//Call set Failure
		var lInteractiveWidgetHandle = this.captivate.CPMovieHandle.getInteractiveWidgetHandle();
	},
	updateData: function() {
		var allWidgets = window.parent.document.getElementsByClassName("cp-widget");
		var myFrameName = window.name;
		myWidgetiFrame = window.parent.document.getElementById(window.name);
		listboxPanelDiv = document.getElementById("listboxPanel");
		
		if (myWidgetiFrame) {
			myWidgetiFrame.style.height = movieHeight + "px";
			myWidgetiFrame.style.width = movieWidth + "px";
		}
		var id = 0;
		var result = jQuery.parseXML(this.xmlStr);
		var resultDoc = jQuery(result);
		var strProp = resultDoc.find('string').text();

		//BREAKING UP THE XML FROM CAPTIVATE
		//Game Variable
		var defFontFamilyVar = resultDoc.find('#defFontFamily');
        if (defFontFamilyVar){
            if (defFontFamilyVar.find('string')){
                defFontFamily = defFontFamilyVar.find('string').text()
            }
        }
		
		var defFontStyleVar = resultDoc.find('#defFontStyle');
        if (defFontStyleVar){
            if (defFontStyleVar.find('string')){
                defFontStyle = defFontStyleVar.find('string').text();
            }
        }
		
		var defFontSizeVar = resultDoc.find('#defFontSize');
		if (defFontSizeVar) {
			if (defFontSizeVar.find('string')) {
				defFontSize = defFontSizeVar.find('string').text();
			}
		}
		
		//Get Color
		var setTextColorHex = resultDoc.find('#setTextColorHex');
		if (setTextColorHex) {
			if (setTextColorHex.find('string')) {
				setTextColor = '#' + setTextColorHex.find('string').text();
			}
		}
		
		var setUpStateColorHex = resultDoc.find('#setUpStateColorHex');
		if (setUpStateColorHex) {
			if (setUpStateColorHex.find('string')) {
				setUpStateColor = '#' + setUpStateColorHex.find('string').text();
			}
		}
		
		
		var setOverStateColorHex = resultDoc.find('#setOverStateColorHex');
		if (setOverStateColorHex) {
			if (setOverStateColorHex.find('string')) {
				setOverStateColor = '#' + setOverStateColorHex.find('string').text();
			}
		}
		
		
		var setDownStateColorHex = resultDoc.find('#setDownStateColorHex');
		if (setDownStateColorHex) {
			if (setDownStateColorHex.find('string')) {
				setDownStateColor = '#' + setDownStateColorHex.find('string').text();
			}
		}
		
		var setSelectedStateColorHex = resultDoc.find('#setSelectedStateColorHex');
		if (setSelectedStateColorHex) {
			if (setSelectedStateColorHex.find('string')) {
				setSelectedStateColor = '#' + setSelectedStateColorHex.find('string').text();
			}
		}
		
		//Theme Colors
		var setTextThemeColorHex = resultDoc.find('#setTextThemeColorHex');
		if (setTextThemeColorHex) {
			if (setTextThemeColorHex.find('string')) {
				setTextThemeColor = '#' + setTextThemeColorHex.find('string').text();
			}
		}
		
		var setUpStateThemeColorHex = resultDoc.find('#setUpStateThemeColorHex');
		if (setUpStateThemeColorHex) {
			if (setUpStateThemeColorHex.find('string')) {
				setUpStateThemeColor = '#' + setUpStateThemeColorHex.find('string').text();
			}
		}
		
		var setOverStateThemeColorHex = resultDoc.find('#setOverStateThemeColorHex');
		if (setOverStateThemeColorHex) {
			if (setOverStateThemeColorHex.find('string')) {
				setOverStateThemeColor = '#' + setOverStateThemeColorHex.find('string').text();
			}
		}
		
		var setDownStateThemeColorHex = resultDoc.find('#setDownStateThemeColorHex');
		if (setDownStateThemeColorHex) {
			if (setDownStateThemeColorHex.find('string')) {
				setDownStateThemeColor = '#' + setDownStateThemeColorHex.find('string').text();
			}
		}
		
		var setSelectedStateThemeColorHex = resultDoc.find('#setSelectedStateThemeColorHex');
		if (setSelectedStateThemeColorHex) {
			if (setSelectedStateThemeColorHex.find('string')) {
				setSelectedStateThemeColor = '#' + setSelectedStateThemeColorHex.find('string').text();
			}
		}
		
		//Text props
		var defBoldStateVar = resultDoc.find('#defBoldState');
        if (defBoldStateVar){
            if (defBoldStateVar.find('string')){
                defBoldState = defBoldStateVar.find('string').text()
            }
        }
		
		var defItalicStateVar = resultDoc.find('#defItalicState');
        if (defItalicStateVar){
            if (defItalicStateVar.find('string')){
                defItalicState = defItalicStateVar.find('string').text()
            }
        }
		
		var defUnderlineStateVar = resultDoc.find('#defUnderlineState');
        if (defUnderlineStateVar){
            if (defUnderlineStateVar.find('string')){
                defUnderlineState = defUnderlineStateVar.find('string').text()
            }
        }
		
		var useThemeColorsVar = resultDoc.find('#useThemeColors');
        if (useThemeColorsVar){
            if (useThemeColorsVar.find('string')){
                useThemeColors = useThemeColorsVar.find('string').text()
            }
        }
		
		/*var selectedItemNumVar = resultDoc.find('#selectedItemNum');
        if (selectedItemNumVar){
            if (selectedItemNumVar.find('number')){
                selectedItemNum = selectedItemNumVar.find('number').text()
            }
        }*/
		selectedItemNum = -1;
		
		var variableTxtVar = resultDoc.find('#variableTxt');
        if (variableTxtVar){
            if (variableTxtVar.find('string')){
                variableTxt = variableTxtVar.find('string').text()
            }
        }
		
		if(useThemeColors == "true"){
			listTextColor = setTextThemeColor;
			listUpStateColor = setUpStateThemeColor;
			listOverStateColor = setOverStateThemeColor;
			listDownStateColor = setDownStateThemeColor;
			listSelectedStateColor = setSelectedStateThemeColor;
		}else{
			listTextColor = setTextColor;
			listUpStateColor = setUpStateColor;
			listOverStateColor = setOverStateColor;
			listDownStateColor = setDownStateColor;
			listSelectedStateColor = setSelectedStateColor;
		}
		
		var finallistArray = resultDoc.find('#listArray');
		var totalListItems = finallistArray.children().children().children().length;
		
		listArray = new Array();
		for (i=0; i<totalListItems; i++) {
			var listItems = $(finallistArray.find('array').children()[i])
			listArray.push(listItems.find('string').text());
		}
		
	},
	doUpdate: function() {
		resizeInteraction(width, height);
	},

};
resource_use = function() {
	//Check if the browser is Safari on Mac only to toggle the YES NO Button Positions
	//SystemIsMac = ( navigator.platform.match(/(iPad|iPhone|Mac)/g) ? true : false );
	return resourceUse;
}

function updateSizeNPositionOnResizeComplete(){
	resizeInteraction(width,height);
}

var scaleW, scaleH;
function resizeInteraction(thewidth, theheight) {
	var scale = 0;
	thewidth = String(thewidth).replace("px","");
	theheight = String(theheight).replace("px","");
	//if(thewidth<320){
		//thewidth = 320
	//}
	//if(theheight<350){
		//theheight = 350
	//}
	
	/**********************/
	//Modification made for Presenter same logic holds good for Captivate
	//iframe width and Height
	scaleW = thewidth / (145);
	scaleH = theheight/ (223);
	
	myWidgetiFrame.style.width = parseInt(parseInt(145*scaleW))+"px"
	myWidgetiFrame.style.height = parseInt(parseInt(223*scaleH))+"px"
	
	listboxPanelDiv.style.width = parseInt(parseInt(140*scaleW))+"px"
	listboxPanelDiv.style.height = parseInt(parseInt(216*scaleH))+"px";
	
	longestWidthScaled = 132*scaleW;
	paddingScaled = 2*scaleW;
	
	if(listArray!=undefined){
		if(listArray.length>=1){
			createlistbox();
		}
	}
	setItemFromVariable();	
}

function createlistbox(){
	listboxPanelDiv.innerHTML = "";
	for (var i = 0; i < listArray.length; i++) {
		var listMc = createDiv(i,listArray[i])
		listboxPanelDiv.appendChild(listMc);
		$(listMc).mouseover(function(e) {
			e.target.style.cursor = "pointer";
			if($(e.target.parentNode).attr('id') == "listboxPanel"){
				e.target.style.backgroundColor = listOverStateColor
			}else{
				e.target.parentNode.style.backgroundColor = listOverStateColor
			}
		});
		$(listMc).mouseout(function(e) {
			e.target.style.cursor = "pointer";
			if($(e.target.parentNode).attr('id') == "listboxPanel"){
				if(selectedItemNum == $(e.target).attr('id')){
					e.target.style.backgroundColor = listSelectedStateColor
				}else{
					e.target.style.backgroundColor = listUpStateColor
				}
			}else{
				if(selectedItemNum == $(e.target).attr('id')){
					e.target.parentNode.style.backgroundColor = listSelectedStateColor
				}else{
					e.target.parentNode.style.backgroundColor = listUpStateColor
				}
			}
			
		});
		$(listMc).mousedown(function(e) {
			e.target.style.cursor = "pointer";
			if($(e.target.parentNode).attr('id') == "listboxPanel"){
				e.target.style.backgroundColor = listDownStateColor
			}else{
				e.target.parentNode.style.backgroundColor = listDownStateColor
			}
		});
		$(listMc).click(function(e) {
			e.target.style.cursor = "pointer";
			if($(e.target.parentNode).attr('id') == "listboxPanel"){
				selectedItemNum = $(e.target).attr('id');
				selectedItemText = $(e.target).text();
			}else{
				selectedItemNum = $(e.target.parentNode).attr('id');
				selectedItemText = $(e.target.parentNode).text();
			}
			setSelectedItemState();
			updateVariable();
		});
	}
	resizeLables();
}

function resizeLables() {
	var longestWidth = longestWidthScaled;
	var setPadding = paddingScaled;
	var i;
	var j;
	if (listArray.length > 0) {
		for (i = 0; i < listArray.length; i++) {
			var curmcs = document.getElementById(i);
			if (i >= 1) {
				var prevmcs = document.getElementById(i-1);
				if (prevmcs.getElementsByTagName("div")[0].offsetWidth > longestWidth) {
					longestWidth = prevmcs.getElementsByTagName("div")[0].offsetWidth
				}else{
					if(curmcs.getElementsByTagName("div")[0].offsetWidth > longestWidth){
						longestWidth = curmcs.getElementsByTagName("div")[0].offsetWidth
					}
				}
			}else{
				if(curmcs.getElementsByTagName("div")[0].offsetWidth > longestWidth){
					longestWidth = curmcs.getElementsByTagName("div")[0].offsetWidth
				}
			}
		}
		for (j = 0; j < listArray.length; j++) {
			var modmcs = document.getElementById(j);
			modmcs.style.width =  longestWidth+"px";
			modmcs.style.padding = setPadding+"px";
		}
	}
}

function createDiv(varInt, varLabel){
	var newdiv = document.createElement('div');
	newdiv.id = varInt;
	newdiv.class = "listMcClass";
	newdiv.style.position = "relative"
	newdiv.style.width = longestWidthScaled+"px"
	newdiv.style.height = "20px"
	newdiv.style.backgroundColor = listUpStateColor
	newdiv.style.border = "1px Solid";
	newdiv.style.borderColor = "#999999";
	newdiv.style.fontFamily = defFontFamily
	newdiv.style.fontSize = defFontSize+"px"
	newdiv.style.color = listTextColor;
	newdiv.style.padding = "2px"
	var contentdiv = document.createElement('div');
	contentdiv.id = "content"+varInt;
	contentdiv.class = "contentClass"
	contentdiv.innerHTML = contentdiv.innerHTML + varLabel;
	contentdiv.contentEditable = false;
	contentdiv.style["white-space"] = "nowrap";
	contentdiv.style.display = "inline-block"
	newdiv.appendChild(contentdiv);
	return newdiv;
}

function setSelectedItemState() {
	for (var i = 0; i < listArray.length; i++) {
		var mcsAll = document.getElementById(i);
		mcsAll.style.backgroundColor = listUpStateColor;
	}
	var mcs = document.getElementById(selectedItemNum)
	mcs.style.backgroundColor = listSelectedStateColor;
}

$(window.parent.document).mousedown(function() {
	//listboxRoot.runTime_mc.listboxPanel.visible = false;
	//listboxPanelDiv.style.visibility = "hidden"
	//listOpened = false;
});

$(window.parent.document).on("touchstart", function(ev) {
    //listboxRoot.runTime_mc.listboxPanel.visible = false;
	//listboxPanelDiv.style.visibility = "hidden"
	//listOpened = false;
});

function handleMouseOver(evt) {
	listboxCanvas.style.cursor = "pointer";
}

function handleMouseOut(evt) {
	listboxCanvas.style.cursor = "default";
}

function updateVariable(){
	if (m_VariableHandle != null) {
		m_VariableHandle[variableTxt] = selectedItemText;
	}
}

function setItemFromVariable(){
	if (m_VariableHandle != null) {
		if (m_VariableHandle[variableTxt] != null || m_VariableHandle[variableTxt] !="") {
			selectedItemText = m_VariableHandle[variableTxt];
			setSelectedItemStateFromVariable();
		}else{
			return;
		}
	}else{
		return;
	}
}

function setSelectedItemStateFromVariable(){
	for (var i = 0; i < listArray.length; i++) {
		var mcsAll = document.getElementById(i);
		if($(mcsAll).text() == selectedItemText){
			selectedItemNum = $(mcsAll).attr('id');
			break;
		};
	}
	setSelectedItemState();
}