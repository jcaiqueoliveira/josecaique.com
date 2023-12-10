

const datahighlights = {
        category: 'Tecnologia',
        data: '29, Novembro, 2022',
        time: '15min de leitura',
        title: 'Lições aprendidas modularizando uma aplicação',
        link: 'https://medium.com/@kandadev/li%C3%A7%C3%B5es-aprendidas-enquanto-modularizando-um-aplicativo-ea68b4855c06',

        category1: 'Tecnologia',
        data1: '29, Abril, 2022',
        time1: '5min de leitura',
        title1: 'Mantenha sua funcionalidade simples',
        link1: 'https://medium.com/@kandadev/mantenha-sua-funcionalidade-simples-8977c704352a',
}

const videos = [
    {
        title : 'Resolvendo desafio técnico android',
        link  : 'https://www.youtube.com/watch?v=XpL2GrkJdbU',
        time  : '40:12',
        tag   : 'Entrevista',
        img   : '../img/youtube/img-podcast-03.jpg',
    },
    {
        title : 'Entrevista de design de sistema',
        link  : 'https://youtu.be/UUALCBMDAV0?si=4a3R0ibdE-Y2anjy',
        time  : '14:07',
        tag   : 'Entrevista',
        img   : '../img/youtube/img-podcast-03.jpg',
    },
    {
        title : 'Desenvolvimento mobile, qual escolher?',
        link  : 'https://youtu.be/wu9U43yp5bY?si=pOvZoENm6JyRpSnp',
        time  : '10:31',
        tag   : 'Vlog',
        img   : '../img/youtube/img-podcast-03.jpg',
    },
    {
        title : 'Tipos diferentes de processos seletivos...',
        link  : 'https://www.youtube.com/watch?v=dy7FqUjesqY',
        time  : '19:09',
        tag   : 'Vlog',
        img   : '../img/youtube/img-podcast-03.jpg',
    },
    {
        title : 'Performance ruim com clean code?',
        link  : 'https://www.youtube.com/watch?v=Wah8yfW5FyY',
        time  : '10:34',
        tag   : 'Vlog',
        img   : '../img/youtube/img-podcast-03.jpg',
    },

]


const articlesContent = {
    
}

const aboutContent = {
    
}


function getPage(page){
    return  "../../pages/" + page; 
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