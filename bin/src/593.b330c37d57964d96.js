"use strict";(self.webpackChunketemplates=self.webpackChunketemplates||[]).push([[593],{4593:(y,M,i)=>{i.r(M),i.d(M,{HomeModule:()=>J});var a=i(9808),b=i(9127),e=i(4893),P=i(6804),h=i(980),n=i(4995),C=i(1134),g=i(6892),u=i(5850),p=i(6448);const d=function(l){return{active:l}};function f(l,w){if(1&l){const s=e.EpF();e.TgZ(0,"li",10),e.TgZ(1,"a",11),e.NdJ("click",function(){const _=e.CHM(s).$implicit;return e.oxw().navigate(_)}),e._uU(2),e.qZA(),e.TgZ(3,"a",12),e.NdJ("click",function(){const _=e.CHM(s).$implicit;return e.oxw().navigate(_)}),e._uU(4),e.qZA(),e.qZA()}if(2&l){const s=w.$implicit,c=e.oxw();e.Gre("nav-item d-flex mb-4 py-1 ps-2 ",s.classNames,""),e.Q6J("ngClass",e.VKq(6,d,s.basePath&&c.url.includes(s.basePath))),e.xp6(2),e.hij(" ",s.name," "),e.xp6(2),e.hij(" ",s.name," ")}}function T(l,w){if(1&l){const s=e.EpF();e.TgZ(0,"li"),e.TgZ(1,"a",13),e.NdJ("click",function(){const _=e.CHM(s).$implicit;return e.oxw().openUserMenu(_)}),e._uU(2),e.qZA(),e.qZA()}if(2&l){const s=w.$implicit;e.Gre("nav-item d-flex mb-4 py-1 ps-2 ",s.classNames,""),e.xp6(2),e.hij(" ",s.name," ")}}let U=(()=>{class l{constructor(s,c,x,_,Z,I){this.location=s,this.router=c,this.modalService=x,this.httpService=_,this.authService=Z,this.logoutService=I,this.menus=[],this.userMenus=[],this.url="",this.router.events.subscribe(()=>{this.url=this.location.path()})}ngOnInit(){this.appDetails=this.authService.getAppDetails(),this.userDetails=this.authService.getUserDetails(),this.getMenus(),this.getUserMenus()}getMenus(){var s;this.httpService.get(`${n.n.Menus}/${null===(s=this.userDetails)||void 0===s?void 0:s.userCategoryId}`).subscribe(c=>{this.menus=null==c?void 0:c.data},c=>{console.log(c)})}getUserMenus(){var s;this.httpService.get(`${n.n.UserMenus}/${null===(s=this.userDetails)||void 0===s?void 0:s.userCategoryId}`).subscribe(c=>{this.userMenus=null==c?void 0:c.data},c=>{console.log(c)})}navigate(s){const c=[s.basePath,s.path].join("/");this.router.navigate([c])}openUserMenu(s){"profile_details"===s.code?this.profileDetails():"change_password"===s.code?this.changePassword():"logout"===s.code&&this.logoutService.logout()}profileDetails(){this.modalService.show(P.M,{class:"modal-dialog-centered"})}changePassword(){this.modalService.show(h.p)}}return l.\u0275fac=function(s){return new(s||l)(e.Y36(a.Ye),e.Y36(b.F0),e.Y36(C.tT),e.Y36(g.O),e.Y36(u.e),e.Y36(p.P))},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-aside"]],decls:11,vars:3,consts:[[1,"navbar","navbar-dark","navbar-expand-sm","justify-content-around","justify-content-sm-start","h-100","px-sm-0","py-0","fixed-start","shadow-lg"],["href","#",1,"navbar-brand","w-50","py-0"],[1,"display-6","text-light","app-title-font-family","pa-logo"],["type","button","data-bs-toggle","collapse","data-bs-target","#appMenus",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","appMenus",1,"collapse","navbar-collapse","py-3","pe-2","ps-3","ps-md-4","overflow-auto"],[1,"navbar-nav","me-auto","mb-2","mb-lg-0","fw-bold"],[3,"class","ngClass",4,"ngFor","ngForOf"],[1,"navbar-nav","d-block","d-sm-none","me-auto","mb-2","mb-lg-0","pt-4","border-top","fw-bold"],[3,"class",4,"ngFor","ngForOf"],[3,"ngClass"],["data-bs-toggle","collapse","data-bs-target","#appMenus",1,"nav-link","d-block","d-sm-none","w-75","ms-2","p-0","text-white","cursor-pointer",3,"click"],[1,"nav-link","d-none","d-sm-block","w-75","ms-2","p-0","text-white","cursor-pointer",3,"click"],["data-bs-toggle","collapse","data-bs-target","#appMenus",1,"nav-link","w-75","ms-2","p-0","text-white","cursor-pointer",3,"click"]],template:function(s,c){1&s&&(e.TgZ(0,"nav",0),e.TgZ(1,"a",1),e.TgZ(2,"div",2),e._uU(3),e.qZA(),e.qZA(),e.TgZ(4,"button",3),e._UZ(5,"span",4),e.qZA(),e.TgZ(6,"div",5),e.TgZ(7,"ul",6),e.YNc(8,f,5,8,"li",7),e.qZA(),e.TgZ(9,"ul",8),e.YNc(10,T,3,4,"li",9),e.qZA(),e.qZA(),e.qZA()),2&s&&(e.xp6(3),e.hij(" ",null==c.appDetails?null:c.appDetails.name," "),e.xp6(5),e.Q6J("ngForOf",c.menus),e.xp6(2),e.Q6J("ngForOf",c.userMenus))},directives:[a.sg,a.mk],styles:['.navbar.fixed-start[_ngcontent-%COMP%]{background:transparent linear-gradient(163deg,#162252 0%,#1b3f8b 88%,#4d6fac 100%) 0% 0% no-repeat padding-box;z-index:1}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]{height:5rem}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]   .pa-logo[_ngcontent-%COMP%]{margin-top:10%;margin-left:5%}.nav-link-before[_ngcontent-%COMP%], .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-logout[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-change-password[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-profile-details[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-users[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-user-templates[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-draft-template[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-templates[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-library[_ngcontent-%COMP%]:before, .navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-categories[_ngcontent-%COMP%]:before{content:"";background-repeat:no-repeat;background-size:1.25rem 1.25rem;width:1.25rem;height:1.25rem}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-categories[_ngcontent-%COMP%]:before{background-image:url(menu-icon-categories.78c84600509d74c0.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-library[_ngcontent-%COMP%]:before{background-image:url(menu-icon-library.bdb5a8a6ffb0932a.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-templates[_ngcontent-%COMP%]:before{background-image:url(menu-icon-templates.db8c52741f63a8b8.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-draft-template[_ngcontent-%COMP%]:before{background-image:url(menu-icon-draft-template.623f70aa16ffec8f.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-user-templates[_ngcontent-%COMP%]:before{background-image:url(menu-icon-user-templates.98a9f6e602733c90.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-users[_ngcontent-%COMP%]:before{background-image:url(menu-icon-users.1eb75f9cd0541e3e.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-profile-details[_ngcontent-%COMP%]:before{background-image:url(menu-icon-profile-details.bdc06259ef5bcc2e.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-change-password[_ngcontent-%COMP%]:before{background-image:url(menu-icon-change-password.b9ddae361dc0822c.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.menu-logout[_ngcontent-%COMP%]:before{background-image:url(menu-icon-logout.d3e142b2d507108c.svg)}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%]{background-color:#27408b}.navbar[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:not(.active):hover{background-color:#27408b80}@media (max-width: 575.98px){.navbar[_ngcontent-%COMP%]{position:absolute;width:100%;height:auto!important}}@media (min-width: 576px){.navbar.fixed-start[_ngcontent-%COMP%]{position:absolute}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]{width:100%!important}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]   .pa-logo[_ngcontent-%COMP%]{margin-left:10%}}@media (min-width: 576px) and (max-width: 767.98px){.navbar.fixed-start[_ngcontent-%COMP%]{width:33.3333333333%}}@media (min-width: 768px) and (max-width: 991.98px){.navbar.fixed-start[_ngcontent-%COMP%]{width:25%}}@media (min-width: 992px) and (max-width: 1199.98px){.navbar.fixed-start[_ngcontent-%COMP%]{width:20.8333333333%}}@media (min-width: 1200px){.navbar.fixed-start[_ngcontent-%COMP%]{width:16.6666666667%}}@media (min-width: 576px){.navbar.fixed-start[_ngcontent-%COMP%]{bottom:0;right:auto;flex-flow:column nowrap;align-items:flex-start}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]{flex-grow:0;flex-direction:column;width:100%}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]{flex-direction:column;width:100%}.navbar.fixed-start[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]{width:100%}}']}),l})();const k=[{path:"",component:(()=>{class l{constructor(){}ngOnInit(){}}return l.\u0275fac=function(s){return new(s||l)},l.\u0275cmp=e.Xpm({type:l,selectors:[["app-home"]],decls:6,vars:0,consts:[[1,"container-fluid","px-0","overflow-auto","home-body","bg-light"],[1,"row","m-0"],[1,"col-between-sm-md-4","col-between-md-lg-3","col-lg-2-5","col-xl-2","p-0"],[1,"col-between-sm-md-8","col-between-md-lg-9","col-lg-9-5","col-xl-10","p-0","bg-light","app-main"]],template:function(s,c){1&s&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._UZ(3,"app-aside"),e.qZA(),e.TgZ(4,"div",3),e._UZ(5,"router-outlet"),e.qZA(),e.qZA(),e.qZA())},directives:[U,b.lC],styles:[".home-body[_ngcontent-%COMP%]{height:100vh}@media (max-width: 575.98px){.app-main[_ngcontent-%COMP%]{margin-top:5rem}}@media (min-width: 576px){.home-body[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]:first-child{height:100%}}@media (min-width: 576px) and (max-width: 767px){.col-between-sm-md-4[_ngcontent-%COMP%]{flex:0 0 auto;width:33.3333333333%}.col-between-sm-md-8[_ngcontent-%COMP%]{flex:0 0 auto;width:66.6666666667%}}@media (min-width: 768px) and (max-width: 991px){.col-between-md-lg-3[_ngcontent-%COMP%]{flex:0 0 auto;width:25%}.col-between-md-lg-9[_ngcontent-%COMP%]{flex:0 0 auto;width:75%}}@media (min-width: 992px) and (max-width: 1199px){.col-lg-2-5[_ngcontent-%COMP%]{flex:0 0 auto;width:20.8333333333%}.col-lg-9-5[_ngcontent-%COMP%]{flex:0 0 auto;width:79.1666666667%}}"]}),l})(),children:[{path:"",loadChildren:()=>i.e(344).then(i.bind(i,344)).then(l=>l.MainModule)}]}];let q=(()=>{class l{}return l.\u0275fac=function(s){return new(s||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[[a.ez,b.Bz.forChild(k)],b.Bz]}),l})(),J=(()=>{class l{}return l.\u0275fac=function(s){return new(s||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[[a.ez,q]]}),l})()},980:(y,M,i)=>{i.d(M,{p:()=>j});var a=i(2382),b=i(2009),e=i(4995),P=(()=>{return(o=P||(P={}))[o.MinLength=6]="MinLength",o[o.MaxLength=16]="MaxLength",o.Pattern="^[A-Za-z0-9!#$+-@^_~]+$",o.RequiredValidationFeedback="Field is required.",o.MinLengthValidationFeedback="Minimum length of the field is 6.",o.MaxLengthValidationFeedback="Maximum length of the field is 16.",o.PatternValidationFeedback="Invalid pattern.",o.MinLengthInstruction="Minimum length of the password is <code>6</code>.",o.MaxLengthInstruction="Maximum length of the password is <code>16</code>.",o.PatternInstruction="\n    Characters Allowed:\n    Case-insensitive,\n    Numbers,\n    Special (<code>!</code>,\n      <code>#</code>,\n      <code>$</code>,\n      <code>+</code>,\n      <code>-</code>,\n      <code>@</code>,\n      <code>^</code>,\n      <code>_</code>,\n      <code>~</code>\n      only)",o.PasswordsMismatchValidationFeedback="Passwords do not match.",P;var o})(),h=(()=>{return(o=h||(h={})).Title="Change Password",o.OldPassword="Old Password",o.OldPasswordPlaceholder="Old Password",o.NewPassword="New Password",o.NewPasswordPlaceholder="New Password",o.ConfirmPassword="Confirm Password",o.ConfirmPasswordPlaceholder="Confirm Password",o.Cancel="Cancel",o.ChangePassword="Change Password",h;var o})(),n=i(4893),C=i(1134),g=i(5976),u=i(6892),p=i(5850),d=i(9808);function f(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.RequiredValidationFeedback," ")}}function T(o,v){if(1&o&&(n.TgZ(0,"div",19),n.YNc(1,f,2,1,"div",20),n.qZA()),2&o){const t=n.oxw();n.xp6(1),n.Q6J("ngIf",(null==t.oldPassword?null:t.oldPassword.errors).required)}}function U(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.RequiredValidationFeedback," ")}}function A(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.MinLengthValidationFeedback," ")}}function k(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.MaxLengthValidationFeedback," ")}}function q(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.PatternValidationFeedback," ")}}function J(o,v){if(1&o&&(n.TgZ(0,"div",19),n.YNc(1,U,2,1,"div",20),n.YNc(2,A,2,1,"div",20),n.YNc(3,k,2,1,"div",20),n.YNc(4,q,2,1,"div",20),n.qZA()),2&o){const t=n.oxw();n.xp6(1),n.Q6J("ngIf",(null==t.newPassword?null:t.newPassword.errors).required),n.xp6(1),n.Q6J("ngIf",(null==t.newPassword?null:t.newPassword.errors).minlength),n.xp6(1),n.Q6J("ngIf",(null==t.newPassword?null:t.newPassword.errors).maxlength),n.xp6(1),n.Q6J("ngIf",(null==t.newPassword?null:t.newPassword.errors).pattern)}}function l(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.RequiredValidationFeedback," ")}}function w(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.MinLengthValidationFeedback," ")}}function s(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.MaxLengthValidationFeedback," ")}}function c(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.PatternValidationFeedback," ")}}function x(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.PasswordsMismatchValidationFeedback," ")}}function _(o,v){if(1&o&&(n.TgZ(0,"div",19),n.YNc(1,l,2,1,"div",20),n.YNc(2,w,2,1,"div",20),n.YNc(3,s,2,1,"div",20),n.YNc(4,c,2,1,"div",20),n.YNc(5,x,2,1,"div",20),n.qZA()),2&o){const t=n.oxw();n.xp6(1),n.Q6J("ngIf",(null==t.confirmPassword?null:t.confirmPassword.errors).required),n.xp6(1),n.Q6J("ngIf",(null==t.confirmPassword?null:t.confirmPassword.errors).minlength),n.xp6(1),n.Q6J("ngIf",(null==t.confirmPassword?null:t.confirmPassword.errors).maxlength),n.xp6(1),n.Q6J("ngIf",(null==t.confirmPassword?null:t.confirmPassword.errors).pattern),n.xp6(1),n.Q6J("ngIf",(null==t.confirmPassword?null:t.confirmPassword.errors).passwordsMismatch)}}function Z(o,v){if(1&o&&(n.TgZ(0,"div"),n._uU(1),n.qZA()),2&o){const t=n.oxw(2);n.xp6(1),n.hij(" ",t.passwordFormControlLabels.PasswordsMismatchValidationFeedback," ")}}function I(o,v){if(1&o&&(n.TgZ(0,"div",19),n.YNc(1,Z,2,1,"div",20),n.qZA()),2&o){const t=n.oxw();n.xp6(1),n.Q6J("ngIf",(null==t.changePasswordForm?null:t.changePasswordForm.errors).passwordsMismatch)}}const Y=function(o){return{"is-invalid":o}};let j=(()=>{class o{constructor(t,r,m,O,F){this.fb=t,this.modalRef=r,this.toastService=m,this.httpService=O,this.authService=F,this.isChangePasswordFormSubmitted=!1}ngOnInit(){this.changePasswordModalLabels=h,this.passwordFormControlLabels=P,this.userDetails=this.authService.getUserDetails(),this.changePasswordForm=this.fb.group({oldPassword:["",[a.kI.required]],newPassword:["",[a.kI.required,a.kI.minLength(this.passwordFormControlLabels.MinLength),a.kI.maxLength(this.passwordFormControlLabels.MaxLength),a.kI.pattern(this.passwordFormControlLabels.Pattern)]],confirmPassword:["",[a.kI.required,a.kI.minLength(this.passwordFormControlLabels.MinLength),a.kI.maxLength(this.passwordFormControlLabels.MaxLength),a.kI.pattern(this.passwordFormControlLabels.Pattern)]]},{validator:this.passwordsMatchValidator()})}passwordsMatchValidator(){return()=>{var t,r,m,O,F;(null===(t=this.confirmPassword)||void 0===t?void 0:t.errors)&&!this.confirmPassword.errors.passwordsMismatch||((null===(r=this.newPassword)||void 0===r?void 0:r.value)!==(null===(m=this.confirmPassword)||void 0===m?void 0:m.value)?null===(O=this.confirmPassword)||void 0===O||O.setErrors({passwordsMismatch:!0}):null===(F=this.confirmPassword)||void 0===F||F.setErrors(null))}}get oldPassword(){var t;return null===(t=this.changePasswordForm)||void 0===t?void 0:t.get("oldPassword")}get newPassword(){var t;return null===(t=this.changePasswordForm)||void 0===t?void 0:t.get("newPassword")}get confirmPassword(){var t;return null===(t=this.changePasswordForm)||void 0===t?void 0:t.get("confirmPassword")}cancelChangePasswordModal(){var t;null===(t=this.modalRef)||void 0===t||t.hide(),this.changePasswordForm.reset()}closeChangePasswordModal(){var t;null===(t=this.modalRef)||void 0===t||t.hide(),this.changePasswordForm.reset()}changePassword(){var t;if(this.isChangePasswordFormSubmitted=!0,this.changePasswordForm.valid){const r={userId:null===(t=this.userDetails)||void 0===t?void 0:t.id,oldPassword:this.changePasswordForm.controls.oldPassword.value,newPassword:this.changePasswordForm.controls.newPassword.value};this.httpService.put(`${e.n.Users}/changePassword`,r).subscribe(m=>{(null==m?void 0:m.statusCode)===b.W.UNAUTHORIZED?this.toastService.error(null==m?void 0:m.statusMessage):(null==m?void 0:m.message)&&this.toastService.success(null==m?void 0:m.message)},m=>{console.log(m)},()=>{var m;null===(m=this.modalRef)||void 0===m||m.hide(),this.isChangePasswordFormSubmitted=!1,this.changePasswordForm.reset()})}}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(a.qu),n.Y36(C.UZ),n.Y36(g.jE),n.Y36(u.O),n.Y36(p.e))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-change-password"]],decls:41,vars:26,consts:[[1,"modal-header","px-5","pt-5","border-bottom-0"],[1,"modal-title","fs-6"],["type","button",1,"btn-close",3,"click"],[1,"modal-body","px-5"],[3,"formGroup"],[1,"mb-3"],["for","oldPassword",1,"form-label","fw-bold"],[1,"text-danger"],["type","password","id","oldPassword","formControlName","oldPassword",1,"form-control",3,"ngClass","placeholder"],["class","invalid-feedback",4,"ngIf"],["for","newPassword",1,"form-label","fw-bold"],["type","password","id","newPassword","formControlName","newPassword",1,"form-control",3,"ngClass","placeholder"],["for","confirmPassword",1,"form-label","fw-bold"],["type","password","id","confirmPassword","formControlName","confirmPassword",1,"form-control",3,"ngClass","placeholder"],[1,"list-unstyled","p-2","bg-light","border-top","border-bottom","text-muted"],[3,"innerHtml"],[1,"modal-footer","px-5","pb-5","border-top-0"],["type","button",1,"btn","btn-link","btn-sm","text-reset","text-uppercase","text-decoration-none",3,"click"],["type","button",1,"btn","btn-primary","btn-sm","text-uppercase",3,"click"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(t,r){1&t&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n._uU(2),n.qZA(),n.TgZ(3,"button",2),n.NdJ("click",function(){return r.closeChangePasswordModal()}),n.qZA(),n.qZA(),n.TgZ(4,"div",3),n.ynx(5,4),n.TgZ(6,"div",5),n.TgZ(7,"label",6),n._uU(8),n.TgZ(9,"span",7),n._uU(10,"*"),n.qZA(),n.qZA(),n._UZ(11,"input",8),n.YNc(12,T,2,1,"div",9),n.qZA(),n.TgZ(13,"div",5),n._UZ(14,"hr"),n.qZA(),n.TgZ(15,"div",5),n.TgZ(16,"label",10),n._uU(17),n.TgZ(18,"span",7),n._uU(19,"*"),n.qZA(),n.qZA(),n._UZ(20,"input",11),n.YNc(21,J,5,4,"div",9),n.qZA(),n.TgZ(22,"div",5),n.TgZ(23,"label",12),n._uU(24),n.TgZ(25,"span",7),n._uU(26,"*"),n.qZA(),n.qZA(),n._UZ(27,"input",13),n.YNc(28,_,6,5,"div",9),n.YNc(29,I,2,1,"div",9),n.qZA(),n.TgZ(30,"div",5),n._UZ(31,"hr"),n.qZA(),n.TgZ(32,"ul",14),n._UZ(33,"li",15),n._UZ(34,"li",15),n._UZ(35,"li",15),n.qZA(),n.BQk(),n.qZA(),n.TgZ(36,"div",16),n.TgZ(37,"button",17),n.NdJ("click",function(){return r.cancelChangePasswordModal()}),n._uU(38),n.qZA(),n.TgZ(39,"button",18),n.NdJ("click",function(){return r.changePassword()}),n._uU(40),n.qZA(),n.qZA()),2&t&&(n.xp6(2),n.Oqu(r.changePasswordModalLabels.Title),n.xp6(3),n.Q6J("formGroup",r.changePasswordForm),n.xp6(3),n.hij(" ",r.changePasswordModalLabels.OldPassword," "),n.xp6(3),n.Q6J("ngClass",n.VKq(20,Y,r.isChangePasswordFormSubmitted&&(null==r.oldPassword?null:r.oldPassword.invalid)))("placeholder",r.changePasswordModalLabels.OldPasswordPlaceholder),n.xp6(1),n.Q6J("ngIf",r.isChangePasswordFormSubmitted&&(null==r.oldPassword?null:r.oldPassword.invalid)),n.xp6(5),n.hij(" ",r.changePasswordModalLabels.NewPassword," "),n.xp6(3),n.Q6J("ngClass",n.VKq(22,Y,r.isChangePasswordFormSubmitted&&(null==r.newPassword?null:r.newPassword.invalid)))("placeholder",r.changePasswordModalLabels.NewPasswordPlaceholder),n.xp6(1),n.Q6J("ngIf",r.isChangePasswordFormSubmitted&&(null==r.newPassword?null:r.newPassword.invalid)),n.xp6(3),n.hij(" ",r.changePasswordModalLabels.ConfirmPassword," "),n.xp6(3),n.Q6J("ngClass",n.VKq(24,Y,r.isChangePasswordFormSubmitted&&(null==r.confirmPassword?null:r.confirmPassword.invalid)))("placeholder",r.changePasswordModalLabels.ConfirmPasswordPlaceholder),n.xp6(1),n.Q6J("ngIf",r.isChangePasswordFormSubmitted&&(null==r.confirmPassword?null:r.confirmPassword.invalid)),n.xp6(1),n.Q6J("ngIf",r.isChangePasswordFormSubmitted&&(null==r.changePasswordForm?null:r.changePasswordForm.invalid)&&(null==r.changePasswordForm?null:r.changePasswordForm.errors)),n.xp6(4),n.Q6J("innerHtml",r.passwordFormControlLabels.MinLengthInstruction,n.oJD),n.xp6(1),n.Q6J("innerHtml",r.passwordFormControlLabels.MaxLengthInstruction,n.oJD),n.xp6(1),n.Q6J("innerHtml",r.passwordFormControlLabels.PatternInstruction,n.oJD),n.xp6(3),n.hij(" ",r.changePasswordModalLabels.Cancel," "),n.xp6(2),n.hij(" ",r.changePasswordModalLabels.ChangePassword," "))},directives:[a.JL,a.sg,a.Fj,a.JJ,a.u,d.mk,d.O5],styles:[""]}),o})()},9057:(y,M,i)=>{i.d(M,{X:()=>P});var a=i(4893),b=i(1134),e=i(9808);let P=(()=>{class h{constructor(C){this.modalRef=C,this.outputEmitter=new a.vpe,this.cancelButtonClass="btn-link",this.confirmButtonClass="btn-primary"}ngOnInit(){}cancel(){this.modalRef.hide()}confirm(){this.outputEmitter.emit(!0)}}return h.\u0275fac=function(C){return new(C||h)(a.Y36(b.UZ))},h.\u0275cmp=a.Xpm({type:h,selectors:[["app-confirm"]],outputs:{outputEmitter:"outputEmitter"},decls:8,vars:6,consts:[[1,"modal-header","justify-content-center","border-bottom-0"],[1,"modal-title","fs-6",3,"innerHtml"],[1,"modal-body","text-center",3,"innerHtml"],[1,"modal-footer","justify-content-center","border-top-0"],["type","button",1,"btn","btn-sm","text-reset","text-uppercase","text-decoration-none",3,"ngClass","click"],["type","button",1,"btn","btn-sm","text-uppercase",3,"ngClass","click"]],template:function(C,g){1&C&&(a.TgZ(0,"div",0),a._UZ(1,"div",1),a.qZA(),a._UZ(2,"div",2),a.TgZ(3,"div",3),a.TgZ(4,"button",4),a.NdJ("click",function(){return g.cancel()}),a._uU(5),a.qZA(),a.TgZ(6,"button",5),a.NdJ("click",function(){return g.confirm()}),a._uU(7),a.qZA(),a.qZA()),2&C&&(a.xp6(1),a.Q6J("innerHtml",g.title,a.oJD),a.xp6(1),a.Q6J("innerHtml",g.text,a.oJD),a.xp6(2),a.Q6J("ngClass",g.cancelButtonClass),a.xp6(1),a.hij(" ",g.cancelButton," "),a.xp6(1),a.Q6J("ngClass",g.confirmButtonClass),a.xp6(1),a.hij(" ",g.confirmButton," "))},directives:[e.mk],styles:[""]}),h})()},6804:(y,M,i)=>{i.d(M,{M:()=>C});var a=i(4995),b=(()=>{return(g=b||(b={})).Title="Profile Details",g.Close="Close",b;var g})(),e=i(4893),P=i(1134),h=i(6892),n=i(5850);let C=(()=>{class g{constructor(p,d,f){this.modalRef=p,this.httpService=d,this.authService=f}ngOnInit(){this.userDetails=this.authService.getUserDetails(),this.labels=b,this.getProfileDetails()}getProfileDetails(){var p;const d=null===(p=this.userDetails)||void 0===p?void 0:p.id;this.httpService.get(`${a.n.Users}/${d}/userDetails`).subscribe(f=>{this.profileDetails=null==f?void 0:f.data[0]},f=>{console.log(f)})}close(){var p;null===(p=this.modalRef)||void 0===p||p.hide()}}return g.\u0275fac=function(p){return new(p||g)(e.Y36(P.UZ),e.Y36(h.O),e.Y36(n.e))},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-profile-details"]],decls:20,vars:5,consts:[[1,"modal-header","px-5","pt-5","border-bottom-0"],[1,"modal-title","fs-6"],[1,"modal-body","px-5"],[1,"list-group"],[1,"list-group-item","d-flex","align-items-start","border-start-0","border-end-0"],[1,"bi","bi-person-fill","fs-6","text-primary"],[1,"ms-2"],[1,"bi","bi-people-fill","fs-6","text-primary"],[1,"bi","bi-phone-fill","fs-6","text-primary"],[1,"modal-footer","px-5","pb-5","border-top-0"],["type","button",1,"btn","btn-link","btn-sm","text-reset","text-uppercase","text-decoration-none",3,"click"]],template:function(p,d){1&p&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._uU(2),e.qZA(),e.qZA(),e.TgZ(3,"div",2),e.TgZ(4,"ul",3),e.TgZ(5,"li",4),e._UZ(6,"i",5),e.TgZ(7,"span",6),e._uU(8),e.qZA(),e.qZA(),e.TgZ(9,"li",4),e._UZ(10,"i",7),e.TgZ(11,"span",6),e._uU(12),e.qZA(),e.qZA(),e.TgZ(13,"li",4),e._UZ(14,"i",8),e.TgZ(15,"span",6),e._uU(16),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(17,"div",9),e.TgZ(18,"button",10),e.NdJ("click",function(){return d.close()}),e._uU(19),e.qZA(),e.qZA()),2&p&&(e.xp6(2),e.Oqu(d.labels.Title),e.xp6(6),e.Oqu(null==d.profileDetails?null:d.profileDetails.name),e.xp6(4),e.Oqu(null==d.profileDetails?null:d.profileDetails.userCategory),e.xp6(4),e.Oqu(null==d.profileDetails?null:d.profileDetails.mobileNo),e.xp6(3),e.hij(" ",d.labels.Close," "))},styles:[""]}),g})()},6448:(y,M,i)=>{i.d(M,{P:()=>g});var a=i(5698),b=i(9057),e=(()=>{return(u=e||(e={})).Title="Logout",u.Text="Are you sure you want to logout?",u.CancelButton="Cancel",u.ConfirmButton="Yes, Logout",e;var u})(),P=i(4893),h=i(9127),n=i(1134),C=i(5850);let g=(()=>{class u{constructor(d,f,T){this.router=d,this.modalService=f,this.authService=T,this.logoutConfirmModalLabels=e}logout(){this.modalRef=this.modalService.show(b.X,{initialState:{title:this.logoutConfirmModalLabels.Title,text:this.logoutConfirmModalLabels.Text,cancelButton:this.logoutConfirmModalLabels.CancelButton,confirmButton:this.logoutConfirmModalLabels.ConfirmButton},class:"modal-sm modal-dialog-centered"}),this.modalRef.content.outputEmitter.pipe((0,a.q)(1)).subscribe(f=>{f&&this.processLogout()})}processLogout(){var d;this.authService.removeAppDetails(),this.authService.removeAuthToken(),this.authService.removeUserDetails(),null===(d=this.modalRef)||void 0===d||d.hide(),this.router.navigate(["/login"])}}return u.\u0275fac=function(d){return new(d||u)(P.LFG(h.F0),P.LFG(n.tT),P.LFG(C.e))},u.\u0275prov=P.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()}}]);