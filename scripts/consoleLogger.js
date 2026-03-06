document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('formValid', function (event) {
    const data = event.detail;

    console.clear();

    console.log(
      '%c📬 Новое сообщение с формы обратной связи',
      'background:#667eea; color:#fff; font-size:14px; font-weight:bold; padding:6px 12px; border-radius:4px;'
    );
    console.log('%c─────────────────────────────────────────', 'color:#aaa');

    console.log('%cИмя:',     'font-weight:bold; color:#3273dc;', data.name);
    console.log('%cEmail:',   'font-weight:bold; color:#3273dc;', data.email);
    console.log('%cТема:',    'font-weight:bold; color:#3273dc;', data.subject);
    console.log('%cСообщение:', 'font-weight:bold; color:#3273dc;', data.message || '(не заполнено)');

    console.log('%c─────────────────────────────────────────', 'color:#aaa');
    console.log('%cВремя отправки:', 'color:#888;', new Date().toLocaleString('ru-RU'));
    console.log('%cДлина сообщения:', 'color:#888;', data.message.length, 'символов');

    console.log('%c─────────────────────────────────────────', 'color:#aaa');
    console.log('%cПолный объект данных:', 'color:#888;');
    console.log(data);
  });

});
