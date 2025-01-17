/**
 * MenuManager class provides manage and manipulate menus.
 */
import LuteceSearchList from '../../../../shared/modules/luteceSearchList.js';
export class MenuManager {
    /**
     * Constructor for the MenuManager class.
     * Initializes the DOM elements, gets the saved theme, and calls the init method.
     */
    constructor() {
        this.toggleBtn = document.getElementById('toggle-theme');
        this.body = document.querySelector('body');
        this.savedTheme = localStorage.getItem('lutece-corporate-theme');
        this.menu = document.getElementById('menu');
        this.childMenu = document.getElementById('child-menu');
        this.switcherMenu = document.getElementById('menu-switcher');
        this.iconMenu = document.getElementById('menu-icon');
        this.init();
    }
    /**
     * Initializes the MenuManager by applying the saved theme, setting the active menu item,
     * adding event listeners for menu items, setting up the menu switcher, and adding hover listeners.
     */
    init() {
        if( this.toggleBtn != null ){
            this.applySavedTheme();
            this.setActive();
            this.addMenuEventListeners();
            this.setupSwitcherMenu();
            this.closeChildMenuOnClickOutside();
            this.searchMenu();
        }
    }
    /**
     * Applies the saved theme to the body and adds an event listener for theme toggle button.
     */
    applySavedTheme() {
        if (this.savedTheme) {
            this.body.setAttribute('data-bs-theme', this.savedTheme);
            if (this.savedTheme === 'dark') {
                this.toggleBtn.checked = true;
            }
        }

        this.toggleBtn.addEventListener('change', () => {
            this.toggleTheme()
        });

        this.toggleBtn.addEventListener('keydown', ( keyboardEvent ) => {
            switch (keyboardEvent.key) {
                case 'Enter':
                case 'Space':
                    keyboardEvent.preventDefault();
                    this.toggleTheme()
                    break;
            }
        });
    }
    /**
     *  Theme toggle button function.
     */
    toggleTheme(){
        if (this.body.getAttribute('data-bs-theme') === 'light') {
            this.body.setAttribute('data-bs-theme', 'dark');
            this.toggleBtn.checked = true;
            localStorage.setItem('lutece-corporate-theme', 'dark');
        } else {
            this.body.setAttribute('data-bs-theme', 'light');
            this.toggleBtn.checked = false;
            localStorage.setItem('lutece-corporate-theme', 'light');
        }
    }
    /**
     * Sets the active menu item and updates the child menu based on the active group.
     * @param {string} activeGroup - The feature group of the active menu item.
     */
    setActive(activeGroup) {
        const active = document.querySelector('#feature-title a') && document.querySelector('#feature-title a').getAttribute('href');
        const rightListItems = this.childMenu.querySelectorAll('#right-list .list-group-item');
        const featureGroupListItems = this.childMenu.querySelectorAll('#feature-list .feature-group');
        const featureGroupMenuItems = this.menu.querySelectorAll('a');
        this.childMenu.classList.remove('child-menu-found');
        if (!activeGroup && active) {
            activeGroup = active.replace('#', '');
            rightListItems.forEach(element => {
                if (element.href.includes(active)) {
                    element.classList.add('active', 'bg-body-tertiary');
                    activeGroup = element.getAttribute('feature-group');
                    return;
                }
            });
        }
        if (activeGroup) {
            if ( !activeGroup.toLowerCase().includes( '.jsp' ) ) {
                this.childMenu.classList.remove('d-none');
                let nEl = 0;
                let activeElement = null;
                let firstGroupElement = null;
                
                rightListItems.forEach(element => {
                    if (element.getAttribute('feature-group') != activeGroup) {
                        element.classList.add('d-none');
                    } else {
                        if (!firstGroupElement) {
                            firstGroupElement = element;
                        }
                        if (element.classList.contains('active')) {
                            activeElement = element;
                        }
                        element.classList.remove('d-none');
                        this.childMenu.classList.add('child-menu-found');
                        this.childMenu.setAttribute('data-featuregroup', activeGroup);
                    }
                });
                
                if (activeElement) {
                    activeElement.focus();
                    activeElement.classList.add('menu-selected');

                } else if (firstGroupElement) {
                    firstGroupElement.classList.add('menu-selected');
                    firstGroupElement.focus();
                }
               
                featureGroupListItems.forEach(featureGroup => {
                    if (featureGroup.getAttribute('feature-group') === activeGroup) {
                        featureGroup.classList.remove('d-none');
                        this.childMenu.classList.add('child-menu-found');
                    } else {
                        featureGroup.classList.add('d-none');
                    }
                });
                featureGroupMenuItems.forEach(featureGroup => {
                    if (featureGroup.getAttribute( 'feature-group' ) === activeGroup) {
                        featureGroup.classList.add( 'active', 'bg-body-tertiary' );
                    } else {
                        featureGroup.classList.remove( 'active', 'bg-body-tertiary' );
                    }
                });
            } else {
                let parts = activeGroup.split( '/' );
                if (parts.length >= 3) {
                    let role = parts[2];
                    featureGroupMenuItems.forEach(featureGroup => {
                        if (featureGroup.getAttribute('href').includes( `/${role}/` ) ) {
                            featureGroup.classList.add('active', 'bg-body-tertiary');
                        }
                    });
                }
            }
        } else {
            featureGroupMenuItems.forEach(featureGroup => {
                if (featureGroup.getAttribute( 'href' ).includes(window.location.href)) {
                    featureGroup.classList.add( 'active', 'bg-body-tertiary' );
                }
            });
        }
    }

    /**
     * Adds click event listeners for the menu.
     */
    addMenuEventListeners() {
        const menus = this.menu.querySelectorAll('a:not(.feature-link)');
        menus.forEach(element => {
            element.addEventListener( 'click', e => {
                e.preventDefault();
                this.setActive(element.getAttribute('feature-group'));
                this.childMenu.classList.add('child-menu-show');
                menus.forEach(element => {
                    element.ariaExpanded = "false";
                });
                if( e.target.tagName === 'I' ){
                    if( e.target.parentElement.ariaExpanded === "true" ){
                        e.target.parentElement.ariaExpanded = "false" ;
                    } else {
                        e.target.parentElement.ariaExpanded = "true" ;
                    }
                } else {
                    if( e.target.ariaExpanded === "true" ){
                        e.target.ariaExpanded === "false";
                    } else {
                        e.target.ariaExpanded === "true";
                    }
                 }
            });
        });
        
        this.menu.addEventListener( "keydown", ( keyboardEvent ) => {
            const activeMenuItem = this.menu.querySelector('.active');
            switch (keyboardEvent.key) {
                case 'Escape':
                    keyboardEvent.preventDefault();
                    break;
                case 'ArrowUp':
                    this.selectMenu( 'up', menus[0], 'active', activeMenuItem );
                    break;
                case 'ArrowDown':
                    keyboardEvent.preventDefault();
                    this.selectMenu( 'down', menus[0], 'active', activeMenuItem );
                    break;
                case 'Home':
                    keyboardEvent.preventDefault();
                    menus[0].focus();
                    break;
                case 'End':
                    keyboardEvent.preventDefault();
                    menus[ menus.length - 1 ].focus();
                    break;
            }
        });

        this.childMenu.addEventListener( "keydown", (keyboardEvent) => {
            const featureGroup = `[feature-group="${this.childMenu.dataset.featuregroup}"]`;
            const rightListItems = this.childMenu.querySelectorAll(`#right-list .list-group-item${featureGroup}`);
            const activeMenuItem = this.childMenu.querySelector(`#right-list .list-group-item${featureGroup}.menu-selected`);
            switch (keyboardEvent.key) {
                case 'Escape':
                    this.childMenu.classList.remove('child-menu-show');
                    this.menu.querySelector(featureGroup).setAttribute('aria-expanded','false');
                    this.childMenu.classList.add('d-none');
                    this.menu.querySelector( featureGroup ).focus()
                    break;
                case 'ArrowUp':
                    this.selectMenu( 'up', rightListItems[0], 'menu-selected', activeMenuItem );
                    break;
                case 'ArrowDown':
                    keyboardEvent.preventDefault();
                    this.selectMenu( 'down', rightListItems[0], 'menu-selected', activeMenuItem );
                    break;
                case 'Home':
                    keyboardEvent.preventDefault();
                    rightListItems[0].focus();
                    break;
                case 'End':
                    keyboardEvent.preventDefault();
                    rightListItems[ rightListItems.length - 1 ].focus();
                    break;
            }
        });
    }
    
    /**
     * Sets up the menu switcher to toggle the pin state of the child menu.
     */
    selectMenu( dir, item, sel, activeItem ){
        if( activeItem != undefined && activeItem != null ){
            activeItem.classList.remove( sel );
            let elem = null;
            if( dir === 'down' ){
                elem = activeItem.nextElementSibling
                if( sel === 'active' ){
                    elem = activeItem.parentElement.nextElementSibling.firstElementChild;
                }
            } else {
                elem = activeItem.previousElementSibling;
                if( sel === 'active' ){
                    elem = activeItem.parentElement.previousElementSibling.firstElementChild;
                }
            }
            elem.classList.add( sel );
            elem.focus()
        } else {
            item.classList.add( sel )
            item.focus( )
        }
    }
    /**
     * Sets up the menu switcher to toggle the pin state of the child menu.
     */
    setupSwitcherMenu() {
        let pin = localStorage.getItem('lutece-corporate-menu-pin');
        if (pin === null) {
            pin = false;
            localStorage.setItem('lutece-corporate-menu-pin', pin);
        }
        if( pin === 'true' ) {
            this.childMenu.classList.remove('no-pin');
            this.iconMenu.classList.add('ti-lock');
        }
        else {
            this.iconMenu.classList.add('ti-lock-open');
        }
        this.switcherMenu.addEventListener('click', () => {
            this.childMenu.classList.toggle('no-pin');
            this.iconMenu.classList.toggle('ti-lock-open');
            this.iconMenu.classList.toggle('ti-lock');
            localStorage.setItem('lutece-corporate-menu-pin', !this.childMenu.classList.contains('no-pin'));
        });
    }
    /**
     * Adds a click event listener to the document to close the child menu when clicking outside of the menu elements.
     */
    closeChildMenuOnClickOutside() {
        document.addEventListener('click', (event) => {
            if (!this.menu.contains(event.target) && !this.childMenu.contains(event.target) && this.childMenu.classList.contains('child-menu-show')) {
                this.childMenu.classList.remove('child-menu-show');
                this.menu.querySelectorAll('a:not(.feature-link)').forEach(element => {
                    element.setAttribute('aria-expanded','false')
                });
            }
        });
    }

    searchMenu() {
        const searchInput = document.querySelector("#search-menu");
        const searchElementList = document.querySelectorAll("#right-list a");
        new LuteceSearchList(searchInput, searchElementList, {
            searchableChild: [".title", ".text-muted"],
            highlight: true,
            emptyMessageElement: document.querySelector("#empty-message"),
            hideClass: "d-none",
            extraSearchFunction: () => {
                const featureList = document.querySelector("#feature-list");
                if (searchInput.value.length > 0) {
                    featureList.classList.add("d-none");
                } else {
                    featureList.classList.remove("d-none");
                    searchElementList.forEach(element => {
                        element.classList.add("d-none");
                    });
                    const featureGroup = document.querySelector("#feature-list .feature-group:not(.d-none)").getAttribute("feature-group");
                    if (featureGroup && featureGroup !== "home") {
                        this.setActive(featureGroup);
                    }
                }
            }
        });
    }
}