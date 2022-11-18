/*
 * License:
 *
 * This software is distributed under the terms of the GNU General Public License v3.
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Copyright (c) 2017, Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 */

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
                            chrome.tabs.sendMessage(tabs[0].id, {
                                'message': 'returnOptions',
                                'remove': request.remove,
                                'isOpen': isOpen,
                                'keywords': localStorage.getItem('keywords'),
                                'keywordsColor': localStorage.getItem('keywordsColor'),
                            });
                            console.log('send returnOptions msg')
                        }
                    }
                });
        }
    }
});


