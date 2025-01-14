// init
import {
    MenuManager
} from './modules/corporate-menu.js';
import {
    BackportTemplateStyle
} from './modules/corporate-backport.js';
document.body.classList.add("loaded");
new MenuManager();
new BackportTemplateStyle();
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover'
    });
})
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Tooltip(popoverTriggerEl, {
        trigger: 'hover'
    });
})
document.body.addEventListener('show.bs.offcanvas', function (event) {
    if (event.target.classList.contains('offcanvas')) {
        adjustOffcanvasTop(event.target);
        document.body.classList.add('lutece-offcanvas-open');
    }
});
document.body.addEventListener('hidden.bs.offcanvas', function (event) {
    if (event.target.classList.contains('offcanvas')) {
        const check = document.querySelectorAll('.offcanvas.show');
        if (check.length === 0) {
            document.body.classList.remove('lutece-offcanvas-open');
        }
    }
});

function adjustOffcanvasTop(offcanvas) {
    const closestLuteceColumn = closestAncestorWithClass(offcanvas, 'lutece-column');
    if (closestLuteceColumn) {
        const scrollTop = closestLuteceColumn.scrollTop;
        offcanvas.style.top = scrollTop + 'px';
    }
}

function closestAncestorWithClass(element, className) {
    let currentElement = element;
    while (currentElement && !currentElement.classList.contains(className)) {
        currentElement = currentElement.parentElement;
    }
    return currentElement;
}
if (window.location.hash) {
    const hash = window.location.hash;
    // select last hash;
    const hashParts = hash.split('#');
    const lastHash = hashParts[hashParts.length - 1];
    const target = document.querySelector('#' + lastHash);
    if (target) {
        target.scrollIntoView();
    }
}