document.addEventListener('DOMContentLoaded', () => {
    const faces = document.querySelectorAll('.face');
    const form = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');
    let selectedRating = 0;

    // Sample initial feedback data
    const initialFeedbacks = [
        {
            name: "Shubham",
            rating: 5,
            feedback: "Amazing experience! The interface is very intuitive.",
            date: "2024-12-18"
        },
        {
            name: "Anonimous",
            rating: 4,
            feedback: "Great service, but could use some minor improvements.",
            date: "2023-10-14"
        }
    ];

    // Function to convert rating number to emojis
    const getRatingEmoji = (rating) => {
        const emojis = ['😞', '😕', '😊', '😃', '🤩'];
        return emojis[rating - 1];
    };

    // Function to create feedback item HTML
    const createFeedbackItem = (feedback) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        
        feedbackItem.innerHTML = `
            <div class="feedback-item-header">
                <span class="feedback-item-name">${feedback.name}</span>
                <span class="feedback-item-date">${new Date(feedback.date).toLocaleDateString()}</span>
            </div>
            <div class="feedback-item-rating">${getRatingEmoji(feedback.rating)}</div>
            <div class="feedback-item-content">${feedback.feedback}</div>
        `;
        
        return feedbackItem;
    };

    // Load initial feedbacks
    initialFeedbacks.forEach(feedback => {
        feedbackList.prepend(createFeedbackItem(feedback));
    });

    faces.forEach(face => {
        face.addEventListener('click', () => {
            faces.forEach(f => f.classList.remove('selected'));
            face.classList.add('selected');
            selectedRating = parseInt(face.dataset.rating);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            rating: selectedRating,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            feedback: document.getElementById('feedback').value,
            date: new Date().toISOString().split('T')[0]
        };

        // Add new feedback to the list
        feedbackList.prepend(createFeedbackItem(formData));

        // Animate submit button
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.style.animation = 'success 0.5s ease';
        submitBtn.textContent = 'Thank You! ✨';
        
        // Reset form
        setTimeout(() => {
            submitBtn.style.animation = '';
            submitBtn.textContent = 'Submit Feedback';
            form.reset();
            faces.forEach(f => f.classList.remove('selected'));
        }, 2000);

        console.log('Feedback submitted:', formData);
    });
});