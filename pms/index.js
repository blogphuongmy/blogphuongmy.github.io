$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    if(input.get(0).files.length > 0)
    {
        input.trigger('fileselect', [label]);
    }
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, label) {
        var input = $("#fileselected");
        log = label;

        if( input.length ) {
            input.text(log);
        } else {
            if( log ) alert(log);
        }

        document.getElementById("fileupload").submit();

    });
});

var socialLikesButtons = {
    linkedin: {
        counterUrl: 'http://www.linkedin.com/countserv/count/share?url={url}',
        counter: function(jsonUrl, deferred) {
            var options = socialLikesButtons.linkedin;
            if (!options._) {
                options._ = {};
                if (!window.IN) window.IN = {Tags: {}};
                window.IN.Tags.Share = {
                    handleCount: function(params) {
                        var jsonUrl = options.counterUrl.replace(/{url}/g, encodeURIComponent(params.url));
                        options._[jsonUrl].resolve(params.count);
                    }
                };
            }
            options._[jsonUrl] = deferred;
            $.getScript(jsonUrl)
                .fail(deferred.reject);
        },
        popupUrl: 'http://www.linkedin.com/shareArticle?mini=false&url={url}&title={title}',
        popupWidth: 650,
        popupHeight: 500
    }
};