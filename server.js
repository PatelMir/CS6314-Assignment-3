
// Travel Deals Backend Server 
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const { DOMParser, XMLSerializer } = require('xmldom');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory

app.use(express.static(path.join(__dirname, 'public')));

// Data directory
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
async function ensureDataDirectory() {
    try {
        await fs.access(DATA_DIR);
        console.log('✓ Data directory exists');
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
        console.log('✓ Created data directory');
    }
}

// UTILITY FUNCTIONS
async function readJSON(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`⚠ File not found: ${filename}, returning empty data`);
            return null;
        }
        console.error(`Error reading ${filename}:`, error);
        throw error;
    }
}

async function writeJSON(filename, data) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✓ Saved ${filename}`);
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw error;
    }
}

async function readXML(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`⚠ File not found: ${filename}`);
            return null;
        }
        console.error(`Error reading ${filename}:`, error);
        throw error;
    }
}

async function writeXML(filename, xmlString) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, xmlString, 'utf8');
        console.log(`✓ Saved ${filename}`);
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw error;
    }
}


// PAGE ROUTES

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/stays', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stays.html'));
});

app.get('/flights', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flights.html'));
});

app.get('/cars', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

app.get('/cruises', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cruises.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});


// API ENDPOINTS


// CONTACTS API
app.get('/api/contacts', async (req, res) => {
    try {
        let contacts = await readJSON('contacts.json');
        if (!contacts) contacts = [];
        res.json({ success: true, contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        const { firstName, lastName, phone, gender, email, comment } = req.body;
        
        let contacts = await readJSON('contacts.json') || [];
        
        const newContact = {
            contactId: 'CNT' + Date.now() + Math.floor(Math.random() * 1000),
            firstName,
            lastName,
            phone,
            gender,
            email,
            comment,
            submittedAt: new Date().toISOString(),
            status: 'new'
        };
        
        contacts.push(newContact);
        await writeJSON('contacts.json', contacts);
        
        console.log('✓ Contact saved:', newContact.contactId);
        res.json({ success: true, contact: newContact });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// BOOKINGS API
app.get('/api/bookings', async (req, res) => {
    try {
        let bookings = await readJSON('bookings.json');
        if (!bookings) bookings = [];
        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const bookingData = req.body;
        
        let bookings = await readJSON('bookings.json') || [];
        
        const newBooking = {
            bookingId: 'BK' + Date.now() + Math.floor(Math.random() * 1000),
            bookingNumber: 'BKN-' + Date.now(),
            userId: bookingData.userId || 'GUEST' + Date.now(),
            bookingDate: new Date().toISOString(),
            status: 'confirmed',
            ...bookingData
        };
        
        bookings.push(newBooking);
        await writeJSON('bookings.json', bookings);
        await updateSourceAvailability(newBooking);
        
        console.log('✓ Booking saved:', newBooking.bookingId);
        res.json({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// FLIGHTS API
app.get('/api/flights', async (req, res) => {
    try {
        let flights = await readJSON('flights.json');
        if (!flights) flights = { flights: [] };
        res.json({ success: true, data: flights });
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// HOTELS API
app.get('/api/hotels', async (req, res) => {
    try {
        const xmlString = await readXML('hotels.xml');
        if (!xmlString) {
            return res.json({ success: true, data: { hotels: [] } });
        }
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        const hotels = [];
        const hotelNodes = xmlDoc.getElementsByTagName('hotel');
        
        for (let i = 0; i < hotelNodes.length; i++) {
            const hotel = hotelNodes[i];
            hotels.push({
                hotelId: hotel.getElementsByTagName('hotel-id')[0]?.textContent,
                hotelName: hotel.getElementsByTagName('hotel-name')[0]?.textContent,
                city: hotel.getElementsByTagName('city')[0]?.textContent,
                availableRooms: parseInt(hotel.getElementsByTagName('available-rooms')[0]?.textContent),
                date: hotel.getElementsByTagName('date')[0]?.textContent,
                pricePerNight: parseFloat(hotel.getElementsByTagName('price-per-night')[0]?.textContent)
            });
        }
        
        res.json({ success: true, data: { hotels } });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// CARS API
app.get('/api/cars', async (req, res) => {
    try {
        const xmlString = await readXML('cars.xml');
        if (!xmlString) {
            return res.json({ success: true, data: { cars: [] } });
        }
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        const cars = [];
        const carNodes = xmlDoc.getElementsByTagName('car');
        
        for (let i = 0; i < carNodes.length; i++) {
            const car = carNodes[i];
            cars.push({
                carId: car.getElementsByTagName('car-id')[0]?.textContent,
                city: car.getElementsByTagName('city')[0]?.textContent,
                type: car.getElementsByTagName('type')[0]?.textContent,
                checkInDate: car.getElementsByTagName('check-in-date')[0]?.textContent,
                checkOutDate: car.getElementsByTagName('check-out-date')[0]?.textContent,
                pricePerDay: parseFloat(car.getElementsByTagName('price-per-day')[0]?.textContent),
                available: true
            });
        }
        
        res.json({ success: true, data: { cars } });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// UPDATE AVAILABILITY FUNCTIONS
async function updateFlightAvailability(booking) {
    try {
        let flightsData = await readJSON('flights.json') || { flights: [] };
        
        const totalPassengers = booking.adults + booking.children + booking.infants;
        
        if (booking.tripType === 'roundtrip') {
            const departFlight = flightsData.flights.find(f => 
                f.flightId === booking.departingFlight.flightId
            );
            if (departFlight) {
                departFlight.availableSeats -= totalPassengers;
                console.log(`✓ Updated ${departFlight.flightId}: ${departFlight.availableSeats} seats remaining`);
            }
            
            const returnFlight = flightsData.flights.find(f => 
                f.flightId === booking.returningFlight.flightId
            );
            if (returnFlight) {
                returnFlight.availableSeats -= totalPassengers;
                console.log(`✓ Updated ${returnFlight.flightId}: ${returnFlight.availableSeats} seats remaining`);
            }
        } else {
            const flight = flightsData.flights.find(f => 
                f.flightId === booking.flightId
            );
            if (flight) {
                flight.availableSeats -= totalPassengers;
                console.log(`✓ Updated ${flight.flightId}: ${flight.availableSeats} seats remaining`);
            }
        }
        
        await writeJSON('flights.json', flightsData);
        
    } catch (error) {
        console.error('Error updating flight availability:', error);
    }
}

async function updateHotelAvailability(booking) {
    try {
        const xmlString = await readXML('hotels.xml');
        if (!xmlString) return;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        const hotelNodes = xmlDoc.getElementsByTagName('hotel');
        
        for (let i = 0; i < hotelNodes.length; i++) {
            const hotel = hotelNodes[i];
            const hotelId = hotel.getElementsByTagName('hotel-id')[0]?.textContent;
            
            if (hotelId === booking.hotelId) {
                const availableRoomsNode = hotel.getElementsByTagName('available-rooms')[0];
                const currentRooms = parseInt(availableRoomsNode.textContent);
                const newRooms = currentRooms - booking.rooms;
                availableRoomsNode.textContent = newRooms.toString();
                
                console.log(`✓ Updated ${hotelId}: ${currentRooms} → ${newRooms} rooms`);
                break;
            }
        }
        
        const serializer = new XMLSerializer();
        const updatedXML = serializer.serializeToString(xmlDoc);
        await writeXML('hotels.xml', updatedXML);
        
    } catch (error) {
        console.error('Error updating hotel availability:', error);
    }
}

async function updateCarAvailability(booking) {
    try {
        const xmlString = await readXML('cars.xml');
        if (!xmlString) return;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        
        const carNodes = xmlDoc.getElementsByTagName('car');
        
        for (let i = 0; i < carNodes.length; i++) {
            const car = carNodes[i];
            const carId = car.getElementsByTagName('car-id')[0]?.textContent;
            
            if (carId === booking.carId) {
                let availableNode = car.getElementsByTagName('available')[0];
                if (!availableNode) {
                    availableNode = xmlDoc.createElement('available');
                    car.appendChild(availableNode);
                }
                availableNode.textContent = 'false';
                
                console.log(`✓ Updated ${carId}: marked unavailable`);
                break;
            }
        }
        
        const serializer = new XMLSerializer();
        const updatedXML = serializer.serializeToString(xmlDoc);
        await writeXML('cars.xml', updatedXML);
        
    } catch (error) {
        console.error('Error updating car availability:', error);
    }
}

async function updateSourceAvailability(booking) {
    switch(booking.type) {
        case 'flight':
            await updateFlightAvailability(booking);
            break;
        case 'hotel':
            await updateHotelAvailability(booking);
            break;
        case 'car':
            await updateCarAvailability(booking);
            break;
        case 'cruise':
            console.log('✓ Cruise booking recorded (no inventory update needed)');
            break;
    }
}

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// START SERVER
async function startServer() {
    await ensureDataDirectory();
    
    app.listen(PORT, () => {
        console.log('   Travel Deals Backend Server         ');
        console.log(`✓ Server running on http://localhost:${PORT}`);
        console.log(`✓ Data directory: ${DATA_DIR}`);
        console.log(`✓ Public directory: ${path.join(__dirname, 'public')}`);
        console.log('\n📍 Available routes:');
        console.log('  GET  /             → Home');
        console.log('  GET  /stays        → Stays page');
        console.log('  GET  /flights      → Flights page');
        console.log('  GET  /cars         → Cars page');
        console.log('  GET  /cruises      → Cruises page');
        console.log('  GET  /contact      → Contact page');
        console.log('  GET  /cart         → Cart page');
        console.log('\n📡 API endpoints:');
        console.log('  GET  /api/contacts');
        console.log('  POST /api/contacts');
        console.log('  GET  /api/bookings');
        console.log('  POST /api/bookings');
        console.log('  GET  /api/flights');
        console.log('  GET  /api/hotels');
        console.log('  GET  /api/cars');
        console.log('\n🌐 Open http://localhost:3000 in your browser\n');
    });
}

startServer().catch(console.error);