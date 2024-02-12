export default class Form {
    constructor(forms, inputs) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll(inputs);
        this.message = {
            loading: 'Zagruzka...',
            success: 'Sbasibo! Skoro my s vami svyajensya',
            failure: 'Chto to poshlo ne tak...'
        };
        this.path = 'assets/question.php';
    }

    async postData (url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function creatMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;     
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', creatMask);
            input.addEventListener('focus', creatMask);
            input.addEventListener('blur', creatMask);
        });
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMassege = document.createElement('div');
                statusMassege.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: gray; `;
                item.parentNode.appendChild(statusMassege);

                statusMassege.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMassege.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMassege.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMassege.remove();
                        }, 3000);
                    });
            });
        });
    }
}