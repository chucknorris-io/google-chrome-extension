(function() {

    var linkTarget = null;
    chrome.storage.sync.get('linkTarget', function(item) {
        if (item.linkTarget === 'auto') {
            linkTarget = location.hostname === 'api.chucknorris.io' ? 'update_tab' : 'create_tab';
        } else {
            linkTarget = 'create_tab';
        };
    });

    function getRandomJoke(callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);

        xhr.onload = function(event) {
            if (4 === xhr.readyState && 200 === xhr.status) {
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error(xhr.statusText);
            }
        };

        xhr.onerror = function(event) {
            console.error(xhr.statusText);
        };

        xhr.send(null);
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if ('clicked_browser_action' === request.message) {
            getRandomJoke(function(joke) {
                chrome.runtime.sendMessage({
                    message: linkTarget,
                    url: joke.url + '?utm_source=google_chrome&utm_medium=browser_extension&utm_term=' + joke.id + '&utm_campaign=random+joke'
                });
            });
        }
    });

}());
