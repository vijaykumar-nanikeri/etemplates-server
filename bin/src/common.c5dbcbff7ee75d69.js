"use strict";(self.webpackChunketemplates=self.webpackChunketemplates||[]).push([[592],{1792:(O,h,r)=>{r.d(h,{g:()=>l});var i=r(4893);let l=(()=>{class s{constructor(){this.editorConfig={extraPlugins:"\n      bidi,\n      colorbutton,\n      colordialog,\n      templates,\n      find,\n      font,\n      smiley,\n      justify,\n      preview,\n      print,\n      exportpdf",toolbar:[["Source","Preview","Templates","Print","ExportPdf"],["Cut","Copy","Paste","PasteText","PasteFromWord"],["Undo","Redo"],["Find","Replace","SelectAll","Scayt"],["Bold","Italic","Underline","Strike","Subscript","Superscript"],["CopyFormatting","RemoveFormat"],["NumberedList","BulletedList"],["Outdent","Indent"],["Blockquote"],["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock"],["BidiLtr","BidiRtl"],["Link","Unlink"],["Table","HorizontalRule","Smiley","SpecialChar"],["Styles","Format","Font","FontSize"],["TextColor","BGColor"],["Maximize"]],removeButtons:"",exportPdf_fileName:"eTemplate.pdf"}}getConfig(){return this.editorConfig}}return s.\u0275fac=function(p){return new(p||s)},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},9192:(O,h,r)=>{r.d(h,{m:()=>v});var i=r(9808),l=r(2382),s=r(6590),f=r(3708),p=r(8969),g=r(4893);let v=(()=>{class d{}return d.\u0275fac=function(R){return new(R||d)},d.\u0275mod=g.oAB({type:d}),d.\u0275inj=g.cJS({providers:[f.z,p.i],imports:[[i.ez,l.u5,l.UX,s.d],l.u5,l.UX,s.d]}),d})()},6590:(O,h,r)=>{r.d(h,{u:()=>M,d:()=>P});var d,i=r(4893),l=r(9808),s=r(2382);function g(n,a){n.onload=function(){this.onerror=this.onload=null,a(null,n)},n.onerror=function(){this.onerror=this.onload=null,a(new Error("Failed to load "+this.src),n)}}function v(n,a){n.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,a(null,n))}}function m(n,a){return"CKEDITOR"in window?Promise.resolve(CKEDITOR):"string"!=typeof n||n.length<1?Promise.reject(new TypeError("CKEditor URL must be a non-empty string.")):(d||(d=m.scriptLoader(n).then(function(e){return a&&a(e),e})),d)}function D(n,a){}m.scriptLoader=function(n){return new Promise(function(a,e){!function f(n,a,e){var t=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script");"function"==typeof a&&(e=a,a={}),e=e||function(){},o.type=(a=a||{}).type||"text/javascript",o.charset=a.charset||"utf8",o.async=!("async"in a)||!!a.async,o.src=n,a.attrs&&function p(n,a){for(var e in a)n.setAttribute(e,a[e])}(o,a.attrs),a.text&&(o.text=String(a.text)),("onload"in o?g:v)(o,e),o.onload||g(o,e),t.appendChild(o)}(n,function(t){return d=void 0,t?e(t):window.CKEDITOR?void a(CKEDITOR):e(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace."))})})};let M=(()=>{class n{constructor(e,t){this.elementRef=e,this.ngZone=t,this.editorUrl="https://cdn.ckeditor.com/4.17.2/standard-all/ckeditor.js",this.tagName="textarea",this.type="classic",this.namespaceLoaded=new i.vpe,this.ready=new i.vpe,this.dataReady=new i.vpe,this.change=new i.vpe,this.dataChange=new i.vpe,this.dragStart=new i.vpe,this.dragEnd=new i.vpe,this.drop=new i.vpe,this.fileUploadResponse=new i.vpe,this.fileUploadRequest=new i.vpe,this.focus=new i.vpe,this.paste=new i.vpe,this.afterPaste=new i.vpe,this.blur=new i.vpe,this._readOnly=null,this._data=null,this._destroyed=!1}set data(e){if(e!==this._data){if(this.instance)return this.instance.setData(e),void(this._data=this.instance.getData());this._data=e}}get data(){return this._data}set readOnly(e){this.instance?this.instance.setReadOnly(e):this._readOnly=e}get readOnly(){return this.instance?this.instance.readOnly:this._readOnly}ngAfterViewInit(){m(this.editorUrl,e=>{this.namespaceLoaded.emit(e)}).then(()=>{this._destroyed||this.ngZone.runOutsideAngular(this.createEditor.bind(this))}).catch(window.console.error)}ngOnDestroy(){this._destroyed=!0,this.ngZone.runOutsideAngular(()=>{this.instance&&(this.instance.destroy(),this.instance=null)})}writeValue(e){this.data=e}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}createEditor(){var e,t;const o=document.createElement(this.tagName);this.elementRef.nativeElement.appendChild(o);const u=null===(t=null===(e=this.config)||void 0===e?void 0:e.on)||void 0===t?void 0:t.instanceReady,C=Object.assign(Object.assign({},{delayIfDetached:!0}),this.config);void 0===C.on&&(C.on={}),C.on.instanceReady=E=>{const c=E.editor;this.instance=c,this.readOnly=null!==this._readOnly?this._readOnly:this.instance.readOnly,this.subscribe(this.instance);const _=c.undoManager;null!==this.data?(_&&_.lock(),c.setData(this.data,{callback:()=>{this.data!==c.getData()&&c.fire(_?"change":"dataReady"),_&&_.unlock(),this.ngZone.run(()=>{"function"==typeof u&&u(E),this.ready.emit(E)})}})):this.ngZone.run(()=>{"function"==typeof u&&u(E),this.ready.emit(E)})},"inline"===this.type?CKEDITOR.inline(o,C):CKEDITOR.replace(o,C)}subscribe(e){e.on("focus",t=>{this.ngZone.run(()=>{this.focus.emit(t)})}),e.on("paste",t=>{this.ngZone.run(()=>{this.paste.emit(t)})}),e.on("afterPaste",t=>{this.ngZone.run(()=>{this.afterPaste.emit(t)})}),e.on("dragend",t=>{this.ngZone.run(()=>{this.dragEnd.emit(t)})}),e.on("dragstart",t=>{this.ngZone.run(()=>{this.dragStart.emit(t)})}),e.on("drop",t=>{this.ngZone.run(()=>{this.drop.emit(t)})}),e.on("fileUploadRequest",t=>{this.ngZone.run(()=>{this.fileUploadRequest.emit(t)})}),e.on("fileUploadResponse",t=>{this.ngZone.run(()=>{this.fileUploadResponse.emit(t)})}),e.on("blur",t=>{this.ngZone.run(()=>{this.onTouched&&this.onTouched(),this.blur.emit(t)})}),e.on("dataReady",this.propagateChange,this),e.on(this.instance.undoManager?"change":"selectionCheck",this.propagateChange,this)}propagateChange(e){this.ngZone.run(()=>{const t=this.instance.getData();"change"===e.name?this.change.emit(e):"dataReady"===e.name&&this.dataReady.emit(e),t!==this.data&&(this._data=t,this.dataChange.emit(t),this.onChange&&this.onChange(t))})}}return n.\u0275fac=function(e){return new(e||n)(i.Y36(i.SBq),i.Y36(i.R0b))},n.\u0275cmp=i.Xpm({type:n,selectors:[["ckeditor"]],inputs:{editorUrl:"editorUrl",tagName:"tagName",type:"type",data:"data",readOnly:"readOnly",config:"config"},outputs:{namespaceLoaded:"namespaceLoaded",ready:"ready",dataReady:"dataReady",change:"change",dataChange:"dataChange",dragStart:"dragStart",dragEnd:"dragEnd",drop:"drop",fileUploadResponse:"fileUploadResponse",fileUploadRequest:"fileUploadRequest",focus:"focus",paste:"paste",afterPaste:"afterPaste",blur:"blur"},features:[i._Bn([{provide:s.JU,useExisting:(0,i.Gpc)(()=>n),multi:!0}])],decls:1,vars:0,template:function(e,t){1&e&&i.YNc(0,D,0,0,"ng-template")},encapsulation:2}),n})(),P=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[[s.u5,l.ez]]}),n})()}}]);