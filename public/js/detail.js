let clickAgregar = document.querySelector('.btn');
let modal = document.querySelector('.modal')

window.addEventListener('load', function() {

    clickAgregar.addEventListener('click', () => {
        modal.classList.add('.modal_show');
    });

    clickSeguir.addEventListener('click', () => {
            modal.classList.remove('.modal_show');
        });

})
