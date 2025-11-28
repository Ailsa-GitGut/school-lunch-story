// Kids English Go Go Go - Interactive Features

// Global variable to store available voices
let availableVoices = [];

// Pronunciation system using Web Speech API
function pronounce(text) {
    // Show visual feedback first
    const originalText = text;
    console.log('🔊 Pronouncing:', originalText);
    
    // Create pronunciation popup
    showPronunciationPopup(originalText);
    
    // Try to use Web Speech API for actual pronunciation
    if ('speechSynthesis' in window) {
        // Stop any currently speaking text
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(originalText);
        utterance.rate = 0.5; // Much slower for kids to follow along
        utterance.pitch = 1.4; // Higher pitch for kid-like voice
        utterance.volume = 1.0; // Full volume
        utterance.lang = 'en-US'; // Explicitly set language
        
        // Use available voices if loaded - prioritize kid-friendly voices
        if (availableVoices.length > 0) {
            // First priority: Kid/child voices
            let englishVoice = availableVoices.find(voice => 
                voice.lang.startsWith('en') && 
                (voice.name.toLowerCase().includes('child') || 
                 voice.name.toLowerCase().includes('kid') ||
                 voice.name.toLowerCase().includes('young'))
            );
            
            // Second priority: Female voices (usually higher pitched, more kid-friendly)
            if (!englishVoice) {
                englishVoice = availableVoices.find(voice => 
                    voice.lang.startsWith('en') && 
                    (voice.name.toLowerCase().includes('female') ||
                     voice.name.toLowerCase().includes('zira') ||
                     voice.name.toLowerCase().includes('susan') ||
                     voice.name.toLowerCase().includes('aria'))
                );
            }
            
            // Third priority: Any good English voice
            if (!englishVoice) {
                englishVoice = availableVoices.find(voice => 
                    voice.lang.startsWith('en') && 
                    (voice.name.includes('Google') || voice.name.includes('Microsoft'))
                );
            }
            
            // Last resort: Any English voice
            if (!englishVoice) {
                englishVoice = availableVoices.find(voice => voice.lang.startsWith('en'));
            }
            
            if (englishVoice) {
                utterance.voice = englishVoice;
                console.log('🎵 Using voice for kid:', englishVoice.name);
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
    
    // Add animation styles if not exists
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
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(popup);
    
    // Remove popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
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

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 Kids English Go Go Go is ready!');
    
    // Load voices for speech synthesis
    loadVoices();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click sound effect (visual feedback)
    const buttons = document.querySelectorAll('.lesson-btn, .print-btn, .nav-card');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a brief animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Print functions for different materials
function printColoringPages() {
    alert('🎨 Coloring pages are coming soon! Ask mom or dad to help print them!');
    console.log('Printing coloring pages...');
}

function printFlashcards() {
    alert('📝 Word flashcards are coming soon! These will be so much fun!');
    console.log('Printing flashcards...');
}

function printMatchingGame() {
    alert('🧩 Matching game is coming soon! You will love this game!');
    console.log('Printing matching game...');
}

function printProgressChart() {
    alert('⭐ Progress chart is coming soon! Track all your amazing learning!');
    console.log('Printing progress chart...');
}

// Word bank interaction
function markWordAsLearned(wordElement) {
    if (wordElement.classList.contains('new')) {
        wordElement.classList.remove('new');
        wordElement.classList.add('known');
        console.log('Word learned:', wordElement.textContent);
    }
}

// Add celebration animation when lessons are completed
function celebrateCompletion() {
    // This would add confetti or other celebration effects
    console.log('🎉 Lesson completed! Great job!');
}

// Initialize word interactions
document.addEventListener('DOMContentLoaded', function() {
    const wordTags = document.querySelectorAll('.word-tag');
    wordTags.forEach(tag => {
        tag.addEventListener('click', function() {
            if (this.classList.contains('new')) {
                const userConfirmed = confirm('Did you learn this word? Click OK if you know it now!');
                if (userConfirmed) {
                    markWordAsLearned(this);
                }
            }
        });
    });
});