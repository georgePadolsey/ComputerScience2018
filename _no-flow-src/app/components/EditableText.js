//
import React, { Component } from "react";

export default class EditableText extends Component {
  shouldComponentUpdate(nextProps) {
    return this.el != null && nextProps.html !== this.el.innerHTML;
  }

  componentDidUpdate() {
    if (this.el != null && this.props.html !== this.el.innerHTML) {
      this.el.innerHTML = this.props.html;
    }
  }
  lastHTML = null;
  el = null;

  emitChange(blur) {
    if (!this.el) return;

    const html = this.el.innerHTML;
    // on blur evt
    if (blur && this.props.onBlur != null) {
      this.props.onBlur(html);
    }
    /**
     * I intentionally want it to call both onChange
     * and onBlur, when onBlur
     */

    // on std change
    if (this.props.onChange != null && html !== this.lastHTML) {
      this.props.onChange(html);
    }
    this.lastHTML = html;
  }

  render() {
    const { onChange, html, onBlur, disabled, ...rest } = this.props;

    return (
      <span
        {...rest}
        contentEditable={!disabled}
        onInput={() => this.emitChange(false)}
        onBlur={() => this.emitChange(true)}
        dangerouslySetInnerHTML={{ __html: html }}
        ref={x => (this.el = x)}
      />
    );
  }
}
