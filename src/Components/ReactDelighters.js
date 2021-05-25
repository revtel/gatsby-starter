// react porting for Delighters.js (https://github.com/Q42/delighters)
// all credits belong to original author Martin Kool

import React from 'react';

class ReactDelighters extends React.Component {
  static defaultProps = {
    options: {
      attribute: 'data-delighter',
      classNames: ['delighter', 'started', 'ended'],
      start: 0.75, // default start threshold
      end: 0.75, // default end threshold
      autoInit: true, // initialize when DOMContentLoaded
    },
  };

  constructor(props) {
    super(props);
    this.dels = [];
  }

  componentDidMount() {
    this._init();
  }

  render() {
    return this.props.children;
  }

  _init = () => {
    let options = this.props.options;
    let dels = this.dels;

    document.addEventListener('scroll', this._scroll);
    var els = document.querySelectorAll('[' + options.attribute + ']');

    for (var i = 0; i < els.length; i++) {
      var el = els[i],
        def = el.getAttribute(options.attribute, 2),
        pairs = def.split(';'),
        del = {};
      del.start = options.start;
      del.end = options.end;

      for (var j = 0; j < pairs.length; j++) {
        var pair = pairs[j].split(':'),
          name = pair[0],
          val = isNaN(pair[1] * 1) ? pair[1] : pair[1] * 1;
        if (name) del[name] = val === undefined ? true : val;
      }

      del.el = el;
      del.id = dels.length;
      dels.push(del);
      el.classList.add(options.classNames[0]);
      if (del.debug) el.style.outline = 'solid red 4px';
    }
    this._scroll();
  };

  _scroll = () => {
    let options = this.props.options;
    let dels = this.dels;
    var viewportHeight = window.innerHeight;
    for (var i = 0; i < dels.length; i++) {
      var del = dels[i],
        box = del.el.getBoundingClientRect(),
        factorStart = box.top / viewportHeight,
        factorEnd = box.bottom / viewportHeight;

      if (del.debug) {
        if (factorStart >= 0 && factorStart <= 1) {
          if (!del.startLine) {
            del.startLine = document.createElement('div');
            document.body.appendChild(del.startLine);
            del.startLine.style =
              'position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:' +
              del.start * 100 +
              'vh';
          }
        }
        if ((factorEnd < del.end || factorStart > 1) && del.startLine) {
          del.startLine.parentNode.removeChild(del.startLine);
          delete del.startLine;
        }
      }
      if (factorStart < del.start && !del.started) {
        del.started = true;
        del.el.classList.add(options.classNames[1]);
      } else if (factorStart > del.start && del.started) {
        del.started = false;
        del.el.classList.remove(options.classNames[1]);
      }
      if (factorEnd < del.end && !del.ended) {
        del.ended = true;
        del.el.classList.add(options.classNames[2]);
      } else if (factorEnd > del.end && del.ended) {
        del.ended = false;
        del.el.classList.remove(options.classNames[2]);
      }
    }
  };
}

export default ReactDelighters;
