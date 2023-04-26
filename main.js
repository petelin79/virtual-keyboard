"use strict";

const keyboardArea = document.querySelector('.keyboard-area')

async function tst () {
    let query = await fetch('./keyboard.json')
    let res = await query.json()

    for (let el in res) {
        let btn = document.createElement('div');
        btn.classList.add('key')
        btn.classList.add(res[el]['key_code'])
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
        if (symbol.length === 1 && symbol.match(/[a-z, а-я]/i)) {
            btn.textContent = res[el]['key_detail']['en']['key'].toUpperCase()
        }
        else btn.textContent = res[el]['key_detail']['en']['key']
        keyboardArea.append(btn)
    }

    const buttonKeys = document.querySelectorAll('.key')

    for (let el in res) {
        let keyCode = res[el]['key_code']

        document.addEventListener('keydown', (event) => {
            if (event.code === keyCode) {
                buttonKeys.forEach(elem => {
                    if (elem.classList.contains(keyCode)) {
                        elem.classList.add('active')
                    }
                })
            }
        })
    
        document.addEventListener('keyup', (event) => {
            if (event.code === keyCode) {
                buttonKeys.forEach(elem => {
                    if (elem.classList.contains(keyCode)) {
                        elem.classList.remove('active')
                    }
                })
            }
        })
    }



}

tst()
