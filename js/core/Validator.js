class Validator {
    #errors = {};

    make(data, rules) {
        for(const key in rules) {
            const fieldRules = rules[key];

            fieldRules.forEach(role => {
                let checkRole;

                if(this.checkAdditionalParameter(role)) {
                    let [attr, parameter] = role.split('|');
                    checkRole = this[attr](data[key], +parameter);
                }
                else {
                    checkRole = this[role](data[key]);
                }


                if (!checkRole.status) {
                    this.#errors[key] = checkRole.errorMessage;
                }
            });

        }
    }

    checkAdditionalParameter(value) {
        return /\|/.test(value);
    }

    fails() {
        return (Object.values(this.#errors).length === 0) ? { status: true } : { status: false, messages: this.#errors };
    }

    require(value) {
        return !value ? { status: false, errorMessage: "Required field!" } : { status: true };
    }

    minLength (value, minLength) {
        return (value.length < minLength) ? { status: false, errorMessage: `The field must contains at least ${minLength} characters` } : { status: true };
    }

    maxLength (value, maxLength) {
        return (value.length > maxLength) ? { status: false, errorMessage: `The field must contains no more than ${maxLength} characters` } : { status: true };
    }
    
    number(value) {
        let regex = /^\d+$/;
        return !(regex.test(value)) ? { status: false, errorMessage: "The field must contains number" } : { status: true };
    }

    email(value) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
        return !(regex.test(value)) ? { status: false, errorMessage: "Not valid email" } : { status: true };
    }
}

export default Validator;