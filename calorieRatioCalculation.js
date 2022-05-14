const proteinNum = document.querySelector('#proteinNum')
const adiposeNum = document.querySelector('#adiposeNum')
const carbohydrateNum = document.querySelector('#carbohydrateNum')
const calorieNum = document.querySelector('#calorieNum')
const crudeNum = document.querySelector('#crudeNum')
const moisture = document.querySelector('#moisture')
const ash = document.querySelector('#ash')
const resultProteinNum = document.querySelector('.resultProteinNum')
const resultAdiposeNum = document.querySelector('.resultAdiposeNum')
const resultCarbohydrateNum = document.querySelector('.resultCarbohydrateNum')
const resultCalorieNum = document.querySelector('.resultCalorieNum')
const resultProteinText = document.querySelector('.resultProteinText')
const resultAdiposeText = document.querySelector('.resultAdiposeText')
const resultCarbohydrateText = document.querySelector('.resultCarbohydrateText')
const resultCalorieText = document.querySelector('.resultCalorieText')
const calculateBtn = document.querySelector('.calculateBtn')
const ratioType = document.getElementsByName('ratioType')
const typeTitle = document.querySelector('.typeTitle')
const typeSelect = document.querySelector('.typeSelect')
const carbohydratePreset = document.querySelector('.carbohydratePreset')
const errorMeg = document.querySelector('.errorMeg')
const weight = document.querySelector('#weight')
const calculatedDOM = document.querySelector('#calculated')
const feedingAmountDOM = document.querySelector('#feedingAmount')

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
const dogArr = [
  {
    label: '靜止狀態',
    num: 1,
    caloriesVal: 0,
  },
  {
    label: '運動量低',
    num: 1.2,
    caloriesVal: 0,
  },
  {
    label: '運動量高',
    num: 2,
    caloriesVal: 0,
  },
  {
    label: '需要減肥',
    num: 1,
    caloriesVal: 0,
  },
  {
    label: '需要增重',
    num: 1.5,
    caloriesVal: 0,
  },
  {
    label: '四個月以下',
    num: 3,
    caloriesVal: 0,
  },
  {
    label: '四個月以上',
    num: 2,
    caloriesVal: 0,
  },
  {
    label: '哺乳時間',
    num: 2.5,
    caloriesVal: 0,
  },
  {
    label: '懷孕前期 42 天',
    num: 1.8,
    caloriesVal: 0,
  },
  {
    label: '懷孕後期 21 天',
    num: 3,
    caloriesVal: 0,
  },
]
const catArr = [
  {
    label: '靜止狀態',
    num: 1,
  },
  {
    label: '運動量低',
    num: 1,
  },
  {
    label: '運動量高',
    num: 1,
  },
  {
    label: '需要減肥',
    num: 0.9,
  },
  {
    label: '需要增重',
    num: 1.2,
  },
  {
    label: '幼貓時期',
    num: 2.5,
  },
  {
    label: '哺乳時間',
    num: 4,
  },
  {
    label: '懷孕期間',
    num: 1.6,
  },
]
// 0 -> 狗, 1 -> 貓
let petType = 0
// 0 -> 未結紮, 1 -> 已結紮
let pneuterType = 0
// 熱量暫存
let calorieNumTemp = 0

calculateBtn.addEventListener('click', calculate)
dailyCalories()

function changeTypeSelect(data) {
  typeTitle.textContent = `${data.value}熱量比計算`
  switch (data.value) {
    case '鮮食':
      crudeNum.value = 1
      moisture.value = 70
      ash.value = 8
      break
    case '罐頭':
      crudeNum.value = 0.3
      moisture.value = 70
      ash.value = 1.5
      break
    case '飼料':
      crudeNum.value = 5
      moisture.value = 10
      ash.value = 7
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
  errorMeg.textContent = ''
  if (!typeSelect.value) {
    alert('請選擇種類')
    return
  }

  const total = Number(proteinNum.value) + Number(adiposeNum.value) + Number(carbohydrateNum.value) + Number(moisture.value) + Number(ash.value)
  if(total > 100) {
    errorMeg.textContent = '營養標示有問題無法計算'
    return
  }

  let key = 0
  let an4Min = 0
  let an4Max = 0
  // 取 radio value
  for (let i = 0; i < ratioType.length; i++) {
    if (ratioType[i].checked) key = ratioType[i].value
  }
  const ansTemp1 = proteinNum.value * proportion[key].PR1
  const ansTemp2 = adiposeNum.value * proportion[key].PR2
  const ansTemp3 = (100 - proteinNum.value - adiposeNum.value - moisture.value - ash.value).toFixed(1)
  let ans4 = (ansTemp1 + ansTemp2 + proportion[key].PR1 * (ansTemp3 - crudeNum.value)).toFixed(1)
  let ans1 = (ansTemp1 / ans4 * 100).toFixed(1)
  let ans2 = (ansTemp2 / ans4 * 100).toFixed(1)
  let ans3 = ''
  // 碳水化合物沒輸入數字的話給他另一個公式
  if (carbohydrateNum.value === '0') {
    ans3 = (100 - ans1 - ans2).toFixed(1)
    carbohydratePreset.textContent = `試算的結果為 ${ansTemp3} %`
  } else {
    ans3 = ansTemp3
    carbohydratePreset.textContent = ''
  }
  an4Min = ans4 - 20
  an4Max = ans4 + 20
  resultProteinNum.textContent = `${ans1} %`
  resultAdiposeNum.textContent = `${ans2} %`
  resultCarbohydrateNum.textContent = `${ans3} %`
  resultCalorieNum.textContent = `${ans4} / 100 g`
  if (ans1 >= 30) {
    if (hasClass(resultProteinText, 'red')) resultProteinText.classList.remove('red')
    if (hasClass(resultProteinText, 'blue')) resultProteinText.classList.remove('blue')
    addClass(resultProteinText, 'green')
    resultProteinText.textContent = '正常'
  } else if (ans1 >= 20 && ans1 < 30) {
    if (hasClass(resultProteinText, 'green')) resultProteinText.classList.remove('green')
    if (hasClass(resultProteinText, 'blue')) resultProteinText.classList.remove('blue')
    addClass(resultProteinText, 'red')
    resultProteinText.textContent = '異常'
  } else {
    if (hasClass(resultProteinText, 'green')) resultProteinText.classList.remove('green')
    if (hasClass(resultProteinText, 'red')) resultProteinText.classList.remove('red')
    addClass(resultProteinText, 'blue')
    resultProteinText.textContent = '偏低'
  }
  if (ans2 >= 20 && ans2 <= 50) {
    if (hasClass(resultAdiposeText, 'blue')) resultAdiposeText.classList.remove('blue')
    if (hasClass(resultAdiposeText, 'red')) resultAdiposeText.classList.remove('red')
    addClass(resultAdiposeText, 'green')
    resultAdiposeText.textContent = '正常'
  } else if (ans2 >= 0 && ans2 < 20) {
    if (hasClass(resultAdiposeText, 'green')) resultAdiposeText.classList.remove('green')
    if (hasClass(resultAdiposeText, 'red')) resultAdiposeText.classList.remove('red')
    addClass(resultAdiposeText, 'blue')
    resultAdiposeText.textContent = '偏低'
  } else {
    if (hasClass(resultAdiposeText, 'blue')) resultAdiposeText.classList.remove('blue')
    if (hasClass(resultAdiposeText, 'green')) resultAdiposeText.classList.remove('green')
    addClass(resultAdiposeText, 'red')
    resultAdiposeText.textContent = '異常'
  }
  if (ans3 <= 20) {
    if (hasClass(resultCarbohydrateText, 'blue')) resultCarbohydrateText.classList.remove('blue')
    if (hasClass(resultCarbohydrateText, 'red')) resultCarbohydrateText.classList.remove('red')
    addClass(resultCarbohydrateText, 'green')
    resultCarbohydrateText.textContent = '正常'
  } else if (ans3 > 20 && ans3 < 50) {
    if (hasClass(resultCarbohydrateText, 'red')) resultCarbohydrateText.classList.remove('red')
    if (hasClass(resultCarbohydrateText, 'green')) resultCarbohydrateText.classList.remove('green')
    addClass(resultCarbohydrateText, 'blue')
    resultCarbohydrateText.textContent = '偏高'
  } else {
    if (hasClass(resultCarbohydrateText, 'blue')) resultCarbohydrateText.classList.remove('blue')
    if (hasClass(resultCarbohydrateText, 'green')) resultCarbohydrateText.classList.remove('green')
    addClass(resultCarbohydrateText, 'red')
    resultCarbohydrateText.textContent = '異常'
  }
  if (!resultCalorieNum.value) {
    if (hasClass(resultCalorieText, 'green')) resultCalorieText.classList.remove('green')
    if (hasClass(resultCalorieText, 'red')) resultCalorieText.classList.remove('red')
    addClass(resultCalorieText, 'blue')
    resultCalorieText.textContent = '僅試算值'
  } else if (an4Min < ans4 && an4Max > ans4) {
    if (hasClass(resultCalorieText, 'blue')) resultCalorieText.classList.remove('blue')
    if (hasClass(resultCalorieText, 'red')) resultCalorieText.classList.remove('red')
    addClass(resultCalorieText, 'green')
    resultCalorieText.textContent = '正常'
  } else {
    if (hasClass(resultCalorieText, 'blue')) resultCalorieText.classList.remove('blue')
    if (hasClass(resultCalorieText, 'green')) resultCalorieText.classList.remove('green')
    addClass(resultCalorieText, 'red')
    resultCalorieText.textContent = '異常'
  }
  calorieNumTemp = ans4
  weight.value = 0
  dailyCalories(petType, pneuterType)
}
function petTypeRadio(val) {
  petType = Number(val)
  dailyCalories(petType, pneuterType)
}
function pneuterRadio(val) {
  pneuterType = Number(val)
  dailyCalories(petType, pneuterType)
}
function dailyCalories(petType = 0, pneuterType = 0) {
  if (weight.value < 0 || !weight.value) weight.value = 0
  let newWeight = 0
  let str = ''
  if (!petType) { // 狗
    newWeight = (Math.sqrt(Math.sqrt(Math.pow(weight.value, 3))) * 70).toFixed(1)
    if (!pneuterType) { // 未結紮
      calculated = (newWeight * 1.8).toFixed(1)
    } else { // 已結紮
      calculated = (newWeight * 1.6).toFixed(1)
    }
    for (let index = 0; index < dogArr.length; index++) {
      str += `<li class="mb-1">${dogArr[index].label}: ${(calculated * dogArr[index].num).toFixed(1)} </li>`
      dogArr[index].caloriesVal = (calculated * dogArr[index].num).toFixed(1)
    }
    feedingCalculation(dogArr)
  } else { // 貓
    newWeight = (Math.sqrt(Math.sqrt(Math.pow(weight.value, 3))) * 70).toFixed(1)
    if (!pneuterType) { // 未結紮
      calculated = (newWeight * 1.4).toFixed(1)
    } else { // 已結紮
      calculated = (newWeight * 1.2).toFixed(1)
    }
    for (let index = 0; index < catArr.length; index++) {
      str += `<li class="mb-1">${catArr[index].label}: ${(calculated * catArr[index].num).toFixed(1)} </li>`
      catArr[index].caloriesVal = (calculated * catArr[index].num).toFixed(1)
    }
    feedingCalculation(catArr)
  }
  calculatedDOM.innerHTML = str
}
function feedingCalculation(data) {
  let str = ''
  if (calorieNumTemp) {
    for (let index = 0; index < data.length; index++) {
      str += `<li class="mb-1">${(Number(data[index].caloriesVal) / (calorieNumTemp / 100)).toFixed(1)} g</li>`
    }
  } else {
    for (let index = 0; index < data.length; index++) {
      str += `<li class="mb-1 blue">未提供熱量的熱量比</li>`
    }
  }
  feedingAmountDOM.innerHTML = str
}
