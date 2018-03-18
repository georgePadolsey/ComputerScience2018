// @flow
import React, { Component } from 'react';

type Props = {
  html: string,
  onChange?: string => void | Promise<void>,
  onBlur?: string => void | Promise<void>,
  disabled?: boolean
};

export default class EditableText extends Component<Props> {
  shouldComponentUpdate(nextProps: ?Props) {
    return this.el != null && nextProps.html !== this.el.innerHTML;
  }

  componentDidUpdate() {
    if (this.el != null && this.props.html !== this.el.innerHTML) {
      this.el.innerHTML = this.props.html;
    }
  }
  lastHTML: ?string = null;
  el: ?HTMLSpanElement = null;

  emitChange(blur: boolean) {
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
    const {
      onChange, html, onBlur, disabled, ...rest
    } = this.props;

    return (
      <span
        {...rest}
        contentEditable={!disabled}
        onInput={() => this.emitChange(false)}
        onBlur={() => this.emitChange(true)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
        ref={node => (this.el = node)}
      />
    );
  }
}
