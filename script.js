// JavaScript para funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
    // Dados dos produtos
    const products = [
        {
            name: "ração premium para cães",
            title: "Ração Premium para Cães",
            description: "Ração super premium para cães adultos de todas as raças",
            price: "R$ 149,90",
            image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "ração",
            link: "#produto1"
        },
        {
            name: "brinquedo para gatos",
            title: "Brinquedo para Gatos",
            description: "Brinquedo interativo com penas para entreter seu felino",
            price: "R$ 39,90",
            image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "brinquedo",
            link: "#produto2"
        },
        {
            name: "coleira antipulgas",
            title: "Coleira Antipulgas",
            description: "Coleira com proteção contra pulgas e carrapatos por 8 meses",
            price: "R$ 89,90",
            image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "acessório",
            link: "#produto3"
        },
        {
            name: "petisco natural",
            title: "Petisco Natural",
            description: "Petisco 100% natural sem conservantes para cães",
            price: "R$ 24,90",
            image: "https://images.unsplash.com/photo-1550256076-d020098335b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "petisco",
            link: "#produto4"
        }
    ];

    // Elementos da busca
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');
    const productsGrid = document.getElementById('productsGrid');

    // Função para buscar produtos
    function searchProducts(query) {
        const lowerQuery = query.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) || 
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }

    // Função para exibir resultados da busca
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Nenhum produto encontrado</div>';
        } else {
            results.slice(0, 5).forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <small>${product.price}</small>
                `;
                resultItem.addEventListener('click', () => {
                    window.location.href = product.link;
                });
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('show');
    }

    // Função para filtrar produtos na grade
    function filterProducts(query) {
        const lowerQuery = query.toLowerCase();
        const productElements = document.querySelectorAll('.featured-item');
        
        productElements.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            const description = item.getAttribute('data-description').toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            
            if (name.includes(lowerQuery) || description.includes(lowerQuery) || category.includes(lowerQuery)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Evento de input na busca
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length > 0) {
            const results = searchProducts(query);
            displaySearchResults(results);
        } else {
            searchResults.classList.remove('show');
            // Mostrar todos os produtos novamente
            document.querySelectorAll('.featured-item').forEach(item => {
                item.style.display = 'block';
            });
        }
    });

    // Evento de clique no botão de busca
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query.length > 0) {
            filterProducts(query);
            // Rolagem até a seção de produtos
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Fechar resultados ao clicar fora
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    // Efeito smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('search-result-item') && 
            anchor.getAttribute('href') !== '#login' && 
            anchor.getAttribute('href') !== '#carrinho' &&
            anchor.getAttribute('href') !== '#produto1' &&
            anchor.getAttribute('href') !== '#produto2' &&
            anchor.getAttribute('href') !== '#produto3' &&
            anchor.getAttribute('href') !== '#produto4' &&
            anchor.getAttribute('href') !== '#agendar-banho' &&
            anchor.getAttribute('href') !== '#agendar-consulta' &&
            anchor.getAttribute('href') !== '#reservar-hotel' &&
            anchor.getAttribute('href') !== '#equipe' &&
            anchor.getAttribute('href') !== '#politica-privacidade' &&
            anchor.getAttribute('href') !== '#termos-uso') {
            
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    history.pushState(null, null, targetId);
                }
            });
        }
    });
    
    // Simulação de carrinho de compras
    const cartBtn = document.querySelector('.fa-shopping-cart').parentElement;
    let cartCount = 0;
    
    // Adicionar ao carrinho
    document.querySelectorAll('.featured-item .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> (${cartCount})`;
            
            // Animação
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 300);
            
            // Modal de confirmação (simplificado)
            alert('Produto adicionado ao carrinho! Acesse o carrinho para finalizar sua compra.');
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if(email && email.includes('@') && email.includes('.')) {
            // Simulação de envio
            alert('Obrigado por assinar nossa newsletter! Em breve você receberá nossas novidades no e-mail: ' + email);
            this.querySelector('input').value = '';
        } else {
            alert('Por favor, insira um e-mail válido.');
        }
    });

    // Sistema de Login Simulado
const loginBtn = document.querySelector('.fa-user').parentElement;
let usuarioLogado = null;

// Modal de Login (simulação)
function mostrarModalLogin() {
const modalHTML = `
<div class="modal-login" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
">
    <div style="
        background: white;
        padding: 30px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
    ">
        <h2 style="color: #3687FF; margin-bottom: 20px;">Login</h2>
        
        ${!usuarioLogado ? `
            <form id="formLogin">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">E-mail</label>
                    <input type="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px;">Senha</label>
                    <input type="password" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <button type="submit" style="
                    background: #3687FF;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                ">Entrar</button>
            </form>
            <p style="text-align: center; margin-top: 15px;">
                Não tem conta? <a href="#cadastro" style="color: #3687FF;">Cadastre-se</a>
            </p>
        ` : `
            <div style="text-align: center;">
                <p style="margin-bottom: 20px;">Você está logado como <strong>${usuarioLogado.nome}</strong></p>
                <button id="btnLogout" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                ">Sair</button>
            </div>
        `}
        
        <button id="fecharModal" style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        ">×</button>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

// Fechar modal
document.getElementById('fecharModal').addEventListener('click', () => {
document.querySelector('.modal-login').remove();
});

// Submeter formulário
if(!usuarioLogado) {
document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulação de login bem-sucedido
    usuarioLogado = {
        nome: "Cliente Exemplo",
        email: "cliente@exemplo.com"
    };
    
    // Atualizar ícone de usuário
    loginBtn.innerHTML = `<i class="fas fa-user"></i> Olá, ${usuarioLogado.nome.split(' ')[0]}`;
    
    // Fechar modal
    document.querySelector('.modal-login').remove();
    
    // Mostrar mensagem de boas-vindas
    alert(`Bem-vindo(a) de volta, ${usuarioLogado.nome}!`);
});
} else {
document.getElementById('btnLogout').addEventListener('click', () => {
    usuarioLogado = null;
    loginBtn.innerHTML = '<i class="fas fa-user"></i>';
    document.querySelector('.modal-login').remove();
    alert('Você saiu da sua conta.');
});
}
}

// Evento de clique no ícone de login
loginBtn.addEventListener('click', function(e) {
e.preventDefault();
mostrarModalLogin();
});

    
    // Links de agendamento
    document.querySelectorAll('[href="#agendar-banho"], [href="#agendar-consulta"], [href="#reservar-hotel"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.closest('.service-item').querySelector('h3').textContent;
            alert(`Você será redirecionado para agendar: ${service} (Simulação)`);
        });
    });
});