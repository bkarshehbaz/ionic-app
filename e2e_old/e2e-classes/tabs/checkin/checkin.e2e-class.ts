import { WebElement } from 'protractor';


import { e2eUtil } from "../../util/util.e2e-class";

// tslint:disable-next-line:max-line-length
const vinNumbers = ["2LMDJ6JK2BBJ20563","1GB3KYCG3FF505278","5NPDH4AE8DH314029","3N1CB51D62L584161","2D4RN5DG8BR786526","1G1ZH57B584218050","5NPE34AF3FH050121","KMHJF35F6YU030279","JTEEP21A660175572","1C4AJWAG9CL289866","1FAFP53U93A122216","2GKFLVEK5F6144060","2B7KB31Y8RK145341","1B3ES56C02D626109","5FRYD4H48FB016199","1FAHP3HN4AW242634","1GBDM19Z4PB217115","1D7HU18D64S768070","1FTEF26H6GPB05284","4T1BF12B9VU202018","3B6KF2665YM210055","JTEBU11F870021769","1GC0KZEG1FZ565947","1NXBU4EE3AZ202300","WDBRH81J53F314166","JM1BL1TF0D1766347","1G2NV52E8YM757346","5N1AN0NW0AC588951","19XFA16539E028864","1FMNE31LXWHB84435","1C4NJCBA4ED504125","5LMEU68H03Z146902","1G2HZ54Y14U255698","JT2TE72S6B0654096","1GBM7D1G3HV106798","1FMZU62K95UA82996","1FUBABAS91PB75076","1VWBN7A39EC079814","2FMDK4KC7DBA03732","JH2SC6678CK200213","KM8SC13D93U329972","1FTMF1E81AFD17627","3FADP4BJ0BM143966","3C63R2HL7FG594367","5J6TF2H56FL001355"];

class CheckinSpec {

    runCheckinSpec() {

          describe("CheckinSpec", () => {


                it('Click Check-In', (done:DoneFn) => {
                    e2eUtil.clickTabNumber(3, done);
                });

                it('should have a title saying Check-In', (done: DoneFn) => {
                    e2eUtil.checkTitle("Check-In",done);
                });

                it('should have three steps', (done:DoneFn) => {

                    e2eUtil.getElements("#progressbar li")
                           .then( (steps:WebElement[]) => {

                                expect(steps.length).toBe(3);

                                e2eUtil.hasClass(steps[0],"active",true, done);
                           })
                           .catch(reason => done.fail(reason));
                });

                // it('should have two action buttons[Scan Ticket, ScanID]', () => {
                //
                // });
                //
                // it('should have two navigation buttons [Previous,Next]', () => {
                //
                // });

                //
                //
                //
                //
                //
                //
                // it('should have 6 fields, VIN number, transmissionStyle, VehicleMake, VehicleModel, V.Year, V.Color', (done:DoneFn) => {
                //
                //     browser.findElement(by.css("car-step"))
                //            .isDisplayed().then( val => expect(val).toBe(true) );
                //
                //     browser.findElements(by.css("car-step ion-list ion-item"))
                //            .then( (val:WebElement[]) => {
                //
                //                 expect(val.length).toBe(6);
                //
                //                 val[0].getText().then( text => expect(text).toEqual("Vin Number"));
                //
                //                 val[1].findElement(by.css(".switch-title")).then( (switchTitle:WebElement) => {
                //                     switchTitle.getText().then( text => expect(text).toEqual("Transmission Style"));
                //                 });
                //
                //                 val[2].getText().then( text => expect(text).toEqual("Vehicle Make"));
                //
                //                 val[3].getText().then( text => expect(text).toEqual("Vehicle Model"));
                //
                //                 val[4].getText().then( text => expect(text).toEqual("V. Year"));
                //
                //                 val[5].getText().then( text => expect(text).toEqual("V. Color"));
                //
                //                 done();
                //
                //            });
                // });
                //
                //
                // it('Typing a vin number should triggher the VIN api call', (done:DoneFn) => {
                //
                //     browser.findElement(by.css("car-step"))
                //            .isDisplayed().then( val => expect(val).toBe(true) );
                //
                //     browser.findElements(by.css("car-step ion-list ion-item"))
                //            .then( (val:WebElement[]) => {
                //
                //                 expect(val.length).toBe(6);
                //
                //                 val[0].getText().then( text => expect(text).toEqual("Vin Number"));
                //
                //                 e2eUtil.clickElement(val[0])
                //                        .then( () => {
                //                            e2eUtil.returnInputClassedTextInput(val[0])
                //                                   .then( (vinInput:WebElement) => {
                //
                //                                       // vinInput.sendKeys(_.sample(vinNumbers).substr(0,4));
                //                                       //
                //                                       // browser.sleep(4000);
                //                                       vinInput.clear();
                //                                       browser.sleep(500);
                //                                       vinInput.sendKeys(_.sample(vinNumbers));
                //
                //                                       e2eUtil.blurInputElement("car-step ion-list ion-item input.text-input");
                //
                //                                       done();
                //                                   })
                //                                   .catch(reason => done.fail(reason));
                //                        })
                //                        .catch(reason => done.fail(reason));
                //            })
                //            .catch(reason => done.fail(reason));
                // });
                //
                // it('Choose color from shown color-pop-page', (done:DoneFn) => {
                //     browser.sleep(3000);
                //
                //     browser.findElements(by.css("car-step ion-list ion-item"))
                //            .then( (val:WebElement[]) => {
                //
                //                 expect(val.length).toBe(6);
                //
                //                 let colorItem = val[5];
                //           //  });
                //
                //                 browser.findElement(by.css("color-pop-page"))
                //                        .isDisplayed().then( isDisplayed => expect(isDisplayed).toBe(true) );
                //
                //                 e2eUtil.hasClass(browser.findElement(by.css("color-pop-page")),"show-page")
                //                        .then( () => {});
                //
                //                 browser.findElements(by.css("color-pop-page .pins-parent .pins ion-col"))
                //                        .then( (ionColColors:WebElement[]) => {
                //                            browser.sleep(1000);
                //                            let randomColor:WebElement = _.sample(ionColColors);
                //                            randomColor.getText()
                //                                       .then( ($colorText:string) => {
                //                                              let colorText = $colorText;
                //                                              e2eUtil.clickElement(randomColor)
                //                                                     .then( () => {
                //                                                        browser.sleep(2000);
                //
                //                                                        e2eUtil.returnInputClassedTextInput(colorItem)
                //                                                               .then( (colorInput:WebElement) => {
                //
                //                                                                    colorInput.getAttribute("value")
                //                                                                              .then( (value:string) =>{
                //
                //                                                                                 expect(value).toBe(colorText);
                //
                //                                                                                 browser.sleep(2000);
                //
                //                                                                                 done();
                //
                //                                                                              })
                //                                                                              .catch(reason => done.fail(reason));
                //
                //                                                               })
                //                                                               .catch(reason => done.fail(reason));
                //
                //
                //                                                     })
                //                                                     .catch(reason => done.fail(reason));
                //
                //                                        })
                //                                        .catch(reason => done.fail(reason));
                //
                //                        })
                //                        .catch(reason => done.fail(reason));
                //
                //     });
                // });
                //
                // it('Choose color', (done:DoneFn) => {
                //     browser.findElements(by.css("car-step ion-list ion-item"))
                //            .then( (val:WebElement[]) => {
                //
                //                 expect(val.length).toBe(6);
                //
                //                 let colorItem = val[5];
                //
                //                 colorItem.getText().then( text => expect(text).toEqual("V. Color"));
                //
                //                 e2eUtil.clickElement(colorItem)
                //                        .then( () => {
                //                            browser.sleep(1000);
                //
                //                            browser.findElement(by.css("color-pop-page"))
                //                                   .isDisplayed().then( isDisplayed => expect(isDisplayed).toBe(true) );
                //
                //                            e2eUtil.hasClass(browser.findElement(by.css("color-pop-page")),"show-page")
                //                                   .then( () => {});
                //
                //                            browser.findElements(by.css("color-pop-page .pins-parent .pins ion-col"))
                //                                   .then( (ionColColors:WebElement[]) => {
                //                                       browser.sleep(1000);
                //                                       let randomColor:WebElement = _.sample(ionColColors);
                //                                       randomColor.getText()
                //                                                  .then( ($colorText:string) => {
                //                                                         let colorText = $colorText;
                //                                                         e2eUtil.clickElement(randomColor)
                //                                                                .then( () => {
                //                                                                   browser.sleep(2000);
                //
                //                                                                   e2eUtil.returnInputClassedTextInput(colorItem)
                //                                                                          .then( (colorInput:WebElement) => {
                //
                //                                                                               colorInput.getAttribute("value")
                //                                                                                         .then( (value:string) =>{
                //
                //                                                                                            expect(value).toBe(colorText);
                //
                //                                                                                            browser.sleep(2000);
                //
                //                                                                                            done();
                //
                //                                                                                         })
                //                                                                                         .catch(reason => done.fail(reason));
                //
                //                                                                          })
                //                                                                          .catch(reason => done.fail(reason));
                //
                //
                //                                                                })
                //                                                                .catch(reason => done.fail(reason));
                //
                //                                                   })
                //                                                   .catch(reason => done.fail(reason));
                //
                //                                   })
                //                                   .catch(reason => done.fail(reason));
                //
                //                        })
                //                        .catch(reason => done.fail(reason));
                //
                //            })
                //            .catch(reason => done.fail(reason));
                //
                // });
                //
                //
                // it('Next button should be enabled', (done:DoneFn) => {
                //     browser.findElement(by.css("#mst-next"))
                //            .then( (nextButton:WebElement) => {
                //
                //                browser.sleep(2000);
                //
                //                nextButton.getText().then( text => expect(text).toEqual("Next"));
                //                browser.sleep(100);
                //                nextButton.getAttribute("class")
                //                          .then( (classes:string) => {
                //                               expect(_.includes(classes.split(" "), "disabled")).toBe(false);
                //
                //                               browser.sleep(2000);
                //                               e2eUtil.clickElement(nextButton);
                //                               done();
                //                          })
                //                          .catch(reason => done.fail(reason));
                //
                //
                //            })
                //            .catch(reason => done.fail(reason));
                // });
                //
                //
                //
                //
                //
                //
                //
                //
                //
                // it("Moving to PhotosNotes", (done:DoneFn) => {
                //
                //     browser.findElements(by.css("car-photos-step ion-card-content"))
                //            .then( (ionCardContents:WebElement[]) => {
                //
                //                ionCardContents.map( (ionCardContent:WebElement) => {
                //                    browser.sleep(1000);
                //                    e2eUtil.clickElement(ionCardContent);
                //                    browser.sleep(1000);
                //                });
                //
                //                browser.findElement(by.css("car-photos-step ion-item"))
                //                       .then( (ionItem:WebElement) => {
                //
                //                           ionItem.getText().then( text => expect(text).toEqual("Notes") );
                //                           browser.sleep(1000);
                //
                //                           e2eUtil.clickElement(ionItem)
                //                                 .then( () => {
                //                                       browser.findElement(by.css("car-photos-step ion-textarea .text-input"))
                //                                              .then( (ionTextarea:WebElement) => {
                //
                //                                                 //  expect(ionTextarea).toBeDefined();
                //                                                  browser.sleep(1000);
                //
                //                                                  ionTextarea.sendKeys("I made it!")
                //                                                             .then( () => {
                //                                                                 done();
                //                                                             });
                //
                //                                              })
                //                                              .catch(reason => done.fail(reason));
                //                           })
                //                           .catch(reason => done.fail(reason));
                //
                //                       })
                //                       .catch(reason => done.fail(reason));
                //
                //
                //
                //
                //            })
                //            .catch(reason => done.fail(reason));
                // });
                //
                //
                // it("Click stage button", (done:DoneFn) => {
                //     browser.findElement(by.css("#mst-next"))
                //            .then( (nextButton:WebElement) => {
                //
                //                browser.sleep(2000);
                //
                //                nextButton.getText().then( text => expect(text).toEqual("Stage"));
                //                browser.sleep(100);
                //                nextButton.getAttribute("class")
                //                          .then( (classes:string) => {
                //                               expect(_.includes(classes.split(" "), "disabled")).toBe(false);
                //
                //                               browser.sleep(2000);
                //                               e2eUtil.clickElement(nextButton);
                //                               done();
                //                          })
                //                          .catch(reason => done.fail(reason));
                //
                //
                //            })
                //            .catch(reason => done.fail(reason));
                // });
                //
                // it("Review Ticket Alert should be displayed", (done:DoneFn) => {
                //     browser.findElement(by.css("ion-alert.edit-review-alert"))
                //            .then( (editReviewAlert:WebElement) => {
                //
                //                 editReviewAlert.isDisplayed()
                //                                .then( isDisplayed => expect(isDisplayed).toBe(true) );
                //
                //                 editReviewAlert.findElements(by.css(".edit-review-body"))
                //                                .then( (editReviewAlerts:WebElement[]) => {
                //                                    expect(editReviewAlerts.length).toBe(12);
                //                                    done();
                //                                });
                //
                //
                //
                //            });
                //
                // });
                //
                // it("submitting", (done:DoneFn) => {
                //     browser.findElements(by.css(".alert-button-group button[ion-button].alert-button"))
                //            .then( (alertButtons:WebElement[]) => {
                //                expect(alertButtons.length).toBe(2);
                //                let submitButtom:WebElement = alertButtons[1];
                //                e2eUtil.clickElement(submitButtom)
                //                       .then( () => {
                //                           browser.sleep(2000);
                //                           done();
                //                       });
                //            });
                // });
                //
                // it("complete ticket should have up", (done:DoneFn) => {
                //     done();
                // });
                //
                // it("complete ticket should have fields filled", (done:DoneFn) => {
                //     done();
                // });
                //
                //
                // it('Filling CompanyEvent', (done:DoneFn) => {
                //     browser.pause();
                //     done();
                // });
                //
                //
                //



          });


    }
}
export const checkinSpec = new CheckinSpec();
