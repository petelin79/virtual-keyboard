"use strict";
import { x } from './keyboard.js'

const body = document.querySelector('body')
const main = document.createElement('main')
main.classList.add("main-wrapper")
const div = document.createElement("div")
div.classList.add("keybord-wrapper")
const sectionPrint = document.createElement("section")
sectionPrint.classList.add("print-area")
const textareaPrint = document.createElement("textarea")
textareaPrint.classList.add("text")
textareaPrint.setAttribute("cols", "30")
textareaPrint.setAttribute("rows", "10")
const sectionKeyboard = document.createElement("section")
sectionKeyboard.classList.add("keyboard-area")
const txt = document.createElement("p")
txt.classList.add('txt-style')
txt.textContent = 'A keyboard shortcut for switching a language is left Shift + left Ctrl'

sectionPrint.append(textareaPrint)
div.append(sectionPrint)
div.append(sectionKeyboard)
div.append(txt)
main.append(div)
body.append(main)

const keyboardArea = document.querySelector('.keyboard-area')
const textArea = document.querySelector('.text')

let lang = 'en'
let register = 'key'


function tst () {
    let res = x

    for (let el in res) {
        let btn = document.createElement('div');
        btn.classList.add('key')
        btn.classList.add(res[el]['key_code'])
        if (res[el]['size'] === 'regular') {
            btn.classList.add('key-regular')
        }
        else if (res[el]['size'] === 'double') {
            btn.classList.add('key-double')
        }
        else if (res[el]['size'] === 'long') {
            btn.classList.add('key-long')
        }

        btn.textContent = res[el]['key_detail'][lang][register]

        btn.addEventListener('mousedown', () => {
            btn.classList.add('active')
            if  (res[el]['type'] === 'abc') {
                textArea.value += res[el]['key_detail'][lang][register]
            }
            else if (res[el]['type'] === 'service') {
                if (res[el]['key_detail'][lang][register] === "CapsLock" && capsLock === false) {
                    register = "shift_key"
                    shiftPressing()
                    capsLock = true
                }
                else if (res[el]['key_detail'][lang][register] === "CapsLock" && capsLock === true) {
                    register = "key"
                    shiftPressing()
                    capsLock = false
                }
                if (res[el]['key_detail'][lang][register] === "Shift" && capsLock === false) {
                    register = "shift_key"
                    shiftPressing()
                }
                if (res[el]['key_detail'][lang][register] === "Tab") {
                    textArea.value += '\t'
                }
            }

        })
        btn.addEventListener('mouseup', () => {
            btn.classList.remove('active')
            if (res[el]['key_detail'][lang][register] === "Shift" && capsLock === false) {
                register = "key"
                shiftPressing()
            }
        })
        keyboardArea.append(btn)
    }

    const buttonKeys = document.querySelectorAll('.key')

    for (let el in res) {
        let keyCode = res[el]['key_code']

        document.addEventListener('keydown', (event) => {
            textArea.focus()
            if (event.code === keyCode) {
                buttonKeys.forEach(elem => {
                    if (elem.classList.contains(keyCode)) {
                        elem.classList.add('active')
                    }
                })
            }
        })

        document.addEventListener('keyup', (event) => {
            textArea.blur()
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

let leftCtrl = false
let leftShift = false
let rightShift = false
let capsLock = false

document.addEventListener('keydown', (event) => {
    if (event.code === 'ControlLeft') {
        leftCtrl = true
    }
    else if (event.code === 'ShiftLeft') {
        leftShift = true
    }
    else if (event.code === 'ShiftRight') {
        rightShift = true
    }
    else if (event.code === 'CapsLock') {
        capsLock = !capsLock
    }
    else if (event.code === 'Tab') {
        event.preventDefault()
        textArea.value += '\t'
    }
    else if (event.code === 'AltLeft') {
        event.preventDefault()
    }
    else if (event.code === 'AltRight') {
        event.preventDefault()
    }
    else if (event.code === 'ArrowUp') {
        event.preventDefault()
        textArea.value += "⬆"
    }
    else if (event.code === 'ArrowLeft') {
        textArea.value += "⬅"
        event.preventDefault()
    }
    else if (event.code === 'ArrowRight') {
        textArea.value += "➡"
        event.preventDefault()
    }
    else if (event.code === 'ArrowDown') {
        textArea.value += "⬇"
        event.preventDefault()
    }

    if (event.repeat && leftCtrl && leftShift) {
        event.preventDefault();
        leftCtrl = false
        leftShift = false
    }

    if (leftCtrl && leftShift) {
        if (lang === 'en') {
            lang = 'ru'
            }
            else {
                lang = 'en'
        }
        changeLang()
    }

    else if (leftShift || rightShift) {
        register = 'shift_key'
        shiftPressing()
    }

    if (capsLock) {
        register = 'shift_key'
        shiftPressing()
    }



});


document.addEventListener('keyup', (event) => {
    if (event.code === 'ControlLeft') {
        leftCtrl = false
    }
    else if (event.code === 'ShiftLeft') {
        leftShift = false
    }

    if (!capsLock) {
        if (!leftShift || !rightShift) {
            register = 'key'
            shiftPressing()
        }
    }
})

function changeLang () {
    const buttonKeys = document.querySelectorAll('.key')
    buttonKeys.forEach((el, pos) => {
        el.textContent=Object.entries(x)[pos][1]['key_detail'][lang][register]
    })
}

function shiftPressing () {
    const buttonKeys = document.querySelectorAll('.key')
    buttonKeys.forEach((el, pos) => {
        el.textContent=Object.entries(x)[pos][1]['key_detail'][lang][register]
    })
}