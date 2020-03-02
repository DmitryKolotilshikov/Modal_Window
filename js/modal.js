Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if(buttons.length === 0) {
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('my-footer');
    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.type || secondary}`);
        $btn.onclick = btn.handler || noop;

        wrap.appendChild($btn);
    })
    return wrap;
}

const _createModal = function(options) {
    const DEFAULT_WIDTH = '600px';
    const element = document.createElement('div');
    element.classList.add('d-modal');
    element.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">            
            <div class="main-modal" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="my-header">
                    <h4>${options.title || '...'}</h4>
                    ${options.closable ? `<span data-close="true">&times</span>` : ''}
                </div>
                <div class="my-body" data-content>
                    ${options.content || '...'}
                </div>
            </div>
        </div>    
    `)
    const footer = _createModalFooter(options.footerButttons);
    footer.appendAfter(element.querySelector('[data-content]'))
    document.body.append(element)
    return element
}


$.modal = function(options) {
    const ANIMATION_SPEED = 300;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;
    const modal = {
        open() {
            if(destroyed) {
                console.log('Modal is destroyed!');                
            }
            !closing && $modal.classList.add('open');                   
        },
        close(){
            closing = true;
            $modal.classList.remove('open');            
            $modal.classList.add('hide');  
            setTimeout(()=>{
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);   
        }
    }
    let myClick = event=> {        
        console.log(event.target.dataset.close);
        if(event.target.dataset.close) {
            modal.close();        
        }
    }

    $modal.addEventListener('click', myClick);

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', myClick);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html; 
        }
    })
}