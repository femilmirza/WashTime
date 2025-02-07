// script.js
class WashTime {
    constructor() {
        this.slotsContainer = document.getElementById('slotsContainer');
        this.todaySlotContainer = document.getElementById('todaySlot');
        this.initStorage();
        this.render();
        this.showTodaySlot();
    }

    initStorage() {
        if (!localStorage.getItem('slots')) {
            const slots = [
                { day: "Monday", booked: false, user: "" },
                { day: "Tuesday", booked: false, user: "" },
                { day: "Wednesday", booked: false, user: "" },
                { day: "Thursday", booked: false, user: "" },
                { day: "Friday", booked: false, user: "" },
                { day: "Saturday", booked: false, user: "" },
                { day: "Sunday", booked: false, user: "" }
            ];
            localStorage.setItem('slots', JSON.stringify(slots));
        }
        this.slots = JSON.parse(localStorage.getItem('slots'));
    }

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

        this.slots[index].booked = true;
        this.slots[index].user = userName;

        localStorage.setItem('slots', JSON.stringify(this.slots));
        this.render();
        this.showTodaySlot();
    }

    showTodaySlot() {
        const todayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todaySlot = this.slots.find(slot => slot.day === dayNames[todayIndex]);

        if (todaySlot.booked) {
            this.todaySlotContainer.innerHTML = `<strong>Today's Slot is Booked By:</strong> ${todaySlot.user}`;
        } else {
            this.todaySlotContainer.innerHTML = `<strong>No reservation today</strong>`;
        }
    }
}

function bookNextAvailableSlot() {
    const app = new WashTime();
    const userName = document.getElementById('userName').value;
    if (!userName) {
        alert('Please select your name to book a slot.');
        return;
    }

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

function resetBookings() {
    if (confirm('Are you sure you want to reset all bookings for this week?')) {
        localStorage.removeItem('slots');
        new WashTime();  // Re-initialize the app
    }
}

document.addEventListener('DOMContentLoaded', () => new WashTime());
