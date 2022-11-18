chrome.runtime.onMessage.addListener(function (request) {
    if ('returnOptions' === request.message) {
        console.log('returnOptions addListener')
        if(request.isOpen === false){
            removeAll(document.body)
        }
        if (request.isOpen === true && 'undefined' != typeof request.keywords && request.keywords) {
            getWordsRangeList(request.keywords, request.keywordsColor, request.remove)
        }
    }
});

chrome.runtime.sendMessage({
    'message': 'getOptions',
    'remove': false
});


var observer2 = new PerformanceObserver(function (list, observer) {
    const item = list.getEntries()[0]
    if (
        item?.initiatorType === 'xmlhttprequest'
        // && item.name.indexOf('/api/') !== -1
    ) {
        setTimeout(function () {
            chrome.runtime.sendMessage({
                'message': 'getOptions',
                'remove': false
            });
        }, 500);
    }
});
observer2.observe({entryTypes: ["resource"]});
