document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    clearAllErrors(); 

    let isValid = true;

    const nameInput = document.getElementById('contactName');
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
      showError(nameInput, 'Введите ваше имя и фамилию');
      isValid = false;
    } else if (nameValue.split(/\s+/).filter(w => w.length > 0).length < 2) {
      showError(nameInput, 'Введите не менее двух слов (имя и фамилию)');
      isValid = false;
    } else if (!/^[А-Яа-яЁёA-Za-z\s\-]+$/.test(nameValue)) {
      showError(nameInput, 'Имя должно содержать только буквы, пробелы и дефис');
      isValid = false;
    } else if (nameValue.length > 100) {
      showError(nameInput, 'Слишком длинное имя (максимум 100 символов)');
      isValid = false;
    }

    const emailInput = document.getElementById('contactEmail');
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
      showError(emailInput, 'Введите email-адрес');
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, 'Введите корректный email (например: user@mail.ru)');
      isValid = false;
    } else if (emailValue.length > 254) {
      showError(emailInput, 'Email слишком длинный');
      isValid = false;
    }

    const subjectSelect = document.getElementById('contactSubject');
    const subjectValue = subjectSelect.value;

    if (!subjectValue) {
      showSelectError(subjectSelect, 'Выберите тему обращения');
      isValid = false;
    }

    const messageInput = document.getElementById('contactMessage');
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
      showError(messageInput, 'Введите текст сообщения');
      isValid = false;
    } else if (messageValue.length < 10) {
      showError(messageInput, 'Сообщение слишком короткое (минимум 10 символов)');
      isValid = false;
    } else if (messageValue.length > 1000) {
      showError(messageInput, 'Сообщение слишком длинное (максимум 1000 символов)');
      isValid = false;
    }

    const agreementCheckbox = document.getElementById('agreement');

    if (!agreementCheckbox.checked) {
      showCheckboxError(agreementCheckbox, 'Необходимо согласиться на обработку данных');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name:     nameValue,
        email:    emailValue,
        subject:  subjectSelect.options[subjectSelect.selectedIndex].text,
        message:  messageValue,
      };

      const validEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(validEvent);

      showSuccess();

      form.reset();
      const counter = document.getElementById('charCounter');
      if (counter) {
        counter.textContent = '0 / 1000';
        counter.className = '';
      }
    }
  });

  form.querySelectorAll('.input, .textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      clearFieldError(this);
    });
  });

  const subjectSelect = document.getElementById('contactSubject');
  if (subjectSelect) {
    subjectSelect.addEventListener('change', function () {
      clearSelectError(this);
    });
  }

  const agreementCheckbox = document.getElementById('agreement');
  if (agreementCheckbox) {
    agreementCheckbox.addEventListener('change', function () {
      const errorEl = this.closest('.field').querySelector('.help.is-danger');
      if (errorEl) errorEl.remove();
    });
  }


 
  function showError(input, message) {
    input.classList.add('is-danger');
    input.setAttribute('aria-invalid', 'true');

    const helpEl = document.createElement('p');
    helpEl.classList.add('help', 'is-danger');
    helpEl.textContent = message;

    const controlWrapper = input.closest('.control') || input.parentNode;
    controlWrapper.after(helpEl);
  }

  
  function showSelectError(select, message) {
    const wrapper = select.closest('.select');
    if (wrapper) wrapper.classList.add('is-danger');
    select.setAttribute('aria-invalid', 'true');

    const helpEl = document.createElement('p');
    helpEl.classList.add('help', 'is-danger');
    helpEl.textContent = message;

    const controlWrapper = select.closest('.control') || select.parentNode;
    controlWrapper.after(helpEl);
  }

  
  function showCheckboxError(checkbox, message) {
    checkbox.setAttribute('aria-invalid', 'true');

    const helpEl = document.createElement('p');
    helpEl.classList.add('help', 'is-danger');
    helpEl.textContent = message;

    const fieldEl = checkbox.closest('.field');
    if (fieldEl) fieldEl.appendChild(helpEl);
  }

 
  function clearFieldError(input) {
    input.classList.remove('is-danger');
    input.removeAttribute('aria-invalid');

    const controlWrapper = input.closest('.control') || input.parentNode;
    const nextSibling = controlWrapper.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('help', 'is-danger')) {
      nextSibling.remove();
    }
  }

  
  function clearSelectError(select) {
    const wrapper = select.closest('.select');
    if (wrapper) wrapper.classList.remove('is-danger');
    select.removeAttribute('aria-invalid');

    const controlWrapper = select.closest('.control') || select.parentNode;
    const nextSibling = controlWrapper.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('is-danger')) {
      nextSibling.remove();
    }
  }

 
  function clearAllErrors() {
    form.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(function (el) {
      el.classList.remove('is-danger');
      el.removeAttribute('aria-invalid');
    });

    form.querySelectorAll('.select.is-danger').forEach(function (el) {
      el.classList.remove('is-danger');
    });

    form.querySelectorAll('[aria-invalid]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });

    form.querySelectorAll('.help.is-danger').forEach(function (el) {
      el.remove();
    });
  }

  
  function showSuccess() {
    const successEl = document.getElementById('successMessage');
    if (successEl) {
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () {
        successEl.style.display = 'none';
      }, 5000);
    }
  }
});
