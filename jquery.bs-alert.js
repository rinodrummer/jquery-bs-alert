(function ($) {
    $.fn.ajaxAlert = function (options) {
        let that = this;
        let elem = $(this);

        let opts = $.extend( {}, $.fn.ajaxAlert.defaults, options);

        let dismissDelay = 0;
        let classes = [
            'alert-primary',
            'alert-secondary',
            'alert-success',
            'alert-danger',
            'alert-warning',
            'alert-info',
            'alert-light',
            'alert-dark'
        ];

        let close = '<button type="button" class="close" data-dismiss="alert" aria-label="' + opts.closeLabel + '"><span aria-hidden="true">&times;</span></button>';

        $.each(classes, function(index, className) {
           elem.removeClass(className);
        });

        if ((typeof opts.autoDismiss) === 'boolean') {
            if (opts.autoDismiss) {
                dismissDelay = 5000;
            }
        }
        else {
            if (opts.autoDismiss > 0) {
                dismissDelay = opts.autoDismiss;
                opts.autoDismiss = true;
            }
            else {
                opts.autoDismiss = false;
            }
        }

        if (opts.dismissable) {
            if (!elem.children('button.close').length > 0) {
                elem.append(close);
            }

            close = elem.children('button.close');

            elem.contents().not('button.close').remove();
        }
        else {
            elem.contents().remove();
        }

        if (typeof opts.message === 'object') {
            if (opts.message.label && opts.message.label.text) {
                label = opts.message.label;

                label.tag = label.tag.toLowerCase() || 'p';


                elem.append('<' + label.tag + '>' + label.text + (label.text.endsWith(':') ? '' : ':') + '</' + label.tag + '>');
            }

            let list = $('<ul></ul>');
            elem.append(list);

            opts.message.messages.each(function (index, message) {
                list.append('<li>' + message + '</li>');
            });
        }
        else {
            elem.append('<p>' + opts.message + '</p>');
        }

        elem.addClass(opts.type);
        opts.show.call(this);

        if (opts.autoDismiss && elem.is(':visible')) {
            setTimeout(function () {
                opts.hide.call(that);
                elem.trigger('close.bs.alert');
            }, dismissDelay);
        }

        if (opts.complete && $.isFunction(opts.complete)) {
            opts.complete.call(that);
        }
    }

    $.fn.ajaxAlert.defaults = {
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
    };
})(jQuery);
