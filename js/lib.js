
const class_word = 'chrome-extension-highlight'

function LightWords(range,color) {
    let span = document.createElement('span');
    span.classList.add(class_word)
    span.style.backgroundColor = color

    span.appendChild(range.extractContents())
    range.insertNode(span)
}

function acceptNode(node,word){
    let wordRegex = new RegExp(word, "g");
    if (
        // node.nodeValue.indexOf(word) !== -1
        // &&
        wordRegex.test(node.nodeValue)
    ) {
        return 1;
    }else{
        return -1;
    }
}

function highlightWordInTextNodeOnly(word, bgColorCode) {
    if (word == null || word.length === 0) return;
    let treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    let skipTagName = {
        "NOSCRIPT": true,
        "SCRIPT": true,
        "STYLE": true
    }
    let nodeList = []
    while (treeWalker.nextNode()) {
        if(acceptNode(treeWalker.currentNode,word) === 1){
            if (
                !skipTagName[treeWalker.currentNode.parentNode.tagName]
                && treeWalker.currentNode.parentElement.className.indexOf(class_word) === -1
            ) {
                nodeList.push(treeWalker.currentNode);
            }
        }
    }

    let rangeList = []
    nodeList.forEach(function (n){
        let startIndex = 0
        do{
             let tmp = startIndex = n.textContent.indexOf(word, startIndex + 1)
            // console.log('val:'+n.nodeValue + '  text:' + n.textContent+'   indexOf:'+tmp + '  word:'+word + '  reg:' +  wordRegex.test(n.textContent))
            if(startIndex !== -1){
                let wordRange = document.createRange()
                wordRange.setStart(n,startIndex)
                wordRange.setEnd(n,startIndex + word.length)
                rangeList.push(wordRange)
            }
        }while (startIndex !== -1)
    })

    rangeList.forEach(function (r){
        LightWords(r,bgColorCode)
    })
}

function removeAll(node){
    let span
    while (span = node.querySelector('span.'+class_word)){
        span.outerHTML = span.innerHTML
    }
}

function getWordsRangeList(words,colorList) {
    let keywords = words.split(' ');
    let aColor;
    if(colorList.indexOf(' ') === -1){
        aColor = colorList;
    }else{
        aColor = colorList.split(' ');
    }
    keywords = keywords.filter(v=>v);
    aColor = aColor.filter(v=>v);
    let color_length = aColor.length
    console.log('color_length.:'+color_length)
    keywords.forEach(function (k,index){
        if(k === '' || k === undefined) return;
        console.log('mode.:'+index % color_length)
        highlightWordInTextNodeOnly(k, aColor[index % color_length])
    })
}

