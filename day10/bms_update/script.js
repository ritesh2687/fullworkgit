document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const noResultsContainer = document.getElementById('no-results-container');

    const cards = document.querySelectorAll('.card');
    const cardSections = document.querySelectorAll('.card-section');

    // Banners and sections to hide during active search
    const bannersToToggle = document.querySelectorAll('.slider, .banner_2, .banner-middle');
    const liveEventsHeader = document.querySelector('.section-header_2');
    const liveEventsSection = document.querySelector('.card-section_2');

    // 1. Store original title for each card to restore later
    cards.forEach(card => {
        const titleElement = card.querySelector('.movie-title');
        if (titleElement) {
            card.dataset.originalTitle = titleElement.textContent;
        }
    });

    // Helper to highlight matching words in title
    function highlightTitle(titleText, queryWords) {
        if (!queryWords || queryWords.length === 0) return titleText;

        // Escape special characters to construct a safe RegExp
        const escapedWords = queryWords.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');

        return titleText.replace(regex, '<mark class="highlight">$1</mark>');
    }

    // Main search function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        // If query is empty, reset all and show everything
        if (query === '') {
            // Restore original titles (remove highlights)
            cards.forEach(card => {
                const titleElement = card.querySelector('.movie-title');
                if (titleElement && card.dataset.originalTitle) {
                    titleElement.innerHTML = card.dataset.originalTitle;
                }
                card.classList.remove('hidden');
                card.classList.remove('fade-in');
                // Force a small reflow to allow keyframe restart on future search
                void card.offsetWidth;
                card.classList.add('fade-in');
            });

            // Show sections and their headers
            cardSections.forEach(section => {
                section.classList.remove('hidden');
                const header = section.previousElementSibling;
                if (header && header.classList.contains('section-header')) {
                    header.classList.remove('hidden');
                }
            });

            // Show banners and other content
            bannersToToggle.forEach(banner => banner.classList.remove('hidden'));
            if (liveEventsHeader) liveEventsHeader.classList.remove('hidden');
            if (liveEventsSection) liveEventsSection.classList.remove('hidden');

            // Hide empty state
            noResultsContainer.classList.add('hidden');
            return;
        }

        // Active search mode
        const queryWords = query.split(/\s+/).filter(w => w.length > 0);

        // Hide banners and non-search sections
        bannersToToggle.forEach(banner => banner.classList.add('hidden'));
        if (liveEventsHeader) liveEventsHeader.classList.add('hidden');
        if (liveEventsSection) liveEventsSection.classList.add('hidden');

        let totalVisibleCards = 0;

        // Filter cards and highlight titles
        cards.forEach(card => {
            const originalTitle = card.dataset.originalTitle || '';
            const originalTitleLower = originalTitle.toLowerCase();
            const titleElement = card.querySelector('.movie-title');

            // Check if every word of query is present in title
            const isMatch = queryWords.every(word => originalTitleLower.includes(word));

            if (isMatch) {
                card.classList.remove('hidden');
                card.classList.remove('fade-in');
                // Reflow to restart animation
                void card.offsetWidth;
                card.classList.add('fade-in');

                if (titleElement) {
                    titleElement.innerHTML = highlightTitle(originalTitle, queryWords);
                }
                totalVisibleCards++;
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });

        // Hide or show sections based on child visibility
        cardSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.card:not(.hidden)');
            const header = section.previousElementSibling;

            if (visibleCards.length > 0) {
                section.classList.remove('hidden');
                if (header && header.classList.contains('section-header')) {
                    header.classList.remove('hidden');
                }
            } else {
                section.classList.add('hidden');
                if (header && header.classList.contains('section-header')) {
                    header.classList.add('hidden');
                }
            }
        });

        // Toggle no results container
        if (totalVisibleCards === 0) {
            noResultsContainer.classList.remove('hidden');
        } else {
            noResultsContainer.classList.add('hidden');
        }
    }

    // Event Listeners
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);

    // Support pressing enter key to search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Clear search
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
    });
});

// ── Slider ──────────────────────────────────────────────────────────────────
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let sliderIndex = 0;

function showSlide() {
    slides.style.transform = `translateX(${-sliderIndex * 100}%)`;
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        sliderIndex = (sliderIndex + 1) % images.length;
        showSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        sliderIndex = (sliderIndex - 1 + images.length) % images.length;
        showSlide();
    });
}
