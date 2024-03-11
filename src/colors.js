
const sectionBgBase = 'bg-gradient-to-tr'
export const sectionBgLogin = `${sectionBgBase} from-black via-gray-600 to-blue-900`
export const sectionBgLoginDark = `${sectionBgBase} from-black via-gray-700 to-blue-900`
export const sectionBgError = `${sectionBgBase} from-black-900 via-black-900 to-black-900`
export const sectionBgErrorDark = `${sectionBgBase} from-black-900 via-black-900 to-black-900`
export const sectionBgSignup = `${sectionBgBase} from-black-900 via-black-900 via-black-900`
export const sectionBgSignupDark = `${sectionBgBase} from-black-900 via-black-900 to-purple-900`
export const sectionBgRemind = `${sectionBgBase} from-black-900 via-black-900 to-purple-900`
export const sectionBgRemindDark = `${sectionBgBase} from-black-900 via-black-900 to-purple-900`

export const colorsBg = {
  white: 'bg-white text-black',
  light: 'bg-gray-100 text-black',
  success: 'bg-emerald-600 text-white',
  danger: 'bg-red-600 text-white',
  warning: 'bg-yellow-600 text-white',
  info: 'bg-blue-600 text-white',
  blue: 'bg-gray-900 text-blue-600',
  lightblue:'bg-blue-400 text-white',
  orange:'bg-orange-600 text-white',
  indigo: 'bg-indigo-400 text-black',
  blank:"text-blue-200",
  amber: 'bg-gray-900 text-white',
  rosee: 'bg-gray-900 text-rose-300',
  blue: 'bg-gray-900 text-blue-600',
  teal: 'bg-teal-700 text-white',
  green: 'bg-gray-900 text-teal-400',
  gray: 'bg-gray-600 text-white',
  rose: 'bg-rose-500 text-white',
  yellow: 'bg-yellow-900 text-white',
  black: 'text-white',
  sky: 'bg-sky-700 text-white',
  help: 'bg-gray-900 text-white',
}


export const colorsBgLight = {
  white: 'bg-white text-black',
  light: 'bg-gray-50 text-black',
  success: 'bg-emerald-500 border-emerald-500 text-white',
  danger: 'bg-red-500 border-red-500 text-white',
  warning: 'bg-yellow-500 border-yellow-500 text-white',
  info: 'bg-blue-500 border-blue-500 text-white',
  help: 'bg-gray-900 border-white text-white',
}


export const colorsBgHover = {
  white: 'hover:bg-gray-50',
  light: 'hover:bg-gray-200',
  success: 'hover:bg-emerald-700',
  danger: 'hover:bg-red-700',
  warning: 'hover:bg-yellow-700',
  info: 'hover:bg-blue-700',
  amber: 'hover:bg-amber-700',
  blue: 'hover:bg-blue-500',
  gray: 'hover:bg-gray-600',
  rosee: 'hover:rose-500',
  teal: 'hover:teal-500',
  green: 'hover:teal-500',
  yellow: 'hover:yellow-900',
  sky: 'hover:sky-600',
  help: 'hover:gray-900'
 }

export const colorsBorders = {
  white: 'border-gray-300',
  light: 'border-gray-200 dark:border-gray-400',
  success: 'border-emerald-700',
  danger: 'border-red-700',
  warning: 'border-yellow-700',
  info: 'border-blue-700',
  amber: 'border-amber-700',
  blue: 'border-sky-900',
  teal: 'border-teal-700',
  gray: 'border-gray-600',
  rose: 'border-rose-500',
  yellow: 'border-yellow-900',
  teal: 'border-teal-700',
  green: 'border-teal-700',
  rosee:'border-rose-900',
  sky:'border-sky-700',
  help:'border-white'
}

export const colorsText = {
  white: 'text-black dark:text-gray-100',
  light: 'text-gray-700 dark:text-gray-400',
  success: 'text-emerald-600',
  danger: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
  rosee:'text-rose-500',
  help:'text-white'
}

export const colorsOutline = {
  white: [colorsText.white, colorsBorders.white],
  light: [colorsText.light, colorsBorders.light],
  success: [colorsText.success, colorsBorders.success],
  danger: [colorsText.danger, colorsBorders.danger],
  warning: [colorsText.warning, colorsBorders.warning],
  info: [colorsText.info, colorsBorders.info],
  rosee: [colorsText.rosee, colorsBorders.rosee],
  help: [colorsText.help, colorsBorders.help],
}

export const colorsOutlineHover = {
  white: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900',
  light: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-900',
  success: 'hover:bg-emerald-700 hover:text-white',
  danger: 'hover:bg-red-700 hover:text-white',
  warning: 'hover:bg-yellow-700 hover:text-white',
  info: 'hover:bg-blue-700 hover:text-white',
  rosee: 'hover:bg-rose-700 hover:text-white',
  sky: 'hover:bg-sky-600 hover:text-white',
  help: 'hover:bg-gray-900 hover:text-white'
}

export const getButtonColor = (color, isOutlined, hasHover) => {
  const base = [
    isOutlined ? colorsText[color] : colorsBg[color],
    colorsBorders[color]
  ]

  if (hasHover) {
    base.push(isOutlined ? colorsOutlineHover[color] : colorsBgHover[color])
  }

  return base
}

export const controlTextColor = (error, success) => {
  if (error) {
    return 'text-red-600'
  }
 

  if (success) {
    return 'text-green-600'
  }

  return null
}
