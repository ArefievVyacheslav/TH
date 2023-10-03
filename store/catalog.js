export const state = () => ({
  urlObj: {},
  breadcrumbs: null,
  breadcrumbsCategory: null,
  metaCategory: {}
})
export const mutations = {
  SET_URL_PARAM: (state, paramObj) => state.urlObj = {
    ...state.urlObj,
    [ paramObj.param ]: paramObj.value
  },
  UNSET_URL_PARAM: (state, paramObj) => {
    if (!paramObj) state.urlObj = { '1category': state.urlObj['1category'] }
    else delete state.urlObj[paramObj.param]
    state.urlObj = { ...state.urlObj }
  },
  SET_HEADER: (state, filtersObj) => {
    if (filtersObj.prepared) {
      state.metaCategory.header = filtersObj.seoRoute.header
      state.metaCategory.title = filtersObj.seoRoute.title
      state.metaCategory.description = filtersObj.seoRoute.description
      return
    }
    let header = ''
    // определяю, есть ли подкатегории - если нет, то устанавливаю главную категорию в начало хедера
    const subCat = filtersObj.findObj?.subcategory?.$in || false
    const subCatLen = subCat.length
    if (subCat) header += subCat.reduce((acc, subCat, idx) => acc += idx !== subCatLen - 1 ? subCat.toLowerCase() + ', ' : subCat.toLowerCase() + ' ', '')
    else {
      const collections = [ { clothes: 'Одежда' }, { shoes: 'Обувь' }, { accessories: 'Аксессуары' } ]
      collections.forEach(collectionObj => filtersObj.collection === Object.keys(collectionObj)[0] ? header += Object.values(collectionObj)[0] + ' ' : false)
    }
    // определяю, есть ли бренды
    const brand = filtersObj.findObj?.brand?.$in.sort() || false
    const brandLen = brand.length
    if (brand) {
      header += brandLen > 1 ? 'от брендов ' : 'от бренда '
      header += brand.reduce((acc, brandStr, idx) => acc += idx !== brandLen - 1 ? brandStr + ', ' : brandStr + ' ', '')
    }
    // определяю, есть ли размеры
    const sizes = filtersObj.findObj?.sizes?.$in || false
    const sizesLen = sizes.length
    if (sizes) {
      header += sizes.reduce((acc, size, idx) => acc += idx !== sizesLen - 1 ? size + ', ' : size + ' ', '')
      header += sizesLen > 1 ? 'размеров ' : 'размера '
    }
    // определяю, из каких магазинов
    const shop = filtersObj.findObj?.shop?.$in || false
    const shopLen = shop.length
    if (shop) {
      header += shopLen > 1 ? 'из магазинов ' : 'из магазина '
      header += shop.reduce((acc, shopStr, idx) => acc += idx !== shopLen - 1 ? shopStr + ', ' : shopStr + ' ', '')
    }
    // определяю пол
    if (filtersObj.findObj?.gender === 'Мужской') header += 'для мужчин '
    if (filtersObj.findObj?.gender === 'Женский') header += 'для женщин '
    // определяю, есть ли рассрочка
    if (filtersObj.findObj?.installment === true) header += 'в рассрочку '
    // определяю, есть ли размер скидки
    const sale = filtersObj.findObj?.sale?.$gt || false
    if (sale) header += 'со скидкой более ' + (+sale + 1) + '% '
    // определяю, есть ли цвета
    const colors = filtersObj.findObj?.color?.$in.sort() || false
    const colorsLen = colors.length
    if (colors) {
      header += colorsLen > 1 ? ', цвета - ' : ', цвет - '
      header += colors.reduce((acc, colorStr, idx) => acc += idx !== colorsLen - 1 ? colorStr + ', ' : colorStr + ' ', '')
    }
    header = header.charAt(0).toUpperCase() + header.slice(1, header.length)
    header = header.replaceAll(' ,', ',')
    // установка меты для страницы категории
    const country = [
      { country: 'Россия', reduction: 'ru' },
      { country: 'Беларусь', reduction: 'rb' },
      { country: 'Казахстан', reduction: 'kz' },
      { country: 'Армения', reduction: 'am' },
      { country: 'Кыргызстан', reduction: 'kg' },
      { country: 'Азербайджан', reduction: 'az' },
      { country: 'Молдова', reduction: 'md' },
      { country: 'Таджикистан', reduction: 'tj' },
      { country: 'Узбекистан', reduction: 'uz' },
      { country: 'Туркменистан', reduction: 'tm' }
    ].filter(country => country.reduction === filtersObj.findObj.delivery.$in[0])[0].country
    state.metaCategory.header = header + ' в ' + country
    state.metaCategory.title = header + ' купить с доставкой по ' + country + ' | Sales Search'
    state.metaCategory.description = 'В нашем каталоге ' + (header.includes('Одежда') || header.includes('Обувь') ? 'недорогая ' : 'недорогие ')
      + header + 'от проверенных интернет-магазинов с доставкой по ' + country + '. Sales Search поможет найти и купить товар по выгодной цене: рейтинги, отзывы и удобный поиск, распродажа у нас на сайте.'
    if (state.metaCategory.header.includes('От бренда'))
      state.metaCategory.header = state.metaCategory.header
        .replace('От бренда', '')
        .replace(' в России', 'со скидкой в России')
    if (state.metaCategory.description.includes('недорогие От бренда'))
      state.metaCategory.description = state.metaCategory.description
        .replace('недорогие От бренда', 'оригинальный')
        .replace('от проверенных интернет-магазинов с доставкой по России', 'со скидками в наличии. ')
      state.metaCategory.description = state.metaCategory.description.split('. Sales Search')
      state.metaCategory.description = state.metaCategory.description[0]
        + '. Брендовая одежда, обувь и аксессуары от лучших интернет-магазинов с доставкой по ' + country
    if (state.metaCategory.title.includes('От бренда'))
      state.metaCategory.title = state.metaCategory.title
        .replace('От бренда', 'Купить')
        .replace('с доставкой по', 'в')
        .replace(' | ', `. Коллекция ${new Date().getFullYear()} | `)
    state.metaCategory.description = state.metaCategory.description.replace('. .', '.')
  },
  SET_CUSTOM_HEADER: (state, dataObj) => {
    // установка меты для страницы категории
    const country = [
      { country: 'Россия', reduction: 'ru' },
      { country: 'Беларусь', reduction: 'rb' },
      { country: 'Казахстан', reduction: 'kz' },
      { country: 'Армения', reduction: 'am' },
      { country: 'Кыргызстан', reduction: 'kg' },
      { country: 'Азербайджан', reduction: 'az' },
      { country: 'Молдова', reduction: 'md' },
      { country: 'Таджикистан', reduction: 'tj' },
      { country: 'Узбекистан', reduction: 'uz' },
      { country: 'Туркменистан', reduction: 'tm' }
    ].filter(country => country.reduction === dataObj.filtersObj.findObj.delivery.$in[0])[0].country
    state.metaCategory.header = dataObj.metaObj.header + ' в ' + country
    state.metaCategory.title = dataObj.metaObj.title + ' с доставкой по ' + country + ' | Sales Search'
    state.metaCategory.description = 'В нашем каталоге ' + dataObj.metaObj.description + ' от проверенных интернет-магазинов с доставкой по '
      + country + '. Sales Search поможет найти и купить товар по выгодной цене: рейтинги, отзывы и удобный поиск у нас на сайте.'
  },
  SET_BREADCRUMBS: (state, product) => {
    // добавляю категорию с полом
    const categories = {
      'Одежда': 'clothes',
      'Обувь': 'shoes',
      'Аксессуары': 'accessories'
    }
    state.breadcrumbs = [
      { anchor: 'Поиск скидок', link: '/' }
    ]
    let link = '/catalog/'
    try {
      link += categories[ product.category ] + '/' + (product.gender === 'Мужской' ? 'muzhchinam' : 'zhenshchinam')
      if (!state.breadcrumbs
        .map(crumb => crumb?.anchor)
        .some(anchor => anchor.includes(product.category))) {
          state.breadcrumbs.push({
            anchor: product.category + (product.gender === 'Мужской' ? ' для мужчин' : ' для женщин'),
            link
          })
        }
    } catch (e) {
      console.log(e)
    }
    // добавляю подкатегорию
    try {
      link += '/--' + product.subcategory_t.toLowerCase().replaceAll(' ', '-') + '--'
      if (!state.breadcrumbs
        .map(crumb => crumb?.anchor)
        .some(anchor => anchor.includes(product.subcategory))) {
          state.breadcrumbs.push({
            anchor: product.subcategory,
            link
          })
        }
    } catch (e) {
      console.log(e)
    }
    // добавляем бренды
    try {
      link += '/--' + product.brand.toLowerCase().replaceAll(' ', '-') + '--'
      if (!state.breadcrumbs
        .map(crumb => crumb?.anchor)
        .some(anchor => anchor.includes(product.brand))) {
          state.breadcrumbs.push({
            anchor: product.brand,
            link: link.includes('-&-')
              ? link.replaceAll('-&-', '-and-')
              : link.includes('&') && !link.includes('-&-')
                ? link.replaceAll('&', '-and-')
                : link
          })
        }
    } catch (e) {
      console.log(e)
    }
    // добавляем цвета
    try {
      if (product.color_t) {
        link += '/--' + product.color_t.toLowerCase().replaceAll(' ', '-') + '--'
        if (!state.breadcrumbs
          .map(crumb => crumb?.anchor)
          .some(anchor => anchor.includes(product.color))) {
          state.breadcrumbs.push({
            anchor: product.color,
            link
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
    // добавляем размеры
    if (!(product.sizes.filter(size => size.includes('см')).length > 0)) {
      try {
        if (!state.breadcrumbs
          .map(crumb => crumb?.anchor)
          .some(anchor => anchor.includes(product.sizes[0]))) {
          const sizes = product.sizes.reduce((acc, size, idx) => {
            let copyLink = link
            acc.push({
              anchor: idx !== product.sizes.length - 1 ? size + ', ' : size,
              link: copyLink += '/--' + size.toLowerCase().replaceAll(' ', '-') + '--'
            })
            copyLink = link
            return acc
          }, [])
          state.breadcrumbs.push(sizes)
        }
      } catch (e) {
        console.log(e)
      }
    }
    // Последняя крошка имя товара
    if (!state.breadcrumbs
      .map((crumb, idx) => idx !== 5 && crumb?.anchor)
      .some((anchor, idx) => idx !== 5 && anchor && anchor.includes(product.name))) {
      state.breadcrumbs.push({ anchor: product.name, link: '' })
    }
    state.breadcrumbs = state.breadcrumbs.filter(crumbObj => crumbObj.anchor)
  },
  SET_BREADCRUMBS_CATEGORY: (state, payload) => {
    const route = payload.path
    const pathArr = route.split('/')
    const setBreadcrumbsCategory = payload => {
      if (state.breadcrumbsCategory.map(crumb => crumb.anchor).includes(payload.crumb.anchor)) return
      if (payload) {
        if (!state.breadcrumbsCategory[payload.idx]) state.breadcrumbsCategory[payload.idx] = payload.crumb
        else {
          state.breadcrumbsCategory.splice(payload.idx, 1)
          state.breadcrumbsCategory.splice(payload.idx, 0, payload.crumb)
        }
      } else state.breadcrumbsCategory.splice(payload.idx, 1)
      // eslint-disable-next-line no-sequences
      state.breadcrumbsCategory = Array.from(new Map(state.breadcrumbsCategory.filter(Boolean).map(obj => [JSON.stringify(obj), obj])).values())
    }
    state.breadcrumbsCategory = [ { anchor: 'Поиск скидок', link: '/' } ]
    const category = { clothes: 'Одежда', shoes: 'Обувь', accessories: 'Аксессуары' }[ pathArr[2] ]
    const gender = { muzhchinam: 'для мужчин', zhenshchinam: 'для женщин' }[ pathArr[3] ]
    const path1 = gender ? pathArr.slice(1, 4).join('/') : pathArr.slice(1, 3).join('/')
    if (category) setBreadcrumbsCategory({
      idx: 1,
      crumb: {
        anchor: category + (gender ? ` ${ gender }` : ''),
        link: '/' + path1
      }
    })
    let countCrumbs = 1
    const subcategory = payload.rootState.selects.selects.subCat || false
    const subCatArr = []
    if (subcategory) subcategory.forEach(subCatObj => {
      if (route.replaceAll('ju', 'yu').includes('--' + subCatObj?.subcategory_t
        .replaceAll(' ', '-')
        .replaceAll('ey', 'ej')
        .replaceAll('ju', 'yu').toLowerCase() + '--'))
        subCatArr.push(subCatObj)
    })
    if (subcategory && subCatArr.length) {
      countCrumbs += 1
      const link = '/' + pathArr.slice(1, (gender ? 3 : 2) + countCrumbs).join('/')
      setBreadcrumbsCategory({
        idx: 2,
        crumb: {
          anchor: subCatArr.reduce((acc, subCatObj, idx) => acc += idx < subCatArr.length - 1 ? subCatObj.subcategory + ", " : subCatObj.subcategory, ""),
          link
        }
      });
    }
    const brand = payload.rootState.selects.selects.brand || false
    const brandArr = []
    if (brand) brand.forEach(brandStr => {
      if (route.replace('-and-', '-&-').includes('--' + brandStr.toLowerCase().replaceAll(' ', '-') + '--')
        || route.replace('-and-', '&').includes('--' + brandStr.toLowerCase().replaceAll(' ', '-') + '--'))
        brandArr.push(brandStr)
    })
    if (brand && brandArr.length) {
      countCrumbs += 1
      let link = "/" + pathArr.slice(1, (gender ? 3 : 2) + countCrumbs).join("/")
      link = link.includes('-&-')
        ? link.replaceAll('-&-', '-and-')
        : link.includes('&') && !link.includes('-&-')
          ? link.replaceAll('&', '-and-')
          : link
      setBreadcrumbsCategory({
        idx: 3,
        crumb: {
          anchor: brandArr.reduce((acc, brand, idx) => acc += idx < brandArr.length - 1 ? brand + ", " : brand, ""),
          link
        }
      });
    }
    const size = payload.rootState.selects.selects.size || false
    const sizeArr = []
    if (size) size.forEach(sizeStr => {
      if (route.includes('--' + sizeStr.toLowerCase().replaceAll(' ', '-') + '--')) sizeArr.push(sizeStr)
    })
    if (size && sizeArr.length) {
      countCrumbs += 1
      setBreadcrumbsCategory({
        idx: 4,
        crumb: {
          anchor: sizeArr.reduce((acc, sizeStr, idx) => acc += idx < sizeArr.length - 1 ? sizeStr + ", " : sizeStr, ""),
          link: ''
        }
      })
    }
  }
}

export const getters = {
  GET_URL: state => {
    return Object.keys(state.urlObj).sort().reduce((acc, param) => {
      if (state.urlObj[ param ]) acc += state.urlObj[ param ] + '/'
      return acc
    }, '/catalog/').replaceAll('//', '/')
  },
  GET_BREADCRUMBS: state => ({ breadcrumbs: state.breadcrumbs, breadcrumbsCategory: state.breadcrumbsCategory }),
  GET_BREADCRUMBS_SCHEMA: state => {
    let counter = 0
    return state.breadcrumbs.reduce((acc, crumb) => {
      if (!Array.isArray(crumb)) {
        acc.push({
          "@type": "ListItem",
          "position": counter + 1,
          "item": {
            "@id": crumb.link,
            "name": crumb.anchor
          }
        })
        counter += 1
      }
      return acc
    }, [])
  },
  GET_BREADCRUMBS_CATEGORY_SCHEMA: state => {
    let counter = 0
    return state.breadcrumbsCategory.reduce((acc, crumb) => {
      if (!Array.isArray(crumb)) {
        acc.push({
          "@type": "ListItem",
          "position": counter + 1,
          "item": {
            "@id": crumb.link,
            "name": crumb.anchor
          }
        })
        counter += 1
      }
      return acc
    }, [])
  }
}
