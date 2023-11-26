
// Function to load page dinamically
function loadPage(page, content) {
    const pageContent = getPage(page.page);
    fetch(pageContent)
        .then(response => response.text())
        .then(html => {
            for (let key in content) {
                if (content.hasOwnProperty(key)) {
                    const pattern = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(pattern, content[key]);
                }
            }
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar componente:', error));
}

// Function to add menu without repetition of html
function generateMenu() {
    const menuData = [
        { label: 'Início', page: Pages.home },
        { label: 'Artigos', page: Pages.articles },
        { label: 'Sobre', page: Pages.about}
    ];

    const menuContainer = document.getElementById('menu');

    menuData.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'item-categorie';
        link.onclick = function() {
            console.log(item)
            console.log(item.page.page)
            console.log(item.page.content)
           
            loadPage(item.page, item.page.content);
            return false;
        };

        const span = document.createElement('span');
        span.textContent = item.label;

        link.appendChild(span);
        listItem.appendChild(link);
        menuContainer.appendChild(listItem);
    });
}

// Chame a função para incluir os arquivos HTML quando a página carregar
window.onload = function() {
    generateMenu();
    loadPage(Pages.home, datahighlights)
}