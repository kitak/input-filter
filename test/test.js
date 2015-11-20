import TextHighlighter from '../src/text-highlighter';
import assert from 'power-assert';

describe('TextHighlighter', () => {
  describe('#highlight', () => {
    let textHighlighter;

    beforeEach(() => {
      let ul = document.createElement('ul');
      ul.setAttribute('id', 'list');
      ul.innerHTML = `
        <li class="item">highlight</li>
        <li class="item">highlight</li>
        <li class="item">highlight</li>
      `;
      document.body.appendChild(ul);
      textHighlighter = new TextHighlighter('.item', document);
    });

    afterEach(() => {
      let list = document.querySelector('#list');
      document.body.removeChild(list);
    });

    it('has elements', () => {
      assert.equal(textHighlighter.elements.length, 3);
    });

    it('enable highlight', () => {
      textHighlighter.highlight('hi');
      Array.prototype.forEach.call(textHighlighter.elements, (element) => {
        let spans = element.querySelectorAll('span');
        assert.equal(spans.length, 1);
        assert.equal(spans[0].classList[0], 'highlight');
        assert.equal(spans[0].innerText, 'hi');
      });
    });
  });
})
