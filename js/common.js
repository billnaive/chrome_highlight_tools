/*
 * License:
 *
 * This software is distributed under the terms of the GNU General Public License v3.
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Copyright (c) 2017, Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 */

function loadOptions() {  // eslint-disable-line no-unused-vars
  if ('undefined' !== typeof localStorage) {
    document.getElementById('textareaKeywords').value = localStorage.getItem('keywords');
    document.getElementById('keywordsColor').value = localStorage.getItem('keywordsColor');

    let isOpen = localStorage.getItem('isOpen');
    isOpen = 'true' === isOpen || null === isOpen;
    document.getElementById('isOpen').checked = isOpen;
  }
}

function saveOptions() {  // eslint-disable-line no-unused-vars
  if ('undefined' !== typeof localStorage) {
    localStorage.setItem('keywords', document.getElementById('textareaKeywords').value);
    localStorage.setItem('isOpen', document.getElementById('isOpen').checked);
    localStorage.setItem('keywordsColor', document.getElementById('keywordsColor').value);
  }
}


