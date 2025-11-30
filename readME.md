# Travel Deals Web Application

A full-stack travel booking system built with Node.js, Express, and vanilla JavaScript. Book flights, hotels, car rentals, and cruises all in one place.

Authors: Mir Patel & Romik Sarkar

## 🚀 Features

- ✈️ **Flight Booking** - One-way and round-trip flights
- 🏨 **Hotel Reservations** - Search and book accommodations
- 🚗 **Car Rentals** - Rent vehicles for your trip
- 🚢 **Cruise Packages** - Book cruise vacations
- 📝 **Contact Form** - Get in touch with customer service
- 🛒 **Shopping Cart** - Manage your bookings before checkout

## 📋 Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🔧 Installation

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### Step 2: Initialize Project
```bash
npm init -y
```

### Step 3: Install Dependencies
```bash
npm install express cors xmldom
```

### Step 4: Install Development Dependencies (Optional)
```bash
npm install --save-dev nodemon
```

## 📁 Project Structure

```
travel-deals/
├── server.js           # Backend server
├── package.json        # Project dependencies
├── data/               # Data storage
│   ├── flights.json
│   ├── hotels.xml
│   ├── cars.xml
│   ├── contacts.json   # Created automatically
│   └── bookings.json   # Created automatically
└── public/             # Frontend files
    ├── index.html
    ├── flights.html
    ├── stays.html
    ├── cars.html
    ├── cruises.html
    ├── contact.html
    ├── cart.html
    ├── mystyle.css
    ├── api.js
    └── add2cart.js
```

## ▶️ Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on **http://localhost:3000**

## 🌐 Available Routes

### Pages
- `GET /` - Home page
- `GET /flights` - Flight booking page
- `GET /stays` - Hotel booking page
- `GET /cars` - Car rental page
- `GET /cruises` - Cruise booking page
- `GET /contact` - Contact form
- `GET /cart` - Shopping cart

### API Endpoints
- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/bookings` - Fetch all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/flights` - Fetch available flights
- `GET /api/hotels` - Fetch available hotels
- `GET /api/cars` - Fetch available cars

## 🛠️ Configuration

### Package.json Scripts
Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 📦 Dependencies

- **express** - Web framework for Node.js
- **cors** - Enable Cross-Origin Resource Sharing
- **xmldom** - XML parsing and serialization

### Dev Dependencies
- **nodemon** - Auto-restart server on file changes

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the port in `server.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Data Files Not Found
Ensure the `data/` folder exists and contains:
- `flights.json`
- `hotels.xml`
- `cars.xml`

### API Not Loading
1. Check that the server is running
2. Open browser console (F12) to see errors
3. Verify `api.js` is loaded before inline scripts

## 📝 Notes

- All bookings are stored in JSON files in the `data/` directory
- XML files are used for hotels and cars data
- Cart is temporary and clears on page refresh
- No database required - file-based storage only

## 👨‍💻 Development

To add new features:
1. Create new HTML pages in `public/`
2. Add routes in `server.js`
3. Create API endpoints for data operations
4. Update `api.js` with new functions

## 📄 License

This project is for educational purposes.

## 🤝 Support

For issues or questions, use the contact form at `/contact`

---

**Made for CS 6314 Web Programming Languages @utdallas**