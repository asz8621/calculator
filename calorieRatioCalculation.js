const text1 = document.querySelector('#text1')
const text2 = document.querySelector('#text2')
const text3 = document.querySelector('#text3')
const text4 = document.querySelector('#text4')
const text5 = document.querySelector('#text5')
const text6 = document.querySelector('#text6')
const text7 = document.querySelector('#text7')
const resNum1 = document.querySelector('.resNum1')
const resNum2 = document.querySelector('.resNum2')
const resNum3 = document.querySelector('.resNum3')
const resNum4 = document.querySelector('.resNum4')
const resText1 = document.querySelector('.resText1')
const resText2 = document.querySelector('.resText2')
const resText3 = document.querySelector('.resText3')
const resText4 = document.querySelector('.resText4')
const btn = document.querySelector('.btn')
const radio = document.getElementsByName('radioType')
const typeTitle = document.querySelector('.typeTitle')
const typeSelect = document.querySelector('.typeSelect')
const preset = document.querySelector('.preset')
const proportion = [
  {
    PR1: 3.5,
    PR2: 8.5,
    PR3: 3.5,
  },
  {
    PR1: 4,
    PR2: 9,
    PR3: 4,
  }
]
btn.addEventListener('click', calculate)
function changeTypeSelect(data) {
  typeTitle.textContent = `${data.value}熱量比計算`
  switch (data.value) {
    case '鮮食':
      text5.value = 1
      text6.value = 70
      text7.value = 8
      break
    case '罐頭':
      text5.value = 0.3
      text6.value = 70
      text7.value = 1.5
      break
    case '飼料':
      text5.value = 5
      text6.value = 10
      text7.value = 7
      break
    default:
      break
  }
}
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
}
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
}
function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className=el.className.replace(reg, ' ');
  }
}
function numTure(dom) {
  if (dom.value < 0 || !dom.value) dom.value = 0
}
function calculate() {
  if (!typeSelect.value) {
    alert('請選擇種類')
    return
  }
  let key = 0
  let an4Min = 0
  let an4Max = 0
  // 取 radio value
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) key = radio[i].value
  }
  const ansTemp1 = text1.value * proportion[key].PR1
  const ansTemp2 = text2.value * proportion[key].PR2
  const ansTemp3 = (100 - text1.value - text2.value - text6.value - text7.value).toFixed(1)
  let ans4 = (ansTemp1 + ansTemp2 + proportion[key].PR1 * (ansTemp3 - text5.value)).toFixed(1)
  let ans1 = (ansTemp1 / ans4 * 100).toFixed(1)
  let ans2 = (ansTemp2 / ans4 * 100).toFixed(1)
  let ans3 = ''
  // 碳水化合物沒輸入數字的話給他另一個公式
  if (text3.value === '0') {
    ans3 = (100 - ans1 - ans2).toFixed(1)
    preset.textContent = `試算的結果為 ${ansTemp3} %`
  } else {
    ans3 = ansTemp3
    preset.textContent = ''
  }
  an4Min = ans4 - 20
  an4Max = ans4 + 20
  resNum1.textContent = `${ans1} %`
  resNum2.textContent = `${ans2} %`
  resNum3.textContent = `${ans3} %`
  resNum4.textContent = `${ans4} / 100 g`
  if (ans1 >= 30) {
    if (hasClass(resText1, 'red')) resText1.classList.remove('red')
    if (hasClass(resText1, 'blue')) resText1.classList.remove('blue')
    addClass(resText1, 'green')
    resText1.textContent = '正常'
  } else if (ans1 >= 20 && ans1 < 30) {
    if (hasClass(resText1, 'green')) resText1.classList.remove('green')
    if (hasClass(resText1, 'blue')) resText1.classList.remove('blue')
    addClass(resText1, 'red')
    resText1.textContent = '異常'
  } else {
    if (hasClass(resText1, 'green')) resText1.classList.remove('green')
    if (hasClass(resText1, 'red')) resText1.classList.remove('red')
    addClass(resText1, 'blue')
    resText1.textContent = '偏低'
  }
  if (ans2 >= 20 && ans2 <= 50) {
    if (hasClass(resText2, 'blue')) resText2.classList.remove('blue')
    if (hasClass(resText2, 'red')) resText2.classList.remove('red')
    addClass(resText2, 'green')
    resText2.textContent = '正常'
  } else if (ans2 >= 0 && ans2 < 20) {
    if (hasClass(resText2, 'green')) resText2.classList.remove('green')
    if (hasClass(resText2, 'red')) resText2.classList.remove('red')
    addClass(resText2, 'blue')
    resText2.textContent = '偏低'
  } else {
    if (hasClass(resText2, 'blue')) resText2.classList.remove('blue')
    if (hasClass(resText2, 'green')) resText2.classList.remove('green')
    addClass(resText2, 'red')
    resText2.textContent = '異常'
  }
  if (ans3 <= 20) {
    if (hasClass(resText3, 'blue')) resText3.classList.remove('blue')
    if (hasClass(resText3, 'red')) resText3.classList.remove('red')
    addClass(resText3, 'green')
    resText3.textContent = '正常'
  } else if (ans3 > 20 && ans3 < 50) {
    if (hasClass(resText3, 'red')) resText3.classList.remove('red')
    if (hasClass(resText3, 'green')) resText3.classList.remove('green')
    addClass(resText3, 'blue')
    resText3.textContent = '偏高'
  } else {
    if (hasClass(resText3, 'blue')) resText3.classList.remove('blue')
    if (hasClass(resText3, 'green')) resText3.classList.remove('green')
    addClass(resText3, 'red')
    resText3.textContent = '異常'
  }
  if (!resNum4.value) {
    if (hasClass(resText4, 'green')) resText4.classList.remove('green')
    if (hasClass(resText4, 'red')) resText4.classList.remove('red')
    addClass(resText4, 'blue')
    resText4.textContent = '僅試算值'
  } else if (an4Min < ans4 && an4Max > ans4) {
    if (hasClass(resText4, 'blue')) resText4.classList.remove('blue')
    if (hasClass(resText4, 'red')) resText4.classList.remove('red')
    addClass(resText4, 'green')
    resText4.textContent = '正常'
  } else {
    if (hasClass(resText4, 'blue')) resText4.classList.remove('blue')
    if (hasClass(resText4, 'green')) resText4.classList.remove('green')
    addClass(resText4, 'red')
    resText4.textContent = '異常'
  }
}