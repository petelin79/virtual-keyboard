"use strict";

const keyboardArea = document.querySelector('.keyboard-area')

async function tst () {
    let query = await fetch('./keyboard.json')
    let res = await query.json()
    
    for (let el in res) {
        let btn = document.createElement('div');
        if (res[el]['type'] === 'regular') {
            btn.classList.add('key-regular')
        }
        else if (res[el]['type'] === 'double') {
            btn.classList.add('key-double')
        }
        else if (res[el]['type'] === 'long') {
            btn.classList.add('key-long')
        }
        let symbol =  res[el]['key_detail']['en']['key']
        if (symbol.length === 1 && symbol.match(/[a-z]/i)) {
            btn.textContent = res[el]['key_detail']['en']['key'].toUpperCase()
        }
        else btn.textContent = res[el]['key_detail']['en']['key']
        keyboardArea.append(btn)
    }
}

tst()