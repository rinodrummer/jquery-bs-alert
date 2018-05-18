# jquery-bs-alert
A jQuery plugin for Bootstrap that manages alerts.

## Settings

### Defaults
```js
{
    type: 'alert-success',
    message: '',
    dismissable: true,
    autoDismiss: false,
    closeLabel: 'Close',
    show: function () {
        $(this).fadeIn();
    },
    hide: function () {
        $(this).fadeOut();
    },
    complete: null
}
```
