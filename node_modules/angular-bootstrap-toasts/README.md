# Angular Bootstrap Toasts

This library provides you with the ability to display toast notifications.
It is advisable to have the bootstrap library installed for the correct display of notifications.
But this is not necessary, as you can easily customize everything using your own classes.

## Install
`npm install angular-bootstrap-toasts --save`

## Demo
You can watch this [demo](https://dreyliky.github.io/angular-bootstrap-toasts-demo) and experiment with toasts.

### Simple toast example:
![](simple_toast_demo.gif)

### Confirm toast example:
![](confirm_toast_demo.gif)

## Using
All what you need is import AngularBootstrapToastsModule from 'angular-bootstrap-toasts' and add to imports of your App Module.
Then you will have access to **AngularBootstrapToastsService** and **ToastsContainerComponent**.
#### Important!!!
Add the toast container into some component of your application (for example in app.component.html):
`<Angular-Bootstrap-Toasts-Container></Angular-Bootstrap-Toasts-Container>`
Toast notifications will be shown inside of this container!

### ToastsContainer Component input paramethers:
- **Placement: PositionModel** - Model for setting placement paramethers of container: angles and margins from edges;
- **Width: string** - Container width in pixels (for example: `200px`);
- **Classes** - Classes for container customization;

### Service API:
- **ToastsList$: Observable<ToastMessage[]>** - Observable with array of toast messages;
- **DefaultTitle: string** - Default Title value;
- **DefaultText: number** - Default Text value;
- **DefaultDuration: number** - Default Duration time value;
- **showSimpleToast(params: ToastMessageParams)** - Show success toast message;
- **showConfirmToast(params: ToastMessageParams)** - Show toast message with confirmation and decline button variants;
- **changeDefaultTitle(newTitle: string)** - Change Default Title for all toasts wich not get `title` property from params when creating;
- **changeDefaultText(newText: string)** - Change Default Text for all toasts wich not get `text` property from params when creating;
- **changeDefaultDuration(duration: number)** - Change Default Duration for all toasts;

### ToastMessageParams Interface:
- **text?: string**;
- **title?: string**;
- **moment?: string** - Great property to show time/date or something like this (short info near title);
- **duration?: number** - Time in milliseconds over which will be displayed toast;
- **showProgressLine?: boolean** - Is toast will have progress line of duration time?;
- **closeByClick?: boolean** - Is toast will closable by mouse click on toast block;
- **pauseDurationOnMouseEnter?: boolean** - Is toast duration needs to be paused when mouse enter on toast block?;
- **progressLineClass?: string** - Class of progress line;
- **iconClass?: string** - Class of icon for title;
- **titleClass?: string** - Class for title block of toast;
- **bodyClass?: string** - Class for body block of toast;
- **toastClass?: string** - Class for block of toast;
- **toolbarClass?: string** - Class for toolbar block of toast;
- **closeButtonClass?: string** - Class for close button;
- **toolbarItems?: ToastToolbarItems** - Buttons for toast with type "confirm";