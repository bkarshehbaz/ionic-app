// tslint:disable:jsdoc-format
/** A config value can come from anywhere and be anything, but there are default
* values for each mode. The [theming](../../../theming/platform-specific-styles/)
* documentation has a chart of the default mode configuration. The following
* chart displays each property with a description of what it controls.
*
*
* | Config Property          | Type                | Details                                                                                                                                          |
* |--------------------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
* | `activator`              | `string`            | Used for buttons, changes the effect of pressing on a button. Available options: `"ripple"`, `"highlight"`.                                      |
* | `actionSheetEnter`       | `string`            | The name of the transition to use while an action sheet is presented.                                                                            |
* | `actionSheetLeave`       | `string`            | The name of the transition to use while an action sheet is dismissed.                                                                            |
* | `alertEnter`             | `string`            | The name of the transition to use while an alert is presented.                                                                                   |
* | `alertLeave`             | `string`            | The name of the transition to use while an alert is dismissed.                                                                                   |
* | `backButtonText`         | `string`            | The text to display by the back button icon in the navbar.                                                                                       |
* | `backButtonIcon`         | `string`            | The icon to use as the back button icon.                                                                                                         |
* | `iconMode`               | `string`            | The mode to use for all icons throughout the application. Available options: `"ios"`, `"md"`                                                     |
* | `locationStrategy`       | `string`            | Set to 'path' to remove hashbangs when using Deeplinking.                                                                                        |
* | `loadingEnter`           | `string`            | The name of the transition to use while a loading indicator is presented.                                                                        |
* | `loadingLeave`           | `string`            | The name of the transition to use while a loading indicator is dismissed.                                                                        |
* | `menuType`               | `string`            | Type of menu to display. Available options: `"overlay"`, `"reveal"`, `"push"`.                                                                   |
* | `modalEnter`             | `string`            | The name of the transition to use while a modal is presented.                                                                                    |
* | `modalLeave`             | `string`            | The name of the transition to use while a modal is dismiss.                                                                                      |
* | `mode`                   | `string`            | The mode to use throughout the application.                                                                                                      |
* | `pageTransition`         | `string`            | The name of the transition to use while changing pages. Available options: `"ios-transition"`, `"md-transition"`, `"wp-transition"`.             |
* | `pickerEnter`            | `string`            | The name of the transition to use while a picker is presented.                                                                                   |
* | `pickerLeave`            | `string`            | The name of the transition to use while a picker is dismissed.                                                                                   |
* | `popoverEnter`           | `string`            | The name of the transition to use while a popover is presented.                                                                                  |
* | `popoverLeave`           | `string`            | The name of the transition to use while a popover is dismissed.
* | `scrollAssist`           | `boolean`           | Used to avoid the input to be hidden by the keyboard if it's near the bottom of the page.
* | `scrollPadding`          | `boolean`           | Used to remove the extra padding on ion-content when keyboard is displayed.
* | `spinner`                | `string`            | The default spinner to use when a name is not defined.                                                                                           |
* | `statusbarPadding`       | `boolean`           | Whether to hide extra padding for statusbar.                                                                                                     |
* | `swipeBackEnabled`       | `boolean`           | Whether native iOS swipe to go back functionality is enabled.                                                                                    |
* | `tabsHighlight`          | `boolean`           | Whether to show a highlight line under the tab when it is selected.                                                                              |
* | `tabsLayout`             | `string`            | The layout to use for all tabs. Available options: `"icon-top"`, `"icon-start"`, `"icon-end"`, `"icon-bottom"`, `"icon-hide"`, `"title-hide"`.   |
* | `tabsPlacement`          | `string`            | The position of the tabs relative to the content. Available options: `"top"`, `"bottom"`                                                         |
* | `tabsHideOnSubPages`     | `boolean`           | Whether to hide the tabs on child pages or not. If `true` it will not show the tabs on child pages.                                              |
* | `toastEnter`             | `string`            | The name of the transition to use while a toast is presented.                                                                                    |
* | `toastLeave`             | `string`            | The name of the transition to use while a toast is dismissed.                                                                                    |
*
**/
interface IonicConfig {
    /**
     * The mode to use throughout the application.
     */
	mode: string;

	iconMode: "ios"|"md";

    /**
     * The text to display by the back button icon in the navbar.
     */
    backButtonText: string;

    /**
     *  Type of menu to display. Available options: `"overlay"`, `"reveal"`, `"push"`.
     */
    menuType: "overlay"|"reveal"|"push";


    /**
     *
     */
    scrollPadding: boolean;

    /**
     *
     */
    scrollAssist: boolean;

    /**
     *
     */
    autoFocusAssist: boolean;

    /**
     *
     */
    swipeBackEnabled: boolean;

    locationStrategy?: "path";
}

export const AppConfig: IonicConfig = {
	mode: "ios",
	iconMode: "ios",
    backButtonText: "Go Back",
    menuType: "overlay",
    // scrollPadding: true,
    // scrollAssist: true,
    // autoFocusAssist: true,
    scrollPadding: false,
    scrollAssist: false,
    autoFocusAssist: false,
    swipeBackEnabled: false,
    // locationStrategy: "path"
};
