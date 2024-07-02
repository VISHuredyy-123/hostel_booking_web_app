document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let checkin = document.getElementById('check-in').value;
    let checkout = document.getElementById('check-out').value;
    let roomtype = document.getElementById('room-type').value;

    // Simple validation
    if (!name || !email || !checkin || !checkout || !roomtype) {
        document.getElementById('form-message').textContent = 'Please fill out all fields.';
        return;
    }

    // Submit form data
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            checkin: checkin,
            checkout: checkout,
            roomtype: roomtype
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-message').textContent = 'Booking submitted successfully!';
        // Optionally clear the form
        document.getElementById('booking-form').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('form-message').textContent = 'Error submitting booking.';
    });
});
