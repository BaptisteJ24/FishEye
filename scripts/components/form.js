const regex = {
    text: /^[a-zA-Z]{2,}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
}

const validData = (formElements, data) => {
    let valid = false;
    let i = 0;
    Object.values(data).forEach((el) => {
        if (regex[el.type].test(el.value)) {
            formElements[i].parentNode.toggleAttribute('data-error-visible', false);
            formElements[i].parentNode.classList.toggle('valid', true);
            valid = true;
        } else {
            formElements[i].parentNode.setAttribute('data-error-visible', 'true');
            formElements[i].parentNode.classList.toggle('valid', false);
            console.error("Erreur lors de la récupération des données pour le champ : " + Object.keys(data)[i]);
            valid = false;
        }
        i++;
    });
    return valid;
}

const validForm = (e) => {
    e.preventDefault();
    const form = document.getElementById(e.target.getAttribute('data-form'));
    const data = Object.values(form.elements).reduce((acc, el) => {
        switch (el.nodeName) {
            case "INPUT":
                acc[el.name] = {
                    value: el.value,
                    type: el.type
                }
                break;
            case "TEXTAREA":
                acc[el.name] = {
                    value: el.value,
                    type: "text"
                }
                break;
            default:
                break;
        }
        return acc;
    }, {});

    const authorizedFormElements = Array.from(form.elements).filter((el) => {
        return el.nodeName === "INPUT" || el.nodeName === "TEXTAREA";
    });

    validData(authorizedFormElements, data);
}


const resetForm = (e) => {
    const form = document.getElementById(e.target.getAttribute('data-form'));
    const formElements = form.querySelectorAll('.formData');
    formElements.forEach((el) => {
        el.toggleAttribute('data-error-visible', false);
        el.classList.toggle('valid', false);
    });
    form.reset();
}

const checkFormData = (e) => {
    const formDataElement = e.target;
    const formData = formDataElement.parentNode;
    let formDataType = "";

    switch (formDataElement.nodeName) {
        case "INPUT":
            formDataType = formDataElement.type;
            break;
        case "TEXTAREA":
            formDataType = "text";
        default:
            break;
    }

    if (regex[formDataType].test(formDataElement.value)) {
        formData.toggleAttribute('data-error-visible', false);
        formData.classList.toggle('valid', true);
    }
    else {
        formData.classList.toggle('valid', false);
        formData.setAttribute('data-error-visible', 'true');
    }
}

export { validForm, resetForm, checkFormData };