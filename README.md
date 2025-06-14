# 🧼 WashTime

A minimal, real-time washing machine booking app built for shared spaces like hostels or apartments.

[🔗 Live Demo](https://wash-time.vercel.app)

---

## 🚀 Features

- 👥 Track bookings for each user
- 📆 Daily slot reservations
- ⚡ Real-time updates via Firebase
- 💻 Responsive, mobile-friendly UI

---

## 🛠️ Tech Stack

- **React** (frontend)
- **Firebase** (auth + real-time DB)
- **Tailwind CSS** (styling)
- **Vercel** (deployment)

---

## 🔑 Firebase Configuration

To run this project locally, create a `.env` file in the root folder:

```env
REACT_APP_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_APP_ID=your-app-id

> Use .env.example as a template. Your .env should not be committed.




---

📦 Getting Started

# 1. Clone the repo
git clone https://github.com/your-username/wash-time.git

# 2. Install dependencies
cd wash-time
npm install

# 3. Add your .env file
# (copy from .env.example and fill in Firebase keys)

# 4. Start the development server
npm start


---

📁 Folder Structure

src/
├── components/    # Reusable UI
├── pages/         # Main views
├── firebase.js    # Firebase setup
├── App.js         # App layout
└── index.js       # Entry point


---

🧪 Roadmap

🔔 Booking reminders

📊 Usage stats dashboard

🔐 Admin access panel



---

📄 License

MIT © femilmirza
