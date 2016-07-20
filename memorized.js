$(document).ready(function(event){ 
    $("#idGen").click(generatePassword);
    $("#idPassword").change(changePassword);
    $("#idStart").click(startRun);
    $("#idStop").click(stopKeyPress);
}); 

function generatePassword(event){
    var s="";
    var locLen = $("#idLen").val();
    for(var i=0;i<locLen;i++){
        s+=Math.floor(Math.random()*10);
    }
    $("#idPassword").val(s);
}

function changePassword(event){
/*
    var s=("#idPassword").val();
    if(s.length > 0){
        ("#idPassword").removeClass("disabled");
    }else{
        ("#idPassword").addClass("disabled");
    }
*/
}

function stopKeyPress(event){
    stopRun();
}

function stopRun(){
    $(window).unbind("keypress");
    window._display.clear();
}

function nextKeyPress(event){
    // ESC не видит
//    console.log(event);
    // может быть нужно предварительно отключать KeyPress?

    if(event.charCode==event.data.text.charCodeAt(event.data.curr)){
        if(event.data.curr < (event.data.text.length - 1)){
            event.data.curr++;
        }else{
            event.data.curr=0;
            window._display.success();
        }
    }else{
        event.data.curr=0;
        window._display.fail();
    }
    window._display.selectAt(event.data.curr);
}

function initPassword(){
    var locReturn=undefined;
    var locText=$("#idPassword").val();
    if(locText.length > 0){
        locReturn={text:locText, curr: 0};
    }
    return locReturn;
}

function startRun(event){
    var locPassword=initPassword();
    if(locPassword){
        window._display = new CDisplay(locPassword.text, locPassword.curr);
        window._display.selectAt(0);
        $(window).keypress(locPassword, nextKeyPress);
    }
}

// ////////////////////////////////
function CDisplay(AText,ACurr){
    this.cntSucc=0;
    this.cntFail=0;
    this.text = AText;
    this.curr = ACurr;
    this.setDigitDisplay();
    this.setKeypadDisplay();
}

CDisplay.prototype.setDigitDisplay = function (){
    this.digitalDisplay = $("#idDigitsDisplay");
    this.digitalDisplay.empty();
    for(var i=0;i<this.text.length;i++){
        var name=$("<span />").attr({id:"idDg"+i}).addClass("digit-disp").addClass("text-center").text(this.text[i]);
        this.digitalDisplay.append(name);
    }
}

CDisplay.prototype.setKeypadDisplay = function (){
    $(".digit-keypad-select").removeClass("digit-keypad-select");
}

CDisplay.prototype.clear=function (){
    $("#idSuccCount").text(this.cntSucc=0);
    $("#idFailCount").text(this.cntFail=0);
    this.digitalDisplay.empty();
    this.setKeypadDisplay();
}

CDisplay.prototype.selectAt=function (AI){
    $("#idDg"+this.curr).removeClass("digit-disp-select");
    $("#idKp"+this.text.charAt(this.curr)).removeClass("digit-keypad-select");
    this.curr = AI;
    $("#idDg"+this.curr).addClass("digit-disp-select");
    $("#idKp"+this.text.charAt(this.curr)).addClass("digit-keypad-select");
}

CDisplay.prototype.success = function (){
    $("#idKeyPadDisplay").addClass("digit-disp-success");
    $("#idSuccCount").text(++this.cntSucc);
    setTimeout(function (){$(".digit-disp-success").removeClass("digit-disp-success");},500);
}

CDisplay.prototype.fail = function (){
    $("#idKeyPadDisplay").addClass("digit-disp-fail");
    $("#idFailCount").text(++this.cntFail);
    setTimeout(function (){$(".digit-disp-fail").removeClass("digit-disp-fail");},500);
}
