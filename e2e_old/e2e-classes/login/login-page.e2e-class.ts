// import { ProtractorBrowser, by, WebElement , browser } from 'protractor';
// import * as _ from 'lodash';
//
// import { e2eUtil } from "../util/util.e2e-class";
//
// import UserNameItem from "./username-item.e2e-class";
// import PasswordItem from "./password-item.e2e-class";
//
// import {} from 'jasmine';
//
// class LoginPageSpec {
//
//     runLoginSpec() {
//
//       // it("Username should pass input-base", (done:DoneFn) => {
//           UserNameItem.run("smooth");
//       // });
//
//       // it("Username should pass input-base", (done:DoneFn) => {
//           PasswordItem.run("savestheday");
//       // });
//         // Login Spec Opens
//         // describe( 'Login Spec', () => {
//         //
//         //     // it('LoginPage should be created and shown', (done:DoneFn) => {
//         //     //     browser.findElement(by.css("login-page"))
//         //     //            .isDisplayed()
//         //     //            .then( (value:boolean) => {
//         //     //                 expect(value).toBe(true);
//         //     //                 done();
//         //     //            })
//         //     //            .catch( reason => done.fail(reason + " findElement isDisplayed"));
//         //     // });
//         //     //
//         //     // it('Page should have only two required inputs', (done:DoneFn) => {
//         //     //       browser.findElements(by.css('login-page ion-item'))
//         //     //              .then( (usernameItems:WebElement[]) => {
//         //     //                   expect(usernameItems.length).toBe(2);
//         //     //                   done();
//         //     //              })
//         //     //              .catch( reason => {
//         //     //                   // browser.pause();
//         //     //                   done.fail(reason);
//         //     //              });
//         //     // });
//         //
//         //     // it("Username should pass input-base", (done:DoneFn) => {
//         //         UserNameItem.run("smooth");
//         //     // });
//         //
//         //     // it("Username should pass input-base", (done:DoneFn) => {
//         //         UserNameItem.run("savestheday");
//         //     // });
//         //
//         //     // it("Submit", (done:DoneFn) => {
//         //     //     e2eUtil.clickElement(browser.findElement(by.css("#submitButton")))
//         //     //            .then( () => {
//         //     //                done();
//         //     //            })
//         //     //            .catch( reason => done.fail(reason + " >> submitButton click") );
//         //     // });
//         //
//         //
//         // //     it('Attempting to sign in.', (done:DoneFn) => {
//         // //           browser.findElements(by.css('login-page ion-item'))
//         // //                  .then( (usernameItems:WebElement[]) => {
//         // //
//         // //                       expect(usernameItems.length).toBe(2);
//         // //                       let usernameItem = usernameItems[0];
//         // //                       let passwordItem = usernameItems[1];
//         // //
//         // //                       e2eUtil.clickElement(usernameItem)
//         // //                              .then( () => {
//         // //                                   e2eUtil.hasClass( usernameItem, 'input-has-focus')
//         // //                                          .then( () => {
//         // //                                              usernameItem.findElement(by.css('input[required]'))
//         // //                                                          .then( (userNameInput:WebElement) => {
//         // //                                                              userNameInput.sendKeys("smooth");
//         // //                                                          })
//         // //                                                          .catch( reason => done.fail(reason + " sendKeys to username"));
//         // //                              })
//         // //                              .catch( reason => done.fail(reason + " >> usernameInput") );
//         // //                        });
//         // //
//         // //                        browser.sleep(500);
//         // //
//         // //                        e2eUtil.clickElement(passwordItem)
//         // //                               .then( () => {
//         // //
//         // //                                     browser.sleep(500);
//         // //                                     e2eUtil.hasClass(passwordItem,"input-has-focus")
//         // //                                            .then( () => {
//         // //                                                passwordItem.findElement(by.css('input[required]'))
//         // //                                                            .then( ($passwordItem:WebElement) => {
//         // //                                                                $passwordItem.sendKeys("savestheday");
//         // //                                                            })
//         // //                                                            .catch( reason => done.fail(reason + " sendKeys to username"));
//         // //
//         // //                                                browser.sleep(3000);
//         // //
//         // //
//         // //
//         // //                                            })
//         // //                                            .catch( reason => done.fail(reason + " >> Getting Attribute class, passwordInput") );
//         // //
//         // //
//         // //                               })
//         // //                               .catch( reason => done.fail(reason + " >> passwordInput") );
//         // //
//         // //                  })
//         // //                  .catch( reason => {
//         // //                       done.fail(reason);
//         // //                  });
//         // //     });
//         // //
//         // //
//         // //
//         // //
//         // });
//         // Login Spec Closes
//     }
// }
// export default new LoginPageSpec();
