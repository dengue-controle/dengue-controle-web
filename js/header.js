async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        
        // Marcar item ativo do menu baseado na página atual
        setActiveMenuItem();
        
        // Adicionar event listeners para fechar menu ao clicar nos links
        addMenuListeners();
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}

function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active de todos os itens
    document.querySelectorAll('#menu-horizontal a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adiciona active ao item correspondente
    if (currentPage === 'index.html' || currentPage === '') {
        document.getElementById('menu-mapa')?.classList.add('active');
    } else if (currentPage === 'cadastro.html') {
        document.getElementById('menu-cadastro')?.classList.add('active');
	} else if (currentPage === 'lista.html') {
        document.getElementById('menu-lista')?.classList.add('active');
    } else if (currentPage === 'relatorios.html') {
        document.getElementById('menu-relatorios')?.classList.add('active');
    }
}

function toggleMenu() {
    const menu = document.getElementById('menu-horizontal');
    const toggle = document.querySelector('.menu-toggle');
    
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function addMenuListeners() {
    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('#menu-horizontal a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const menu = document.getElementById('menu-horizontal');
                const toggle = document.querySelector('.menu-toggle');
                menu.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const menu = document.getElementById('menu-horizontal');
        const toggle = document.querySelector('.menu-toggle');
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnToggle = toggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

// Carregar header quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadHeader);