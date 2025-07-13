document.addEventListener('DOMContentLoaded', function() {
    // --- Database ---
    const productsDB = [
        { id: 1, name: 'Audífonos TWS', price: '49.900', imageUrl: 'img/auriculares.jpg', category: 'Gadgets', description: 'Experimenta la libertad del sonido inalámbrico con cancelación de ruido activa, un ajuste perfecto y una calidad de audio inmersiva. Ideales para tu día a día.', specs: { 'Conectividad': 'Bluetooth 5.2', 'Batería': 'Hasta 4.5 horas', 'Estuche': '24 horas extra', 'Resistencia': 'IPX4' }, thumbnails: ['img/auriculares.jpg', 'https://placehold.co/100x100/f5f5f7/1d1d1f?text=Vista+2', 'https://placehold.co/100x100/f5f5f7/1d1d1f?text=Estuche'] },
        { id: 2, name: 'Smart Plug Wi-Fi', price: '69.900', imageUrl: 'img/samrt-wifi.jpg', category: 'Domótica', description: 'Convierte cualquier dispositivo en inteligente. Contrólalo desde tu celular o con comandos de voz.', specs: { 'Compatibilidad': 'Google Assistant, Alexa', 'Voltaje': '100-240V', 'App': 'Smart Life' }, thumbnails: ['img/samrt-wifi.jpg'] },
        { id: 3, name: 'Lámpara LED Inteligente', price: '59.900', imageUrl: 'img/lampara.jpg', category: 'Domótica', description: 'Ilumina tus espacios con millones de colores. Ajusta la intensidad y crea ambientes únicos desde tu móvil.', specs: { 'Tipo': 'LED RGB', 'Conectividad': 'Wi-Fi', 'Vida útil': '25,000 horas' }, thumbnails: ['img/lampara.jpg'] },
        { id: 4, name: 'Cargador Rápido 30W', price: '59.900', imageUrl: 'https://www.pngmart.com/files/15/USB-C-Charger-PNG-Image.png', category: 'Gadgets', description: 'Carga tus dispositivos a máxima velocidad con este cargador compacto y potente de 30W.', specs: { 'Potencia': '30W', 'Puerto': 'USB-C', 'Tecnología': 'Power Delivery' }, thumbnails: ['https://www.pngmart.com/files/15/USB-C-Charger-PNG-Image.png'] },
        { id: 5, name: 'Mini Teclado Bluetooth', price: '79.900', imageUrl: 'https://www.pngmart.com/files/7/Mini-Keyboard-PNG-Transparent-Image.png', category: 'Gadgets', description: 'Controla tu Smart TV, PC o tablet con este mini teclado inalámbrico con touchpad integrado.', specs: { 'Conectividad': 'Bluetooth 3.0', 'Batería': 'Recargable Li-ion', 'Rango': '10 metros' }, thumbnails: ['https://www.pngmart.com/files/7/Mini-Keyboard-PNG-Transparent-Image.png'] },
        { id: 6, name: 'Tira LED Inteligente 5m', price: '99.900', imageUrl: 'https://www.pngmart.com/files/22/Smart-LED-Strip-PNG-Photo.png', category: 'Domótica', description: 'Decora y ambienta cualquier espacio con esta tira LED de 5 metros, controlable desde tu celular.', specs: { 'Longitud': '5 metros', 'Colores': 'RGB', 'Control': 'App móvil y control remoto' }, thumbnails: ['https://www.pngmart.com/files/22/Smart-LED-Strip-PNG-Photo.png'] },
        { id: 7, name: 'Aspiradora de Mano para Auto', price: '120.000', imageUrl: 'https://placehold.co/300x300/222/fff?text=Auto+Vacuum', category: 'Artilujos de Auto', description: 'Aspiradora portátil para mantener tu auto impecable.', specs: { 'Potencia': '120W', 'Batería': '2000mAh', 'Uso': 'Húmedo y Seco' }, thumbnails: ['https://placehold.co/300x300/222/fff?text=Auto+Vacuum'] },
        { id: 8, name: 'Curso de Marketing Digital', price: '250.000', imageUrl: 'https://placehold.co/300x300/333/fff?text=Curso+Mkt', category: 'Infoproductos', description: 'Aprende las estrategias clave para dominar el marketing digital y escalar tu negocio.', specs: { 'Formato': 'Online', 'Duración': '40 horas', 'Certificación': 'Sí' }, thumbnails: ['https://placehold.co/300x300/333/fff?text=Curso+Mkt'] }
    ];

    // --- Page Load Logic ---
    const page = window.location.pathname.split("/").pop();

    // Intro Screen Logic
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        setTimeout(() => {
            introScreen.classList.add('hidden'); // Añadir directamente la clase hidden
        }, 2000); // Ocultar después de 2 segundos (con la transición de 1s definida en CSS)
    }

    // Dynamic Text Logic
    const dynamicText = document.getElementById('dynamic-text');
    const phrases = [
        "Compra rápido y sin errores",
        "Innovación a tu alcance",
        "El futuro es ahora"
    ];
    let phraseIndex = 0;
    if (dynamicText) {
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            dynamicText.textContent = phrases[phraseIndex];
        }, 3000);
    }

    // Hamburger Menu Logic
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // Promo Popup Logic
    const promoPopup = document.getElementById('promo-popup');
    const closePopup = document.getElementById('close-popup');
    if (promoPopup && closePopup) {
        setTimeout(() => {
            promoPopup.classList.remove('hidden');
            promoPopup.classList.add('visible');
        }, 5000);

        closePopup.addEventListener('click', () => {
            promoPopup.classList.remove('visible');
        });
    }

    if (page === 'index.html' || page === '') {
        renderFeaturedProducts(); // Muestra los productos destacados al cargar la página de inicio
        initializeImmersiveSlider();
    } else if (page === 'product.html') {
        renderProductDetails();
    } else if (page === 'tienda.html') {
        renderShop();
    } else if (page === 'categorias.html') {
        renderCategoriesPage();
    }

    // --- Function Definitions ---

    function renderProductsToGrid(products, gridElement) {
        if (!gridElement) return;
        gridElement.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <a href="product.html?id=${product.id}" class="btn">Ver Detalles</a>
            `;
            gridElement.appendChild(productCard);
        });
    }

    function renderFeaturedProducts() {
        const featuredGrid = document.querySelector('.products-grid');
        renderProductsToGrid(productsDB.slice(0, 6), featuredGrid); // Muestra los primeros 6 como destacados
    }

    function renderShop() {
        const shopGrid = document.getElementById('shop-products-grid');
        renderProductsToGrid(productsDB, shopGrid); // Muestra todos los productos
    }

    function renderProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));
        const product = productsDB.find(p => p.id === productId);

        if (!product) {
            document.getElementById('product-title').textContent = 'Producto no encontrado';
            return;
        }

        // Populate main details
        document.title = `${product.name} - Tendencia Shop`;
        document.getElementById('main-product-image').src = product.imageUrl;
        document.getElementById('main-product-image').alt = product.name;
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description').textContent = product.description;

        // Populate tabs
        const descriptionTab = document.getElementById('descripcion-detallada');
        descriptionTab.innerHTML = `<h3>Descripción Detallada</h3><p>${product.description}</p>`;

        const specsTab = document.getElementById('especificaciones');
        let specsHTML = '<h3>Detalles Técnicos</h3><ul>';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHTML += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        specsHTML += '</ul>';
        specsTab.innerHTML = specsHTML;

        // Populate thumbnails
        const thumbnailContainer = document.getElementById('thumbnail-images');
        thumbnailContainer.innerHTML = '';
        product.thumbnails.forEach((thumbUrl, index) => {
            const thumb = document.createElement('img');
            thumb.src = thumbUrl;
            thumb.alt = `Miniatura ${index + 1}`;
            thumb.className = 'thumbnail';
            if (index === 0) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                document.getElementById('main-product-image').src = thumbUrl;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbnailContainer.appendChild(thumb);
        });

        // Update WhatsApp button
        const whatsappButton = document.getElementById('whatsapp-button');
        const message = `Hola, estoy interesado en comprar: ${product.name}`;
        whatsappButton.href = `https://wa.me/573000000000?text=${encodeURIComponent(message)}`;
    }

    function initializeImmersiveSlider() {
        const sliderContainer = document.querySelector('.immersive-slider-container');
        const sliderWrapper = document.querySelector('.immersive-slider-wrapper');
        let slides = Array.from(document.querySelectorAll('.immersive-slide')); // Convert NodeList to Array
        const prevBtn = document.querySelector('.immersive-slider-btn.prev');
        const nextBtn = document.querySelector('.immersive-slider-btn.next');
        const dotsContainer = document.querySelector('.immersive-slider-dots');

        if (sliderContainer && sliderWrapper && slides.length > 0) {
            // Clone first and last slides for infinite loop effect
            const firstSlideClone = slides[0].cloneNode(true);
            const lastSlideClone = slides[slides.length - 1].cloneNode(true);

            sliderWrapper.appendChild(firstSlideClone);
            sliderWrapper.prepend(lastSlideClone);

            // Update slides NodeList to include cloned slides
            slides = Array.from(document.querySelectorAll('.immersive-slide'));
            const totalSlides = slides.length; // Now includes clones

            let currentIndex = 1; // Start at the first original slide (after the prepended clone)
            let autoSlideInterval;

            // Initialize dots for original slides only
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slides.length - 2; i++) { // Exclude cloned slides from dots
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    goToSlide(i + 1); // Adjust index for original slides
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
            const dots = document.querySelectorAll('.immersive-slider-dots .dot');

            function updateSlider(newIndex, smooth = true) {
                sliderWrapper.style.transition = smooth ? 'transform 1s cubic-bezier(0.86, 0, 0.07, 1)' : 'none';
                sliderWrapper.style.transform = `translateX(-${newIndex * 100}%)`;
                currentIndex = newIndex;

                // Update active dot
                dots.forEach((dot, index) => {
                    dot.classList.toggle('is-active', index === (currentIndex - 1)); // Adjust for cloned slide
                });
            }

            function goToSlide(index) {
                updateSlider(index);
            }

            function nextSlide() {
                if (currentIndex >= totalSlides - 1) { // If at the last clone (first original)
                    updateSlider(currentIndex + 1); // Move to the cloned first slide
                    setTimeout(() => {
                        updateSlider(1, false); // Instantly jump to the real first slide
                    }, 1000); // Match transition duration
                } else {
                    updateSlider(currentIndex + 1);
                }
            }

            function prevSlide() {
                if (currentIndex <= 0) { // If at the first clone (last original)
                    updateSlider(currentIndex - 1); // Move to the cloned last slide
                    setTimeout(() => {
                        updateSlider(totalSlides - 2, false); // Instantly jump to the real last slide
                    }, 1000); // Match transition duration
                } else {
                    updateSlider(currentIndex - 1);
                }
            }

            function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 7000); }
            function stopAutoSlide() { clearInterval(autoSlideInterval); }
            function resetAutoSlide() { stopAutoSlide(); startAutoSlide(); }

            nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);

            // Handle transition end for seamless looping
            sliderWrapper.addEventListener('transitionend', () => {
                if (currentIndex === totalSlides - 1) { // If we just transitioned to the first clone
                    updateSlider(1, false); // Jump to the real first slide
                } else if (currentIndex === 0) { // If we just transitioned to the last clone
                    updateSlider(totalSlides - 2, false); // Jump to the real last slide
                }
            });

            updateSlider(currentIndex, false); // Initial positioning without transition
            startAutoSlide();
        }
    }
});
