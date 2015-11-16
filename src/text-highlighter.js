class TextHighlighter {
  constructor(selector, baseElement = document) {
    this.elements = baseElement.querySelectorAll(selector);
    this.elements.foreach((element) => {
      console.assert(element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE);
    });
    this.elements.foreach((element) => {
      element.dataset.originalText = element.innerText;
    });
  }

  escapeHtmlSpecialCharactor(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quote;')
              .replace(/'/g, '&#39;');
  }

  escapeRegExpMetaCharactor(str) {
    return str.replace(/\\/g, '\\\\')
              .replace(/\^/g, '\\\^')
              .replace(/\$/g, '\\\$')
              .replace(/\$/g, '\\\$')
              .replace(/\*/g, '\\\*')
              .replace(/\+/g, '\\\+')
              .replace(/\?/g, '\\\?')
              .replace(/\./g, '\\\.')
              .replace(/\(/g, '\\\(')
              .replace(/\)/g, '\\\)')
              .replace(/\:/g, '\\\:')
              .replace(/\|/g, '\\\|')
              .replace(/\{/g, '\\\{')
              .replace(/\}/g, '\\\}')
              .replace(/\[/g, '\\\[')
              .replace(/\]/g, '\\\]');
  }

  highlight(highlightText) {
    console.assert(typeof(highlightText) === "string");
    let re = new RegExp("("+escapeRegExpMetaCharactor(highlightText)+")", 'ig');

    this.elements.foreach((element) => {
      let originalText = element.dataset.originalText;
      let splitted = [];
      let html = '';

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
