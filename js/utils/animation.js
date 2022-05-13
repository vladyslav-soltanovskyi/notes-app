export function hide(obj) {
    let { box, leave, onEnd = () => {} } = obj;
    let handler = function() {
        box.style.display = 'none';
        box.classList.remove(leave);
        onEnd();
        box.removeEventListener('transitionend', handler);
    }


    box.classList.add(leave);
    box.addEventListener('transitionend', handler);
};

export function show(obj) {
    let { box, enter, enter_active, onEnd = () => {} } = obj;
    let handler = function() {
        box.classList.remove(enter_active);
        onEnd();
        box.removeEventListener('transitionend', handler);
    }


    box.style.display = 'block';
    box.classList.add(enter);

    raf(function() {
        box.classList.add(enter_active);
        box.classList.remove(enter);
    })

    box.addEventListener('transitionend', handler);
};

export function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        });
    });
}