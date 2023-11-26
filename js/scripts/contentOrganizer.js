

const datahighlights = {
        category: 'Tecnologia',
        data: '29, Nov, 2022',
        time: '15min de leitura',
        title: 'Lições aprendidas modularizando uma aplicação',
        link: 'https://medium.com/@kandadev/li%C3%A7%C3%B5es-aprendidas-enquanto-modularizando-um-aplicativo-ea68b4855c06'
}


const articlesContent = {
    
}

const aboutContent = {
    
}


function getPage(page){
    return  "../../pages/"+ page; 
}

const Pages = {
    home: {
        page: 'home.html',
        content: datahighlights
    },
    articles : {
        page: 'articles.html',
        content: articlesContent
    },
    about : {
        page:'about.html',
        content: aboutContent
    },
}