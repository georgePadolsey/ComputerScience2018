//
import React, { Component } from "react";

/**
 * A react component allowing text which can be edited though appear
 * inline.
 */
export default class EditableText extends Component {
  /**
   * @see https://reactjs.org/docs/react-component.html#shouldcomponentupdate
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.el != null &&
      nextProps != null &&
      nextProps.html !== this.el.innerHTML
    );
  }

  /**
   * @see https://reactjs.org/docs/react-component.html#componentdidupdate
   */
  componentDidUpdate() {
    if (this.el != null && this.props.html !== this.el.innerHTML) {
      this.el.innerHTML = this.props.html;
    }
  }

  // Variable which contains the last known html of the text
  lastHTML = null;

  // Reference to the element that is holding the text
  el = null;

  /**
   * This method emits the change up to the parent component
   * @param {boolean} blur - whether the event was a blur event or not (a onChange event)
   */
  emitChange(blur) {
    // if the element hasn't been loaded yet return
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

    // on standard change
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
        /**
         * Here I am purposefully disabling the react/no-danger flag
         * This is because I am aware of the dangers of setting the html this way
         * However it is necessary for this use
         * @see https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
         */
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
        ref={node => (this.el = node)}
      />
    );
  }
}
