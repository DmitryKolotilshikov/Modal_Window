let fruits = [
    {id: 1, title: 'Apple', price: 39, img: 'https://felomena.com/wp-content/images/sonnik/bukva/ya/yabloko.jpg'},
    {id: 2, title: 'Orange', price: 19, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Apricot', price: 49, img: 'https://misterposter.ru/image/cache/data/wallpaper/abrikos_Ob5881_141813925-764x764.jpg'}
]

const modal = $.modal({
    title: 'Dmitry Kolotilshikov',
    closable: true,
    content: `
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
    `,
    width: '450px',
    footerButttons: [
        {text: 'OK', type: 'success', handler() {
            console.log('clicked OK');
            modal.close();            
        } },
        {text: 'CANCEL', type: 'danger', handler() {
            console.log('clicked CANCEL');
            modal.close();             
        } }    
    ]
});

const toHTML = fruit => `
<div class="col">
    <div class="card">
        <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
        <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-get="price">Get Price</a>
        <a href="#" class="btn btn-danger">Delete</a>
        </div>
    </div>               
</div>  
`
const render = function() {
    const html = fruits.map(fruit => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;


}
render();



