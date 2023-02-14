const year = new Date();
copy = document.getElementById("year").textContent = year.getFullYear() + " 🚀";

(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = function (theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    const showActiveTheme = theme => {
        // const activeThemeIcon = document.querySelector('.theme-icon-active use')
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
        // const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
        })

        btnToActive.classList.add('active')
        // activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    localStorage.setItem('theme', theme)
                    setTheme(theme)
                    showActiveTheme(theme)
                })
            })
    })
})()


const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const proyecto = document.getElementById('proyecto');
const mensaje = document.getElementById('mensaje');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    proyecto: /^['']$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/, // 7 a 14 numeros.
    mensaje: /''/
}

const campos = {
    nombre: false,
    proyecto: false,
    correo: false,
    telefono: false,
    mensaje: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "proyecto":
            validarCampo(expresiones.proyecto, e.target, 'proyecto');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value.trim()) || (campo === 'proyecto' && input.value) || (campo === 'mensaje' && input.value.trim())) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        // document.querySelector(`#grupo__${campo} i`).classList.add('bxs-check-circle');
        // document.querySelector(`#grupo__${campo} i`).classList.remove('bxs-x-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        // document.querySelector(`#grupo__${campo} i`).classList.add('bxs-x-circle');
        // document.querySelector(`#grupo__${campo} i`).classList.remove('bxs-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
proyecto.addEventListener('keyup', validarFormulario);
proyecto.addEventListener('blur', validarFormulario);

mensaje.addEventListener('keyup', validarFormulario);
mensaje.addEventListener('blur', validarFormulario);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // servicesID, templateID, #form, publicKey
    if (campos.nombre && campos.correo && campos.telefono && campos.proyecto && campos.mensaje) {
        emailjs.sendForm('', '', '', '')
            .then(() => {

                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

                document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

                setTimeout(() => {
                    document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                }, 2000);
            }, (error) => {
                // document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            })
        formulario.reset();
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});



