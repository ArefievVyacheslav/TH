import imageminMozjpeg from 'imagemin-mozjpeg'
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'
export default {
  ssr: true,
  target: 'server',
  mode: 'universal',
  ...(!isDev && {
    modern: 'client'
  }),
  head: {
    charset: 'utf-8',
    htmlAttrs: { lang: 'ru' },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [ { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' } ]
  },
  rootDir: __dirname,
  router: { prefetchLinks: false },
  loading: { height: '3px', color: '#05c5ff' },
  css: [
    'normalize.css'
  ],
  styleResources: {
    scss: ['~/assets/styles/main.scss']
  },
  plugins: [
    { src: '~/plugins/metaTags', ssr: true },
    { src: '~/plugins/gtag', ssr: false },
    { src: '@/plugins/jsonld.js', ssr: true },
    { src: '~/plugins/yandex-metrika', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'cookie-universal-nuxt',
    'nuxt-delay-hydration',
    '@nuxt/image',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // 'nuxt-trailingslash-module',
    '@nuxtjs/style-resources',
    [
      'nuxt-mq',
      {
        defaultBreakpoint: 'default',
        breakpoints: {
          sm: 700,
          md: 1300,
          lg: Infinity
        }
      }
    ],
    '@nuxtjs/router',
    '@nuxtjs/sitemap'
  ],
  delayHydration: {
    mode: 'init',
    debug: process.env.NODE_ENV === 'development'
  },
  axios: {
    baseURL: 'http://localhost:3002/'
  },
  sitemap: {
    hostname: 'https://text-helper.ru',
    path: '/sitemap-index.xml',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  build: {
    optimizeCss: false,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    transpile: ['vue-lazy-hydration', 'intersection-observer'],
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              }
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
    extend (config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
      const vueSvgLoader = [
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false
          }
        }
      ]
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true
        },
        jpegtran: {
          progressive: true

        },
        gifsicle: {
          interlaced: true
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true
          })

        ]
      })
      if (!ctx.isDev) config.plugins.push(imageMinPlugin)
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
              }
            }
          ]
        }
      })
      //  Create the custom SVG rule
      const svgRule = {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: vueSvgLoader
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader'
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader'
          },
          {
            loader: 'file-loader' // By default, always use file-loader
          }
        ]
      }
      config.module.rules.push(svgRule) // Actually add the rule
    },
    babel: {
      compact: true
    }
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  }
}
