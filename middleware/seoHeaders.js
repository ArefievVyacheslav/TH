export default function ({ req, res }) {
  if (req && req.headers['if-modified-since']) res.setHeader('Last-Modified', req.headers['if-modified-since'])
  if (res) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Last-Modified', new Date(Date.now() - Math.random() * 3.5e6 - 0.5e6).toISOString())
  }
}
