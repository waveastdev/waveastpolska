export function validateForm(name, value, errors, setErrors, refName, refEmail, refSubject, refMessage, t) {
    const newErrors = { ...errors };

    switch (name) {
        case 'name':
            if (!new RegExp(/^[a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF]+( [a-zA-Z\u00C0-\u024F\u0027\u002E\u002D\u1E00-\u1EFF\s]+)+$/).test(value)) {
                newErrors.name = value === '' ? t(`contact.error.requiredName`) : t(`contact.error.validName`);
                refName.current.classList.remove("contact__form-input--valid");
                refName.current.classList.add("contact__form-input--error");
            } else {
                delete newErrors.name; 
                refName.current.classList.add("contact__form-input--valid");
                refName.current.classList.remove("contact__form-input--error");
            }
            break;

        case 'email':
            if (!new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/).test(value)) {
                newErrors.email = value === '' ? t(`contact.error.requiredEmail`) : t(`contact.error.validEmail`);
                refEmail.current.classList.remove("contact__form-input--valid");
                refEmail.current.classList.add("contact__form-input--error");
            } else {
                delete newErrors.email; 
                refEmail.current.classList.add("contact__form-input--valid");
                refEmail.current.classList.remove("contact__form-input--error");
            }
            break;

        case 'subject':
            if (!new RegExp(/[\S\s]+[\S]+/).test(value)) {
                newErrors.subject = value === '' ? t(`contact.error.requiredSubject`) : t(`contact.error.validSubject`);
                refSubject.current.classList.remove("contact__form-input--valid");
                refSubject.current.classList.add("contact__form-input--error");
            } else {
                delete newErrors.subject; 
                refSubject.current.classList.add("contact__form-input--valid");
                refSubject.current.classList.remove("contact__form-input--error");
            }
            break;

        case 'message':
            if (!new RegExp(/[\S\s]+[\S]+/).test(value)) {
                newErrors.message = value === '' ? t(`contact.error.requiredMessage`) : t(`contact.error.validMessage`);
                refMessage.current.classList.remove("contact__form-input--valid");
                refMessage.current.classList.add("contact__form-input--error");
            } else {
                delete newErrors.message;
                refMessage.current.classList.add("contact__form-input--valid");
                refMessage.current.classList.remove("contact__form-input--error");
            }
            break;

        default:
            break;
    }

    setErrors(newErrors);
}