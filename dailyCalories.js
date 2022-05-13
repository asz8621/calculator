const weight = document.querySelector('#weight')
const calculatedDOM = document.querySelector('#calculated')

const dogArr = [
  {
    label: '靜止狀態',
    num: 1,
  },
  {
    label: '運動量低',
    num: 1.2,
  },
  {
    label: '運動量高',
    num: 2,
  },
  {
    label: '需要減肥',
    num: 1,
  },
  {
    label: '需要增重',
    num: 1.5,
  },
  {
    label: '四個月以下',
    num: 3,
  },
  {
    label: '四個月以上',
    num: 2,
  },
  {
    label: '哺乳時間',
    num: 2.5,
  },
  {
    label: '懷孕前期 42 天',
    num: 1.8,
  },
  {
    label: '懷孕後期 21 天',
    num: 3,
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

function petTypeRadio(val) {
  petType = Number(val)
  dailyCalories(petType, pneuterType)
}

function pneuterRadio(val) {
  pneuterType = Number(val)
  dailyCalories(petType, pneuterType)
}

function dailyCalories(petType = 0, pneuterType = 0) {
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
      str += `<li>${dogArr[index].label}: ${(calculated * dogArr[index].num).toFixed(1)} </li>`      
    }
  } else { // 貓
    newWeight = (Math.sqrt(Math.sqrt(Math.pow(weight.value, 3))) * 70).toFixed(1)
    if (!pneuterType) { // 未結紮
      calculated = (newWeight * 1.4).toFixed(1)
    } else { // 已結紮
      calculated = (newWeight * 1.2).toFixed(1)
    }
    for (let index = 0; index < catArr.length; index++) {
      str += `<li>${catArr[index].label}: ${(calculated * catArr[index].num).toFixed(1)} </li>`      
    }
  }
  calculatedDOM.innerHTML = str
}

dailyCalories()
