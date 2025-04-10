// form.js - Form handling functionality

export function handleForm() {
    const form = document.querySelector('#marketForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: form.elements['name'].value,
            email: form.elements['email'].value,
            subject: form.elements['subject'].value,
            message: form.elements['message'].value,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage
        storeFormSubmission(formData);
        
        // Redirect to form action page with data as query params
        const queryParams = new URLSearchParams();
        queryParams.append('name', formData.name);
        queryParams.append('email', formData.email);
        queryParams.append('subject', formData.subject);
        
        window.location.href = `form-action.html?${queryParams.toString()}`;
    });
}

function storeFormSubmission(formData) {
    // Get existing submissions or create new array
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    
    // Add new submission
    submissions.push(formData);
    
    // Store back in localStorage (limit to 10 most recent)
    localStorage.setItem('formSubmissions', JSON.stringify(submissions.slice(-10)));
}