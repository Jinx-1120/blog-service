const IS_DEV = process.env.NODE_ENV !== 'production'

exports.API_ROOT = IS_DEV ? 'http://localhost:3000/api/' : ''

exports.STATIC_PATH = ''
