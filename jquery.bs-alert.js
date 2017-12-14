(function ($) {
    $.fn.bsAlert = function (options) {
        let that = this;
        let elem = $(this);

        let opts = $.extend( {}, $.fn.bsAlert.defaults, options);

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
        ]

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
                elem.append('<button type="button" class="close" data-dismiss="alert" aria-label="' + opts.closeLabel + '"><span aria-hidden="true">&times;</span></button>');
            }

            elem.contents().not('button.close').remove();
        }
        else {
            elem.contents().remove();
        }

        elem.append('<p>' + opts.message + '</p>');
        elem.addClass(opts.type);
        opts.show.call(this);

        if (opts.autoDismiss) {
            setTimeout(function () {
                opts.hide.call(that);
                elem.trigger('close.bs.alert');
            }, dismissDelay);
        }
    }

    $.fn.bsAlert.defaults = {
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
        }
    };
})(jQuery);
