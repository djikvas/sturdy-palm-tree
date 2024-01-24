const iframes = new Map()
iframes.set('V1 Barinov', 'https://fdbeck.staging.insurance-portal.com.au/quote_financials/new?company_id=71')
iframes.set('V2 Barinov', 'https://fdbeck.staging.insurance-portal.com.au/v2/quotes/financials/new?company_id=71')

iframes.set('V1 FD Beck', 'https://fdbeck.staging.insurance-portal.com.au/quote_financials/new?company_id=56')
iframes.set('V2 FD Beck', 'https://fdbeck.staging.insurance-portal.com.au/v2/quotes/financials/new?company_id=56')

iframes.set('V1 Sparrow', 'https://sparrow.staging.insurance-portal.com.au/quote_financials/new?company_id=62')
iframes.set('V2 Sparrow', 'https://sparrow.staging.insurance-portal.com.au/v2/quotes/financials/new?company_id=56')

iframes.set('V1 Laneways.Agency', 'https://staging.keystoneonline.com.au/quote_financials/new?company_id=57')
iframes.set('V2 Laneways.Agency', 'https://staging.keystoneonline.com.au/v2/quotes/financials/new?company_id=57')

function replaceUrlQuoteType(url) {
  const quoteType = window.quoteTypeSelect.value

  switch (quoteType) {
    case 'financial':
      return url;
      break;
    case 'not_profit':
      return url
        .replace('quote_financials', 'quote_not_profits')
        .replace('v2/quotes/financials', 'v2/quotes/not_profits')
      break;
    case 'jewellery':
      return url
        .replace('quote_financials', 'quote_jewelleries')
        .replace('v2/quotes/financials', 'v2/quotes/jewelleries')
      break;
  }
}

function switchIframeOnRadioChange(event) {
  return switchIframe(event.target.value)
}

function switchIframe(scriptUrl) {
  const script = document.createElement('script')
  script.src = 'https://staging.insurance-portal.com.au/reseller.js'
  script.dataset.src = replaceUrlQuoteType(scriptUrl)
  console.log(script.dataset.src)

  window.iframeContainer.replaceChildren(script)
}

for ([title, scriptUrl] of iframes) {
  const template = document.createElement('template')
  template.innerHTML = `
      <label class="flex flex-none bg-white items-center gap-1 rounded px-2 py-1">
        <input type="radio" name="script" class="peer" value="${scriptUrl}">
        <span class="peer-checked:text-blue-600 peer-checked:font-medium">${title}</span>
      </label>
    `
  template.content.querySelector('input').addEventListener('change', switchIframeOnRadioChange)
  window.switchContainer.appendChild(template.content)
}

window.quoteTypeSelect.addEventListener('change', () => {
  const checkedRadioElement = document.querySelector('input[type=radio]:checked')

  if (checkedRadioElement) {
    switchIframe(checkedRadioElement.value)
  }
})
