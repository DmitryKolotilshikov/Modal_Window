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
