const tables = document.querySelectorAll('table');

    document.body.addEventListener('click', function(event) {
      if (event.target.classList.contains('tableButton')) {
        const targetTable = document.getElementById(event.target.getAttribute('data-target'));
        tables.forEach(table => {
          table.style.display = table === targetTable ? 'table' : 'none';
        });
      } else if (event.target.classList.contains('clearButton')) {
        tables.forEach(table => {table.style.display = 'none '})
      }
    });