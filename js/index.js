let fruits = [
    {id: 1, title: 'Apple', price: 39, img: 'https://felomena.com/wp-content/images/sonnik/bukva/ya/yabloko.jpg'},
    {id: 2, title: 'Orange', price: 19, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Apricot', price: 49, img: 'https://misterposter.ru/image/cache/data/wallpaper/abrikos_Ob5881_141813925-764x764.jpg'}
]

const toHTML = fruit => `
<div class="col">
    <div class="card">
        <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
        <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Get Price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
        </div>
    </div>               
</div>  
`
const render = function() {
    const html = fruits.map(fruit => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;
}
render();

const priceModal = $.modal({
    title: 'Fruits price',
    closable: true,    
    width: '450px',
    footerButtons: [
        {text: 'OK', type: 'success', handler() {
            console.log('clicked OK');
            priceModal.close();            
        } }   
    ]
});



document.addEventListener('click', (event)=>{
    event.preventDefault();
    const myType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);
    if(myType === 'price') {       
       priceModal.setContent(`
       <p>Price on item ${fruit.title}: <strong>${fruit.price} RUB</strong></p>
       `);
       priceModal.open(); 
    } else if(myType === 'remove') {
        $.confirm({
            title: 'Removing...',
            content: `<p>You can remove this item: <strong>${fruit.title}</strong></p>`
        }).then(()=>{
            fruits = fruits.filter(f => f.id !== id);
            render();        
        }).catch(()=>{
            console.log('cancel');
        })
    }   
})
