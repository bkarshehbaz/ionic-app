// import { ProtractorBrowser, WebElement, by, browser } from 'protractor';
//
// import * as _ from "lodash";
//
// import { e2eUtil } from "../../util/util.e2e-class";
//
// const vinNumbers = ["2LMDJ6JK2BBJ20563",
//                     "1GB3KYCG3FF505278",
//                     "5NPDH4AE8DH314029",
//                     "3N1CB51D62L584161",
//                     "2D4RN5DG8BR786526",
//                     "1G1ZH57B584218050",
//                     "5NPE34AF3FH050121",
//                     "KMHJF35F6YU030279",
//                     "JTEEP21A660175572",
//                     "1C4AJWAG9CL289866",
//                     "1FAFP53U93A122216",
//                     "2GKFLVEK5F6144060",
//                     "2B7KB31Y8RK145341",
//                     "1B3ES56C02D626109",
//                     "5FRYD4H48FB016199",
//                     "1FAHP3HN4AW242634"];
//
// class CheckinWithScannersSpec {
//
//     runCheckinSpec() {
//
//           describe("CheckinSpec", () => {
//
//
//                 it('Click Check-In', (done:DoneFn) => {
//                     e2eUtil.clickTabNumber(3)
//                            .then( () => {
//                               done();
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//                 it('should have a title saying Check-In', (done: DoneFn) => {
//                     e2eUtil.checkTitle("Check-In",done);
//                 });
//
//                 it('should have three steps', (done:DoneFn) => {
//
//                     browser.findElements(by.css("#progressbar li"))
//                            .then( (steps:WebElement[]) => {
//
//                                 expect(steps.length).toBe(3);
//
//                                 e2eUtil.hasClass(steps[0],"active")
//                                        .then( () => done() )
//                                        .catch( reason => done.fail(reason) );
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//                 it('should have two action buttons[Scan Ticket, ScanID]', () => {
//
//                 });
//
//                 it('should have two navigation buttons [Previous,Next]', () => {
//
//                 });
//
//                 it('should have 7 fields, ticketNumber, Place, company/event, Roomnumber, firstName, lastName, phoneNumber', (done:DoneFn) => {
//
//                     browser.findElement(by.css("customer-step"))
//                            .isDisplayed().then( val => expect(val).toBe(true) );
//
//                     browser.findElements(by.css("customer-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(7);
//
//                                 val[0].getText().then( text => expect(text).toEqual("Ticket Number"));
//
//                                 val[1].getText().then( text => expect(text).toEqual("Place"));
//
//                                 val[2].getText().then( text => expect(text).toEqual("Company/Event"));
//
//                                 val[3].getText().then( text => expect(text).toEqual("Room Number"));
//
//                                 val[4].getText().then( text => expect(text).toEqual("First Name"));
//
//                                 val[5].getText().then( text => expect(text).toEqual("Last Name"));
//
//                                 val[6].getText().then( text => expect(text).toEqual("Phone Number"));
//
//                                 done();
//
//                            });
//                 });
//
//                 it('ticketNumber should only accept numeric digits, When type one, two, or three in ticketNumber, place should be populated with the corresponding value', (done:DoneFn) => {
//                     browser.findElements(by.css("customer-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(7);
//                                 let ticketNumberItem:WebElement = val[0];
//                                 ticketNumberItem.getText().then( text => expect(text).toEqual("Ticket Number"));
//
//                                 let ticketTypeItem:WebElement   = val[1];
//                                 ticketTypeItem.getText().then( text => expect(text).toEqual("Place"));
//
//                                 e2eUtil.clickElement(ticketNumberItem)
//                                        .then( () => {
//                                             browser.sleep(1000);
//                                             e2eUtil.hasClass(ticketNumberItem,"input-has-focus")
//                                                    .then( () => {
//
//                                                       e2eUtil.returnInputClassedTextInput(ticketNumberItem)
//                                                              .then( (inputElement:WebElement) => {
//
//                                                                   inputElement.clear();
//                                                                   inputElement.sendKeys(0);
//                                                                   e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                   browser.sleep(1000);
//                                                                   e2eUtil.hasClass(ticketNumberItem,"vss-invalid").then();
//                                                                   e2eUtil.hasClass(ticketTypeItem,"vss-valid").then();
//                                                                   browser.sleep(1000);
//
//
//                                                                   inputElement.clear();
//                                                                   inputElement.sendKeys('0157e');
//                                                                   e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                   browser.sleep(1000);
//                                                                   e2eUtil.hasClass(ticketNumberItem,"vss-invalid").then();
//                                                                   e2eUtil.hasClass(ticketTypeItem,"vss-valid").then();
//                                                                   browser.sleep(1000);
//
//
//                                                                   inputElement.clear();
//                                                                   inputElement.sendKeys(_.random(10000,99999));
//                                                                   e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                   browser.sleep(1000);
//                                                                   e2eUtil.hasClass(ticketNumberItem,"vss-valid").then();
//                                                                   e2eUtil.hasClass(ticketTypeItem,"vss-valid").then();
//
//
//                                                                   browser.sleep(2000);
//                                                                   done();
//                                                              })
//                                                              .catch(reason => done.fail(reason));
//                                                    })
//                                                    .catch(reason => done.fail(reason));
//                                        })
//                                        .catch(reason => done.fail(reason));
//                             })
//                             .catch(reason => done.fail(reason));
//                 });
//
//                 it('Filling CompanyEvent', (done:DoneFn) => {
//
//                     browser.findElements(by.css("customer-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                let companyEventItem:WebElement = val[2];
//                                    companyEventItem.getText().then( text => expect(text).toEqual("Company/Event"));
//
//                                e2eUtil.clickElement( companyEventItem)
//                                       .then(() => {
//                                           browser.sleep(1000);
//
//                                           browser.findElement(by.css("select-component"))
//                                                  .then( (selectComponent:WebElement) => {
//
//                                                       selectComponent.isDisplayed()
//                                                                      .then( (isDisplayed:boolean) => {
//                                                                          expect(isDisplayed).toBe(true);
//                                                                      });
//
//                                                       selectComponent.findElement(by.css("ion-list ion-label"))
//                                                                      .getText()
//                                                                      .then( text => expect(text).toBe("CHOOSE EVENT"));
//
//                                                       selectComponent.findElements(by.css("ion-content ion-list ion-item"))
//                                                                      .then( (companyEventItems:WebElement[]) => {
//                                                                          expect(companyEventItems.length).toBe(2);
//
//
//                                                                          companyEventItems[0].getText().then( text => expect(text).toBe("Solitek Annual Event"));
//                                                                          companyEventItems[1].getText().then( text => expect(text).toBe("Solitek Solutions"));
//
//
//                                                                          let randomCompanyEvent:WebElement = _.sample(companyEventItems);
//                                                                          randomCompanyEvent.getText()
//                                                                                            .then( (text:string) => {
//                                                                                                let randomText = text;
//                                                                                                e2eUtil.clickElement(randomCompanyEvent)
//                                                                                                       .then( () => {
//                                                                                                           browser.sleep(1000);
//                                                                                                           e2eUtil.returnInputClassedTextInput(companyEventItem)
//                                                                                                                  .then( (inputElement:WebElement) => {
//                                                                                                                     inputElement.getAttribute("value")
//                                                                                                                                 .then( (value:string) =>{
//                                                                                                                                    expect(value).toBe(randomText);
//                                                                                                                                    expect(randomText).toBe(value);
//                                                                                                                                    done();
//                                                                                                                                 })
//                                                                                                                                 .catch(reason => done.fail(reason));
//                                                                                                                  })
//                                                                                                                  .catch(reason => done.fail(reason));
//                                                                                                       })
//                                                                                                       .catch(reason => done.fail(reason));
//                                                                                            })
//                                                                                            .catch(reason => done.fail(reason));
//                                                                      })
//                                                                      .catch(reason => done.fail(reason));
//                                                  })
//                                                  .catch(reason => done.fail(reason));
//                                       })
//                                       .catch(reason => done.fail(reason));
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//
//                 it('First Name', (done:DoneFn) => {
//                   browser.findElements(by.css("customer-step ion-list ion-item"))
//                          .then( (val:WebElement[]) => {
//
//                               expect(val.length).toBe(7);
//
//                               let firstNameItem:WebElement    = val[4];
//                                   firstNameItem.getText().then( text => expect(text).toEqual("First Name"));
//                                   e2eUtil.clickElement(firstNameItem)
//                                          .then( () => {
//                                               browser.sleep(1000);
//                                               e2eUtil.hasClass(firstNameItem,"input-has-focus")
//                                                      .then( () => {
//
//                                                         e2eUtil.returnInputClassedTextInput(firstNameItem)
//                                                                .then( (inputElement:WebElement) => {
//
//                                                                     inputElement.clear();
//                                                                     inputElement.sendKeys("Lucas");
//                                                                     e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                     browser.sleep(1000);
//                                                                     e2eUtil.hasClass(firstNameItem,"vss-valid").then();
//                                                                     browser.sleep(1000);
//
//                                                                     done();
//                                                                })
//                                                                .catch(reason => done.fail(reason));
//                                                      })
//                                                      .catch(reason => done.fail(reason));
//                                          })
//                                          .catch(reason => done.fail(reason));
//                          })
//                          .catch(reason => done.fail(reason));
//                 });
//
//
//
//                 it('Last Name', (done:DoneFn) => {
//                   browser.findElements(by.css("customer-step ion-list ion-item"))
//                          .then( (val:WebElement[]) => {
//
//                               expect(val.length).toBe(7);
//
//                               let lastNameItem:WebElement     = val[5];
//                               lastNameItem.getText().then( text => expect(text).toEqual("Last Name"));
//                               e2eUtil.clickElement(lastNameItem)
//                                      .then( () => {
//                                           browser.sleep(1000);
//                                           e2eUtil.hasClass(lastNameItem,"input-has-focus")
//                                                  .then( () => {
//
//                                                     e2eUtil.returnInputClassedTextInput(lastNameItem)
//                                                            .then( (inputElement:WebElement) => {
//
//                                                                 inputElement.clear();
//                                                                 inputElement.sendKeys("Estrella");
//                                                                 e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                 browser.sleep(1000);
//                                                                 e2eUtil.hasClass(lastNameItem,"vss-valid").then();
//                                                                 browser.sleep(1000);
//
//                                                                 done();
//                                                            })
//                                                            .catch(reason => done.fail(reason));
//                                                  })
//                                                  .catch(reason => done.fail(reason));
//                                      })
//                                      .catch(reason => done.fail(reason));
//                          })
//                          .catch(reason => done.fail(reason));
//                 });
//
//
//                 it('Phone Number', (done:DoneFn) => {
//                   browser.findElements(by.css("customer-step ion-list ion-item"))
//                          .then( (val:WebElement[]) => {
//
//                               expect(val.length).toBe(7);
//
//                               let phoneNumberItem:WebElement  = val[6];
//                               phoneNumberItem.getText().then( text => expect(text).toEqual("Phone Number"));
//                               e2eUtil.clickElement(phoneNumberItem)
//                                      .then( () => {
//                                           browser.sleep(1000);
//                                           e2eUtil.hasClass(phoneNumberItem,"input-has-focus")
//                                                  .then( () => {
//
//                                                     e2eUtil.returnInputClassedTextInput(phoneNumberItem)
//                                                            .then( (inputElement:WebElement) => {
//
//                                                                 inputElement.clear();
//                                                                 inputElement.sendKeys("9802028308");
//                                                                 e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                 browser.sleep(1000);
//                                                                 e2eUtil.hasClass(phoneNumberItem,"vss-valid").then();
//                                                                 browser.sleep(1000);
//
//                                                                 done();
//                                                            })
//                                                            .catch(reason => done.fail(reason));
//                                                  })
//                                                  .catch(reason => done.fail(reason));
//                                      })
//                                      .catch(reason => done.fail(reason));
//                          })
//                          .catch(reason => done.fail(reason));
//                 });
//
//
//
//
//
//
//
//                 it('Previous should be enabled and Next shoulb disabled', (done:DoneFn) => {
//                     done();
//                 });
//
//
//
//
//
//
//                 it('should have 6 fields, VIN number, transmissionStyle, VehicleMake, VehicleModel, V.Year, V.Color', (done:DoneFn) => {
//
//                     browser.findElement(by.css("car-step"))
//                            .isDisplayed().then( val => expect(val).toBe(true) );
//
//                     browser.findElements(by.css("car-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(6);
//
//                                 val[0].getText().then( text => expect(text).toEqual("Vin Number"));
//
//                                 val[1].findElement(by.css(".switch-title")).then( (switchTitle:WebElement) => {
//                                     switchTitle.getText().then( text => expect(text).toEqual("Transmission Style"));
//                                 });
//
//                                 val[2].getText().then( text => expect(text).toEqual("Vehicle Make"));
//
//                                 val[3].getText().then( text => expect(text).toEqual("Vehicle Model"));
//
//                                 val[4].getText().then( text => expect(text).toEqual("V. Year"));
//
//                                 val[5].getText().then( text => expect(text).toEqual("V. Color"));
//
//                                 done();
//
//                            });
//                 });
//
//
//                 it('Typing a vin number should triggher the VIN api call', (done:DoneFn) => {
//
//                     browser.findElement(by.css("car-step"))
//                            .isDisplayed().then( val => expect(val).toBe(true) );
//
//                     browser.findElements(by.css("car-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(6);
//
//                                 val[0].getText().then( text => expect(text).toEqual("Vin Number"));
//
//                                 e2eUtil.clickElement(val[0])
//                                        .then( () => {
//                                            e2eUtil.returnInputClassedTextInput(val[0])
//                                                   .then( (vinInput:WebElement) => {
//
//                                                       // vinInput.sendKeys(_.sample(vinNumbers).substr(0,4));
//                                                       //
//                                                       // browser.sleep(4000);
//                                                       vinInput.clear();
//                                                       browser.sleep(500);
//                                                       vinInput.sendKeys(_.sample(vinNumbers));
//
//                                                       e2eUtil.blurInputElement("car-step ion-list ion-item input.text-input");
//
//                                                       done();
//                                                   })
//                                                   .catch(reason => done.fail(reason));
//                                        })
//                                        .catch(reason => done.fail(reason));
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//                 it('Choose color from shown color-pop-page', (done:DoneFn) => {
//                     browser.sleep(3000);
//
//                     browser.findElements(by.css("car-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(6);
//
//                                 let colorItem = val[5];
//                           //  });
//
//                                 browser.findElement(by.css("color-pop-page"))
//                                        .isDisplayed().then( isDisplayed => expect(isDisplayed).toBe(true) );
//
//                                 e2eUtil.hasClass(browser.findElement(by.css("color-pop-page")),"show-page")
//                                        .then( () => {});
//
//                                 browser.findElements(by.css("color-pop-page .pins-parent .pins ion-col"))
//                                        .then( (ionColColors:WebElement[]) => {
//                                            browser.sleep(1000);
//                                            let randomColor:WebElement = _.sample(ionColColors);
//                                            randomColor.getText()
//                                                       .then( ($colorText:string) => {
//                                                              let colorText = $colorText;
//                                                              e2eUtil.clickElement(randomColor)
//                                                                     .then( () => {
//                                                                        browser.sleep(2000);
//
//                                                                        e2eUtil.returnInputClassedTextInput(colorItem)
//                                                                               .then( (colorInput:WebElement) => {
//
//                                                                                    colorInput.getAttribute("value")
//                                                                                              .then( (value:string) =>{
//
//                                                                                                 expect(value).toBe(colorText);
//
//                                                                                                 browser.sleep(2000);
//
//                                                                                                 done();
//
//                                                                                              })
//                                                                                              .catch(reason => done.fail(reason));
//
//                                                                               })
//                                                                               .catch(reason => done.fail(reason));
//
//
//                                                                     })
//                                                                     .catch(reason => done.fail(reason));
//
//                                                        })
//                                                        .catch(reason => done.fail(reason));
//
//                                        })
//                                        .catch(reason => done.fail(reason));
//
//                     });
//                 });
//
//                 it('Choose color', (done:DoneFn) => {
//                     browser.findElements(by.css("car-step ion-list ion-item"))
//                            .then( (val:WebElement[]) => {
//
//                                 expect(val.length).toBe(6);
//
//                                 let colorItem = val[5];
//
//                                 colorItem.getText().then( text => expect(text).toEqual("V. Color"));
//
//                                 e2eUtil.clickElement(colorItem)
//                                        .then( () => {
//                                            browser.sleep(1000);
//
//                                            browser.findElement(by.css("color-pop-page"))
//                                                   .isDisplayed().then( isDisplayed => expect(isDisplayed).toBe(true) );
//
//                                            e2eUtil.hasClass(browser.findElement(by.css("color-pop-page")),"show-page")
//                                                   .then( () => {});
//
//                                            browser.findElements(by.css("color-pop-page .pins-parent .pins ion-col"))
//                                                   .then( (ionColColors:WebElement[]) => {
//                                                       browser.sleep(1000);
//                                                       let randomColor:WebElement = _.sample(ionColColors);
//                                                       randomColor.getText()
//                                                                  .then( ($colorText:string) => {
//                                                                         let colorText = $colorText;
//                                                                         e2eUtil.clickElement(randomColor)
//                                                                                .then( () => {
//                                                                                   browser.sleep(2000);
//
//                                                                                   e2eUtil.returnInputClassedTextInput(colorItem)
//                                                                                          .then( (colorInput:WebElement) => {
//
//                                                                                               colorInput.getAttribute("value")
//                                                                                                         .then( (value:string) =>{
//
//                                                                                                            expect(value).toBe(colorText);
//
//                                                                                                            browser.sleep(2000);
//
//                                                                                                            done();
//
//                                                                                                         })
//                                                                                                         .catch(reason => done.fail(reason));
//
//                                                                                          })
//                                                                                          .catch(reason => done.fail(reason));
//
//
//                                                                                })
//                                                                                .catch(reason => done.fail(reason));
//
//                                                                   })
//                                                                   .catch(reason => done.fail(reason));
//
//                                                   })
//                                                   .catch(reason => done.fail(reason));
//
//                                        })
//                                        .catch(reason => done.fail(reason));
//
//                            })
//                            .catch(reason => done.fail(reason));
//
//                 });
//
//
//                 it('Next button should be enabled', (done:DoneFn) => {
//                     browser.findElement(by.css("#mst-next"))
//                            .then( (nextButton:WebElement) => {
//
//                                browser.sleep(2000);
//
//                                nextButton.getText().then( text => expect(text).toEqual("Next"));
//                                browser.sleep(100);
//                                nextButton.getAttribute("class")
//                                          .then( (classes:string) => {
//                                               expect(_.includes(classes.split(" "), "disabled")).toBe(false);
//
//                                               browser.sleep(2000);
//                                               e2eUtil.clickElement(nextButton);
//                                               done();
//                                          })
//                                          .catch(reason => done.fail(reason));
//
//
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//
//
//
//
//
//
//
//
//                 it("Moving to PhotosNotes", (done:DoneFn) => {
//
//                     browser.findElements(by.css("car-photos-step ion-card-content"))
//                            .then( (ionCardContents:WebElement[]) => {
//
//                                ionCardContents.map( (ionCardContent:WebElement) => {
//                                    browser.sleep(1000);
//                                    e2eUtil.clickElement(ionCardContent);
//                                    browser.sleep(1000);
//                                });
//
//                                browser.findElement(by.css("car-photos-step ion-item"))
//                                       .then( (ionItem:WebElement) => {
//
//                                           ionItem.getText().then( text => expect(text).toEqual("Notes") );
//                                           browser.sleep(1000);
//
//                                           e2eUtil.clickElement(ionItem)
//                                                 .then( () => {
//                                                       browser.findElement(by.css("car-photos-step ion-textarea .text-input"))
//                                                              .then( (ionTextarea:WebElement) => {
//
//                                                                 //  expect(ionTextarea).toBeDefined();
//                                                                  browser.sleep(1000);
//
//                                                                  ionTextarea.sendKeys("I made it!")
//                                                                             .then( () => {
//                                                                                 done();
//                                                                             });
//
//                                                              })
//                                                              .catch(reason => done.fail(reason));
//                                           })
//                                           .catch(reason => done.fail(reason));
//
//                                       })
//                                       .catch(reason => done.fail(reason));
//
//
//
//
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//
//                 it("Click stage button", (done:DoneFn) => {
//                     browser.findElement(by.css("#mst-next"))
//                            .then( (nextButton:WebElement) => {
//
//                                browser.sleep(2000);
//
//                                nextButton.getText().then( text => expect(text).toEqual("Stage"));
//                                browser.sleep(100);
//                                nextButton.getAttribute("class")
//                                          .then( (classes:string) => {
//                                               expect(_.includes(classes.split(" "), "disabled")).toBe(false);
//
//                                               browser.sleep(2000);
//                                               e2eUtil.clickElement(nextButton);
//                                               done();
//                                          })
//                                          .catch(reason => done.fail(reason));
//
//
//                            })
//                            .catch(reason => done.fail(reason));
//                 });
//
//                 it("Review Ticket Alert should be displayed", (done:DoneFn) => {
//                     browser.findElement(by.css("ion-alert.edit-review-alert"))
//                            .then( (editReviewAlert:WebElement) => {
//
//                                 editReviewAlert.isDisplayed()
//                                                .then( isDisplayed => expect(isDisplayed).toBe(true) );
//
//                                 editReviewAlert.findElements(by.css(".edit-review-body"))
//                                                .then( (editReviewAlerts:WebElement[]) => {
//                                                    expect(editReviewAlerts.length).toBe(12);
//                                                    done();
//                                                });
//
//                            });
//
//                 });
//
//                 it("submitting", (done:DoneFn) => {
//                     browser.findElements(by.css(".alert-button-group button[ion-button].alert-button"))
//                            .then( (alertButtons:WebElement[]) => {
//                                expect(alertButtons.length).toBe(2);
//                                let submitButtom:WebElement = alertButtons[1];
//                                e2eUtil.clickElement(submitButtom)
//                                       .then( () => {
//                                           browser.sleep(2000);
//                                           done();
//                                       });
//                            });
//                 });
//
//                 it("complete ticket should have up", (done:DoneFn) => {
//                     done();
//                 });
//
//                 it("complete ticket should have fields filled", (done:DoneFn) => {
//                     done();
//                 });
//
//
//                 it('Filling CompanyEvent', (done:DoneFn) => {
//                     done();
//                 });
//
//
//
//
//
//
//           });
//
//
//     }
// }
// export default new CheckinWithScannersSpec();
