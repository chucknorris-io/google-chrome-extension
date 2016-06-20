(function() {

    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                message: 'clicked_browser_action'
            });
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        if ('create_tab' === request.message) {
            chrome.tabs.create({
                url: request.url
            });
        }

        if ('update_tab' === request.message) {
            chrome.tabs.update({
                url: request.url
            });
        }
    });

}());
