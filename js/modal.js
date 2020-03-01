const _createModal = function(options) {
    const element = document.createElement('div');
    element.classList.add('d-modal');
    element.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">            
            <div class="main-modal">
                <div class="my-header">
                    <h3>Topic</h3>
                    <span>&times</span>
                </div>
                <div class="my-body">
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, magnam.</span>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, recusandae.</span>
                </div>
                <div class="my-footer">
                        <button class="btn btn-success">OK</button>
                        <button class="btn btn-danger">Cancel</button>
                </div>
            </div>
        </div>    
    `)
    document.body.append(element)
    return element
}


$.modal = function(options) {
    const ANIMATION_SPEED = 300;
    const elem = _createModal(options);
    let closing = false;
    
    return {
        open() {  
            !closing && elem.classList.add('open');       
        },
        close(){
            closing = true;
            elem.classList.remove('open');            
            elem.classList.add('hide');  
            setTimeout(()=>{
                elem.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);   
        },
        destroy(){}
    }
}