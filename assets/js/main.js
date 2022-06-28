const select = document.querySelectorAll('.select-language')

select.forEach((item, index) => {
    for (const country_code in countries) {
        let select;
        if (index == 0 && country_code == "en-GB") {
            select = 'selected'
        } else if (index == 1 && country_code == "vi-VN") {
            select = 'selected'
        }
        let option = `<option value = ${country_code} ${select}>${countries[country_code]}</option>`
        item.insertAdjacentHTML('beforeend', option)
    }
})


const translateBtn = document.querySelector(".btn-translate"),
    translateText = document.querySelector(".text-translate"),
    translateResult = document.querySelector(".translate-result"),
    exChange = document.querySelector('.exchange')

translateBtn.addEventListener('click', () => {
    let text = translateText.value
    if (text) {
        translateFrom = select[0].value,
            translateTo = select[1].value
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        translateTo = ''
        translateResult.setAttribute('placeholder', 'Translating...')

        fetch(apiUrl).then(res => res.json()).then(data => {
            translateResult.value = data.responseData.translatedText;
        })
    }
})

select.forEach((item, index) => {
    item.addEventListener('change', () => {
        translateBtn.click()
    })
})

exChange.addEventListener('click', () => {
    let temText = translateText.value,
        temLang = select[0].value
    translateText.value = translateResult.value
    select[0].value = select[1].value
    translateResult.value = temText
    select[1].value = temLang
})

const iconActions = document.querySelectorAll('.icon-action')
iconActions.forEach((icon) => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains('copy-text')) {
            if (target.id === 'icon-from') {
                navigator.clipboard.writeText(translateText.value)
            } else {
                navigator.clipboard.writeText(translateResult.value)
            }
        } else {
            let sound
            if (target.id === 'icon-from') {
                sound = new SpeechSynthesisUtterance(translateText.value)
                sound.lang = select[0].value
            } else {
                sound = new SpeechSynthesisUtterance(translateResult.value)
                sound.lang = select[1].value
            }
            speechSynthesis.speak(sound)
        }
    })
})