// import {Injectable} from '@angular/core';
//
// const scrollContents = {
//                               '0':'page-home .scroll-content',
//                               '1':'chat-component .scroll-content',
//                               '3':'checkin-form .scroll-content'
//                            };
// @Injectable()
// export class TabsEliminator {
//
//     tabbar;
//
//     constructor() {
//
//     }
//
//
//     showTabs(whichContent: number) {
//         // if (this.tabbar == null) {
//         //     this.tabbar = document.querySelector('.tabbar');
//         // }
//         // setTimeout(() => {
//         //     if ( this.tabbar !== null ) {
//         //         // Object.keys(tabs).map((key) => {
//         //             this.tabbar.style.transform = 'translateY(0px)';
//         //         // });
//         //     } // end if
//         // },100);
//         // // },100);
//         //
//         // let scrollContent = document.querySelector(scrollContents[whichContent]);
//         // setTimeout(() => {
//         //     if ( scrollContent !== null ) {
//         //         // Object.keys(scrollContent).map((key) => {
//         //             scrollContent.style.marginBottom = "49px";
//         //             // logger.debug(scrollContent[ key ]);
//         //         // });
//         //     } // end if
//         // },100);
//         // // },100);
//     }
//
//
//     hideTabs(whichContent: number) {
//           // if (this.tabbar == null) {
//           //     this.tabbar = document.querySelector('.tabbar');
//           // }
//           // setTimeout(() => {
//           //     if ( this.tabbar !== null ) {
//           //         // Object.keys(tabs).map((key) => {
//           //             this.tabbar.style.transform = 'translateY(49px)';
//           //         // });
//           //     } // end if
//           // },100);
//           //
//           // let scrollContent = document.querySelector(scrollContents[whichContent]);
//           // // logger.debug(whichContent);
//           // // logger.debug(scrollContent);
//           // setTimeout(() => {
//           //     if ( scrollContent !== null ) {
//           //         // Objec.keys(scrollContent).map((key) => {
//           //             scrollContent.style.marginBottom = "0px";
//           //             // logger.debug(scrollContent);
//           //         // });
//           //     } // end if
//           // },100);
//     }
//
//     chatFooter = undefined;
//     scrollContent = undefined;
//     chatFooterTimeout;
//     moveChatFooterDown() {
//         // clearTimeout(this.chatFooterTimeout);
//         // this.chatFooterTimeout =
//         // setTimeout( () => {
//         //   if (this.chatFooter == undefined)   this.chatFooter = document.querySelector("#chat-footer");
//         //   if (this.scrollContent == undefined)this.scrollContent = document.querySelector(scrollContents[1]);
//         //     if ( this.chatFooter !== null ) {
//         //         // Object.keys(this.chatFooter).map( (key) => {
//         //         this.chatFooter.style.bottom = '0px';
//         //         this.scrollContent.style.marginBottom = "49px";
//         //         // });
//         //     }
//         // },100);
//     }
//     moveChatFooterUp() {
//         // if (this.chatFooter == undefined)this.chatFooter = document.querySelectorAll("#chat-footer");
//         //
//         // clearTimeout(this.chatFooterTimeout);
//         // this.chatFooterTimeout =
//         // setTimeout( () => {
//         //     if ( this.chatFooter !== null ) {
//         //         // Object.keys(this.chatFooter).map( (key) => {
//         //             this.chatFooter.style.bottom = '49px';
//         //             this.scrollContent.style.marginBottom = "98px";
//         //         // });
//         //     }
//         // },100);
//
//     }
//
//
// }
