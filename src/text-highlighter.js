class TextHighlighter {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
  }

  escapeHtmlSpecialCharactor(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quote;')
              .replace(/'/g, '&#39;');
  }

  escapeRegExpMetaCharactor(str) {
    return str.replace(/\^/g, '\^')
              .replace(/\$/g, '\$')
              .replace(/\$/g, '\$')
              .replace(/\*/g, '\*')
              .replace(/\+/g, '\+')
              .replace(/\?/g, '\?')
              .replace(/\./g, '\.')
              .replace(/\(/g, '\(')
              .replace(/\)/g, '\)')
              .replace(/\:/g, '\:')
              .replace(/\|/g, '\|')
              .replace(/\{/g, '\{')
              .replace(/\}/g, '\}')
              .replace(/\[/g, '\[')
              .replace(/\]/g, '\]')
              .replace(/\\/g, '\\');
  }

  highlight(highlightText) {
    if (highlightText == null) {
      return;
    }
    let re = new RegExp("("+escapeRegExpMetaCharactor(highlightText)+")", 'ig');

    this.elements.foreach((element) => {
      let originaltext = '';
      let splitted = [];
      let html = '';

      if (element.dataset.originalText == null) {
        element.dataset.originalText = element.innerText;
      }
      originalText = element.dataset.originalText;

      if (highlightText === '') {
        element.innerHTML = escapeHtmlSpecialCharactor(originalText);
        return;
      }

      splitted = originalText.split(re).map((token) => {
        return escapeHtmlSpecialCharactor(token);
      });
      if (splitted.length > 1) {
        let i;
        for(i=0; i < splitted.length-1; i+=2) {
          html += `${splitted[i]}<span class='highlight'>${splitted[i+1]}</span>`;
        }
        console.assert(splitted.length-1 === i);
        html += splitted[i];
      } else {
        console.assert(splitted.length === 1);
        html = splitted[0];
      }
      element.innerHTML = html;
    });
  }

  dehighlight() {
    this.highlight('');
  }
}

module.exports = TextHighlighter;
