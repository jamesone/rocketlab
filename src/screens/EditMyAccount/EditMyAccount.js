// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'hookrouter';
import { saveAccountUpdates } from '../../redux/actions';
import { TextInput, Header, ScreenContentContainer } from '../../components';
import {
  errorMsgHelpers,
  validationHelpers,
  stringFormatter,
} from '../../utils';
import { ROUTES } from '../../navigation/config';
import styles from './EditMyAccount.module.scss';

type Props = {
  title: string,
  myAccount: MyAccountFormType,
  dispatch: void,
};

type State = {
  editMyAccountForm: MyAccountFormType,
  editMyAccountFormErrors: MyAccountFormType,
  editEnabled: boolean,
};

const emptyMyAccountForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  bio: '',
};

class EditMyAccount extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editMyAccountForm: props.myAccount,
      editMyAccountFormErrors: emptyMyAccountForm,
      /** By default, edit is enabled when you load this page. */
      editEnabled: true,
    };
  }

  /**
   * When a user clicks out of a textinput, we will
   * check for an error in that field.
   */
  _onBlurTextInput = (field: string) => {
    this.setState({
      editMyAccountFormErrors: {
        ...this._getUpdatedFormState(field, 'editMyAccountFormErrors'),
      },
    });
  };

  /**
   * Given a field (e.g firstName) and a formErrorStateName
   * (e.g editMyAccountFormErrors), we'll return the updated form
   * errors. E.g { ...existingFormErrors, firstName: 'Field is required' }
   */
  _getUpdatedFormState = (
    field: string,
    formErrorStateName: 'editMyAccountFormErrors',
  ): Object => {
    const { [formErrorStateName]: form } = this.state;
    const errorMessage = this._getErrorMessageForField(field);
    return {
      ...form,
      [field]: errorMessage,
    };
  };

  /**
   * Given a `formStateNameToCheck`, the function will get
   * the form field state[formStateNameToCheck], loop over
   * each field & get any error message that arises.
   */
  _getErrorsFromForm = (formStateNameToCheck: string) => {
    const { [formStateNameToCheck]: form } = this.state;
    const formFields = Object.keys(form);
    let formErrors = null;

    formFields.forEach((field) => {
      const errorMessage = this._getErrorMessageForField(field);
      if (errorMessage) {
        if (formErrors === null) {
          formErrors = {};
        }
        formErrors[field] = errorMessage;
      }
    });

    return formErrors;
  };

  /**
   * Given a form field name (E.g firsName), we'll
   * check the state value & return an error message
   * if the validation fails.
   */
  _getErrorMessageForField = (field: string) => {
    const inputVal = this.state.editMyAccountForm[field];
    let errorMsg = '';
    switch (field) {
      case 'firstName':
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('first name');
        }
        break;
      case 'lastName':
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('last name');
        }
        break;
      case 'email':
        // @todo finalise email validation
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('email');
        } else if (!validationHelpers.isEmail(inputVal)) {
          errorMsg = errorMsgHelpers.invalidEmail;
        }
        break;
      case 'phone':
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('phone');
        } else if (!validationHelpers.isValidPhoneNumber(inputVal)) {
          errorMsg = errorMsgHelpers.invalidPhone;
        }
        // @todo: Add phone validation here.
        break;
      case 'dob':
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('date of birth');
        }
        break;
      case 'bio':
        if (!inputVal) {
          errorMsg = errorMsgHelpers.getFieldRequiredText('bio');
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  /**
   * Handle the text changes as they come through. We'll
   * dynamically change the form state based on the 'type'
   * variable passed
   * (e.g type = 'firstName' then we update the firstName state).
   */
  _handleTextInput = (text: string, type: string) => {
    const { editMyAccountForm } = this.state;
    this.setState(
      {
        [type]: text,
        editMyAccountForm: {
          ...editMyAccountForm,
          [type]: text,
        },
      },
      () => {
        this.setState({
          editMyAccountFormErrors: {
            ...this._getUpdatedFormState(type, 'editMyAccountFormErrors'),
          },
        });
      },
    );
  };

  /** Save changes & disable edit mode. */
  _saveChanges = () => {
    const { dispatch } = this.props;
    const formErrors = this._getErrorsFromForm('editMyAccountForm');
    if (!formErrors) {
      const { editMyAccountForm } = this.state;
      dispatch(saveAccountUpdates(editMyAccountForm));
      this._toggleEnableEdit(false);
      navigate(ROUTES.myAccount);
      return;
    }

    this.setState({
      editMyAccountFormErrors: formErrors,
    });
  };

  /** Toggle edit mode */
  _toggleEnableEdit = (editEnabled: boolean) => this.setState({ editEnabled });

  /**
   * Based on the editEnabled state, we'll either show
   * an Edit or Save option.
   */
  _getRightHeaderBtn = (): string => {
    const { editEnabled } = this.state;
    return editEnabled ? 'Save' : 'Edit';
  };

  _handleSaveEditBtn = () => {
    const { editEnabled } = this.state;
    if (editEnabled) {
      this._saveChanges();
      return;
    }

    this._toggleEnableEdit(false);
  };

  render() {
    const { title } = this.props;
    const {
      editMyAccountForm,
      editMyAccountFormErrors,
      editEnabled,
    } = this.state;
    const { firstName, lastName, email, phone, bio, dob } = editMyAccountForm;

    return (
      <div>
        <Header
          title={title}
          rightBtn={this._getRightHeaderBtn()}
          onClickRightBtn={this._handleSaveEditBtn}
        />
        <ScreenContentContainer>
          <TextInput
            onChangeText={(txt) => this._handleTextInput(txt, 'firstName')}
            containerStyle={styles.inputContainer}
            label="First Name"
            value={firstName}
            onBlur={() => this._onBlurTextInput('firstName')}
            errorMessage={editMyAccountFormErrors.firstName}
            disabled={!editEnabled}
          />
          <TextInput
            onChangeText={(txt) => this._handleTextInput(txt, 'lastName')}
            containerStyle={styles.inputContainer}
            label="Last Name"
            value={lastName}
            onBlur={() => this._onBlurTextInput('lastName')}
            errorMessage={editMyAccountFormErrors.lastName}
            disabled={!editEnabled}
          />
          <TextInput
            onChangeText={(txt) => this._handleTextInput(txt, 'email')}
            containerStyle={styles.inputContainer}
            label="Email"
            value={email}
            onBlur={() => this._onBlurTextInput('email')}
            errorMessage={editMyAccountFormErrors.email}
            disabled={!editEnabled}
          />
          <TextInput
            onChangeText={(txt) =>
              this._handleTextInput(
                stringFormatter.formatPhoneNumber(txt),
                'phone',
              )
            }
            containerStyle={styles.inputContainer}
            label="Phone"
            value={phone}
            onBlur={() => this._onBlurTextInput('phone')}
            errorMessage={editMyAccountFormErrors.phone}
            disabled={!editEnabled}
            maxLength="12"
          />
          <TextInput
            onChangeText={(txt) => this._handleTextInput(txt, 'dob')}
            containerStyle={styles.inputContainer}
            label="Date of Birth"
            value={dob}
            type="date"
            onBlur={() => this._onBlurTextInput('dob')}
            errorMessage={editMyAccountFormErrors.dob}
            disabled={!editEnabled}
          />
          <TextInput
            onChangeText={(txt) => this._handleTextInput(txt, 'bio')}
            containerStyle={styles.inputContainer}
            label="Bio"
            value={bio}
            onBlur={() => this._onBlurTextInput('bio')}
            errorMessage={editMyAccountFormErrors.bio}
            disabled={!editEnabled}
            multiline
          />
        </ScreenContentContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ myAccount }: { myAccount: MyAccountFormType }) => ({
  myAccount,
});

const EditMyAccountWithData = connect(mapStateToProps, null)(EditMyAccount);

export {
  EditMyAccountWithData as EditMyAccount,
  EditMyAccount as PureEditMyAccount,
};
