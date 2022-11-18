chrome.runtime.onMessage.addListener(function (request) {
    console.log('rev returnOptions msg')
    if ('returnOptions' === request.message) {
        console.log('returnOptions addListener')
        if (request.isOpen === true && 'undefined' != typeof request.keywords && request.keywords) {

            console.log(request)
            getWordsRangeList(request.keywords, request.keywordsColor, request.remove)
        }
    }
});

chrome.runtime.sendMessage({
    'message': 'getOptions',
    'remove': false
});


var observer2 = new PerformanceObserver(function (list, observer) {
    console.log('perf_observer listen')
    const item = list.getEntries()[0]
    console.log(item)
    console.log(item?.initiatorType === 'xmlhttprequest')
    console.log(item.name.indexOf('/api/') !== -1)
    if (
        item?.initiatorType === 'xmlhttprequest'
        && item.name.indexOf('/api/') !== -1
    ) {
        console.log('xmlhttprequest')
        setTimeout(function () {
            chrome.runtime.sendMessage({
                'message': 'getOptions',
                'remove': false
            });
        }, 500);
    }
});
observer2.observe({entryTypes: ["resource"]});
