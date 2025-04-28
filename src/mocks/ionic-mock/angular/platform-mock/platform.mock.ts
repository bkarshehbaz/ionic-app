// import { Platform } from "ionic-angular";
// import { of } from 'rxjs/observables';
import { of } from 'rxjs';

declare var Promise: any;

export class PlatformMock { // extends Platform {

  get resize () {
    return of({});
  }

  get Css () {
    return {};
  }


  // public ready(): Promise<{String}> {
  public ready(): Promise<any> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: any, priority?: number): any {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }


  public is(val?: string): boolean {
    return val === "mock";
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): any {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }

  platforms(): string[] {
    return [];
  }
}
