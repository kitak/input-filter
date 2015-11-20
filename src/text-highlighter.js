import assert from 'power-assert';

const forEach = Array.prototype.forEach;

class TextHighlighter {
  constructor(selector, baseElement = document) {
    this.elements = baseElement.querySelectorAll(selector);
    forEach.call(this.elements, (element) => {
      assert.equal(element.childNodes.length, 1)
      assert.equal(element.childNodes[0].nodeType, 3);

      element.setAttribute("data-original-text", element.innerText);
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
    assert.equal(typeof(highlightText), "string");
    let re = new RegExp("("+this.escapeRegExpMetaCharactor(highlightText)+")", 'ig');

    forEach.call(this.elements, (element) => {
      let originalText = element.getAttribute("data-original-text");
      let splitted = [];
      let html = '';

      if (highlightText === '') {
        element.innerHTML = this.escapeHtmlSpecialCharactor(originalText);
        return;
      }

      splitted = originalText.split(re).map((token) => {
        return this.escapeHtmlSpecialCharactor(token);
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

export default TextHighlighter
