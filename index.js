const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const middlewareCheckForm = (req, res, next) => {
  const { age } = req.body
  if (!age) {
    return res.redirect('/')
  }
  return next()
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', middlewareCheckForm, (req, res) => {
  const { age } = req.body

  if (age > 18) {
    return res.redirect('/major?age=' + age)
  } else {
    return res.redirect('/minor?age=' + age)
  }
})

app.get('/major', (req, res) => {
  const { age } = req.query
  return res.render('major', { age: age })
})

app.get('/minor', (req, res) => {
  const { age } = req.query
  return res.render('minor', { age: age })
})

app.listen(3000)
