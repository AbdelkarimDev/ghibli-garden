const VALIDATOR = () => {
    const isNonEmptyString = (str) => {
        if (str === 'undefined' || typeof str !== 'string') {
            throw new Error(`Value must be a string!`);
        } else {
            const trimmed = str.trim();
            if (trimmed.length === 0) {
                throw new Error(`Value cannot be empty string!`);
            }
        }
    };
    const hasInvalidSymbols = (str) => {
        const regex = /[^a-zA-Z ]/;
        if (str.match(regex)) {
            throw new Error(`${str} contains invalid symbols!`);
        }
    };
    const isNumber = (num) => {
        if (typeof num !== 'number') {
            throw new Error(`${num} must be a number!`);
        }
    };
    const isPositiveNumber = (num) => {
        if (num < 0) {
            throw new Error(`${num} cannot be negative!`);
        }
    };
    const isInRange = (value, min, max) => {
        if (value < min || value > max) {
            throw new Error(`${value} should be in range ${min} - ${max}`);
        }
    };

    return {
        isNonEmptyString,
        hasInvalidSymbols,
        isNumber,
        isPositiveNumber,
        isInRange,
    };
};

module.exports = VALIDATOR;
