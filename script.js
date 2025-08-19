// Liste des vidéos
const videoSources = [
    'videos/v.mp4',
    'videos/v1.mp4',
    'videos/v2.mp4',
    'videos/v3.mp4',
    'videos/v4.mp4',
    'videos/v5.mp4',
    'videos/v6.mp4'
];

let currentVideoIndex = 0;

// Fonction simple pour changer de vidéo
function showVideo(videoSrc) {
    const mainVideo = document.querySelector('.main-video');
    if (mainVideo) {
        mainVideo.src = videoSrc;
        mainVideo.load(); // Recharger la vidéo
    }
}

// Navigation avec les boutons
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    showVideo(videoSources[currentVideoIndex]);
}

function previousVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    showVideo(videoSources[currentVideoIndex]);
}

// Variables globales du slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoPlayInterval = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
	initializeSlider();
	initializeMobileNav();
	initializeSmoothScrolling();
	// initializeScrollAnimations(); // DÉSACTIVÉ - cause le problème de disparition
	initializeFormHandling();
	initializePackSelection();
});

// Initialisation du slider vidéo
function initializeSlider() {
	if (slides.length === 0) return;
	
	// Afficher la première slide
	showSlide(0);
	
	// Ajouter les événements d'interaction (autoplay désactivé)
	addSliderInteractionEvents();
	
	console.log('Slider initialisé avec', slides.length, 'slides');
}

// Fonction pour démarrer l'auto-play (désactivée)
function startAutoPlay() {}

// Fonction pour arrêter l'auto-play (désactivée)
function stopAutoPlay() {}

// Fonction pour redémarrer l'auto-play (désactivée)
function restartAutoPlay() {}

// Fonction pour changer de slide
function changeSlide(direction) {
	currentSlide += direction;
	
	if (currentSlide >= slides.length) {
		currentSlide = 0;
	} else if (currentSlide < 0) {
		currentSlide = slides.length - 1;
	}
	
	showSlide(currentSlide);
}

// Fonction pour afficher une slide spécifique
function showSlide(slideIndex) {
	const sliderTrack = document.querySelector('.slider-track');
	if (!sliderTrack) return;
	
	// Chaque slide occupe 100% de largeur
	const translateX = -(slideIndex * 100);
	sliderTrack.style.transform = `translateX(${translateX}%)`;
	
	// Mettre à jour les dots
	if (dots && dots.length > 0) {
		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === slideIndex);
		});
	}
	
	currentSlide = slideIndex;
}

// Fonction pour aller à une slide spécifique
function goToSlide(slideIndex) {
	showSlide(slideIndex);
}

// Fonction pour aller à la slide suivante
function nextSlide() {
	changeSlide(1);
}

// Fonction pour aller à la slide précédente
function prevSlide() {
	changeSlide(-1);
}

// Fonction pour ajouter les événements d'interaction du slider
function addSliderInteractionEvents() {
	// Interaction basique, pas d'autoplay
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');
	
	if (prevBtn) {
		prevBtn.addEventListener('click', () => prevSlide());
	}
	
	if (nextBtn) {
		nextBtn.addEventListener('click', () => nextSlide());
	}
	
	// Clic sur les dots
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => goToSlide(index));
	});
	
	// Navigation au clavier
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			prevSlide();
		} else if (e.key === 'ArrowRight') {
			nextSlide();
		}
	});
}

// Mobile Navigation
function initializeMobileNav() {
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');
	
	if (hamburger && navMenu) {
		hamburger.addEventListener('click', function() {
			hamburger.classList.toggle('active');
			navMenu.classList.toggle('active');
		});
		
		// Close menu when clicking on a link
		const navLinks = document.querySelectorAll('.nav-link');
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('active');
				navMenu.classList.remove('active');
			});
		});
		
		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
				hamburger.classList.remove('active');
				navMenu.classList.remove('active');
			}
		});
	}
}

// Défilement fluide
function initializeSmoothScrolling() {
	const navLinks = document.querySelectorAll('a[href^="#"]');
	
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			const targetId = this.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			
			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 80; // Ajuster pour la navbar fixe
				
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});
}

// Animations au scroll - DÉSACTIVÉES pour éviter le problème de disparition
function initializeScrollAnimations() {
	// Cette fonction est désactivée car elle causait le problème de disparition du contenu
	console.log('Scroll animations désactivées pour éviter le problème de disparition');
	
	// Si vous voulez réactiver les animations plus tard, décommentez le code ci-dessous
	/*
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate');
			}
		});
	}, observerOptions);
	
	const animatedElements = document.querySelectorAll('.scroll-animate');
	animatedElements.forEach(el => observer.observe(el));
	
	const sections = document.querySelectorAll('section');
	sections.forEach(section => {
		section.classList.add('scroll-animate');
	});
	*/
}

// Gestion du formulaire
function initializeFormHandling() {
	const contactForm = document.getElementById('contactForm');
	
	if (!contactForm) return;
	
	contactForm.addEventListener('submit', function(e) {
		e.preventDefault();
		
		// Récupérer les données du formulaire
		const formData = new FormData(this);
		const data = Object.fromEntries(formData);
		
		// Validation basique
		if (validateForm(data)) {
			// Simuler l'envoi du formulaire
			showFormSuccess();
			
			// Réinitialiser le formulaire
			this.reset();
			
			// Rediriger vers WhatsApp avec les informations
			const whatsappMessage = formatWhatsAppMessage(data);
			const whatsappUrl = `https://wa.me/212706553642?text=${encodeURIComponent(whatsappMessage)}`;
			window.open(whatsappUrl, '_blank');
		}
	});
}

// Validation du formulaire
function validateForm(data) {
	const requiredFields = ['nom', 'prenom', 'telephone', 'email', 'specialite', 'pack'];
	
	for (const field of requiredFields) {
		if (!data[field] || data[field].trim() === '') {
			showFormError(`Le champ ${field} est requis`);
			return false;
		}
	}
	
	// Validation email basique
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(data.email)) {
		showFormError('Veuillez entrer une adresse email valide');
		return false;
	}
	
	return true;
}

// Formatage du message WhatsApp
function formatWhatsAppMessage(data) {
	return `Bonjour ! Je suis intéressé(e) par vos services de marketing médical.

*Informations personnelles :*
- Nom : ${data.nom}
- Prénom : ${data.prenom}
- Téléphone : ${data.telephone}
- Email : ${data.email}
- Spécialité : ${data.specialite}

*Pack souhaité :* ${data.pack}

Je souhaite recevoir plus d'informations et un audit gratuit.`;
}

// Affichage des messages de succès/erreur
function showFormSuccess() {
	const submitBtn = document.querySelector('.submit-btn');
	const originalText = submitBtn.innerHTML;
	
	submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
	submitBtn.style.background = '#28a745';
	
	setTimeout(() => {
		submitBtn.innerHTML = originalText;
		submitBtn.style.background = '';
	}, 3000);
}

function showFormError(message) {
	// Créer une notification d'erreur
	const errorDiv = document.createElement('div');
	errorDiv.className = 'form-error';
	errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
	errorDiv.style.cssText = `
		background: #dc3545;
		color: white;
		padding: 1rem;
		border-radius: 10px;
		margin-top: 1rem;
		text-align: center;
		font-weight: 600;
	`;
	
	const form = document.getElementById('contactForm');
	form.appendChild(errorDiv);
	
	// Supprimer l'erreur après 5 secondes
	setTimeout(() => {
		errorDiv.remove();
	}, 5000);
}

// Gestion de la sélection des packs
function initializePackSelection() {
	const packButtons = document.querySelectorAll('.pack-btn');
	
	packButtons.forEach(button => {
		button.addEventListener('click', function() {
			const packName = this.textContent.includes('Gold') ? 'Gold' : 'Platinum';
			
			// Mettre à jour le formulaire
			const packSelect = document.getElementById('pack');
			if (packSelect) {
				packSelect.value = packName;
				
				// Faire défiler vers le formulaire
				const contactSection = document.getElementById('contact');
				if (contactSection) {
					contactSection.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	});
}

// Fonctions de navigation
function scrollToContact() {
	const contactSection = document.getElementById('contact');
	if (contactSection) {
		contactSection.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToPacks() {
	const packsSection = document.getElementById('packs');
	if (packsSection) {
		packsSection.scrollIntoView({ behavior: 'smooth' });
	}
}

// Sélection de pack
function selectPack(packType) {
	const packSelect = document.getElementById('pack');
	if (packSelect) {
		packSelect.value = packType;
		scrollToContact();
	}
}

// Effet de parallaxe sur le scroll - DÉSACTIVÉ
window.addEventListener('scroll', function() {
	// Désactivé pour éviter les problèmes de performance
	/*
	const scrolled = window.pageYOffset;
	const parallaxElements = document.querySelectorAll('.hero::before');
	
	parallaxElements.forEach(element => {
		const speed = 0.5;
		element.style.transform = `translateY(${scrolled * speed}px)`;
	});
	*/
});

// Animation de la navbar au scroll
window.addEventListener('scroll', function() {
	const navbar = document.querySelector('.navbar');
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(255, 255, 255, 0.98)';
		navbar.style.boxShadow = '0 5px 20px rgba(0, 119, 182, 0.15)';
	} else {
		navbar.style.background = 'rgba(255, 255, 255, 0.95)';
		navbar.style.boxShadow = '0 10px 30px rgba(0, 119, 182, 0.1)';
	}
});

// Lazy loading des images
document.addEventListener('DOMContentLoaded', function initializeLazyLoading() {
	const images = document.querySelectorAll('img[data-src]');
	
	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove('lazy');
				imageObserver.unobserve(img);
			}
		});
	});
	
	images.forEach(img => imageObserver.observe(img));
});

// Gestion des erreurs de chargement des vidéos
document.addEventListener('DOMContentLoaded', function() {
	const videos = document.querySelectorAll('video');
	
	videos.forEach(video => {
		// Gérer les erreurs de chargement
		video.addEventListener('error', function() {
			console.error('Erreur de chargement de la vidéo:', video.src);
			// Afficher un message d'erreur sur la vidéo
			video.style.background = '#f8f9fa';
			video.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #6c757d; font-weight: 500;">⚠️ Vidéo non disponible</div>';
		});
		
		// Gérer le chargement des métadonnées
		video.addEventListener('loadedmetadata', function() {
			console.log('Métadonnées chargées pour:', video.src);
		});
		
		// Gérer le début de la lecture
		video.addEventListener('play', function() {
			console.log('Lecture démarrée pour:', video.src);
		});
		
		// Gérer les problèmes de format
		video.addEventListener('canplay', function() {
			console.log('Vidéo prête à être lue:', video.src);
		});
		
		// Gérer les erreurs de format
		video.addEventListener('stalled', function() {
			console.warn('Vidéo en attente:', video.src);
		});
	});
});

// Amélioration de l'accessibilité
document.addEventListener('DOMContentLoaded', function() {
	// Ajouter des attributs ARIA aux boutons du slider
	const prevBtn = document.querySelector('.prev-btn');
	const nextBtn = document.querySelector('.next-btn');
	
	if (prevBtn) prevBtn.setAttribute('aria-label', 'Vidéo précédente');
	if (nextBtn) nextBtn.setAttribute('aria-label', 'Vidéo suivante');
	
	// Ajouter des attributs ARIA aux dots
	dots.forEach((dot, index) => {
		dot.setAttribute('aria-label', `Aller à la vidéo ${index + 1}`);
	});
});

// Gestion du clavier pour le slider
document.addEventListener('keydown', function(e) {
	if (e.key === 'ArrowLeft') {
		changeSlide(-1);
	} else if (e.key === 'ArrowRight') {
		changeSlide(1);
	}
});

// Préchargement léger des vidéos
document.addEventListener('DOMContentLoaded', function preloadVideos() {
	['videos/v.mp4', 'videos/v1.mp4', 'videos/v2.mp4'].forEach(src => {
		const video = document.createElement('video');
		video.preload = 'metadata';
		video.src = src;
	});
});


