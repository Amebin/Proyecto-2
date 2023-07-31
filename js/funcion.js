@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");


document.addEventListener('DOMContentLoaded',()=>{
    const carrusel = document.querySelector('.carrusel');
    const iner = document.querySelector('.carrusel-iner');
    const prev = document.querySelector('.Carrusel-prev');
    const next = document.querySelector('.Carrusel-next');
    const imgWidth = document.querySelector('img').clientWidth;
    
    let currentIndex = 0;
    
    
    prev.addEventListener('click', (event)=>{
        event.preventDefault();
        currentIndex = Math.max(currentIndex - 1 , 0);
    
        iner.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
    
    });
    
    next.addEventListener('click', (event)=>{
        event.preventDefault();
        currentIndex = Math.min(currentIndex + 1 , iner.childElementCount - 1 );
    
        iner.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
    })
    });
    