// DOM Elements
const cover = document.getElementById('cover');
const mainContent = document.querySelector('.main-content');
const openInvitationBtn = document.querySelector('.open-invitation');
const guestNameElement = document.getElementById('guestName');
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
const navbar = document.querySelector('.navbar');
const rsvpForm = document.getElementById('rsvp-form');
const wishesForm = document.getElementById('wishes-form');
const wishesList = document.getElementById('wishes-list');
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};
const copyBtns = document.querySelectorAll('.copy-btn');

// Event Date
const weddingDate = new Date('December 25, 2025 08:00:00').getTime();

// Get guest name from URL query parameter
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    
    if (name) {
        guestNameElement.textContent = decodeURIComponent(name);
    }
}

// Open Invitation
function openInvitation() {
    // Hide cover completely
    cover.style.display = 'none';
    cover.classList.remove('active');
    
    // Show main content
    mainContent.style.display = 'block';
    
    // Activate intro section immediately
    const introSection = document.getElementById('intro');
    introSection.classList.add('active');
    
    // Show navbar
    navbar.classList.add('visible');
    
    // Scroll to intro section
    setTimeout(() => {
        window.scrollTo({
            top: introSection.offsetTop,
            behavior: 'smooth'
        });
    }, 100);
    
    // Start playing music if allowed
    playMusic();
}

// Audio Controls
function playMusic() {
    bgMusic.play()
        .then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Audio playback failed:', error);
        });
}

function toggleMusic() {
    if (bgMusic.paused) {
        playMusic();
    } else {
        bgMusic.pause();
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    }
}

// Scroll Animation
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Ensure navbar stays visible after opening the invitation
    if (mainContent.style.display === 'block') {
        navbar.classList.add('visible');
    }
    
    sections.forEach(section => {
        if (section.id === 'cover') return;
        
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            section.classList.add('active');
            
            // Update active nav item
            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === `#${section.id}`) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// Countdown
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    
    if (timeLeft <= 0) {
        countdownElements.days.textContent = '00';
        countdownElements.hours.textContent = '00';
        countdownElements.minutes.textContent = '00';
        countdownElements.seconds.textContent = '00';
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    countdownElements.days.textContent = days < 10 ? `0${days}` : days;
    countdownElements.hours.textContent = hours < 10 ? `0${hours}` : hours;
    countdownElements.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    countdownElements.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// RSVP Form
function handleRSVP(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value;
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show an alert
    alert(`Terima kasih ${name} atas konfirmasi kehadirannya!`);
    
    // Clear form
    event.target.reset();
}

// Wishes Form
function handleWishes(event) {
    event.preventDefault();
    
    const name = document.getElementById('sender-name').value;
    const message = document.getElementById('message').value;
    
    if (!name || !message) return;
    
    // Add wish to the list
    addWish(name, message);
    
    // Clear form
    event.target.reset();
}

function addWish(name, message) {
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    
    // Create wish element
    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.innerHTML = `
        <div class="wish-header">
            <span class="wish-name">${name}</span>
            <span class="wish-time">${dateString} ${timeString}</span>
        </div>
        <p class="wish-message">${message}</p>
    `;
    
    // Add to list
    wishesList.prepend(wishItem);
    
    // In a real application, you would save this to a database
}

// Copy account number
function copyAccountNumber() {
    const accountNumber = this.getAttribute('data-clipboard-text');
    
    navigator.clipboard.writeText(accountNumber)
        .then(() => {
            // Change button text temporarily
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Tersalin';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

// Add demo wishes
function addDemoWishes() {
    const demoWishes = [
        {
            name: 'Pak Haji Somad',
            message: 'Selamat atas pernikahan Asep & Neng. Semoga Allah selalu memberikan keberkahan dan kebahagiaan dalam rumah tangga kalian. Aamiin.'
        },
        {
            name: 'Keluarga Besar Sukamaju',
            message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.'
        },
        {
            name: 'Teman-teman Kampus',
            message: 'Akhirnya kalian bersatu juga! Kami semua turut bahagia. Jangan lupa bagi-bagi resepnya ya gimana caranya awet sampai pelaminan 😄'
        }
    ];
    
    demoWishes.forEach(wish => {
        addWish(wish.name, wish.message);
    });
}

// Smooth scroll for navbar links
function setupSmoothScroll() {
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Ensure navbar stays visible
            navbar.classList.add('visible');
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize
function init() {
    // Get guest name from URL
    getGuestName();
    
    // Event listeners
    openInvitationBtn.addEventListener('click', openInvitation);
    playPauseBtn.addEventListener('click', toggleMusic);
    window.addEventListener('scroll', handleScroll);
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVP);
    }
    
    if (wishesForm) {
        wishesForm.addEventListener('submit', handleWishes);
    }
    
    // Setup copy buttons
    copyBtns.forEach(btn => {
        btn.addEventListener('click', copyAccountNumber);
    });
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Add demo wishes
    addDemoWishes();
    
    // Setup smooth scroll
    setupSmoothScroll();
    
    // Check if there's a direct link with section hash
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            openInvitation();
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }, 800);
        }
    }
    
    // Hide navbar initially
    navbar.classList.remove('visible');
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init); 