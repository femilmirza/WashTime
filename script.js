// script.js
class WashTime {
    constructor() {
        this.slotsContainer = document.getElementById('slotsContainer');
        this.todaySlotContainer = document.getElementById('todaySlot');
        this.slotsRef = firebase.database().ref('slots');  // Reference to Firebase Realtime Database

        this.listenForUpdates();  // Listen for real-time updates
    }

    // Listen for real-time database updates
    listenForUpdates() {
        this.slotsRef.on('value', snapshot => {
            if (snapshot.exists()) {
                this.slots = snapshot.val();
            } else {
                this.initializeSlots();  // Initialize slots if no data exists
            }
            this.render();
            this.showTodaySlot();
        });
    }

    // Initialize default slots in Firebase
    initializeSlots() {
        const slots = [
            { day: "Monday", booked: false, user: "" },
            { day: "Tuesday", booked: false, user: "" },
            { day: "Wednesday", booked: false, user: "" },
            { day: "Thursday", booked: false, user: "" },
            { day: "Friday", booked: false, user: "" },
            { day: "Saturday", booked: false, user: "" },
            { day: "Sunday", booked: false, user: "" }
        ];
        this.slotsRef.set(slots);  // Save default slots to Firebase
    }

    // Render booking table in the UI
    render() {
        this.slotsContainer.innerHTML = '';

        this.slots.forEach((slot, index) => {
            const row = document.createElement('tr');
            row.className = slot.booked ? 'booked' : 'vacant';
            row.dataset.index = index;

            row.innerHTML = `
                <td>${slot.day}</td>
                <td class="${slot.booked ? 'status-booked' : 'status-vacant'}">
                    ${slot.booked ? 'Booked' : 'Vacant'}
                </td>
                <td class="booked-by">${slot.booked ? slot.user : '-'}</td>
            `;

            if (!slot.booked) {
                row.addEventListener('click', () => this.bookSlot(index));
            }

            this.slotsContainer.appendChild(row);
        });
    }

    // Book a slot and save to Firebase
    bookSlot(index) {
        const userName = document.getElementById('userName').value;
        if (!userName) {
            alert('Please select your name to book a slot.');
            return;
        }

        const userBookings = this.slots.filter(slot => slot.user === userName).length;
        if (userBookings >= 2) {
            alert('You can only book a maximum of 2 slots per week.');
            return;
        }

        // Update slot in Firebase
        this.slots[index].booked = true;
        this.slots[index].user = userName;
        this.slotsRef.set(this.slots);  // Save updated slots to Firebase
    }

    // Show today's booking or "No reservation today"
    showTodaySlot() {
        const todayIndex = new Date().getDay();  // 0 (Sunday) to 6 (Saturday)
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todaySlot = this.slots.find(slot => slot.day === dayNames[todayIndex]);

        if (todaySlot.booked) {
            this.todaySlotContainer.innerHTML = `<strong>Today's Slot is Booked By:</strong> ${todaySlot.user}`;
        } else {
            this.todaySlotContainer.innerHTML = `<strong>No reservation today</strong>`;
        }
    }
}

// Book the next available slot using the button
function bookNextAvailableSlot() {
    const userName = document.getElementById('userName').value;
    if (!userName) {
        alert('Please select your name to book a slot.');
        return;
    }

    const app = new WashTime();
    const userBookings = app.slots.filter(slot => slot.user === userName).length;
    if (userBookings >= 2) {
        alert('You can only book a maximum of 2 slots per week.');
        return;
    }

    const nextAvailableIndex = app.slots.findIndex(slot => !slot.booked);
    if (nextAvailableIndex === -1) {
        alert('No available slots left to book.');
        return;
    }

    app.bookSlot(nextAvailableIndex);
}

// Reset all bookings in Firebase
function resetBookings() {
    if (confirm('Are you sure you want to reset all bookings for this week?')) {
        firebase.database().ref('slots').remove();  // Clear slots from Firebase
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => new WashTime());
