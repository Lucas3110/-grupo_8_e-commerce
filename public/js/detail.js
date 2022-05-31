const openModal = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('modal_seguir');

opernModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.add('modal--show');
})

closeModal.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.classList.remove('modal--show');
})