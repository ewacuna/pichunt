"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5117],{5117:(S,h,n)=>{n.r(h),n.d(h,{ImageViewerPageModule:()=>x});var d=n(177),f=n(9417),a=n(4742),m=n(5694),c=n(3314),p=n(467);const w=(0,n(5083).F3)("Browser",{web:()=>n.e(4786).then(n.bind(n,4786)).then(t=>new t.BrowserWeb)});var u=n(5152),e=n(4438),I=n(929);function P(t,s){if(1&t){const i=e.RV6();e.j41(0,"section",6)(1,"ion-chip",7),e.bIt("click",function(){e.eBV(i);const r=e.XpG();return e.Njj(r.viewPhotographer(r.photo.photographer_url))}),e.j41(2,"ion-avatar"),e.nrm(3,"img",8),e.k0s(),e.j41(4,"ion-label"),e.EFF(5),e.k0s()()(),e.j41(6,"section",9),e.nrm(7,"img",10),e.k0s()}if(2&t){const i=e.XpG();e.R7$(3),e.Mz_("alt","Profile photo of ",i.photo.photographer,""),e.R7$(2),e.JRh(i.photo.photographer),e.R7$(2),e.FS9("ngSrc",i.photo.src.original),e.FS9("alt",i.photo.alt),e.FS9("height",i.photo.height),e.FS9("width",i.photo.width)}}function b(t,s){1&t&&e.nrm(0,"ion-spinner",5)}function V(t,s){1&t&&e.nrm(0,"ion-icon",11)}const M=[{path:":id",component:(()=>{var t;class s{constructor(o,r,g){this.route=o,this.pexelsService=r,this.helperService=g,this.subs=new u.W,this.isLoading=!1,this.isDownload=!1}ngOnInit(){this.photoId=this.route.snapshot.paramMap.get("id")||"",this.photoId&&this.getImageInfo(this.photoId),this.subs.add=this.helperService.downloadPicture.subscribe(o=>{this.isDownload=o})}getImageInfo(o){var g,r=this;this.isLoading=!0,this.subs.add=this.pexelsService.getPhotoById(o).subscribe({next:g=>{this.photo=g,this.isLoading=!1},error:(g=(0,p.A)(function*(l){yield r.helperService.showError(null==l?void 0:l.code),r.isLoading=!1}),function(y){return g.apply(this,arguments)})})}viewPhotographer(o){return(0,p.A)(function*(){o&&(yield w.open({url:o}))})()}onDownloadImage(o){o&&this.helperService.downloadImage(o)}ngOnDestroy(){this.subs.dispose()}}return(t=s).\u0275fac=function(o){return new(o||t)(e.rXU(c.nX),e.rXU(I.v),e.rXU(u.w))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-image-viewer"]],decls:11,vars:7,consts:[[3,"translucent"],["slot","start"],["defaultHref","/","icon","chevron-back-outline",3,"text"],["slot","fixed","vertical","bottom","horizontal","end"],["size","small",3,"click","disabled"],["name","lines-sharp-small"],[1,"ion-padding"],[3,"click"],["ngSrc","./assets/img/avatar.svg","height","512","width","512",3,"alt"],[1,"image-container"],[1,"image-preview",3,"ngSrc","alt","height","width"],["name","cloud-download-outline"]],template:function(o,r){1&o&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.nrm(3,"ion-back-button",2),e.nI1(4,"translate"),e.k0s()()(),e.j41(5,"ion-content"),e.DNE(6,P,8,7),e.k0s(),e.j41(7,"ion-fab",3)(8,"ion-fab-button",4),e.bIt("click",function(){return r.onDownloadImage(r.photo.src.original)}),e.DNE(9,b,1,0,"ion-spinner",5)(10,V,1,0),e.k0s()()),2&o&&(e.Y8G("translucent",!0),e.R7$(3),e.FS9("text",e.bMT(4,5,"common.back")),e.R7$(3),e.vxM(6,r.photo?6:-1),e.R7$(2),e.Y8G("disabled",r.isDownload),e.R7$(),e.vxM(9,r.isDownload?9:10))},dependencies:[a.mC,a.QW,a.ZB,a.W9,a.Q8,a.YW,a.eU,a.iq,a.he,a.w2,a.ai,a.el,d.kt,m.D9],styles:[".image-container[_ngcontent-%COMP%]   .image-preview[_ngcontent-%COMP%]{height:100%;max-height:70dvh;object-fit:contain;width:100%}@media (max-width: 767.98px){.image-container[_ngcontent-%COMP%]   .image-preview[_ngcontent-%COMP%]{object-fit:cover}}ion-fab-button[_ngcontent-%COMP%]{--background: var(--main-color);--background-activated: #ab58f4;--background-hover: #d9b6fc}"]}),s})()}];let C=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[c.iI.forChild(M),c.iI]}),s})(),x=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[d.MD,f.YN,a.bv,C,m.h]}),s})()}}]);