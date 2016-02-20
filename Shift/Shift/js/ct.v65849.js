if((!this["console"])||(!console["firebug"])){
this.console={};
}
$A(["assert","count","debug","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn"]).each(function(_1){
if(!console[_1]){
console[_1]=function(){
};
}
});
var ct={console:console,cookies:{create:function(_2,_3,_4){
var _5;
if(_4){
var _6=new Date();
_6.setTime(_6.getTime()+(_4*24*60*60*1000));
_5="; expires="+_6.toGMTString();
}else{
_5="";
}
document.cookie=_2+"="+_3+_5+"; path=/";
},read:function(_7){
var _8=_7+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_8)===0){
return c.substring(_8.length,c.length);
}
}
return null;
},erase:function(_c){
ct.cookies.create(_c,"",-1);
}},dates:{isValidDateString:function(_d){
var _e=/[0-9]+\/[0-9]+\/([0-9][0-9][0-9][0-9])+/;
return (_e.test(_d));
},fromString:function(_f){
var _10=_f;
var day=_10.substring(0,_10.indexOf("/"));
var _12=_10.substring(_10.indexOf("/")+1,_10.indexOf("/",_10.indexOf("/")+1));
var _13=_10.substring(_10.indexOf("/",_10.indexOf("/")+1)+1,_10.length);
if(_13.length==2){
_13="20"+_13;
}
var _14=new Date();
_14.setFullYear(parseInt(_13,10),parseInt(_12,10)-1,parseInt(day,10));
_14.setHours(0,0,0,0);
return _14;
},toString:function(_15,_16){
if(!_16){
return _15.getDate()+"/"+(_15.getMonth()+1)+"/"+_15.getFullYear();
}else{
return _15.getFullYear()+""+((_15.getMonth()+1<10)?"0"+(_15.getMonth()+1):(_15.getMonth()+1))+((_15.getDate()<10)?("0"+_15.getDate()):_15.getDate());
}
},isPast:function(_17,_18){
if(!_18){
return (ct.dates.compare(_17,new Date())===1);
}
return (ct.dates.compare(_17,_18)===1);
},compare:function(_19,_1a){
if(_19.getYear()<_1a.getYear()){
return 1;
}else{
if((_19.getYear()==_1a.getYear())&&(_19.getMonth()<_1a.getMonth())){
return 1;
}else{
if((_19.getYear()==_1a.getYear())&&(_19.getMonth()==_1a.getMonth())&&(_19.getDate()<_1a.getDate())){
return 1;
}else{
if(_19.getDate()==_1a.getDate()&&_19.getMonth()==_1a.getMonth()&&_19.getYear()==_1a.getYear()){
return 0;
}else{
return -1;
}
}
}
}
},monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],getTimestamp:function(){
var _1b=new Date();
var ts=""+_1b.getHours()+_1b.getMinutes()+_1b.getSeconds()+_1b.getMilliseconds();
return ts;
},setMonth:function(_1d,_1e){
var _1f=_1d.getMonth();
_1d.setMonth(_1e);
_1e%=12;
var _20=_1d.getMonth();
if(_20===_1e){
return _1d;
}else{
_1d.setDate(0);
return _1d;
}
},fromApacheDirective:function(_21){
var _22=_21.split(" ")[1].split("-");
var _23=$A([]);
$A(ct.dates.monthNames).each(function(_24){
_24=_24.substr(0,3);
_23.push(_24);
});
return new Date(_22[2],$A(_23).indexOf(_22[1]),_22[0]);
}},isDebug:(window.location.hash.toLowerCase()==="#debug"),validator:{_attachedFields:$A([]),attachValidation:function(_25,_26,_27){
ct.validator._attachedFields.push({field:$(_25),errorMessage:_26,condition:_27});
},_initializeForms:function(){
var _28=$A(document.getElementsByTagName("form"));
_28.each(function(_29){
$(_29).observe("submit",ct.validator._validateForm);
_29.ct_validationFailed=true;
});
ct.validator.parseDomTree();
},classNames:{required:"required",number:"number",password:"password",email:"email",creditCardNumber:"creditCardNumber",cvvCodeCredit:"cvvCodeCredit",cvvCodeDebit:"cvvCodeDebit",calendarControl:"datePicker"},validationConditions:{requiredFieldCondition:function(_2a){
if(_2a.readAttribute("selfLabel")!==null){
return ($F(_2a)!==_2a.labelText);
}else{
return ($F(_2a).length!==0);
}
},spaceCondition:function(_2b){
var _2c=/^\s/;
var _2d=_2c.test($F(_2b));
return _2d?false:true;
},validateNumber:function(_2e){
if($F(_2e)!==""){
if($(_2e).readAttribute("selfLabel")===$F(_2e)){
return true;
}
return ($F(_2e)>0);
}else{
return true;
}
},emailCondition:function(_2f){
if($F(_2f)!==""){
if($F(_2f)===""){
return false;
}
var _30=_2f.value;
var _31=_30.indexOf("@");
var _32=_30.lastIndexOf(".");
var _33=_30.indexOf(" ");
if(_31<0||_32<0||_33!=-1){
return false;
}
var _34=/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
var _35=_34.test(_30);
return _35?true:false;
}else{
return true;
}
},requiredDropdownCondition:function(_36){
return (_36.selectedIndex!==0&&_36.selectedIndex!==-1);
},validCreditCardCondition:function(_37){
var _38=$F(_37),_39;
if(_38!==""){
var _3a=_38;
_3a=_38.replace(/-/g,"");
_3a=_38.replace(/ /g,"");
_38=_3a.valueOf();
if(_38===null||_38.length<13||_38.search(/[a-zA-Z]+/)!=-1){
return false;
}
var _3b=_38.split("");
_3b.reverse();
var _3c=0;
var tmp=0;
for(var i=0;i<_3b.length;i++){
if((i%2)>0){
tmp=_3b[i]*2;
tmp=(tmp<9?tmp:(tmp-9));
_3c+=tmp;
}else{
_3c+=Number(_3b[i]);
}
}
_39=((_3c%10)===0);
if(_39&&_37.readAttribute("cardtypefieldname")){
var _3f={1:{identifier:[4],length:[13,16]},2:{identifier:[51,52,53,54,55],length:[16]},3:{identifier:[34,37],length:[15]},4:{identifier:[300,301,302,303,304,305,36,38],length:[14]}};
var _40=ct.dom.getParentByTagName(_37,"form")[_37.readAttribute("cardtypefieldname")];
var _41;
$A(_40).each(function(_42){
if(_42.checked){
_41=_42;
}
});
var _43=_3f[_41.value];
if(_43.length.indexOf(_38.length)===-1){
_39=false;
}else{
var _44=false;
for(i=0;i<_43.identifier.length;i++){
if(_38.substr(0,(_43.identifier[i]+"").length)==_43.identifier[i]){
_44=true;
break;
}
}
_39=_44;
}
}
}else{
_39=true;
}
return _39;
},validateMobilePhoneNumberCondition:function(_45){
if($F(_45)!==""){
if(_45.readAttribute("selfLabel")===$F(_45)){
return true;
}else{
if(ct.stringFormatting.stripAlphaChars($F(_45)).length<10){
return false;
}else{
var _46=/[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9]/;
var _47=_46.test($F(_45));
return (_47)?true:false;
}
}
}else{
return true;
}
},validateLandLanePhoneNumberCondition:function(_48){
if($F(_48)!==""){
if(_48.readAttribute("selfLabel")===$F(_48)){
return true;
}else{
var _49=/[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9](.)*[0-9]/;
var _4a=_49.test($F(_48));
return (_4a)?true:false;
}
}else{
return true;
}
},validateCvvCodeForCreditCard:function(_4b,_4c){
var _4d;
$A(document.getElementsByName(_4c)).each(function(_4e){
if(_4e.checked){
_4d=$F(_4e);
}
});
if($F(_4b)===""){
return true;
}
var re=null;
if(_4d!=="0"){
if(_4d=="3"){
re=/^\d{4}$/;
}else{
re=/^\d{3}$/;
}
return re.test($F(_4b));
}
return true;
},validateCvvCodeForDebitCard:function(_50){
if($F(_50)===""){
return true;
}
re=/^\d{3}$/;
return re.test($F(_50));
},validateDate:function(_51){
if($F(_51)!==""){
if(_51.readAttribute("selfLabel")===$F(_51)){
return true;
}else{
return (ct.dates.isValidDateString($F(_51)));
}
}else{
return true;
}
},validateMinDate:function(_52,_53){
if($F(_52)===""||_52.readAttribute("selfLabel")===$F(_52)){
return true;
}else{
if(!_53){
_53=_52.readAttribute("mindate");
}
if(_53){
var _54=ct.dates.fromString(_53);
if(_52.readAttribute("offsetdays")){
_54.setDate(_54.getDate()+parseInt(_52.readAttribute("offsetdays"),10));
}
var _55=ct.dates.compare(ct.dates.fromString($F(_52)),_54);
return (_55===0)||(_55===-1);
}else{
return true;
}
}
},validateMaxDate:function(_56){
if($F(_56)===""||_56.readAttribute("selfLabel")===$F(_56)){
return true;
}else{
if(_56.readAttribute("maxdate")){
var _57=ct.dates.fromString(_56.readAttribute("maxdate"));
var _58=ct.dates.compare(ct.dates.fromString($F(_56)),_57);
return (_58===0)||(_58===1);
}else{
return true;
}
}
}},parseDomTree:function(_59){
_59=$(_59?_59:document.body);
if(document.location.protocol==="https:"){
$(document.body).select("a.forceHttp").each(function(_5a){
_5a.href=_5a.href.replace("https","http");
});
$(document.body).select("form.forceHttp").each(function(_5b){
_5b.action=_5b.action.replace("https","http");
});
}
if($("offers_1")){
var _5c=document.location.host.split(".");
if(_5c[1]==="cleartripforbusiness"){
$("offers_1").select("a").each(function(_5d){
_5d.href=_5d.href.replace(/.*\.cleartripforbusiness/,"http://www.cleartrip");
_5d.href=_5d.href+"?host="+document.location.host;
_5d.target="_blank";
});
}
}
var _5e=$A($(_59).getElementsByTagName("input"));
_5e.each(function(_5f){
var _60=ct.validator.attachValidation;
var _61=ct.validator.validationConditions;
var _62=ct.validator.classNames;
_5f=$(_5f);
if(((_5f.type.toLowerCase()==="text")||_5f.type.toLowerCase()==="password")&&_5f.hasClassName(_62.required)){
_60(_5f,_5f.title+" is a required field.",_61.requiredFieldCondition);
}
if(((_5f.type.toLowerCase()==="text")||_5f.type.toLowerCase()==="password")&&_5f.hasClassName(_62.required)){
_60(_5f,_5f.title+" cannot start with a space.",_61.spaceCondition);
}
if(((_5f.type.toLowerCase()==="text")||_5f.type.toLowerCase()==="password")&&_5f.hasClassName(_62.number)){
_60(_5f,_5f.title+" is not a valid number.",_61.validateNumber);
}
if(_5f.type.toLowerCase()==="password"&&_5f.hasClassName(_62.required)&&_5f.hasClassName(_62.password)){
_60(_5f,_5f.title+" should be at least 6 characters long. If you have forgotten your password you can follow the link below the field.",function(_63){
if($F(_63)===""){
return true;
}
return ($F(_63).length>=6);
});
}
if(_5f.hasClassName(_62.cvvCodeCredit)){
if(!_5f.readAttribute("cardtypefieldname")&&!$(_5f.readAttribute("cardtypefieldname"))){
throw new Error("cardtypefieldname attribute not specified for the cvv field. Could not attach validation.");
}else{
_5f.setAttribute("autocomplete","off");
_60(_5f,"The CVV code entered is not valid",function(_64){
return _61.validateCvvCodeForCreditCard(_64,_64.readAttribute("cardtypefieldname"));
});
}
}
if(_5f.type.toLowerCase()==="password"&&_5f.hasClassName(_62.cvvCodeDebit)){
_5f.setAttribute("autocomplete","off");
_60(_5f,"The CVV code entered is not valid",_61.validateCvvCodeForDebitCard);
}
if(_5f.type.toLowerCase()==="text"&&_5f.hasClassName(_62.email)){
_60(_5f,_5f.title+" should be a valid email address.",_61.emailCondition);
}
if(_5f.type.toLowerCase()==="text"&&_5f.hasClassName(_62.creditCardNumber)){
_5f.setAttribute("autocomplete","off");
_60(_5f,_5f.title+" is not valid.",_61.validCreditCardCondition);
}
if(_5f.type.toLowerCase()==="text"&&_5f.hasClassName(_62.calendarControl)){
_60(_5f,"Please enter a valid "+_5f.title.toLowerCase()+" (dd/mm/yyyy)",_61.validateDate);
if(_5f.readAttribute("mindate")){
_60(_5f,"Please choose "+_5f.title.toLowerCase()+" on or after "+_5f.readAttribute("mindate")+" (dd/mm/yyyy).",_61.validateMinDate);
}else{
if(_5f.readAttribute("mindatefieldid")){
var _65="Please choose a "+_5f.title.toLowerCase();
var _66=_5f.readAttribute("offsetDays");
if(_66){
if(_66==1){
_65+=" at least a day";
}else{
_65+=" at least "+_66+" days";
}
}
_65+=" after the "+$(_5f.readAttribute("mindatefieldid")).title.toLowerCase()+" (dd/mm/yyyy).";
_60(_5f,_65,function(_67){
return _61.validateMinDate(_67,$(_5f.readAttribute("mindatefieldid")).value);
});
}
}
if(_5f.readAttribute("maxdate")){
_60(_5f,"Please choose "+_5f.title.toLowerCase()+" on or before "+_5f.readAttribute("maxdate")+" (dd/mm/yyyy).",_61.validateMaxDate);
}
}
if((_5f.type.toLowerCase()==="file")&&_5f.hasClassName(_62.required)){
_60(_5f,_5f.title+" is a required field.",_61.requiredFieldCondition);
}
});
var _68=$A(_59.getElementsByTagName("select"));
_68.each(function(_69){
_69=$(_69);
if(_69.hasClassName(ct.validator.classNames.required)){
ct.validator.attachValidation(_69,_69.title+" is a required field.",ct.validator.validationConditions.requiredDropdownCondition);
}
});
var _6a=$A(_59.getElementsByTagName("textarea"));
_6a.each(function(_6b){
_6b=$(_6b);
if(_6b.hasClassName(ct.validator.classNames.required)){
ct.validator.attachValidation(_6b,_6b.title+" is a required field.",ct.validator.validationConditions.requiredFieldCondition);
}
if((_6b.type.toLowerCase()==="textarea")&&_6b.hasClassName(ct.validator.classNames.required)){
ct.validator.attachValidation(_6b,_6b.title+" cannot start with a space.",ct.validator.validationConditions.spaceCondition);
}
});
},_validateForm:function(_6c){
var _6d=[],val=ct.validator;
var _6f=$((this.nodeName.toLowerCase()==="form")?this:ct.dom.getParentByTagName(this,"form"));
$A(document.forms).each(function(_70){
Form.getElements(_70).each(ct.validator._hideErrorArrow);
});
_6f.ct_validationFailed=false;
var _71=_6f.getElements();
ct.validator.errors=null;
if($("autocompleteOptionsContainer")){
_6c.stop();
return;
}
_71.each(function(_72){
val._hideErrorArrow(_72);
val._attachedFields.each(function(_73){
if(_73.field===_72){
if(_73.field.disabled===true){
return;
}
if(!_73.condition(_73.field)){
_6d.push({field:_72,message:_73.errorMessage});
_6f.ct_validationFailed=true;
val._showErrorArrow(_72);
val.errors=_6d;
}
}
});
});
if(_6f.ct_validationFailed){
_6c.stop();
_6f.errors=_6d;
val._showFormErrors(_6f);
}else{
_6f.errors=null;
val._hideFormErrors(_6f);
if(_6f.readAttribute("defaultValidationSubmit")&&_6f.readAttribute("defaultValidationSubmit")=="true"){
$(_6f).select(".selflabel").each(function(ele){
if(ele.value){
if(ele.value==ele.readAttribute("selflabel")){
ele.value="";
}
}
});
}
}
},_showFormErrors:function(_75){
if(_75.readAttribute("errorblockid")&&$(_75.readAttribute("errorblockid"))){
var ol=$(_75.getAttribute("errorblockid")).getElementsByTagName("ol")[0];
while(ol.childNodes.length>0){
ol.removeChild(ol.childNodes[0]);
}
$A(_75.errors).each(function(_77){
ol.appendChild((new Element("li")).update(_77.message));
});
$(_75.readAttribute("errorblockid")).style.display="block";
}
},_hideFormErrors:function(_78){
if(_78.readAttribute("errorblockid")&&$(_78.readAttribute("errorblockid"))){
$(_78.readAttribute("errorblockid")).style.display="none";
}
},_showErrorArrow:function(_79){
if(!_79.previous()||!_79.previous().hasClassName("err_arrow")){
var _7a=document.createElement("span");
$(_7a).addClassName("err_arrow");
$(_7a).innerHTML="&nbsp;";
_79.parentNode.insertBefore(_7a,_79);
}
},_hideErrorArrow:function(_7b){
if(_7b.previous()&&_7b.previous().hasClassName("err_arrow")){
_7b.previous().remove();
}
}},selfLabels:{addSelfLabel:function(_7c,_7d){
_7c=$(_7c);
_7c.labelText=_7d;
_7c.writeAttribute("selfLabel",_7d);
_7c.observe("focus",function(){
if($F(this)===_7d){
this.value="";
$(this).removeClassName("selflabel");
}
});
_7c.observe("blur",function(){
if($F(this)===""){
this.value=_7d;
$(this).addClassName("selflabel");
}
});
setTimeout(function(){
if($F(_7c)===""){
if(document.activeElement){
if(document.activeElement!==_7c){
_7c.value=_7d;
$(_7c).addClassName("selflabel");
}
}else{
_7c.value=_7d;
$(_7c).addClassName("selflabel");
}
}
},1000);
},parseDomTree:function(_7e){
_7e=$(_7e?_7e:document.body);
_7e.select("input[selfLabel]","textarea[selfLabel]","input[selflabel]","textarea[selflabel]").each(function(_7f){
ct.selfLabels.addSelfLabel(_7f,_7f.getAttribute("selfLabel"));
});
}},bubbles:{addBehavior:function(_80,_81,_82){
_82=_82?_82:{};
_80=$(_80);
_80.href="javascript: void(0);";
var _83;
_80.observe("click",function(_84){
var _85=false;
if($("ct_bubbleNode")){
if($("ct_bubbleNode").associatedLink==_80){
_85=true;
}
ct.dom.removeIEIframeFix($("ct_bubbleNode"));
$("ct_bubbleNode").remove();
}
if(!_85){
var _86=new Element("a",{"class":"bubbleClose",href:"javascript: void(0);",title:"Close"});
_86.observe("click",function(){
ct.dom.removeIEIframeFix($("ct_bubbleNode"));
$(_83).remove();
});
_83=new Element("div",{"class":"bubble",id:"ct_bubbleNode"});
_83.associatedLink=_80;
_83.appendChild(new Element("div",{"class":"bubbleShadow"}));
_83.appendChild(new Element("div",{"class":"bubbleArrow"}));
_83.appendChild(_86);
var _87=new Element("div",{"class":"bubbleContentFrame"});
_83.appendChild(_87);
_87.innerHTML=(new Template(_81)).evaluate(_82);
_83=$(_83);
var pos=_80.cumulativeOffset();
var _89;
if(self.innerWidth){
_89=self.innerWidth;
}else{
if(document.documentElement&&document.documentElement.clientWidth){
_89=document.documentElement.clientWidth;
}else{
if(document.body){
_89=document.body.clientWidth;
}
}
}
if(parseInt(pos[0],10)>(_89/2)){
_83.addClassName("bubbleWrapperRight");
_83.removeClassName("bubbleWrapperLeft");
_83.setStyle({left:"auto",right:(_89-parseInt(pos[0],10)-5)+"px",top:(parseInt(pos[1],10)-20)+"px"});
document.body.appendChild(_83);
ct.dom.addIEIframeFix(_83,[0,-10,0,10]);
}else{
_83.addClassName("bubbleWrapperLeft");
_83.removeClassName("bubbleWrapperRight");
_83.setStyle({right:"auto",left:(parseInt(pos[0],10)+55)+"px",top:(parseInt(pos[1],10)-20)+"px"});
document.body.appendChild(_83);
ct.dom.addIEIframeFix(_83,[0,-10,0,0]);
}
_83.observe("click",function(_8a){
if(_8a.target.tagName.toLowerCase()!=="a"){
_8a.stop();
}
});
}
_84.stop();
});
},parseDomTree:function(_8b){
_8b=$(_8b?_8b:document.body);
_8b.getElementsBySelector("a[bubbleBlock]","a[bubbleblock]").each(function(_8c){
if($(_8c.getAttribute("bubbleBlock"))){
var _8d=$(_8c.getAttribute("bubbleBlock"));
var _8e=_8d.innerHTML;
_8d.style.display="none";
ct.bubbles.addBehavior(_8c,_8e,eval(_8c.readAttribute("substitutions")?"({"+_8c.readAttribute("substitutions")+"})":{}));
}else{
ct.console.error("Tried initializing a bubble block for link, but either the bubbleBlock attribute isn't specified, or it doesn't point to a valid block in the DOM.",_8c);
}
});
}},dom:{getParentByTagName:function(_8f,_90){
var _91=Element.ancestors(_8f);
for(var i=0;i<_91.length;i++){
if(_91[i].nodeName.toLowerCase()===_90.toLowerCase()){
return _91[i];
}
}
return null;
},addIEIframeFix:function(_93,_94){
if(Prototype.Browser.IE&&!_93._fixedIframe){
var _95=document.createElement("iframe");
_94=_94||[0,0,0,0];
_93=$(_93);
_95.frameBorder=0;
_95.scrolling="no";
_95.src=window.location.protocol==="https:"?"/blank.html":"about:blank";
_95.style.position="absolute";
_95.style.width=_93.getWidth()+_94[1]+"px";
_95.style.height=_93.getHeight()+_94[2]+"px";
var _96=_93.cumulativeOffset();
_95.style.top=_96[1]+_94[0]+"px";
_95.style.left=_96[0]+_94[3]+"px";
_93._fixedIframe=_95;
document.body.appendChild(_95);
}
},removeIEIframeFix:function(_97){
if(_97._fixedIframe){
document.body.removeChild(_97._fixedIframe);
_97._fixedIframe=null;
}
}},forms:{rememberCurrentValues:function(_98){
$(_98).getElements().each(function(_99){
switch(_99.nodeName.toLowerCase()){
case "input":
switch(_99.type.toLowerCase()){
case "text":
_99.oldValue=$F(_99);
break;
case "checkbox":
case "radio":
_99.oldValue=_99.checked?"Y":"N";
break;
default:
break;
}
break;
case "textarea":
_99.oldValue=$F(_99);
break;
case "select":
_99.oldValue=_99.selectedIndex;
break;
}
});
},restoreOldValues:function(_9a){
$(_9a).getElements().each(function(_9b){
if(_9b.oldValue){
switch(_9b.nodeName.toLowerCase()){
case "input":
switch(_9b.type.toLowerCase()){
case "text":
_9b.value=_9b.oldValue;
break;
case "checkbox":
case "radio":
_9b.checked=(_9b.oldValue==="Y")?true:false;
break;
default:
break;
}
break;
case "textarea":
_9b.value=_9b.oldValue;
break;
case "select":
_9b.selectedIndex=_9b.oldValue;
break;
}
}
});
},populate:function(_9c,_9d){
var _9e=Form.getElements(_9c);
Object.keys(_9d).each(function(key){
_9e.each(function(_a0){
if(_a0.id===key&&_9d[key]){
if(_a0.nodeName.toLowerCase()==="input"){
switch(_a0.type.toLowerCase()){
case "text":
case "password":
case "hidden":
_a0.value=_9d[key];
break;
case "checkbox":
case "radio":
if(_9d[key].toString().toLowerCase()==="true"){
_a0.checked=true;
}else{
_a0.checked=false;
}
break;
}
}else{
if(_a0.nodeName.toLowerCase()==="select"){
for(var i=0;i<_a0.options.length;i++){
if(_a0.options[i].value.toLowerCase()===_9d[key].toString().toLowerCase()){
_a0.selectedIndex=i;
break;
}
}
}else{
if(_a0.nodeName.toLowerCase()==="textarea"){
_a0.value=_9d[key];
}
}
}
if($(_a0).hasClassName("selflabel")){
$(_a0).removeClassName("selflabel");
}
}
});
});
},addHiddenField:function(_a2,_a3,_a4){
if(_a2[_a3]){
_a2[_a3].value=_a4;
}else{
_a2.appendChild(new Element("input",{type:"hidden",value:_a4,name:_a3}));
}
}},domIsLoaded:false,stringFormatting:{stripAlphaChars:function(_a5){
var _a6=_a5+"";
return _a6.replace(/[^0-9]/g,"");
},formatForCurrency:function(_a7,_a8){
var _a9="",num,dec;
var _ac=ct.currentCurrency.symbol?ct.currentCurrency.symbol:"Rs.";
_a7/=ct.currentCurrency.rate?ct.currentCurrency.rate:1;
if(_a8){
num=parseFloat(_a7);
num=parseInt(_a7*100,10)/100+"";
dec=num.split(".").length>1?num.split(".")[1]:"";
num=num.split(".")[0];
while(dec.length<2){
dec+="0";
}
}else{
num=parseInt(Math.round(_a7),10)+"";
}
if(num.length>3){
_a9=num.substring(num.length-3,num.length);
num=num.substring(0,num.length-3);
while(num.length>2){
_a9=num.substring(num.length-2,num.length)+","+_a9;
num=num.substring(0,num.length-2);
}
num+=","+_a9;
}
if(_a8){
num+="."+dec;
}
return _ac+" "+num;
}},stickyBlocks:{_definedStickyBlocks:$A([]),makeBlockSticky:function(_ad){
ct.stickyBlocks._definedStickyBlocks.push(_ad);
ct.stickyBlocks.recalculateTop(_ad);
_ad.style.zIndex="2";
},recalculateTop:function(_ae){
_ae.startTop=$(_ae).cumulativeOffset().top;
},_calculateScrollTop:function(){
if(self.pageYOffset){
return self.pageYOffset;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollTop;
}else{
if(document.body){
return document.body.scrollTop;
}else{
return 0;
}
}
}
},ifBlockIsAtTheBottom:function(_af){
var _b0=ct.stickyBlocks._calculateScrollTop();
return _b0+_af.getDimensions().height+10>Element.cumulativeOffset($("Wrapper")).top+$("Wrapper").getDimensions().height;
},blockAtFooterHandler:function(_b1,_b2){
if(_b1.style.position!=="absolute"||_b2){
if(!Prototype.Browser.IE){
_b1.style.top=($("Wrapper").getDimensions().height-_b1.getDimensions().height-Element.cumulativeOffset($("Wrapper")).top)+"px";
}else{
_b1.style.top=($("Wrapper").getDimensions().height-_b1.getDimensions().height-Element.cumulativeOffset($("Wrapper")).top-25)+"px";
}
}
_b1.style.position="absolute";
},ifBlockIsAtTheTop:function(_b3){
var _b4=ct.stickyBlocks._calculateScrollTop();
return _b4+13<_b3.startTop;
},_previousBlockTop:0,parseDomTree:function(_b5){
_b5=$(_b5?_b5:document.body);
_b5=$(_b5?_b5:document.body);
var IE6=(navigator.userAgent.indexOf("MSIE 6")>=0)?true:false;
$A(_b5.select(".stickyBlock")).each(function(_b7){
ct.stickyBlocks.makeBlockSticky(_b7);
_b7.startTop=Element.cumulativeOffset(_b7).top;
_b7.windowResizeFix=document.viewport.getDimensions().height;
_b7.style.position="static";
_b7.observe("sticky:resize",function(){
if(ct.stickyBlocks.ifBlockIsAtTheBottom(this)){
ct.stickyBlocks.blockAtFooterHandler(this,true);
ct.stickyBlocks._previousBlockTop=(Element.cumulativeOffset(_b7).top);
}
});
Event.observe(window,"resize",function(){
if(_b7.windowResizeFix!==document.viewport.getDimensions().height){
_b7.windowResizeFix=document.viewport.getDimensions().height;
if(ct.stickyBlocks.ifBlockIsAtTheBottom(_b7)){
ct.stickyBlocks.blockAtFooterHandler(_b7,true);
ct.stickyBlocks._previousBlockTop=(Element.cumulativeOffset(_b7).top);
}
}
});
_b7.positionUpdate=function(){
stickyBlockWindowScrollHandler();
};
fixpageshow(_b7);
});
function fixpageshow(_b8){
if(ct.stickyBlocks.ifBlockIsAtTheBottom(_b8)){
ct.stickyBlocks.blockAtFooterHandler(_b8);
window.setTimeout(function(){
ct.stickyBlocks._previousBlockTop=_b8.cumulativeOffset().top;
},20);
}
}
function _blockHeightGreater(_b9){
var _ba=($("Wrapper").cumulativeOffset().top+$("Wrapper").getDimensions().height);
var _bb=(_b9.startTop+_b9.getDimensions().height);
return (_ba<=_bb+25);
}
function _ifBlockFitsInViewPort(_bc){
return _bc.getDimensions().height+10<document.viewport.getHeight();
}
function stickyBlockWindowScrollHandler(){
var _bd=ct.stickyBlocks._calculateScrollTop();
$A(ct.stickyBlocks._definedStickyBlocks).each(function(_be){
if(ct.stickyBlocks.ifBlockIsAtTheTop(_be)||_blockHeightGreater(_be)){
_be.style.position="static";
}else{
if(_ifBlockFitsInViewPort(_be)){
if(ct.stickyBlocks.ifBlockIsAtTheBottom(_be)){
ct.stickyBlocks.blockAtFooterHandler(_be);
}else{
_be.style.position="fixed";
_be.style.top="10px";
if(IE6){
_be.style.position="absolute";
_be.style.top=(_bd-$("Wrapper").cumulativeOffset().top+10)+"px";
}
}
}else{
if(_be.style.position==="static"){
}else{
if(ct.stickyBlocks._previousBlockTop>_bd){
ct.stickyBlocks._previousBlockTop=$("filter").cumulativeScrollOffset().top;
_be.style.top="10px";
_be.style.position="fixed";
if(IE6){
_be.style.position="absolute";
_be.style.top=(_bd-$("Wrapper").cumulativeOffset().top+10)+"px";
}
}else{
if(_be.style.position!=="absolute"){
ct.stickyBlocks._previousBlockTop=(Element.cumulativeScrollOffset(_be).top);
_be.style.top=(Element.cumulativeScrollOffset(_be).top-Element.cumulativeOffset($("Wrapper")).top)+"px";
}
_be.style.position="absolute";
}
}
}
}
});
}
Event.stopObserving(window,"scroll",stickyBlockWindowScrollHandler);
Event.observe(window,"scroll",stickyBlockWindowScrollHandler);
}},helperFunctions:{showCVVHintCc:function(_bf,_c0){
$(_c0).style.display="block";
switch(_bf.toLowerCase()){
case "3":
$(_c0).innerHTML="<img src='/images/cvv_images/cc_amex.gif' alt='American Express Verification Code' />";
break;
default:
$(_c0).innerHTML="<img src='/images/cvv_images/cvv_help.gif' alt='Credit Card Verification Code' />";
break;
}
},showCVVHintDc:function(_c1,_c2){
$(_c2).innerHTML="<img src='/images/cvv_images/cc_visa.gif' alt='Visa Verification Code' />";
},toHomeForm:function(_c3,_c4){
ct.cookies.erase("tab");
ct.cookies.create("tab",_c3,365);
if(_c4){
window.location.href="http://"+location.host+"/index.shtml";
}
return false;
},addRooms:function(_c5,_c6,_c7){
var _c8=new Template("<tr class=\"rm_info\"><td></td><td class=\"rm_num\">Room #{num}:</td><td><label>&nbsp;</label><select id=\"adults#{num}\" name=\"adults#{num}\" size=\"1\" onchange=\"alterChildren('#{num}')\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option></select></td><td><label>&nbsp;</label><select id=\"children#{num}\" name=\"children#{num}\" size=\"1\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option></select></td><td><div id=\"child#{num}1\"><label for=\"cages#{num}1\">Age of Child1<span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}1\" tabindex=\"7\" name=\"ca#{num}\" title=\"Age of Child1\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td><td><div id=\"child#{num}2\"><label for=\"cages#{num}2\">Age of Child2<span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}2\" tabindex=\"8\" name=\"ca#{num}\" title=\"Age of Child2\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td><td><div id=\"child#{num}3\"><label for=\"cages#{num}3\">Age of Child3 <span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}3\" tabindex=\"9\" name=\"ca#{num}\" title=\"Age of Child3\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td></tr>");
var _c9=new Template("<tr class=\"rm_info\"><td colspan=\"2\"><table><tr><td colspan=\"2\" class=\"room_no\"><label class=\"required\">Room #{num}:</label></td></tr><tr><td><label for=\"adults1\">Adults <span class=\"weak\">(12+ yrs)</span></label><select id=\"adults#{num}\" name=\"adults#{num}\" size=\"1\" onchange=\"alterChildren('#{num}')\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option></select></td><td><label for=\"children1\">Children <span class=\"weak\">(0-11 yrs)</span></label><select id=\"children#{num}\" name=\"children#{num}\" size=\"1\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option></select></td><td><div id=\"child#{num}1\"><label for=\"cages#{num}1\">Age of Child1<span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}1\" tabindex=\"7\" name=\"ca#{num}\" title=\"Age of Child1\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td><td><div id=\"child#{num}2\"><label for=\"cages#{num}2\">Age of Child2<span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}2\" tabindex=\"8\" name=\"ca#{num}\" title=\"Age of Child2\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td><td><div id=\"child#{num}3\"><label for=\"cages#{num}3\">Age of Child3 <span class=\"weak\">(yrs)</span></label><select id=\"cages#{num}3\" tabindex=\"9\" name=\"ca#{num}\" title=\"Age of Child3\" class=\"required\"><option value=\"0\">0</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option></select></div></td></tr></table></td></tr>");
var num=parseInt($F(_c5),10);
var _cb=document.getElementById("dynamic_rooms");
var tr,td,_ce,_cf,_d0;
var _d1=document.getElementsByClassName("rm_info",_cb);
var _d2=_d1.length+1;
var _d3;
var _d4;
if(_c6=="include"){
_d4=_c9;
}else{
_d4=_c8;
}
if(num>_d2){
for(var g=_d2+1;g<=num;g++){
_d3=_d4.evaluate({num:g});
if(_c7){
var _d6="";
for(var i=0;i<=_c7;i++){
_d6+="<td></td>";
}
_d3=_d3.replace("<td></td>",_d6);
}
new Insertion.Bottom(_cb,_d3);
}
}else{
if(num<_d2){
for(var h=_d2;h>num;h--){
Element.remove(_d1[h-2]);
}
}
}
},alterChildren:function(num){
var _da=$("children"+num);
var _db=_da.getElementsByTagName("option");
var _dc=parseInt($F("adults"+num),10);
var _dd=_db.length;
for(var q=0;q<_dd;q++){
if(parseInt(_db[q].value,10)+_dc>4){
_da.options[q]=null;
--_dd;
--q;
}
}
var _df;
if((q-1)<(_df=4-_dc)){
for(q;q<=_df;q++){
_da.options[q]=new Option(q,q);
}
}
},showModalDialog:function(_e0,_e1,_e2,_e3){
var _e4;
var _e5=window.pageYOffset||document.documentElement.scrollTop||0;
if(document.all){
if(self.pageYOffset){
_e4=self.pageYOffset;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
_e4=document.documentElement.scrollTop;
}else{
if(document.body){
_e4=document.body.scrollTop;
}
}
}
function prepareIE(_e6,_e7){
bod=window.top.document.getElementsByTagName("body")[0];
bod.style.height=_e6;
bod.style.overflow=_e7;
htm=window.top.document.getElementsByTagName("html")[0];
htm.style.height=_e6;
htm.style.overflow=_e7;
}
function toggleSelects(_e8){
selects=window.top.document.getElementsByTagName("select");
for(i=0;i<selects.length;i++){
selects[i].style.visibility=_e8;
}
}
prepareIE("100%","hidden");
window.scrollTo(0,0);
toggleSelects("hidden");
}
function resizeHandler(){
if(document.all){
try{
if(Prototype.Browser.IE){
$("TranslucentLayer").style.height=_e9+"px";
}else{
$("TranslucentLayer").style.height=(document.body.offsetHeight>_e9)?document.body.offsetHeight+"px":_e9+"px";
}
}
catch(e){
}
}
_ea.style.left=((document.body.offsetWidth-_ea.offsetWidth)/2)+"px";
}
Event.observe(window,"resize",resizeHandler);
function closePopup(){
if(document.all){
window.top.scrollTo(0,_e4);
prepareIE("auto","auto");
toggleSelects("visible");
}
Event.stopObserving(window,"resize",resizeHandler);
window.top.document.getElementById("TranslucentLayer").remove();
window.top.document.getElementById("ModalFrame").remove();
if(Prototype.Browser.IE){
window.scrollTo(0,_e5);
}
}
ct.helperFunctions.hideModalDialog=closePopup;
var _eb=new Element("div",{id:"TranslucentLayer"});
$(_eb).observe("click",closePopup);
var _ea=new Element("div",{id:"ModalFrame"});
var _ec=new Element("div",{"class":"topBorder"});
var _ed=new Element("a",{id:"close",title:"Close window"});
_ec.appendChild(_ed);
_ea.appendChild(_ec);
_ea.appendChild(new Element("iframe",{src:_e0,frameborder:0,framespacing:0,width:"100%",height:"100%",scrolling:_e3?"no":"yes",name:"modal_window"}));
_ea.setStyle({width:(_e1||"700px"),height:(_e2||"70%")});
document.body.appendChild(_eb);
document.body.appendChild(_ea);
_ed.observe("click",function(){
window.top.ct.helperFunctions.hideModalDialog();
});
_ed.observe("mouseover",function(){
_ed.addClassName("over");
});
_ed.observe("mouseout",function(){
_ed.removeClassName("over");
});
_ea.style.left=((document.body.offsetWidth-_ea.offsetWidth)/2)+"px";
var _ee=_ea.getHeight();
var _e9=$(document).viewport.getHeight();
_ea.setStyle({top:(_e9-_ee)*100/(2*_e9)+"%"});
if(Prototype.Browser.IE){
_eb.style.height=_e9+"px";
}else{
_eb.style.height=(document.body.offsetHeight>_e9)?document.body.offsetHeight+"px":_e9+"px";
}
},openPopup:function(_ef){
var _f0=document.viewport.getDimensions();
_ef=_ef||{};
_ef.height=_ef.height||(_f0.height/2);
_ef.width=_ef.width||(_f0.width/2);
_ef.left=_ef.left||((_f0.width-_ef.width)/2);
_ef.top=_ef.top||((_f0.height-_ef.height)/2);
_ef.toolbar=_ef.toolbar?1:0;
_ef.location=_ef.location?1:0;
_ef.status=_ef.status?1:0;
_ef.menubar=_ef.menubar?1:0;
_ef.scrollbars=_ef.scrollbars?1:0;
_ef.resizable=_ef.resizable?1:0;
window.open(_ef.url||"about:blank","wnd"+Math.round(Math.random()*1000),"toolbar="+_ef.toolbar+",location="+_ef.location+",status="+_ef.status+",menubar="+_ef.menubar+",scrollbars="+_ef.scrollbars+",resizable="+_ef.resizable+",width="+_ef.width+",height="+_ef.height+",left="+_ef.left+",top="+_ef.top);
},prefetchResources:function(){
$$("link[rel=prefetch]").each(function(_f1){
new Ajax.Request(_f1.href,{method:"get"});
});
},showThawteLogo:function(_f2){
var _f3=new Element("iframe",{src:"/includes/thwarte-logo.html",frameBorder:0,width:"0",height:"0",scrolling:"no"});
function resizeIframe(){
var _f4=_f3.contentWindow.document||_f3.document;
_f3.style.width="100%";
_f3.style.height=_f4.body.scrollHeight+"px";
}
_f3.onload=resizeIframe;
_f3.onreadystatechange=function(){
if(_f3.readyState==="complete"){
resizeIframe();
}
};
_f2.appendChild(_f3);
},logToServer:function(app,tag,_f7){
try{
new Ajax.Request("/urltrack/"+app+"_"+tag,{parameters:_f7||{},method:"get"});
}
catch(e){
}
try{
pageTracker._trackEvent(app,tag,Hash.toQueryParams(_f7||{}));
}
catch(e){
}
},resetCurrency:function(_f8){
ct.currentCurrency={name:"Indian Rupees",code:"INR",rate:1,symbol:"Rs."};
if(_f8){
ct.cookies.erase("currency-pref");
}
}},genericBlocks:{consentBlock:function(_f9){
if($(_f9).hasClassName("required")){
ct.validator.attachValidation($("consent"),"Please go through the booking policies and terms that are linked from below. Then mark the checkbox if you agree, we know it&rsquo;s boring but it&rsquo;s important.",function(_fa){
return (_fa.checked);
});
}
},signupBlock:function(_fb){
ct.validator.attachValidation($("confirmUname"),"The email addresses you have entered do not match. Please re-check these fields.",function(){
if($F("confirmUname")===""||$F("newUname")===""){
return true;
}
return ($F("confirmUname")===$F("newUname"));
});
},paymentBlock:function(_fc){
if($("CcExpirationMonth")&&$("CcExpirationYear")){
ct.validator.attachValidation($("CcExpirationMonth"),"Please check the credit card expiration date. The date you've entered seems to be in the past.",function(){
var _fd=new Date();
var _fe=_fd.getMonth()+1;
var _ff=_fd.getFullYear();
if($F("CcExpirationMonth")<_fe&&$F("CcExpirationYear")<=_ff){
return false;
}else{
return true;
}
});
}
if($("DcExpirationMonth")&&$("DcExpirationYear")){
ct.validator.attachValidation($("DcExpirationMonth"),"Please check the debit card expiration date. The date you've entered seems to be in the past.",function(){
var _100=new Date();
var _101=_100.getMonth()+1;
var _102=_100.getFullYear();
if($F("DcExpirationMonth")<_101&&$F("DcExpirationYear")<=_102){
return false;
}else{
return true;
}
});
}
$A(document.getElementsByName("card_type")).each(function(_103){
Event.observe(_103,"click",function(){
ct.helperFunctions.showCVVHintCc($F(_103),"cvvImageCc");
});
var _104=$("cc_disclaimer"),_105=$("dt_cc_disclaimer");
if($("vTabs").getElementsByTagName("a")[1]&&_104){
Event.observe(_103,"click",function(){
if($F(_103)==3){
$(_104,_105).invoke("setStyle",{display:"block"});
_104.innerHTML="We accept only American Express cards issued in India";
if($("billAdressHelpText")){
$("billAdressHelpText").innerHTML="<strong>Why do we ask?</strong> The billing address is used to prevent fraud by matching it to your account information. Please enter it <span style='background-color: #FFCC00;'>exactly as it appears on your Amex card statement</span> to ensure that the payment is not rejected.";
}
}else{
if($F(_103)==4){
$(_104,_105).invoke("setStyle",{display:"block"});
_104.innerHTML="We accept only Citibank Diners cards issued in India";
if($("billAdressHelpText")){
$("billAdressHelpText").innerHTML="<strong>Why do we ask?</strong> The billing address is used to prevent fraud by matching it to your account information -- enter this as close to the way it appears on your card statement.";
}
}else{
$(_104,_105).invoke("setStyle",{display:"none"});
if($("billAdressHelpText")){
$("billAdressHelpText").innerHTML="<strong>Why do we ask?</strong> The billing address is used to prevent fraud by matching it to your account information -- enter this as close to the way it appears on your card statement.";
}
}
}
});
}else{
if(_104){
$(_104,_105).invoke("setStyle",{display:"block"});
_104.innerHTML="We accept only credit cards issued in India";
}
}
});
var tabs=$("vTabs").select("li");
var _107=0;
tabs.each(function(tab,_109){
if(tab.down("a").hasClassName("active")){
_107=_109;
}
});
tabs.each(function(tab,_10b){
if(_10b===_107){
$(tab).addClassName("active");
$(tab.id.split("_tab")[0]).style.display="block";
}
$(tab.getElementsByTagName("a")[0]).observe("click",function(){
tabs.each(function(tab1){
if(tab1===tab){
$(tab1).select("a")[0].addClassName("active");
$(tab1.id.split("_tab")[0]).style.display="block";
}else{
$(tab1).select("a")[0].removeClassName("active");
$(tab1.id.split("_tab")[0]).style.display="none";
}
});
});
});
$("CCNotAccepted","DCNotAccepted").invoke("hide");
if($("copyContactToBilling")){
$("copyContactToBilling").observe("click",function(){
try{
function populateField(_10d,_10e){
if($F(_10d)&&$F(_10d)!==$(_10d).readAttribute("selflabel")){
if($(_10d).id==="contactCountry"){
if($F(_10d).toLowerCase().strip()==="india"){
$(_10e).value="India";
$(_10e).removeClassName("selflabel");
$("billCountryCode").value="IN";
}else{
$(_10e).value=$(_10e).readAttribute("selflabel");
$("billCountryCode").value="";
}
}else{
$(_10e).value=$F(_10d);
$(_10e).removeClassName("selflabel");
}
}
}
var _10f=[{f:"contactFirstName",t:"billFirstName"},{f:"contactLastName",t:"billLastName"},{f:"contactAddress",t:"billAddress"},{f:"contactCity",t:"billCity"},{f:"contactState",t:"billState"},{f:"contactPin",t:"billPin"},{f:"contactCountry",t:"billCountry"}];
$A(_10f).each(function(_110){
populateField(_110.f,_110.t);
});
}
catch(e){
console.log(e);
}
});
}
if(_fc.hasClassName("withVerification")){
function performVerification(_111){
var form=Event.findElement(_111,"form");
if(!form.ct_validationFailed){
var _113="product="+_fc.readAttribute("product")+"&";
var _114;
if(form.id=="credit_card"){
var _115;
$A(document.getElementsByName("card_type")).each(function(_116){
if(_116.checked){
_115=$F(_116);
}
});
_113+="payment_mode=C&card_type="+_115+"&card_number="+$F("creditCardNumber");
_114=$("CCNotAccepted");
}else{
_113+="payment_mode=D&issuing_bank="+$F("issuingBank")+"&card_number="+$F("debitCardNumber");
_114=$("DCNotAccepted");
}
if(_fc.readAttribute("product").toUpperCase()==="H"){
var _117=form.id;
var _118=document.forms[_117];
_113+="&userid="+_118.userid.value+"&title="+_118.title.value+"&firstName="+_118.firstName.value+"&lastName="+_118.lastName.value+"&username="+_118.username.value+"&contact1="+_118.contact1.value+"&contact2="+_118.contact2.value;
_113+="&cvv_code="+_118.cvv_code.value+"&bill_name="+_118.bill_name.value+"&card_expiration_month="+_118.card_expiration_month.value+"&card_expiration_year="+_118.card_expiration_year.value;
_113+="&hotelid="+_118.hotelid.value+"&bookingCode="+_118.bookingCode.value+"&roomtypecode="+_118.roomtypecode.value+"&bookParams="+escape(_118.bookParams.value);
var _119;
var _11a=$("loyaltyCash").value;
_118.loyaltyCP.value=_11a;
if(_11a===""||parseInt(_11a,10)===0){
_119="N";
}else{
if($("cleartripCashY").checked&&(_11a!==""&&_11a!=="0")){
_119="Y";
}else{
_119="N";
}
}
_118.loyaltyYN.value=_119;
_113+="&loyaltyYN="+_118.loyaltyYN.value+"&loyaltyCP="+_118.loyaltyCP.value;
}
_113+="&ts="+ct.dates.getTimestamp();
function failureHandler(){
_114.style.display="block";
$(form).enable();
}
$("progress_img").style.display="";
_114.style.display="none";
$(form).disable();
var _11b=false,_11c="";
if($("creditCardNumber")){
var ccNo=$F("creditCardNumber");
ccNo=ccNo.substring(ccNo.length-4);
if(form.id=="credit_card"&&!ct.cookies.read("ct-secure-"+ccNo)){
if(($("cc_visa")&&$("cc_visa").checked)){
_11b=true;
_11c="#VBV--"+ccNo;
}else{
if(($("cc_master")&&$("cc_master").checked)){
_11b=true;
_11c="#MSC--"+ccNo;
}
}
}
}
new Ajax.Request(_fc.readAttribute("verificationurl"),{method:(_fc.readAttribute("product").toUpperCase()==="H")?"post":"get",parameters:_113,onSuccess:function(_11e){
switch(_11e.responseText.toLowerCase()){
case "true":
$(form).enable();
form.submit();
break;
default:
failureHandler();
break;
}
$("progress_img").style.display="none";
},onFailure:function(_11f){
$("progress_img").style.display="none";
$(form).enable();
form.submit();
}});
Event.stop(_111);
}
}
if($("credit_card")){
$("credit_card").observe("submit",performVerification);
}
if($("debit_card")){
$("debit_card").observe("submit",performVerification);
}
$A(["credit_card","debit_card","net_banking","cash_card"]).each(function(_120){
if($(_120)){
$(_120).setAttribute("autocomplete","off");
$(_120).observe("submit",function(evt){
if($("cleartripCashY")){
ct.forms.addHiddenField(evt.findElement("form"),"redeem",($("cleartripCashY").checked?"true":"false"));
if((_120==="net_banking"||_120==="cash_card")&&!$(_120).ct_validationFailed){
$(_120).submit();
}
}
if($("coupon")){
ct.forms.addHiddenField(evt.findElement("form"),"coupon",$F("coupon"));
}
});
}
});
if($("deposit_acct")&&(Prototype.Browser.IE||Prototype.Browser.WebKit)){
$("deposit_acct").observe("submit",function(evt){
$("deposit_acct").submit();
});
}
}
},addPaymentBehaviorFromJSON:function(_123,_124){
_123.jsonData=_124;
$("cleartripCashApplicable").innerHTML=ct.stringFormatting.formatForCurrency(_123.jsonData.lp);
var _125=$A(["nb","cc","dc","kc"]),_126;
function paymentModeChanged(mode){
mode=(_125.indexOf(mode)!==-1)?mode:_126;
_126=mode;
var _128=getCurrentValue(mode),_129=_123.jsonData.availability,_12a=_123.jsonData.tot,_12b=$A([]),_12c;
if(!_123.jsonData.err&&_123.jsonData.lp&&$("cleartripCashY").checked){
_12a-=_123.jsonData.lp;
_12c=true;
if($("rtLoyaltyLabel")){
$("rtLoyaltyLabel","rtLoyaltyAmount").invoke("show");
$("rtLoyaltyAmount").innerHTML="("+ct.stringFormatting.formatForCurrency(_123.jsonData.lp)+")";
if($("loyaltyCash")){
$("loyaltyCash").value=_123.jsonData.lp;
}
_12b.push("rtLoyaltyLabel");
_12b.push("rtLoyaltyAmount");
}
}else{
if($("rtLoyaltyLabel")){
_12c=false;
$("rtLoyaltyLabel","rtLoyaltyAmount").invoke("hide");
}
}
if(_128===null||_128===undefined){
if($("rtProcessingLabel")){
$("rtProcessingLabel","rtProcessingAmount").invoke("hide");
}
$("ProcessingFee").hide();
}else{
if($("rtProcessingLabel")){
if(_123.jsonData[mode][_128].pc===0){
$("rtProcessingLabel","rtProcessingAmount").invoke("hide");
}else{
$("rtProcessingLabel","rtProcessingAmount").invoke("show");
$("rtProcessingAmount").innerHTML=ct.stringFormatting.formatForCurrency(_123.jsonData[mode][_128][(_12c?"wl":"xl")],true);
_12b.push("rtProcessingLabel");
_12b.push("rtProcessingAmount");
}
}
$("processingFeeAmount").innerHTML=_123.jsonData[mode][_128].pc;
if(_123.jsonData[mode][_128].pc===0){
$("ProcessingFee").hide();
}else{
$("ProcessingFee").show();
_12b.push("processingFeeAmount");
}
_12a+=_123.jsonData[mode][_128][(_12c?"wl":"xl")];
}
_12a=Math.round(_12a);
if($("rtTotalLabel")){
_12b.push("rtTotalLabel");
_12b.push("rtTotalAmount");
$("rtTotalAmount").innerHTML=ct.stringFormatting.formatForCurrency(_12a);
}
if($("trainsAvailability")&&_129){
$("trainsAvailability").show();
$("trainsAvailabilityValue").innerHTML=_129;
}
$("formTotal").innerHTML=ct.stringFormatting.formatForCurrency(_12a);
_12b.push("formTotal");
if(window.Effect){
_12b.each(function(_12d){
new Effect.Highlight($(_12d));
});
}
if($("ItzSave")){
var _12e=Math.round(_12a*(101.5/101.8));
var _12f=_12a-_12e;
if(_12f>1){
$("ItzSave").update("<strong>Save "+ct.stringFormatting.formatForCurrency(_12f)+"</strong> on transaction fee by paying with ItzCash card. You will be charged "+ct.stringFormatting.formatForCurrency(_12e)+" only.");
}else{
$("ItzSave").update("You will be charged "+ct.stringFormatting.formatForCurrency(_12a)+" only.");
}
}
}
function getCurrentValue(mode){
var _131;
switch(_125.indexOf(mode)){
case 0:
_131=$F("transferBank");
_131=(_131==="0")?null:_131;
break;
case 1:
$A(document.getElementsByName("card_type")).each(function(_132){
if(_132.checked){
_131=$F(_132);
}
});
break;
case 2:
_131=$F("issuingBank");
_131=(_131==="0")?null:_131;
break;
case 3:
_131=$F("cash_card_id");
_131=(_131==="0")?null:_131;
}
return _131;
}
if(!_123.eventsAttached){
$("vTabs").select("li a").each(function(tab,_134){
$(tab).observe("click",function(){
paymentModeChanged(_125[_134]);
});
if($(ct.dom.getParentByTagName(tab,"li")).hasClassName("active")){
paymentModeChanged(_125[_134]);
}
});
$A(document.getElementsByName("card_type")).invoke("observe","click",function(){
paymentModeChanged(_125[1]);
});
if($("issuingBank")){
$("issuingBank").observe("change",function(){
paymentModeChanged(_125[2]);
});
}
if($("transferBank")){
$("transferBank").observe("change",function(){
paymentModeChanged(_125[0]);
});
}
$("cleartripCashY","cleartripCashN").invoke("observe","click",paymentModeChanged);
if(_123.jsonData.lp===0||_123.jsonData.err){
$("CleartripCash").hide();
$("cleartripCashN").checked=false;
}else{
$("CleartripCash").show();
$("cleartripCashY").checked=true;
}
$("paymentSubmit").observe("click",function(){
var _135=$(["net_banking","credit_card","debit_card","cash_card"][_125.indexOf(_126)]),evt;
if(document.createEvent){
evt=document.createEvent("HTMLEvents");
evt.initEvent("submit",true,true);
evt.eventName="submit";
}else{
evt=document.createEventObject();
evt.eventType="onsubmit";
evt.eventName="submit";
}
if(document.createEvent){
_135.dispatchEvent(evt);
}else{
_135.fireEvent(evt.eventType,evt);
}
});
_123.eventsAttached=true;
}else{
$("vTabs").select("li a").each(function(tab,_138){
if($(ct.dom.getParentByTagName(tab,"li")).hasClassName("active")){
paymentModeChanged(_125[_138]);
}
});
}
},flightForm:function(_139){
function isInternational(){
if(($F("origin_autocomplete").indexOf(", IN - ")>=0)&&($F("destination_autocomplete").indexOf(", IN - ")>=0)){
return false;
}
return true;
}
function modifyDropdowns(){
var _13a=$F("adults"),_13b=$F("children"),_13c=$F("infants"),i,_13e;
$A($("children").childNodes).each(Element.remove);
$A($("infants").childNodes).each(Element.remove);
for(i=0;i<=_13a;i++){
_13e=new Element("option",{value:i}).update(i);
if(_13c==i){
_13e.setAttribute("selected","selected");
}
$("infants").appendChild(_13e);
}
for(i=0;i<(10-_13a);i++){
_13e=new Element("option",{value:i}).update(i);
if(_13b==i){
_13e.setAttribute("selected","selected");
}
$("children").appendChild(_13e);
}
}
function prepopulateForm(){
if(window.location.href.split("flights?")[1]){
var _13f=decodeURIComponent(window.location.href.split("flights?")[1]);
_13f=_13f.gsub(/\+/," ");
ct.cookies.create("flight_sr",_13f,365);
}
var _140=ct.cookies.read("flight_sr");
if(!$(_139).hasClassName("no-action-change")){
_139.action="/flights/search";
}
if(_140){
function populateTextField(_141,_142){
if(document.activeElement){
if(document.activeElement!==_141){
_141.value=_142;
}
}else{
_141.value=_142;
}
}
_140=_140.toQueryParams("&");
if((_140.rnd_one==="R")||(_140.rnd_one==="C")){
if(_140.depart_date&&!ct.dates.isPast(ct.dates.fromString(_140.depart_date))){
populateTextField(_139.depart_date,_140.depart_date);
}
if(_140.return_date&&!ct.dates.isPast(ct.dates.fromString(_140.return_date))){
populateTextField(_139.return_date,_140.return_date);
}
$("rnd_trip").checked=true;
makeRoundTrip();
}else{
if(_140.rnd_one==="O"){
$("one_way").checked=true;
makeOneWay();
if(_140.depart_date&&!ct.dates.isPast(ct.dates.fromString(_140.depart_date))){
populateTextField(_139.depart_date,_140.depart_date);
}
}
}
$(_139.from).writeAttribute("preselect",_140.from);
if(_139.origin){
_139.origin.value=_140.origin||"";
}
_139.from.value=_140.from||"";
_139.destination.value=_140.destination||"";
_139.to.value=_140.to||"";
_139.adults.value=_140.adults||"1";
_139.childs.value=_140.childs||"0";
_139.infants.value=_140.infants||"0";
}else{
if(_139.origin.value===""||_139.origin.value===_139.origin.readAttribute("selflabel")){
_139.origin.focus();
}
}
}
$("adults","children","infants").each(function(_143){
$A(_143.childNodes).each(Element.remove);
var _144=(_143.id==="adults")?1:0;
for(var i=_144;i<10;i++){
_143.appendChild(new Element("option",{value:i}).update(i));
}
});
$("adults").observe("change",modifyDropdowns);
if(!_139.hasClassName("dontprepopulate")){
prepopulateForm();
modifyDropdowns();
}
if(!$(_139).hasClassName("no-action-change")){
_139.action="/flights/search";
}
var _146=function(_147,_148){
var dest=_148.destination.value;
var city=dest.split(",")[0],_14b=((dest.split(",")[1]).split("-")[0]).strip();
var _14c;
if($("rnd_trip").checked&&_148.return_date.value!==""&&_148.return_date.value!==_148.return_date.readAttribute("selflabel")){
if(_148.depart_date.value===_148.return_date.value){
var ret=ct.dates.fromString(_148.depart_date.value);
ret.setDate(ret.getDate()+1);
_14c=ct.dates.toString(ret);
}else{
_14c=_148.return_date.value;
}
}else{
var ret=ct.dates.fromString(_148.depart_date.value);
ret.setDate(ret.getDate()+2);
_14c=ct.dates.toString(ret);
}
var adlt=parseInt(_148.adults.value,10);
var chld=(parseInt(_148.childs.value,10)+parseInt(_148.infants.value,10));
var _150={"city":city,"country":_14b,"chk_in":_148.depart_date.value,"chk_out":_14c,"num_rooms":"1","adults1":(adlt>2?2:adlt),"children1":(chld>2?2:chld)};
Object.keys(_150).each(function(key){
_147.appendChild(new Element("input",{"type":"hidden","name":key,"value":_150[key]}));
});
ct.cookies.create("hotel_sr",$H(_150).toQueryString(),365);
};
$(_139).observe("submit",function(_152){
if(!(_139.errors&&_139.errors.length>0)&&!$(_139).hasClassName("noCookie")){
if($("searchHotels")&&$("searchHotels").checked&&$("comboHotelSearch")){
_146($("comboHotelSearch"),_139);
var _153=window.open("/hotels","hotelSearchPage","left=224,top=168,width=800,height=400,outerWidth=800,outerHeight=500,toolbar=yes,location=yes,scrollbars=yes,resizable=yes,directories=yes,personalbar=yes,status=yes");
if(_153){
$("comboHotelSearch").submit();
_153.focus();
}else{
alert("Oops.. Looks like your browser blocked our hotel search results window.");
}
}
ct.cookies.create("flight_sr",$(_139).serialize(),365);
}
if(_139.hasClassName("external_offers")){
_139.action="http://www.cleartrip.com/flights/search";
}
});
if($("adv_link")){
$("adv_link").observe("click",function(_154){
setAdvCookie();
$("advanced_search1").toggle();
$("adv_link").toggleClassName("toggle_open");
$("adv_link").toggleClassName("toggle_closed");
});
}
(function(){
var _155=ct.cookies.read("adv1");
if($("adv_link")&&_155==="off"&&$("advanced_search1").style.display==="none"){
$("advanced_search1").toggle();
$("adv_link").toggleClassName("toggle_open");
$("adv_link").toggleClassName("toggle_closed");
}
})();
var _156=ct.validator.attachValidation;
_156($("destination_autocomplete"),"Please choose a destination that is different from your origin.",function(){
if(($F("from")!=="")&&($F("to")!=="")){
return $F("from")!==$F("to");
}else{
return true;
}
});
_156($("infants"),"You cannot have more infants than adults travelling on a flight.",function(){
return $F("infants")<=$F("adults");
});
_156($("dpt_date"),"Please choose a departure date at least two days from today for international flights",function(){
if(!isInternational()){
return true;
}else{
if(!ct.dates.isValidDateString($F("dpt_date"))){
return true;
}else{
var _157=ct.dates.fromString($("dpt_date").readAttribute("mindate"));
_157.setDate(_157.getDate()+1);
return (ct.dates.fromString($F("dpt_date"))-_157)>0;
}
}
});
function toggleModifySearch(){
$("modify_search_open").toggle();
$("mod_link").toggleClassName("toggle_open");
$("mod_link").toggleClassName("toggle_closed");
ct.stickyBlocks.recalculateTop($("filter"));
}
$("rnd_trip").observe("click",makeRoundTrip);
$("one_way").observe("click",makeOneWay);
if($("mod_link")){
$("mod_link").observe("click",toggleModifySearch);
}
if($("close_link")){
$("close_link").observe("click",toggleModifySearch);
}
if(!ct.genericBlocks.flightForm.helpers){
ct.genericBlocks.flightForm.helpers={};
}
var _158=ct.genericBlocks.flightForm.helpers;
function makeOneWay(){
$("rtn_date").setAttribute("disabled","disabled");
$("ret_time").setAttribute("disabled","disabled");
}
function makeRoundTrip(){
$("rtn_date").removeAttribute("disabled");
$("ret_time").removeAttribute("disabled");
}
_158.makeOneWay=makeOneWay;
_158.makeRoundTrip=makeRoundTrip;
if($("one_way").checked){
makeOneWay();
}else{
if($("rnd_trip").checked){
makeRoundTrip();
}else{
makeOneWay();
}
}
function setAdvCookie(){
var _159=ct.cookies.read("adv1");
if(_159===""||_159===null||_159==="off"){
ct.cookies.erase("adv1");
ct.cookies.create("adv1","on",365);
}else{
ct.cookies.erase("adv1");
ct.cookies.create("adv1","off",365);
}
}
},hotelForm:function(_15a){
ct.validator.attachValidation($("rooms"),"Please check the number of rooms you have chosen.",function(){
var _15b=parseInt($F("rooms"),10);
for(var i=0;i<_15b;i++){
if($("adults"+(i+1))===null||$("children"+(i+1))===null){
return false;
}
}
return true;
});
if(!_15a.hasClassName("dontprepopulate")){
(function(){
if(window.location.href.split("hotels/?")[1]){
var _15d=decodeURIComponent(window.location.href.split("hotels/?")[1]);
_15d=_15d.gsub(/\+/," ");
ct.cookies.create("hotel_sr",_15d,365);
}
if(ct.cookies.read("hotel_sr")&&!(_15a.id==="fetch_rates")){
var _15e=ct.cookies.read("hotel_sr").toQueryParams("&");
_15a.city.value=_15e.city||"";
_15a.state.value=_15e.state||"";
_15a.country.value=_15e.country||"";
_15a.dest_code.value=_15e.dest_code||"";
if(_15e.chk_in&&!ct.dates.isPast(ct.dates.fromString(_15e.chk_in))){
_15a.chk_in.value=_15e.chk_in;
}
if(_15e.chk_out&&!ct.dates.isPast(ct.dates.fromString(_15e.chk_out))){
_15a.chk_out.value=_15e.chk_out;
}
$("rooms").value=_15e.num_rooms||"1";
if($("showDebug")&&_15e.showDebug){
$("showDebug").checked=true;
}
if($("NonResident2")!==null&&$("NonResident2")!==undefined){
$("NonResident2").checked=false;
}
ct.helperFunctions.addRooms(_15a.num_rooms);
switch(_15e.num_rooms){
case "1":
case "2":
case "3":
case "4":
$("adults1").value=_15e.adults1||"1";
$("children1").value=_15e.children1||"0";
if(_15e.num_rooms=="1"){
break;
}
case "2":
case "3":
case "4":
$("adults2").value=_15e.adults2||"1";
$("children2").value=_15e.children2||"0";
if(_15e.num_rooms=="2"){
break;
}
case "3":
case "4":
$("adults3").value=_15e.adults3||"1";
$("children3").value=_15e.children3||"0";
if(_15e.num_rooms=="3"){
break;
}
case "4":
$("adults4").value=_15e.adults4||"1";
$("children4").value=_15e.children4||"0";
break;
}
}
})();
}
$(_15a).observe("submit",function(_15f){
if(!_15a.errors){
var _160=false;
if($("NonResident2")!==null&&$("NonResident2")!==undefined&&$("NonResident2").checked){
_160=true;
}
if($F("dest_code")==="WCT"||_160){
_15a.action="/hotels/search";
}else{
if($("price_form")){
_15a.action=$("price_form").value;
}else{
_15a.action="/hotels/search";
}
if(_15a.readAttribute("campaign")){
_15a.action+="?campaign="+_15a.readAttribute("campaign");
}
}
if($F("dest_code")=="WCT"||_160){
var _161=$("checkin_date").value.split("/");
$("doa_dd").value=_161[0];
$("doa_mm").value=_161[1];
$("doa_yy").value=_161[2];
var _162=$("checkout_date").value.split("/");
$("dod_dd").value=_162[0];
$("dod_mm").value=_162[1];
$("dod_yy").value=_162[2];
var _163=$F("rooms");
var _164=0;
var _165=0;
for(var a=0;a<parseInt(_163,10);a++){
_164+=parseInt(_15a["adults"+(a+1)].value,10);
_165+=parseInt(_15a["children"+(a+1)].value,10);
}
$("num_adults").value=Math.ceil(_164/parseInt(_163,10));
$("num_children").value=Math.ceil(_165/parseInt(_163,10));
}
ct.cookies.create("hotel_sr",$(_15a).serialize(),365);
if(_15a.id==="fetch_rates"){
$("wait_img").show();
Event.stop(_15f);
var _167=window.location.href;
var _168="/hotels/roomrates";
if(_167.indexOf("allowed_form")!=-1){
_168=_168+"?allowed_form=true";
}
new Ajax.Request(_168,{method:"get",parameters:$(_15a.id).serialize()+"&ts="+ct.dates.getTimestamp(),onSuccess:function(_169){
_15a.enable();
$("wait_img").hide();
if(_169.responseText==="NO HOTELS"){
$("RoomRatesTable").innerHTML="<p><strong>Sorry, we couldn't find any available rooms for the dates you picked.</p></strong><p>You can try again with different dates.</p>";
}else{
$("RoomRatesTable").innerHTML=_169.responseText;
_15a.hide();
}
if(window.Effect){
new Effect.Appear("RoomRatesTable");
}else{
$("RoomRatesTable").style.display="block";
}
},onFailure:function(_16a){
$("fetch_rates").enable();
$("wait_img").hide();
alert("Sorry, we weren't able to get room rates for this hotel at this time. Please try again later.");
}});
_15a.disable();
}
}
});
function toggleModifySearch(){
$("modify_search_open").toggle();
$("mod_link").toggleClassName("toggle_open");
$("mod_link").toggleClassName("toggle_closed");
ct.stickyBlocks.recalculateTop($("filter"));
}
if($("mod_link")){
$("mod_link").observe("click",toggleModifySearch);
}
if($("close_link")){
$("close_link").observe("click",toggleModifySearch);
}
},trainForm:function(_16b){
var _16c=ct.validator.attachValidation;
_16c($("train_adults"),"You cannot search for more than a total of 6 passengers.",function(){
return (+$F("train_adults")+(+$F("train_children"))+(+$F("train_male_seniors"))+(+$F("train_female_seniors")))<=6;
});
_16c($("train_adults"),"You must have at least 1 passenger to search.",function(){
return (+$F("train_adults")+(+$F("train_children"))+(+$F("train_male_seniors"))+(+$F("train_female_seniors")))>0;
});
_16c($("to_station"),"Please choose a destination that is different from your origin.",function(){
if(ct.validator.validationConditions.requiredFieldCondition($("from_station"))&&ct.validator.validationConditions.requiredFieldCondition($("to_station"))){
return $F("from_station")!==$F("to_station");
}else{
return true;
}
});
function prepopulateForm(){
if(window.location.href.split("trains#")[1]){
var _16d=decodeURIComponent(window.location.href.split("trains#")[1]);
_16d=_16d.gsub(/\+/," ");
ct.cookies.create("train_sr",_16d,365);
}
var _16e=ct.cookies.read("train_sr");
if(_16e){
function populateTextField(_16f,_170){
if(document.activeElement){
if(document.activeElement!==_16f){
_16f.value=_170;
}
}else{
_16f.value=_170;
}
}
_16e=_16e.toQueryParams("&");
if(_16e.from_station){
populateTextField(_16b.from_station,_16e.from_station);
}
if(_16e.to_station){
populateTextField(_16b.to_station,_16e.to_station);
}
if(_16e.depart_date&&!ct.dates.isPast(ct.dates.fromString(_16e.depart_date))){
populateTextField(_16b.depart_date,_16e.depart_date);
}
_16b.adults.value=_16e.adults||"1";
_16b.children.value=_16e.children||"0";
_16b.male_seniors.value=_16e.male_seniors||"0";
_16b.female_seniors.value=_16e.female_seniors||"0";
_16b["train[class]"].value=_16e["train[class]"]||"";
}
}
if(!_16b.hasClassName("dontprepopulate")){
prepopulateForm();
}
function toggleModifySearch(){
$("modify_search_open").toggle();
$("mod_link").toggleClassName("toggle_open");
$("mod_link").toggleClassName("toggle_closed");
ct.stickyBlocks.recalculateTop($("filter"));
}
if($("mod_link")){
$("mod_link").observe("click",toggleModifySearch);
}
if($("close_link")){
$("close_link").observe("click",toggleModifySearch);
}
$(_16b).observe("submit",function(){
ct.cookies.create("train_sr",$(_16b).serialize(),365);
});
},primaryNavFlyoutMenu:function(){
if($("MainTabs")){
var _171=$($("MainTabs").getElementsByTagName("li")[3]);
if($("more_menu")){
$("more_menu").setStyle({top:(_171.cumulativeOffset().top+_171.getHeight()+6)+"px",left:_171.cumulativeOffset().left+"px"});
$(_171.getElementsByTagName("a")[0]).observe("click",function(evt){
if($("more_menu").style.display==="none"){
$("more_menu").style.display="block";
$(_171).addClassName("show_menu");
ct.dom.addIEIframeFix($("more_menu"));
}else{
$("more_menu").style.display="none";
ct.dom.removeIEIframeFix($("more_menu"));
$(_171).removeClassName("show_menu");
}
evt.stop();
});
Event.observe(document,"click",function(){
if($("more_menu").style.display==="block"){
$("more_menu").style.display="none";
ct.dom.removeIEIframeFix($("more_menu"));
$(_171).removeClassName("show_menu");
}
});
}
}
},parseDomTree:function(_173){
_173=_173||document.body;
$(document.body).select(".consent").each(ct.genericBlocks.consentBlock);
$(document.body).select(".paymentBlock").each(ct.genericBlocks.paymentBlock);
$(document.body).select(".loginBlock").each(ct.genericBlocks.signupBlock);
if($("AirSearch")){
ct.genericBlocks.flightForm($("AirSearch"));
}
if($("modify_air_search")){
ct.genericBlocks.flightForm($("modify_air_search"));
}
if($("home_hotels")){
ct.genericBlocks.hotelForm($("home_hotels"));
}
if($("hotelModifySearch")){
ct.genericBlocks.hotelForm($("hotelModifySearch"));
}
if($("fetch_rates")){
ct.genericBlocks.hotelForm($("fetch_rates"));
}
if($("rail_search")){
ct.genericBlocks.trainForm($("rail_search"));
}
setTimeout(ct.genericBlocks.primaryNavFlyoutMenu,1);
}},controls:{Calendar:function(_174,_175){
var _176=$(document.createElement("a"));
var self=this,_178;
if(!_175){
_175={};
}
_175.firstDayOfWeek=_175.firstDayOfWeek||(_174.readAttribute("firstday")?parseInt(_174.readAttribute("firstday"),10):1);
_175.minDate=_175.minDate||(_174.readAttribute("mindate")?ct.dates.fromString(_174.readAttribute("mindate")):new Date());
_175.minDateField=_175.minDateField||(_174.readAttribute("mindatefieldid")?$(_174.readAttribute("mindatefieldid")):null);
_175.calendarCount=_175.calendarCount||(_174.readAttribute("calendarcount")?parseInt(_174.readAttribute("calendarcount"),10):2);
_175.maxDate=_175.maxDate||(_174.readAttribute("maxdate")?ct.dates.fromString(_174.readAttribute("maxdate")):(new Date(new Date(_175.minDate).setFullYear(_175.minDate.getFullYear()+1))));
_175.offsetDays=_175.offsetDays||(_174.readAttribute("offsetdays")?parseInt(_174.readAttribute("offsetdays"),10):0);
_175.defaultDate=_175.defaultDate||(_174.readAttribute("defaultdate")?ct.dates.fromString(_174.readAttribute("defaultdate")):null);
var _179=null;
(function(){
if(!_174.readAttribute("size")){
_174.writeAttribute("size",10);
}
_174.writeAttribute("maxdate",ct.dates.toString(_175.maxDate));
ct.selfLabels.addSelfLabel(_174,"dd/mm/yyyy");
if(_174.nextSibling){
_174.parentNode.insertBefore(_176,_174.nextSibling);
}else{
_174.parentNode.appendChild(_176);
}
_176.href="javascript: void(0);";
_176.className="cal_openLink";
var _17a=document.createElement("img");
_17a.alt="Calendar";
_17a.title="Click to open calendar";
_17a.src="images/calendar_icon.gif";
_176.appendChild(_17a);
_176.observe("click",function(_17b){
self.showDatePicker();
Event.stop(_17b);
});
_174.observe("focus",function(_17c){
self.showDatePicker();
});
_174.observe("click",function(_17d){
Event.stop(_17d);
});
_179=getMinDate();
})();
if(_175.minDateField&&$(_175.minDateField)){
$(_175.minDateField).observe("ctCalendar:onChange",function(){
if(!_174.hasClassName("no_autochange")){
var _17e=ct.dates.fromString($F(_175.minDateField));
_17e.setDate(_17e.getDate()+2);
_174.value=ct.dates.toString(_17e);
}
});
}
function getCalendarTableMarkup(){
var doc=document,ce="createElement",sa="setAttribute",ac="appendChild";
function addCol(_183,_184){
for(var i=0;i<_184;i++){
_183[ac](doc[ce]("col"));
}
}
var _186=doc[ce]("table");
_186[sa]("cellpadding","0");
_186[sa]("cellspacing","0");
_186[sa]("border","0");
var _187=doc[ce]("colgroup");
addCol(_187,5);
_186[ac](_187);
_187=doc[ce]("colgroup");
_187.className="weekend";
addCol(_187,2);
_186[ac](_187);
var _188=doc[ce]("thead");
var _189=doc[ce]("tr");
var _18a=["S","M","T","W","T","F","S"];
var _18b=doc[ce]("tr");
var _18c=_175.firstDayOfWeek;
var _18d=doc[ce]("th");
_18d[sa]("colSpan","7");
$(_18d).addClassName("month");
_189[ac](_18d);
for(var i=0;i<7;i++){
_18c=_18c%7;
var _18f=doc[ce]("th");
if(i===5||i===6){
_18f.className="weekend";
}
_18f[ac](doc.createTextNode($A(_18a)[_18c]));
_18b[ac](_18f);
_18c++;
}
_188[ac](_189);
_188[ac](_18b);
_186[ac](_188);
var _190=doc[ce]("tbody");
var _191=doc[ce]("tr");
for(i=0;i<7;i++){
var _192=doc[ce]("td");
if(i===5||i===6){
_192.className="weekend";
}
_192[ac](doc.createTextNode(" "));
_191[ac](_192);
}
for(i=0;i<6;i++){
_190[ac](_191.cloneNode(true));
}
_186[ac](_190);
return _186;
}
function getCalendarMarkupOutline(){
var doc=document,ce="createElement",sa="setAttribute",ac="appendChild";
var _197=doc[ce]("div");
_197[sa]("id","datePickerContainer");
_197.style.display="block";
var _198=doc[ce]("div");
_198.id="close";
$(_198).addClassName("dt_control");
var _199=doc[ce]("a");
_199[sa]("href","javascript: void(0);");
_199[sa]("id","cal_closeCalendar");
_199[sa]("title","Close");
_199[ac](doc.createTextNode(" "));
_198[ac](_199);
_197[ac](_198);
var _19a=doc[ce]("div");
_19a.id="previous";
$(_19a).addClassName("dt_control");
var _19b=doc[ce]("a");
_19b[ac](doc.createTextNode(" "));
_19b[sa]("href","javascript: void(0);");
_19b[sa]("id","cal_showPreviousMonth");
_19b[sa]("title","Previous month");
_19a[ac](_19b);
_197[ac](_19a);
var _19c=getCalendarTableMarkup();
var _19d=doc[ce]("div");
_19d.setAttribute("id","datePickerWrapper");
_19d.style.overflow="hidden";
for(var i=0;i<_175.calendarCount;i++){
_19d[ac](_19c.cloneNode(true));
}
_197[ac](_19d);
var _19f=doc[ce]("div");
_19f.id="next";
$(_19f).addClassName("dt_control");
var _1a0=doc[ce]("a");
_1a0[ac](doc.createTextNode(" "));
_1a0[sa]("href","javascript: void(0);");
_1a0[sa]("id","cal_showNextMonth");
_1a0[sa]("title","Next month");
_19f[ac](_1a0);
_197[ac](_19f);
$(_197).observe("click",globalEventHandler);
return _197;
}
function globalEventHandler(_1a1){
try{
switch(Event.findElement(_1a1,"a").id){
case "cal_closeCalendar":
self.hideDatePicker();
break;
case "cal_showPreviousMonth":
if(!Event.findElement(_1a1,"a").hasClassName("disabled")){
showPreviousMonth();
}
break;
case "cal_showNextMonth":
if(!Event.findElement(_1a1,"a").hasClassName("disabled")){
showNextMonth();
}
break;
default:
selectDate(Event.findElement(_1a1,"a"));
}
}
catch(e){
}
Event.stop(_1a1);
}
function bodyClickHandler(_1a2){
self.hideDatePicker();
}
function selectDate(_1a3){
if(_1a3&&_1a3.timeStamp){
var _1a4=new Date(_1a3.timeStamp);
var _1a5=(_1a4.getDate())+"/";
_1a5+=(_1a4.getMonth()+1)+"/";
_1a5+=_1a4.getFullYear();
_174.value=_1a5;
self.hideDatePicker();
_179=new Date(_1a4);
if(_174.readAttribute("selflabel")){
_174.removeClassName("selflabel");
}
_174.fire("ctCalendar:onChange");
}
}
function adjustPreviousNextLinksDisplay(){
var _1a6=getMinDate();
var _1a7=new Date(_1a6);
var _1a8=_178;
while(_1a8<0){
_1a8+=12;
}
_1a7.setMonth(_1a8);
if(_1a7.getMonth()<=_1a6.getMonth()&&_1a7.getFullYear()<=_1a6.getFullYear()){
$("cal_showPreviousMonth").addClassName("disabled");
}else{
$("cal_showPreviousMonth").removeClassName("disabled");
}
var _1a9=getMaxDate();
_1a7=new Date(_1a6);
var _1aa=_178+_175.calendarCount-1;
while(_1aa>12){
_1aa-=12;
}
_1a7.setMonth(_1aa);
if(_1a7.getMonth()>=_1a9.getMonth()&&_1a7.getFullYear()>=_1a9.getFullYear()){
$("cal_showNextMonth").addClassName("disabled");
}else{
$("cal_showNextMonth").removeClassName("disabled");
}
}
function showPreviousMonth(){
var _1ab=getCalendarTableMarkup();
$("datePickerWrapper").insertBefore(_1ab,$("datePickerWrapper").firstChild);
populateCalendarTable(_178-1,_1ab,getMinDate(),getMaxDate());
_178--;
adjustPreviousNextLinksDisplay();
$($("datePickerWrapper").getElementsByTagName("table")[_175.calendarCount]).remove();
ct.dom.removeIEIframeFix($("datePickerContainer"));
ct.dom.addIEIframeFix($("datePickerContainer"));
}
function showNextMonth(){
var _1ac=getCalendarTableMarkup();
$("datePickerWrapper").appendChild(_1ac);
populateCalendarTable(_178+_175.calendarCount,_1ac,getMinDate(),getMaxDate());
_178++;
adjustPreviousNextLinksDisplay();
$($("datePickerWrapper").getElementsByTagName("table")[0]).remove();
ct.dom.removeIEIframeFix($("datePickerContainer"));
ct.dom.addIEIframeFix($("datePickerContainer"));
}
function getMinDate(){
var _1ad;
if(_175.minDateField){
if(ct.dates.isValidDateString($F(_175.minDateField))){
_1ad=ct.dates.fromString($F(_175.minDateField));
}else{
if($(_175.minDateField).readAttribute("mindate")){
_1ad=ct.dates.fromString($(_175.minDateField).readAttribute("mindate"));
}else{
_1ad=null;
}
}
}else{
_1ad=_175.minDate;
}
if(_1ad){
_1ad.setDate(_1ad.getDate()+_175.offsetDays);
}
return new Date(_1ad);
}
function getMaxDate(){
if(_175.maxDate){
return new Date(_175.maxDate);
}else{
maxDate=new Date(getMinDate());
maxDate.setFullYear(maxDate.getFullYear()+1);
return maxDate;
}
}
function populateCalendarTable(_1ae,_1af,_1b0,_1b1){
var _1b2=new Date(_1b0);
var _1b3=ct.dates.monthNames;
ct.dates.setMonth(_1b2,_1ae);
_1b2.setDate(1);
_1ae%=12;
_1af.getElementsByTagName("th")[0].appendChild(document.createTextNode(_1b3[_1ae<0?_1ae+12:_1ae]+" "+_1b2.getFullYear()));
var _1b4=_1af.getElementsByTagName("tbody")[0].getElementsByTagName("td");
if(ct.dates.isValidDateString($F(_174))){
_179=ct.dates.fromString($F(_174));
}else{
_179=getMinDate();
}
var _1b5=_175.firstDayOfWeek;
$A(_1b4).each(function(cell){
if(_1b5===_1b2.getDay()&&_1b2.getMonth()===_1ae){
if(ct.dates.compare(_1b2,_1b0)===1||ct.dates.compare(_1b2,_1b1)===-1){
cell.appendChild(document.createTextNode(_1b2.getDate()));
}else{
var link=document.createElement("a");
link.href="javascript: void(0);";
link.timeStamp=_1b2.valueOf();
link.appendChild(document.createTextNode(_1b2.getDate()));
cell.appendChild(link);
}
if(_179.toString()==_1b2.toString()){
$(cell).addClassName("selected");
}
_1b2.setDate(_1b2.getDate()+1);
}else{
cell.appendChild(document.createTextNode(" "));
}
_1b5++;
_1b5%=7;
});
}
var _1b8=null;
this.showDatePicker=function(){
if(!_174.disabled){
this.hideDatePicker();
var _1b9=getCalendarMarkupOutline();
if(_175.minDateField&&ct.dates.isValidDateString($F(_175.minDateField))&&ct.dates.isValidDateString($F(_174))&&(ct.dates.fromString($F(_175.minDateField)).toString()>ct.dates.fromString($F(_174)).toString())){
_178=ct.dates.fromString($F(_175.minDateField)).getMonth()+(ct.dates.fromString($F(_175.minDateField)).getFullYear()-getMinDate().getFullYear())*12;
}else{
if(ct.dates.isValidDateString($F(_174))){
_178=ct.dates.fromString($F(_174)).getMonth()+(ct.dates.fromString($F(_174)).getFullYear()-getMinDate().getFullYear())*12;
}else{
if(_175.defaultDate){
_178=_175.defaultDate.getMonth()+(_175.defaultDate.getFullYear()-getMinDate().getFullYear())*12;
}else{
_178=getMinDate().getMonth();
}
}
}
document.body.appendChild(_1b9);
for(var i=0;i<_175.calendarCount;i++){
populateCalendarTable(_178+i,_1b9.getElementsByTagName("table")[i],getMinDate(),getMaxDate());
}
var pos=$(_174).cumulativeOffset();
var _1bc=document.viewport.getDimensions();
var _1bd=_1b9.getDimensions();
_1b9.style.position="absolute";
if((_1bc.height-_1bd.height-pos.top)>0){
_1b9.style.top=(pos.top+$(_174).getHeight())+"px";
}else{
_1b9.style.top=(pos.top-_1bd.height)+"px";
}
if((_1bc.width-pos.left-_1bd.width)>0){
_1b9.style.left=(pos.left)+"px";
}else{
_1b9.style.right=_1bc.width-pos.left-_174.getWidth()+"px";
}
adjustPreviousNextLinksDisplay();
ct.dom.addIEIframeFix(_1b9);
$(document.body).observe("click",bodyClickHandler);
}
};
this.hideDatePicker=function(){
if($("datePickerContainer")){
$("datePickerContainer").stopObserving("click",globalEventHandler);
ct.dom.removeIEIframeFix($("datePickerContainer"));
$("datePickerContainer").remove();
$(document.body).stopObserving("click",bodyClickHandler);
}
};
},AirportsDropdown:function(_1be,_1bf){
var self=this;
if(!_1bf){
_1bf={};
}
_1bf.showFeaturedAirports=_1bf.showFeaturedAirports||(_1be.readAttribute("showfeatured")&&_1be.readAttribute("showfeatured").toLowerCase()==="no")?false:true;
_1bf.preselectAirportCode=_1bf.preselectAirportCode||(_1be.readAttribute("preselect")&&_1be.readAttribute("preselect")!=="")?_1be.readAttribute("preselect"):null;
_1bf.cookieSelection=_1bf.cookieSelection||(_1be.readAttribute("cookieselection")&&_1be.readAttribute("cookieselection")==="no")?false:true;
try{
_1bf.extraValues=_1bf.extraValues||(_1be.readAttribute("extras")&&_1be.readAttribute("extras").strip().length>0)?eval("({"+_1be.readAttribute("extras").strip()+"})"):null;
}
catch(e){
_1bf.extraValues=null;
}
if(_1bf.cookieSelection&&_1be.readAttribute("cookiename")){
if(_1be.readAttribute("cookiename")===""){
throw new Error("Error initializing the airports dropdown. There was no cookie name found to store the selection. Use cookiename=\"some_cookie_name\" to specify the cookie name or cookieselection=\"no\" to disable saving cookies.");
}
}else{
_1bf.cookieName=_1be.readAttribute("cookiename");
}
ct.validator.attachValidation(_1be,"Please choose from the available "+_1be.title.toLowerCase()+".",function(){
return $F(_1be)!=="";
});
this.populate=function(){
if(_1be.firstChild){
_1be.removeChild(_1be.firstChild);
}
var key;
if(_1bf.extraValues){
Object.keys(_1bf.extraValues).each(function(key){
var _1c3=new Element("option",{value:key}).update(_1bf.extraValues[key]);
if(_1bf.preselectAirportCode&&_1bf.preselectAirportCode===_1bf.extraValues[key]){
_1c3.setAttribute("selected","selected");
}
_1be.appendChild(_1c3);
});
}else{
_1be.appendChild(new Element("option",{value:""}).update("Select location"));
}
_1be.appendChild(new Element("option",{value:""}).update("------------"));
if(_1bf.showFeaturedAirports){
$A(ct.airports.featured).each(function(_1c4){
_1be.appendChild(new Element("option",{value:_1c4.k}).update(_1c4.v));
});
_1be.appendChild(new Element("option",{value:""}).update("------------"));
}
$A(ct.airports.all).each(function(_1c5){
var _1c6=new Element("option",{value:_1c5.k}).update(_1c5.v);
if(_1bf.preselectAirportCode&&_1bf.preselectAirportCode===_1c5.k){
_1c6.writeAttribute("selected","selected");
}
_1be.appendChild(_1c6);
});
};
self.populate();
},AutoCompleteTextbox:function(_1c7,_1c8){
var _1c9={up:38,down:40,enter:13,escape:27};
var _1ca=0,_1cb="autocompleteOptionsContainer",_1cc=[],_1cd=null;
var _1ce="/images/indicators/arrows_circle.gif";
if(!ct.controls.AutoCompleteTextboxCache){
ct.controls.AutoCompleteTextboxCache={};
}
_1c8=_1c8||{};
_1c8.queryUrl=_1c8.queryUrl||_1c7.getAttribute("queryurl")||null;
_1c8.includeKeys=_1c8.includeKeys||_1c7.hasClassName("includeKeys");
_1c8.idField=_1c8.idField||_1c7.getAttribute("idfield")||null;
_1c8.displayRowCount=parseInt(_1c8.displayRowCount||_1c7.getAttribute("displayrows")||10,10);
_1c8.minChars=parseInt(_1c8.minChars||_1c7.getAttribute("minchars")||3,10);
_1c8.selectionHandler=_1c8.selectionHandler||_1c7.getAttribute("selectionhandler")||null;
_1c8.jsfunction=_1c8.jsfunction||_1c7.getAttribute("jsfunction")||null;
_1c7.setQueryUrl=function(url){
_1c7.setAttribute("queryUrl",url);
_1c8.queryUrl=new Template(url);
};
if($(_1c7).hasClassName("forceKey")){
ct.validator.attachValidation(_1c7,"We do not have the "+_1c7.title.toLowerCase()+" you entered on record. Please pick from one of the options that appear as you type.",function(){
if($(_1c7).value===""){
return true;
}
if(_1c7.readAttribute("selfLabel")===$F(_1c7)){
return true;
}
return $(_1c8.idField).value;
});
}
if(typeof _1c8.selectionHandler==="string"){
try{
_1c8.selectionHandler=eval(_1c8.selectionHandler);
}
catch(e){
throw new Error("From ct.controls.AutoCompleteTextbox: Unable to understand the selectionhandler attribute.");
}
}
if(!_1c8.idField){
throw new Error("From ct.controls.AutoCompleteTextbox: idfield attribute not defined.");
}
if(!$(_1c8.idField)||$(_1c8.idField).id!==_1c8.idField){
_1c7.parentNode.appendChild(new Element("input",{type:"hidden",id:_1c8.idField,name:_1c8.idField}));
}
if(ct.dom.getParentByTagName(_1c7,"form")){
$(ct.dom.getParentByTagName(_1c7,"form")).observe("submit",function(_1d0){
if($(_1cb)){
_1d0.stop();
}
});
}
$(_1c7).observe("blur",function(){
if($(_1cb)){
keyEnterPress();
}
removeAutocompleteDropdown();
});
$(_1c7).observe("keypress",function(_1d1){
if($(_1cb)&&_1d1.keyCode===_1c9.enter){
_1d1.stop();
}
});
$(_1c7).observe("focus",function(_1d2){
$(_1c7).select();
});
if(_1c8.queryUrl||_1c8.jsfunction){
if(_1c8.queryUrl){
_1c8.queryUrl=new Template(_1c8.queryUrl);
}
$(_1c7).observe("keyup",function(_1d3){
var _1d4="#"+_1d3.target.readAttribute("queryUrl");
if(_1d3.keyCode!==_1c9.enter){
$(_1c8.idField).value="";
}
if($F(_1c7)===""){
removeAutocompleteDropdown();
}else{
if($F(_1c7).length>=_1c8.minChars){
var key=$F(_1c7).toLowerCase();
if(ct.controls.AutoCompleteTextboxCache[key+_1d4]){
keystrokeHandler(_1d3,ct.controls.AutoCompleteTextboxCache[key+_1d4]);
}else{
if(_1cc["#"+key]){
return;
}else{
clearTimeout(_1cd);
_1cd=setTimeout(function(){
_1cc.push("#"+key);
_1c7.setStyle({backgroundPosition:"center right",backgroundImage:"url(\""+_1ce+"\")",backgroundRepeat:"no-repeat"});
if(_1c8.queryUrl){
new Ajax.Request(_1c8.queryUrl.evaluate({q:key}),{method:"get",onSuccess:function(_1d6){
ct.controls.AutoCompleteTextboxCache[key+_1d4]=eval(_1d6.responseText);
_1cc.splice("#"+key,1);
if(key===$F(_1c7).toLowerCase()){
keystrokeHandler(_1d3,ct.controls.AutoCompleteTextboxCache[key+_1d4]);
}
_1c7.setStyle({backgroundImage:"none"});
},onFailure:function(){
ct.controls.AutoCompleteTextboxCache.splice($A(ct.controls.AutoCompleteTextboxCache).indexOf(key+_1d4),1);
}});
}else{
if(_1c8.jsfunction){
function callback(_1d7){
ct.controls.AutoCompleteTextboxCache[key+_1d4]=_1d7;
_1cc.splice("#"+key,1);
if(key===$F(_1c7).toLowerCase()){
keystrokeHandler(_1d3,ct.controls.AutoCompleteTextboxCache[key+_1d4]);
}
_1c7.setStyle({backgroundImage:"none"});
}
var _1d8=eval(_1c8.jsfunction);
_1d8(key,callback);
}
}
},200);
}
}
}
}
});
}
_1c7.setAttribute("autocomplete","off");
function keystrokeHandler(evt,data){
var _1db=null;
try{
_1db=evt.keyCode;
}
catch(e){
}
switch(_1db){
case _1c9.up:
keyUpPress();
Event.stop(evt);
break;
case _1c9.down:
keyDownPress();
Event.stop(evt);
break;
case _1c9.escape:
removeAutocompleteDropdown();
Event.stop(evt);
break;
case _1c9.enter:
if($("autocompleteOptionsContainer")){
keyEnterPress(evt);
Event.stop(evt);
}
break;
default:
showAutocompleteDropdown(filterDataset(data));
break;
}
}
function filterDataset(_1dc){
return _1dc;
}
function showAutocompleteDropdown(_1dd){
if(_1dd.length>0){
var _1de;
if($(_1cb)){
while($(_1cb).firstChild){
$($(_1cb).firstChild).remove();
}
_1de=$(_1cb);
ct.dom.removeIEIframeFix(_1de);
}else{
_1de=new Element("ul",{"class":"aa",style:"visibility: hidden",id:_1cb});
}
var _1df=(_1c8.displayRowCount<_1dd.length)?_1c8.displayRowCount:_1dd.length;
for(var i=0;i<_1df;i++){
var li=new Element("li",{keyName:_1dd[i].k,index:i}).update(_1dd[i].d||_1dd[i].v);
li.dataObject=Object.clone(_1dd[i]);
_1de.appendChild(li);
}
document.body.appendChild(_1de);
var _1e2=_1c7.cumulativeOffset();
_1de.setStyle({top:_1e2.top+_1c7.getHeight()+"px",left:_1e2.left+"px",position:"absolute",visibility:"visible",width:_1c7.getWidth()+"px"});
ct.dom.addIEIframeFix(_1de);
_1de.observe("click",mouseClickHandler);
_1de.observe("mouseover",mouseOverHandler);
highlightSelection();
}else{
$(_1c8.idField).value="";
removeAutocompleteDropdown();
if(_1c8.callBack){
_1c8.callBack();
}
}
}
function mouseClickHandler(_1e3){
if(_1e3.findElement("li")&&_1e3.findElement("li").nodeName.toLowerCase()==="li"){
_1ca=_1e3.findElement("li").getAttribute("index");
highlightSelection();
keyEnterPress();
}
_1e3.stop();
}
function mouseOverHandler(_1e4){
if(_1e4.findElement("li")&&_1e4.findElement("li").nodeName.toLowerCase()==="li"){
_1ca=_1e4.findElement("li").getAttribute("index");
highlightSelection();
}
_1e4.stop();
}
function removeAutocompleteDropdown(){
if($(_1cb)){
ct.dom.removeIEIframeFix($(_1cb));
$(_1cb).stopObserving("click",mouseClickHandler);
$(_1cb).remove();
_1ca=0;
}
}
function keyDownPress(){
_1ca++;
highlightSelection();
}
function keyUpPress(){
_1ca--;
highlightSelection();
}
function keyEnterPress(evt){
if($(_1cb)&&$(_1cb).childNodes[_1ca]){
var _1e6=$(_1cb).childNodes[_1ca];
$(_1c8.idField).value=_1e6.readAttribute("keyName");
_1c7.value=_1e6.dataObject.v;
if(_1c8.selectionHandler){
_1c8.selectionHandler(_1e6.dataObject,_1c7);
}
if(evt){
evt.stop();
}
}
removeAutocompleteDropdown();
}
function highlightSelection(){
if($(_1cb)){
var _1e7=$(_1cb).childNodes.length;
_1ca=parseInt(_1ca,10);
if(_1ca>=_1e7){
_1ca=0;
}else{
if(_1ca<0){
_1ca=_1e7-1;
}
}
$A($(_1cb).childNodes).each(function(li,_1e9){
if(_1e9===_1ca){
li.addClassName("highlight");
}else{
li.removeClassName("highlight");
}
});
}
}
},Slider:function(_1ea){
var _1eb=$(_1ea).getElementsBySelector("input[type=text]");
var _1ec=new Element("div",{"class":"track"});
_1ea.appendChild(_1ec);
var _1ed=new Element("div",{"class":"leftDisabled"}),_1ee=new Element("div",{"class":"rightDisabled"});
var _1ef=parseFloat($(_1ea).readAttribute("minvalue")||0),_1f0=parseFloat($(_1ea).readAttribute("maxvalue")||10),_1f1=parseFloat($(_1ea).readAttribute("stepvalue")||1);
var _1f2=0,_1f3=_1ec.getWidth();
var _1f4=(_1f3-_1f2)/(_1f0-_1ef);
var _1f5=Math.ceil(_1f1*_1f4);
function getSliderRange(){
var _1f6=[];
var _1f7=_1f2;
while(_1f7<_1f3){
_1f6.push(_1f7);
_1f7+=_1f5;
}
_1f6.push(_1f3);
return _1f6;
}
function scaleToInternal(_1f8){
return ((_1f8-_1ef)*_1f4);
}
function scaleToUser(_1f9){
if(_1f9===_1f2){
return _1ef;
}else{
if(_1f9===_1f3){
return _1f0;
}
}
var _1fa=(_1f9/_1f4)+_1ef;
var _1fb=_1fa%_1f1;
if(_1fb<_1f1/2){
return _1fa-_1fb;
}else{
return _1fa+(_1f1-_1fb);
}
}
_1ea.minValue=_1ef;
_1ea.maxValue=_1f0;
if(_1eb.length===1){
if(_1ea.readAttribute("highlight")&&_1ea.readAttribute("highlight").toLowerCase()==="left"){
_1ec.appendChild(_1ee);
}else{
_1ee=null;
}
if(_1ea.readAttribute("highlight")&&_1ea.readAttribute("highlight").toLowerCase()==="right"){
_1ec.appendChild(_1ed);
}else{
_1ed=null;
}
var _1fc=new Element("div",{"class":"leftHandle"});
_1ec.appendChild(_1fc);
_1ea.sliderObj=new Control.Slider(_1fc,_1ec,{axis:"horizontal",range:$R(_1f2,_1f3),sliderValue:scaleToInternal(parseFloat(_1eb[0].getAttribute("value"))),startSpan:_1ed,endSpan:_1ee,values:getSliderRange(),onChange:function(vals){
vals=scaleToUser(vals);
_1eb[0].setAttribute("value",vals);
_1eb[0].value=vals;
_1ea.values=[vals];
_1ea.fire("ctslider:onChange");
},onSlide:function(vals){
_1ea.inSlideValues=scaleToUser(vals);
_1ea.fire("ctslider:onSlide");
}});
_1ea.sliderObj.setValue([scaleToInternal(parseFloat(_1eb[0].getAttribute("value")))]);
_1ea.inSlideValues=[parseFloat(_1eb[0].value)];
}else{
if(_1eb.length===2){
var _1ff=new Element("div",{id:"rangeHandleMin1","class":"leftHandle"});
var _200=new Element("div",{id:"rangeHandleMax1","class":"rightHandle"});
_1ec.appendChild(_1ed);
_1ec.appendChild(_1ee);
_1ec.appendChild(_1ff);
_1ec.appendChild(_200);
_1ea.sliderObj=new Control.Slider([_1ff,_200],_1ec,{axis:"horizontal",range:$R(_1f2,_1f3),sliderValue:[scaleToInternal(_1eb[0].getAttribute("value")),scaleToInternal(_1eb[1].getAttribute("value"))],startSpan:_1ed,endSpan:_1ee,values:getSliderRange(),restricted:true,onChange:function(vals){
var min=scaleToUser(vals[0]);
var max=scaleToUser(vals[1]);
var _204=_1ea.values;
if(!_204||(_204[0]!==min||_204[1]!==max)){
_1eb[0].setAttribute("value",min);
_1eb[1].setAttribute("value",max);
_1eb[0].value=min;
_1eb[1].value=max;
_1ea.values=[min,max];
_1ea.fire("ctslider:onChange");
}
},onSlide:function(vals){
var _206=_1ea.inSlideValues;
if(!_206||(_206[0]!==scaleToUser(vals[0])||_206[1]!==scaleToUser(vals[1]))){
_1ea.inSlideValues=[scaleToUser(vals[0]),scaleToUser(vals[1])];
_1ea.fire("ctslider:onSlide");
}
}});
_1ea.setValues=function(){
var _207=_1ea.sliderObj;
var vals=[_1eb[0].getAttribute("value"),_1eb[1].getAttribute("value")];
_207.setValue(scaleToInternal(vals[0]),0);
_207.setValue(scaleToInternal(vals[1]),1);
_1ea.inSlideValues=[vals[0],vals[1]];
_1ea.fire("ctslider:onSlide");
};
_1ea.setValues();
}
}
},CurrencyDropdown:function(_209){
if(window.currencies&&!_209.loaded){
var _20a=false,_20b=window.location.href.toQueryParams().currency||ct.cookies.read("currency-pref");
function addCurrency(_20c){
var _20d=new Element("option",{value:_20c.code,title:_20c.name}).update(_20c.code+" "+_20c.symbol+" - "+_20c.name);
if(_20c.code===_20b&&!_20a){
ct.currentCurrency=_20c;
_20d.writeAttribute("selected","selected");
_20a=true;
}
_209.appendChild(_20d);
}
function sortCurrenciesfunction(a,b){
var _a=a.code;
var _b=b.code;
if(_a>_b){
return 1;
}else{
if(_a<_b){
return -1;
}else{
return 0;
}
}
}
currencies.top=[{"code":"AED","rate":"12.740000005809","name":"UAE Dirham","symbol":"AED"},{"code":"EUR","rate":"66.860000380968","name":"Euro","symbol":"\u20ac"},{"code":"GBP","rate":"74.080000474112","name":"Pound Sterling","symbol":"\xa3"},{"code":"INR","rate":"1.00000","name":"Indian Rupee","symbol":"Rs."},{"code":"USD","rate":"45.870000053025","name":"United States Dollar","symbol":"$"}];
currencies.all.sort(sortCurrenciesfunction);
$A(currencies.top).each(addCurrency);
_209.appendChild(new Element("option",{value:"",title:""}).update("----------"));
$A(currencies.all).each(addCurrency);
if(!_20a){
var _212=$(_209).getElementsByTagName("option");
for(var i=0;i<_212.length;i++){
if(_212[i].value==="INR"){
_212[i].writeAttribute("selected","selected");
break;
}
}
}
$(_209).observe("change",function(){
var _214=false;
$A(currencies.all).each(function(_215){
if(_215.code===$F(_209)){
ct.currentCurrency=_215;
ct.cookies.create("currency-pref",_215.code,365);
_214=true;
}
});
if(!_214){
ct.helperFunctions.resetCurrency(true);
}else{
ct.helperFunctions.logToServer("currency","changed",{to:ct.currentCurrency.code});
}
$(_209).fire("ctcurrency:change");
});
$(_209).loaded=true;
}
},ToggleTabs:function(node,_217){
var _218=[];
if(!_217){
_217={};
}
_217.currentTabClass=_217.currentTabClass||(node.readAttribute("currentTabClass")?node.readAttribute("currentTabClass"):"");
_217.deactivatedTabClass=_217.deactivatedTabClass||(node.readAttribute("deactivatedTabClass")?node.readAttribute("deactivatedTabClass"):"");
$A(node.select("a[tabId]","a[tabid]")).each(function(tab){
_218.push(tab);
Event.observe(tab,"click",function(evt){
Event.stop(evt);
$A(_218).each(function(link){
link.removeClassName(_217.currentTabClass);
link.addClassName(_217.deactivatedTabClass);
$(link.readAttribute("tabId")).hide();
});
var _21c=$(evt.target);
if(_21c.tagName!=="A"){
_21c=_21c.up("a");
}
_21c.addClassName(_217.currentTabClass);
_21c.removeClassName(_217.deactivatedTabClass);
$(_21c.readAttribute("tabId")).show();
});
});
},parseDomTree:function(_21d){
_21d=$(_21d||document.body);
var _21e=ct.controls;
_21d.getElementsBySelector("input.datePicker").each(function(_21f){
new _21e.Calendar(_21f);
});
_21d.getElementsBySelector("select.airportsDropdown").each(function(_220){
new _21e.AirportsDropdown(_220);
});
_21d.getElementsBySelector("input.autocomplete").each(function(_221){
new _21e.AutoCompleteTextbox(_221);
});
if(window.Control&&Control.Slider){
var _222=new Date();
_21d.select(".slider").each(function(_223){
if(!_223.sliderObj){
new _21e.Slider(_223);
}
});
console.log("Slider creation total time: ",new Date()-_222);
}
if($("currency_dropdown")){
new ct.controls.CurrencyDropdown($("currency_dropdown"));
}
_21d.getElementsBySelector("ul.toggleTabs").each(function(ul){
new ct.controls.ToggleTabs(ul);
});
}},ajaxTimeoutHandler:{onCreate:function(_225){
_225.timeoutId=window.setTimeout(function(){
if($A([1,2,3]).indexOf(parseInt(_225.transport.readyState,10))!==-1){
_225.transport.abort();
alert("The server has taken too long to respond. This might be a problem with our servers, or your Internet connection.\n\nPlease try again later.");
if(_225.options.onFailure){
_225.options.onFailure(_225.transport,_225.json);
}
}
},window["customAjaxTimeout"]?customAjaxTimeout:90000);
},onComplete:function(_226){
window.clearTimeout(_226.timeoutId);
}}};
compareDates=ct.dates.compare;
toHomeForm=ct.helperFunctions.toHomeForm;
addRooms=ct.helperFunctions.addRooms;
alterChildren=ct.helperFunctions.alterChildren;
ct.genericBlocks.hotelForm.handleCitySelection=function(data){
$("country").writeAttribute("value",data.c?data.c:"");
$("state").writeAttribute("value",data.s?data.s:"");
};
ct.controls.Calendar._markupOutlineCache=null;
ct.helperFunctions.resetCurrency(false);
var pageTracker;
(function(){
function startupCode(){
ct.domIsLoaded=true;
ct.validator._initializeForms();
ct.selfLabels.parseDomTree();
if(typeof isCalendarPage=="undefined"){
ct.bubbles.parseDomTree();
}
ct.stickyBlocks.parseDomTree();
ct.genericBlocks.parseDomTree();
ct.controls.parseDomTree();
Event.observe(document,"click",function(){
if($("ct_bubbleNode")){
ct.dom.removeIEIframeFix($("ct_bubbleNode"));
$("ct_bubbleNode").remove();
}
});
setTimeout(ct.helperFunctions.prefetchResources,3000);
setTimeout(function(){
var _228=document.location.toString();
_228=_228.toQueryParams();
if(_228.host){
var _229=$("AirSearch")?$("AirSearch"):$("home_hotels");
_229.action="http://"+_228.host+($("AirSearch")?"/airInterstitial":"/hotelInterstitial");
if($("offer_nav")){
$("offer_nav").select("a").each(function(link){
link.href=link.href+"?host="+_228.host;
});
}
}
},3000);
var _22b=new Image();
var loc=window.location;
_22b.src=loc.protocol+"//"+loc.host+"/images/elements/error_arrow.gif";
ct.cookies.erase("ct-dom-style");
var _22d=new Element("script",{type:"text/javascript",src:"/javascripts/ga.js"});
document.getElementsByTagName("head")[0].appendChild(_22d);
var _22e=document.location.host.split(".");
var _22f=setInterval(function(){
if(window._gat&&_gat._getTracker){
clearInterval(_22f);
try{
if(_22e[0]==="www"){
pageTracker=_gat._getTracker("UA-8292447-1");
}else{
pageTracker=_gat._getTracker("UA-8292447-3");
}
pageTracker._initData();
pageTracker._trackPageview();
}
catch(e){
}
}
},100);
}
Event.observe(window,"load",startupCode);
Event.observe(window,"pageshow",function(evt){
if(evt.persisted){
startupCode();
}
});
})();
Ajax.Responders.register(ct.ajaxTimeoutHandler);
