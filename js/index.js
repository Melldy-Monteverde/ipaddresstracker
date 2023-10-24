const _form = document.querySelector("#form")
const _input = document.querySelector("#input")
const _btnSubmit = document.querySelector("#bntSubmit")
const _results = document.querySelector("#results")
const _invalidError = document.querySelector("#invalidError")

const OPTIONS = {
  method: 'GET'
}

const fetchIpInfo = async (ip) => {
  return fetch(`https://api.ipregistry.co/${ip}?key=vliiryilfhnj3ba9`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.log('ERROR:', err))
}

_form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { value } = _input
  const ipPatter = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  if (!value) return
  if (!ipPatter.test(value)) {
    _invalidError.style.color = 'red'
    _invalidError.innerText = 'Please insert a valid IP adress'
  }

  _btnSubmit.setAttribute('disabled', '')
  _btnSubmit.setAttribute('aria-busy', 'true')

  const ipInfo = await fetchIpInfo(value)

  if (ipInfo) {
    _results.innerHTML = JSON.stringify(ipInfo, null, 2)
  }

  _btnSubmit.removeAttribute('disabled')
  _btnSubmit.removeAttribute('aria-busy')
  _form.reset()
})
