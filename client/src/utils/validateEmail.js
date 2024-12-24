export function validateEmail(value, refEmail, setErrors, t) {
    if(!new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/).test(value)){
        if (value === '') {
            setErrors(t(`newsLetter.error.requiredEmail`));
        } else {
            setErrors(t(`newsLetter.error.validEmail`));
        }
        refEmail.current.classList.remove("newsletter__input--valid");
        refEmail.current.classList.add("newsletter__input--error");
    } else {
        setErrors('');
        refEmail.current.classList.add("newsletter__input--valid");
        refEmail.current.classList.remove("newsletter__input--error");
    }
}