export default class FormValidator {
	constructor(validationConfig, form) {
		this._validationConfig = validationConfig;
		this._formSelector = form;
		this._inputSelector = Array.from(this._formSelector.querySelectorAll(validationConfig.inputSelector));
		this._buttonElement = this._formSelector.querySelector(this._validationConfig.submitButtonSelector);
	}
	removeError() {
		this._toggleButtonState();
		this._inputSelector.forEach(item => {
			this._hideError(item);
		});
	}

	_showError(input ,errorMessage) {
		const errorElement = this._formSelector.querySelector(`.${input.id}-error`);
		input.classList.add(this._validationConfig.inputErrorClass);
		errorElement.classList.add(this._validationConfig.errorClass);
		errorElement.textContent = errorMessage;
	}
    
	_hideError(input) {
		const errorElement = this._formSelector.querySelector(`.${input.id}-error`);
		input.classList.remove(this._validationConfig.inputErrorClass);
		errorElement.classList.remove(this._validationConfig.errorClass);
		errorElement.textContent = "";
	}
    
	_validForm(input) {
		if (!(input.validity.valid)) {
			this._showError(input, input.validationMessage);
		} else {
			this._hideError(input);
		} 
	}
    
	_hasInvalidInput() {
		return this._inputSelector.some(item => {
			return !item.validity.valid;
		});
	}
     
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
			this._buttonElement.setAttribute("disabled", "");
		} else {
			this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
			this._buttonElement.removeAttribute("disabled", "");
		}
	}

	_setEventListeners() {
		this._inputSelector.forEach(item => {
			item.addEventListener("input", () => {
				this._validForm(item);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
	}
}

