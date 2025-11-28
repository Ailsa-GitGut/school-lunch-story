// Lesson Script with Pronunciation Features
// Kids English Go Go Go

// Initialize lesson system
let currentPage = 1;
const totalPages = 4;

// Global variable to store available voices
let availableVoices = [];

// Pronunciation system using Web Speech API
function pronounce(text) {
    // Show visual feedback first
    const originalText = text;
    
    // Create pronunciation popup
    showPronunciationPopup(originalText);
    
    // Try to use Web Speech API for actual pronunciation
    if ('speechSynthesis' in window) {
        // Stop any currently speaking text
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(originalText);
        utterance.rate = 0.8; // Slower for kids
        utterance.pitch = 1.0; // Normal pitch
        utterance.volume = 1.0; // Full volume
        utterance.lang = 'en-US'; // Explicitly set language
        
        // Use available voices if loaded
        if (availableVoices.length > 0) {
            const englishVoice = availableVoices.find(voice => 
                voice.lang.startsWith('en') && 
                (voice.name.includes('Female') || voice.name.includes('Google') || voice.name.includes('Microsoft'))
            ) || availableVoices.find(voice => voice.lang.startsWith('en'));
            
            if (englishVoice) {
                utterance.voice = englishVoice;
                console.log('Using voice:', englishVoice.name);
            }
        }
        
        // Add event listeners for debugging
        utterance.onstart = () => console.log('Speech started:', originalText);
        utterance.onend = () => console.log('Speech ended');
        utterance.onerror = (event) => console.log('Speech error:', event.error);
        
        // Speak the text
        setTimeout(() => {
            speechSynthesis.speak(utterance);
        }, 100); // Small delay to ensure voices are loaded
        
    } else {
        // Fallback: just show the pronunciation guide
        console.log('Speech synthesis not supported, showing visual guide only');
        alert(`🔊 Say: "${originalText}"`);
    }
}

// Show pronunciation popup
function showPronunciationPopup(text) {
    // Remove any existing popups
    const existingPopup = document.querySelector('.pronunciation-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create new popup
    const popup = document.createElement('div');
    popup.className = 'pronunciation-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-text">🔊 "${text}"</div>
            <div class="popup-phonetic">Listen and repeat!</div>
        </div>
    `;
    
    // Add styles
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        animation: popupAppear 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add animation keyframe if not exists
    if (!document.querySelector('#popup-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'popup-styles';
        styleSheet.textContent = `
            @keyframes popupAppear {
                from { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.5); 
                }
                to { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1); 
                }
            }
            .pronunciation-popup .popup-content {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .pronunciation-popup .popup-text {
                font-size: 20px;
            }
            .pronunciation-popup .popup-phonetic {
                font-size: 14px;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(popup);
    
    // Remove popup after 2 seconds
    setTimeout(() => {
        popup.style.animation = 'popupAppear 0.3s ease-out reverse';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 2000);
}

// Page navigation
function nextPage() {
    const currentPageElement = document.querySelector('.lesson-page.active');
    const nextPageElement = document.querySelector(`#page${currentPage + 1}`);
    
    if (nextPageElement) {
        currentPageElement.classList.remove('active');
        nextPageElement.classList.add('active');
        currentPage++;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Add celebration for final page
        if (currentPage === totalPages) {
            setTimeout(() => {
                showCelebration();
            }, 500);
        }
    }
}

function previousPage() {
    const currentPageElement = document.querySelector('.lesson-page.active');
    const prevPageElement = document.querySelector(`#page${currentPage - 1}`);
    
    if (prevPageElement && currentPage > 1) {
        currentPageElement.classList.remove('active');
        prevPageElement.classList.add('active');
        currentPage--;
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Celebration animation
function showCelebration() {
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 Great Job! 🌟';
    celebration.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #f093fb, #f5576c);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        animation: celebrationBounce 2s ease-in-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Add celebration animation
    if (!document.querySelector('#celebration-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'celebration-styles';
        styleSheet.textContent = `
            @keyframes celebrationBounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 3000);
}

// Load voices for speech synthesis
function loadVoices() {
    if ('speechSynthesis' in window) {
        availableVoices = speechSynthesis.getVoices();
        console.log('Loaded voices:', availableVoices.map(v => v.name));
        
        // If no voices loaded yet, try again after a delay
        if (availableVoices.length === 0) {
            setTimeout(loadVoices, 100);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Lesson system initialized!');
    
    // Load voices for speech synthesis
    loadVoices();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousPage();
        }
    });
    
    // Add click handlers for pronunciation icons
    document.querySelectorAll('.pronunciation-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const word = this.parentElement.textContent.replace('🔊', '').trim();
            pronounce(word);
        });
    });
    
    // Add hover effects for interactive elements
    document.querySelectorAll('.word, .sentence-button, .practice-sentence').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Utility functions
function playSuccessSound() {
    // Visual feedback for success
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(76, 217, 100, 0.3);
        z-index: 9999;
        pointer-events: none;
        animation: successFlash 0.5s ease-out;
    `;
    
    const flashStyles = document.createElement('style');
    flashStyles.textContent = `
        @keyframes successFlash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(flashStyles);
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
        flashStyles.remove();
    }, 500);
}

// Export functions for use in HTML
window.pronounce = pronounce;
window.nextPage = nextPage;
window.previousPage = previousPage;
window.playSuccessSound = playSuccessSound;