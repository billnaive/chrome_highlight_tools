/*
 * License:
 *
 * This software is distributed under the terms of the GNU General Public License v3.
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Copyright (c) 2017, Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 */

/* global saveOptions, loadOptions */
document.addEventListener('DOMContentLoaded', function () {
    loadOptions();
    document.getElementById('isOpen').addEventListener('click', function (e) {
        saveOptions();
        chrome.runtime.sendMessage({
            'message': 'getOptions',
            'remove': true,
            'status': document.getElementById('isOpen').checked
        });
    });

    document.getElementById('buttonSave').addEventListener('click', function () {
        saveOptions();
        chrome.runtime.sendMessage({
            'message': 'getOptions',
            'remove': true
        });
    });
});
