document.addEventListener("DOMContentLoaded", () => {
    const navigationSection = document.querySelector('.navigation-section');
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    
    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - navigationSection.offsetLeft;
        scrollLeft = navigationSection.scrollLeft;
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - navigationSection.offsetLeft;
        const walk = (x - startX) * 2;
        navigationSection.scrollLeft = scrollLeft - walk;
    };
    
    const handleMouseUp = () => {
        isDragging = false;
    };
    
    const handleMouseLeave = () => {
        isDragging = false;
    };
    
    navigationSection.addEventListener('mousedown', handleMouseDown);
    navigationSection.addEventListener('mousemove', handleMouseMove);
    navigationSection.addEventListener('mouseup', handleMouseUp);
    navigationSection.addEventListener('mouseleave', handleMouseLeave);
});
