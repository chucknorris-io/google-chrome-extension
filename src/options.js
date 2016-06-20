(function() {

    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);

    var radios = document.getElementsByName('link_target');
    for (var i = radios.length; i--;) {
        radios[i].onchange = function(event) {
            changeRadioButton(event);
        };
    }

    function changeRadioButton(event) {
        for (var i = radios.length; i--;) {
            if (event.target.value === radios[i].value) {
                radios[i].setAttribute('checked', 'checked');
            } else {
                radios[i].removeAttribute('checked');
            }
        }
    }

    function flashStatus(message, timeout) {
        var status = document.getElementById('status');
        var timeout = timeout ? timeout : 750;

        if (message) {
            status.textContent = message;

            setTimeout(function() {
                status.textContent = '';
            }, timeout);
        }
    }

    function restoreOptions() {
        chrome.storage.sync.get('linkTarget', function(item) {
            for (var i = radios.length; i--;) {
                if (item.linkTarget === radios[i].getAttribute('value')) {
                    radios[i].setAttribute('checked', 'checked');
                } else {
                    radios[i].removeAttribute('checked');
                }
            }
        });
    }

    function saveOptions() {
        chrome.storage.sync.set({
            linkTarget: document.querySelector('input[name="link_target"][checked="checked"]').getAttribute('value')
        }, function() {
            flashStatus('Settings saved.');
        });
    }

}());
