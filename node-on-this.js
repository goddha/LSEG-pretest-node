const fundCode = process.argv.slice(2)

const http = require('http')
const options = {
  host: 'codequiz.azurewebsites.net',
  headers: { Cookie: 'hasCookie=true' },
}
const request = http.request(options, (res) => {
  let data = ''
  let result = 'not found'
  res.on('data', (httpdata) => {
    data += httpdata
  })
  res.on('end', () => {
    const splitTrArr = data.split('</tr>')
    splitTrArr.map((html) => {
      if (html.includes(`<td>${fundCode}`)) {
        const splitTdArr = html.split('</td>')
        result = splitTdArr[1].replace('<td>', '')
      }
    })
    console.log(result)
  })
})
request.on('error', (e) => {
  console.log(e.message)
})
request.end()
