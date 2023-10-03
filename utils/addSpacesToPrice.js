export default function addSpacesToPrice (num) {
  const numString = num.toString()
  const numArray = numString.split('')
  let result = ''
  for (let i = 0; i < numArray.length; i++) {
    if (i > 0 && (numArray.length - i) % 3 === 0) {
      result += ' '
    }
    result += numArray[i]
  }
  return result
}
