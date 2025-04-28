// import { ProtractorBrowser, WebElement, by, browser } from 'protractor';
//
// import * as _ from "lodash";
//
// import { e2eUtil } from "../../../../util/util.e2e-class";
// import CustomerStepUtil from "../../steps-util/customer-step.e2e-class";
// import SelectSearchComponentUtil from "../../../../components/select-component/select-component.e2e-class";
//
// // import * as Items from "./items/index.e2e-class";
//
// class CustomerStep {
//
//     runCustomerStep() {
//
//         describe("Customer Step >> ", () => {
//
//             it("Customer Step should be displayed", (done:DoneFn) => {
//                 CustomerStepUtil.isDisplayed(done);
//             });
//
//             it('should have 7 fields, ticketNumber, Place, company/event, Roomnumber, firstName, lastName, phoneNumber', (done:DoneFn) => {
//
//                 CustomerStepUtil.verifyFields(done);
//
//             });
//
//             /*NOTE: this can the default test for a  ion-input*/
//             it("Click companyEventItem", (done:DoneFn) => {
//                 CustomerStepUtil.clickCompanyEventItem(done);
//                 browser.sleep(1000);
//             });
//
//             it("SelectComponent/CompanyEvent should be displayed", (done:DoneFn) => {
//                 SelectSearchComponentUtil.isDisplayed(done);
//             });
//
//             it("SelectComponent/CompanyEvent title should be CHOOSE EVENT", (done:DoneFn) => {
//                 SelectSearchComponentUtil.shouldHaveTitle("CHOOSE EVENT", done);
//             });
//
//             it("SelectComponent/CompanyEvent should have 3 items", (done:DoneFn) => {
//                 SelectSearchComponentUtil.itemCountShouldBe(3,done);
//             });
//
//             it("Items' titles should be equal to these", (done:DoneFn) => {
//
//             });
//
//             it("Click random item", (done:DoneFn) => {
//
//             });
//
//             it('Filling CompanyEvent', (done:DoneFn) => {
//
//                 browser.findElements(by.css("customer-step ion-list ion-item"))
//                        .then( (val:WebElement[]) => {
//
//                            let companyEventItem:WebElement = val[2];
//                                companyEventItem.getText().then( text => expect(text).toEqual("Company/Event"));
//
//                            e2eUtil.clickElement( companyEventItem)
//                                   .then(() => {
//                                       browser.sleep(1000);
//
//                                       browser.findElement(by.css("select-component"))
//                                              .then( (selectComponent:WebElement) => {
//
//                                                   selectComponent.isDisplayed()
//                                                                  .then( (isDisplayed:boolean) => {
//                                                                      expect(isDisplayed).toBe(true);
//                                                                  });
//
//                                                   selectComponent.findElement(by.css("ion-list ion-label"))
//                                                                  .getText()
//                                                                  .then( text => expect(text).toBe("CHOOSE EVENT"));
//
//                                                   selectComponent.findElements(by.css("ion-content ion-list ion-item"))
//                                                                  .then( (companyEventItems:WebElement[]) => {
//                                                                     //  expect(companyEventItems.length).toBe(2);
//                                                                      expect(companyEventItems.length).toBe(3);
//
//
//                                                                      companyEventItems[0].getText().then( text => expect(text).toBe("Solitek Annual Event"));
//                                                                      companyEventItems[1].getText().then( text => expect(text).toBe("Solitek Solutions"));
//
//
//                                                                      let randomCompanyEvent:WebElement = _.sample(companyEventItems);
//                                                                      randomCompanyEvent.getText()
//                                                                                        .then( (text:string) => {
//                                                                                            let randomText = text;
//                                                                                            e2eUtil.clickElement(randomCompanyEvent)
//                                                                                                   .then( () => {
//                                                                                                       browser.sleep(1000);
//                                                                                                       e2eUtil.returnInputClassedTextInput(companyEventItem)
//                                                                                                              .then( (inputElement:WebElement) => {
//                                                                                                                 inputElement.getAttribute("value")
//                                                                                                                             .then( (value:string) =>{
//                                                                                                                                expect(value).toBe(randomText);
//                                                                                                                                expect(randomText).toBe(value);
//                                                                                                                                done();
//                                                                                                                             })
//                                                                                                                             .catch(reason => done.fail(reason));
//                                                                                                              })
//                                                                                                              .catch(reason => done.fail(reason));
//                                                                                                   })
//                                                                                                   .catch(reason => done.fail(reason));
//                                                                                        })
//                                                                                        .catch(reason => done.fail(reason));
//                                                                  })
//                                                                  .catch(reason => done.fail(reason));
//                                              })
//                                              .catch(reason => done.fail(reason));
//                                   })
//                                   .catch(reason => done.fail(reason));
//                        })
//                        .catch(reason => done.fail(reason));
//             });
//
//
//             it('First Name', (done:DoneFn) => {
//               browser.findElements(by.css("customer-step ion-list ion-item"))
//                      .then( (val:WebElement[]) => {
//
//                           expect(val.length).toBe(7);
//
//                           let firstNameItem:WebElement    = val[4];
//                               firstNameItem.getText().then( text => expect(text).toEqual("First Name"));
//                               e2eUtil.clickElement(firstNameItem)
//                                      .then( () => {
//                                           browser.sleep(1000);
//                                           e2eUtil.hasClass(firstNameItem,"input-has-focus")
//                                                  .then( () => {
//
//                                                     e2eUtil.returnInputClassedTextInput(firstNameItem)
//                                                            .then( (inputElement:WebElement) => {
//
//                                                                 inputElement.clear();
//                                                                 inputElement.sendKeys("Lucas");
//                                                                 e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                                 browser.sleep(1000);
//                                                                 e2eUtil.hasClass(firstNameItem,"vss-valid").then();
//                                                                 browser.sleep(1000);
//
//                                                                 done();
//                                                            })
//                                                            .catch(reason => done.fail(reason));
//                                                  })
//                                                  .catch(reason => done.fail(reason));
//                                      })
//                                      .catch(reason => done.fail(reason));
//                      })
//                      .catch(reason => done.fail(reason));
//             });
//
//
//
//             it('Last Name', (done:DoneFn) => {
//               browser.findElements(by.css("customer-step ion-list ion-item"))
//                      .then( (val:WebElement[]) => {
//
//                           expect(val.length).toBe(7);
//
//                           let lastNameItem:WebElement     = val[5];
//                           lastNameItem.getText().then( text => expect(text).toEqual("Last Name"));
//                           e2eUtil.clickElement(lastNameItem)
//                                  .then( () => {
//                                       browser.sleep(1000);
//                                       e2eUtil.hasClass(lastNameItem,"input-has-focus")
//                                              .then( () => {
//
//                                                 e2eUtil.returnInputClassedTextInput(lastNameItem)
//                                                        .then( (inputElement:WebElement) => {
//
//                                                             inputElement.clear();
//                                                             inputElement.sendKeys("Estrella");
//                                                             e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                             browser.sleep(1000);
//                                                             e2eUtil.hasClass(lastNameItem,"vss-valid").then();
//                                                             browser.sleep(1000);
//
//                                                             done();
//                                                        })
//                                                        .catch(reason => done.fail(reason));
//                                              })
//                                              .catch(reason => done.fail(reason));
//                                  })
//                                  .catch(reason => done.fail(reason));
//                      })
//                      .catch(reason => done.fail(reason));
//             });
//
//
//             it('Phone Number', (done:DoneFn) => {
//               browser.findElements(by.css("customer-step ion-list ion-item"))
//                      .then( (val:WebElement[]) => {
//
//                           expect(val.length).toBe(7);
//
//                           let phoneNumberItem:WebElement  = val[6];
//                           phoneNumberItem.getText().then( text => expect(text).toEqual("Phone Number"));
//                           e2eUtil.clickElement(phoneNumberItem)
//                                  .then( () => {
//                                       browser.sleep(1000);
//                                       e2eUtil.hasClass(phoneNumberItem,"input-has-focus")
//                                              .then( () => {
//
//                                                 e2eUtil.returnInputClassedTextInput(phoneNumberItem)
//                                                        .then( (inputElement:WebElement) => {
//
//                                                             inputElement.clear();
//                                                             inputElement.sendKeys("9802028308");
//                                                             e2eUtil.clickElement(browser.findElement(by.css("#mst-next")));
//                                                             browser.sleep(1000);
//                                                             e2eUtil.hasClass(phoneNumberItem,"vss-valid").then();
//                                                             browser.sleep(1000);
//
//                                                             done();
//                                                        });
//                                              })
//                                              .catch(reason => done.fail(reason));
//                                  })
//                                  .catch(reason => done.fail(reason));
//                      })
//                      .catch(reason => done.fail(reason));
//             });
//
//
//             it('Previous should be enabled and Next shoulb disabled', (done:DoneFn) => {
//                 done();
//             });
//
//         });
//     }
//
// }
// export default new CustomerStep();
