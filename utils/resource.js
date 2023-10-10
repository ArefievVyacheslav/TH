export default function getPreparedResource (resource) {
  const { count, type } = resource
  const pluralize = (n, forms) => forms[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
  return `${count} ${type === 'task'
    ? pluralize(count, ['задача', 'задачи', 'задач'])
    : type === 'symbol'
      ? pluralize(count, ['символ', 'символа', 'символов'])
      : 'Неверный тип ресурса'}`
}
