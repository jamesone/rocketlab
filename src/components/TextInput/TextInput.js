// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { TouchableOpacity } from '../TouchableOpacity/TouchableOpacity';
import styles from './TextInput.module.scss';

type Props = {
  label: string,
  onChangeText: void,
  disabled: boolean,
  autoFocus: boolean,
  multiline: boolean,
  value: string,
  containerStyle?: Object,
  // Ability to override default onPress behaviour
  onPress: void,
  inputRef: void,
  placeholder: string,
  errorMessage: string,
  // Listeners
  onFocus: void,
  onBlur: void,
};

type State = {
  isFocused: boolean,
};

class TextInput extends Component<Props, State> {
  // @todo: Should we add proper react reference proptype
  _inputRef: Object;
  state = {
    isFocused: false,
  };

  /** Keep track of whether input is focused or not */
  _onBlur = () => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    if (onBlur) {
      onBlur();
    }
  };

  _onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus();
    }
  };

  /**
   * When you click on any part of the input, we'll first
   * try and run the props.onPress, if this doesn't exist we'll
   * fallback to the default behaviour & focus the input.
   */
  _onClick = (): void => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    } else if (this._inputRef.focus) {
      this._inputRef.focus();
    }
  };

  _setInputRef = (el: any) => {
    this._inputRef = el;
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el);
    }
  };

  _onChange = ({ target: { value } }: { target: { value: string } }) => {
    const { onChangeText } = this.props;

    if (onChangeText) {
      onChangeText(value);
    }
  };

  render() {
    const {
      containerStyle,
      label,
      onChangeText,
      autoFocus,
      disabled,
      multiline,
      value,
      placeholder,
      errorMessage,
      ...props
    } = this.props;

    /**
     * Note: We can add the functionality to pass custom
     * TextInputs to render & pass the following variables to it.
     */
    const inputProps = {
      onChange: this._onChange,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      ref: this._setInputRef,
      value: value,
      className: classNames([
        styles['input'],
        { [styles['textarea']]: multiline },
        { [styles['input-wrapper-error']]: errorMessage && !multiline },
        { [styles['textarea-wrapper-error']]: errorMessage && multiline },
      ]),
      placeholder: placeholder,
      disabled: disabled,
      autoFocus: autoFocus,
      ...props,
    };

    return (
      <div>
        <TouchableOpacity
          onClick={this._onClick}
          style={classNames(styles['input-wrapper'])}>
          <div
            className={classNames([
              styles['label'],
              { [styles['error-label']]: errorMessage },
              { [styles['textarea-label']]: multiline },
            ])}>
            {label}
          </div>
          {multiline ? <textarea {...inputProps} /> : <input {...inputProps} />}
        </TouchableOpacity>
        {errorMessage !== '' && (
          <div className={styles['error-message']}>{errorMessage}</div>
        )}
      </div>
    );
  }
}

export { TextInput };
