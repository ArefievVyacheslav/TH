export const state = () => ({
  userAgent: null,
  seoUserAgents: [
    { YD: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)' },
    { YM: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0' },
    { GD: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    { GM: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.92 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
  ]
})
export const mutations = {
  SET_USER_AGENT: (state, userAgent) => state.userAgent = userAgent
}

export const getters = {
  GET_USER_AGENT: state => state.seoUserAgents.reduce((result, obj) => result || Object.keys(obj).find(key => obj[key] === state.userAgent), null)
}
