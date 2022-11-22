/*
 * License:
 *
 * This software is distributed under the terms of the GNU General Public License v3.
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Copyright (c) 2017, Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 */
const default_color = '#ff9a9e #a18cd1 #fad0c4 #fcb69f #f6d365 #d4fc79 #84fab0 #a6c0fe #fccb90 #f5576c #4facfe #43e97b #fa709a #30cfd0 #fddb92 #2af598 #6a11cb #accbee #C7BCA1 #975C8D';
chrome.runtime.onMessage.addListener(function (request, sender) {
    // This message is recived from 'content.js' and 'popup.js'.
    if ('getOptions' === request.message) {
        if ('undefined' !== typeof localStorage) {
            chrome.tabs.query({
                    'active': true,
                    'currentWindow': true
                },
                function (tabs) {
                    if (tabs[0] !== undefined) {
                        if ('undefined' !== typeof tabs[0].id && tabs[0].id) {
                            let isOpen = localStorage.getItem('isOpen');
                            isOpen = 'true' === isOpen || null === isOpen;
                            let keywordsColor = localStorage.getItem('keywordsColor')
                            if(keywordsColor === '' || keywordsColor === null || keywordsColor === undefined) keywordsColor = default_color
                            chrome.tabs.sendMessage(tabs[0].id, {
                                'message': 'returnOptions',
                                'remove': request.remove,
                                'isOpen': isOpen,
                                'keywords': localStorage.getItem('keywords'),
                                'keywordsColor': keywordsColor,
                            });
                            console.log('send returnOptions msg')
                        }
                    }
                });
        }
    }
});


