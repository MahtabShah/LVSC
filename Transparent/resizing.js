const resizable = document.getElementById('editor-container-area');
const handle = document.getElementById('resize-handle');
let extra = 0;



handle.addEventListener('mousedown', (event) => {
    event.preventDefault();

    let ifrResize = (e) => {
        extra = e.clientX;
        const startWidth = resizable.offsetWidth;
    
        resizable.style.width = `${startWidth + extra}px`;
    
    };


    const startWidth = resizable.offsetWidth;
    const startX = event.clientX;
    let newWidth = startWidth;
    const resize = (e) => {
        newWidth = startWidth + (e.clientX - startX);
        resizable.style.width = `${newWidth}px`;
        console.log(extra)

    };




    const stopResize = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
        document.querySelector('.livePage iframe').contentDocument.removeEventListener('mousemove' , ifrResize)
    };

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
    document.querySelector('.livePage iframe').contentDocument.addEventListener('mousemove' ,ifrResize);
    document.querySelector('.livePage iframe').contentDocument.addEventListener('mouseup' ,stopResize)
});
