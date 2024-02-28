"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9124],{9124:(y,d,s)=>{s.r(d),s.d(d,{SettingsPageModule:()=>L});var p=s(6814),u=s(6223),o=s(3582),h=s(7166),m=s(8520),r=s(5861),f=s(7394),e=s(2029),v=s(721),S=s(6593),Z=s(3778);const T=[{path:"",component:(()=>{var n;class g{constructor(t,a,i,l){this.storageService=t,this.titleService=a,this.translate=i,this.helperService=l,this.currentLang="en",this.subs=new f.w0,this.themeToggle=!1}ngOnInit(){var t=this;return(0,r.Z)(function*(){t.titleService.setTitle("PicHunt | Settings"),yield t.setLanguage(),yield t.setTheme(),t.subs.add(t.translate.onLangChange.subscribe(a=>{t.currentLang=a.lang}))})()}toggleChange(t){this.helperService.toggleDarkTheme(t.detail.checked)}handleLanguageChange(t){var a=this;return(0,r.Z)(function*(){a.translate.use(t.detail.value),yield a.storageService.set("language",t.detail.value)})()}setLanguage(){var t=this;return(0,r.Z)(function*(){yield t.storageService.get("language").then(function(){var a=(0,r.Z)(function*(i){t.currentLang=i||"en"});return function(i){return a.apply(this,arguments)}}())})()}setTheme(){var t=this;return(0,r.Z)(function*(){yield t.storageService.get("theme").then(function(){var a=(0,r.Z)(function*(i){if(i)t.themeToggle="dark"===i;else{const l=window.matchMedia("(prefers-color-scheme: dark)");t.themeToggle=l.matches}});return function(i){return a.apply(this,arguments)}}())})()}ngOnDestroy(){this.subs.unsubscribe()}}return(n=g).\u0275fac=function(t){return new(t||n)(e.Y36(v.V),e.Y36(S.Dx),e.Y36(h.sK),e.Y36(Z.W))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-settings"]],decls:29,vars:32,consts:[["mode","ios",3,"translucent"],["mode","ios"],["mode","ios",3,"inset"],["justify","space-between",3,"ngModel","ngModelChange","ionChange"],["justify","space-between",3,"label","placeholder","ngModel","cancelText","ngModelChange","ionChange"],["value","en"],["value","es"]],template:function(t,a){1&t&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e._uU(3),e.ALo(4,"translate"),e.qZA()()(),e.TgZ(5,"ion-content")(6,"ion-list-header",1),e._uU(7),e.ALo(8,"translate"),e.qZA(),e.TgZ(9,"ion-list",2)(10,"ion-item")(11,"ion-toggle",3),e.NdJ("ngModelChange",function(l){return a.themeToggle=l})("ionChange",function(l){return a.toggleChange(l)}),e._uU(12),e.ALo(13,"translate"),e.qZA()()(),e.TgZ(14,"ion-list-header",1),e._uU(15),e.ALo(16,"translate"),e.qZA(),e.TgZ(17,"ion-list",2)(18,"ion-item")(19,"ion-select",4),e.NdJ("ngModelChange",function(l){return a.currentLang=l})("ionChange",function(l){return a.handleLanguageChange(l)}),e.ALo(20,"translate"),e.ALo(21,"translate"),e.ALo(22,"translate"),e.TgZ(23,"ion-select-option",5),e._uU(24),e.ALo(25,"translate"),e.qZA(),e.TgZ(26,"ion-select-option",6),e._uU(27),e.ALo(28,"translate"),e.qZA()()()()()),2&t&&(e.Q6J("translucent",!0),e.xp6(3),e.hij(" ",e.lcZ(4,14,"settings.title")," "),e.xp6(4),e.hij(" ",e.lcZ(8,16,"settings.appearance_label")," "),e.xp6(2),e.Q6J("inset",!0),e.xp6(2),e.Q6J("ngModel",a.themeToggle),e.xp6(1),e.hij(" ",e.lcZ(13,18,"settings.dark_mode_label")," "),e.xp6(3),e.hij(" ",e.lcZ(16,20,"settings.language_label")," "),e.xp6(2),e.Q6J("inset",!0),e.xp6(2),e.s9C("label",e.lcZ(20,22,"settings.preferred_language_label")),e.s9C("placeholder",e.lcZ(21,24,"common.select")),e.s9C("cancelText",e.lcZ(22,26,"common.cancel")),e.Q6J("ngModel",a.currentLang),e.xp6(5),e.hij(" ",e.lcZ(25,28,"common.english")," "),e.xp6(3),e.hij(" ",e.lcZ(28,30,"common.spanish")," "))},dependencies:[u.JJ,u.On,o.W2,o.Gu,o.Ie,o.q_,o.yh,o.t9,o.n0,o.wd,o.ho,o.sr,o.w,o.QI,h.X$]}),g})()}];let C=(()=>{var n;class g{}return(n=g).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.Bz.forChild(T),m.Bz]}),g})(),L=(()=>{var n;class g{}return(n=g).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,u.u5,o.Pc,C,h.aw]}),g})()}}]);