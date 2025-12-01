# Assignment 3 - Test Cases

## Prerequisites
- Server running on http://localhost:3000
- Run: `npm run dev` or `node server.js`
- Open browser to http://localhost:3000

---

## 1. FLIGHTS - One-Way Test Cases

### Test Case 1.1: Basic One-Way Flight
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "One Way"
2. Origin: `Dallas`
3. Destination: `Los Angeles`
4. Departure Date: `2024-09-01`
5. Click 👥 icon → Adults: 1, Children: 0, Infants: 0
6. Click "Search Flights"
7. Click "Add to Cart" on FL001

**Expected Results:**
- ✅ FL001 appears (Dallas → Los Angeles, Sep 1, 2024)
- ✅ Price shown: $299.99 for 1 adult
- ✅ Alert: "Item added to cart!"
- ✅ Redirects to /cart
- ✅ Flight appears in cart with correct details

---

### Test Case 1.2: One-Way with Multiple Passengers
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "One Way"
2. Origin: `Houston`
3. Destination: `San Francisco`
4. Departure Date: `2024-09-03`
5. Click 👥 icon → Adults: 2, Children: 1, Infants: 1
6. Click "Search Flights"
7. Click "Add to Cart" on FL003

**Expected Results:**
- ✅ FL003 appears (Houston → San Francisco)
- ✅ Price breakdown shown:
  - Adults (2 × $325.00): $650.00
  - Children (1 × $227.50): $227.50
  - Infants (1 × $32.50): $32.50
  - Total: $910.00
- ✅ Flight added to cart with all passenger counts

---

### Test Case 1.3: One-Way with ±3 Days Search
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "One Way"
2. Origin: `Dallas`
3. Destination: `Los Angeles`
4. Departure Date: `2024-09-03` (no exact match)
5. Adults: 1
6. Click "Search Flights"

**Expected Results:**
- ✅ Yellow warning message: "No flights found on exact date 2024-09-03. Showing flights within 3 days before and after."
- ✅ FL001 appears (Sep 1 - within 3-day range)
- ✅ Can still add to cart

---

### Test Case 1.4: One-Way Validation - Same Origin/Destination
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "One Way"
2. Origin: `Dallas`
3. Destination: `Dallas`
4. Click "Search Flights"

**Expected Results:**
- ✅ Error message: "Destination must be different from origin"
- ✅ No flights shown

---

### Test Case 1.5: One-Way Validation - Invalid Date Range
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "One Way"
2. Origin: `Dallas`
3. Destination: `Los Angeles`
4. Departure Date: `2024-08-15` (before Sep 1)
5. Click "Search Flights"

**Expected Results:**
- ✅ Error message: "Departure date must be between Sep 1, 2024 and Dec 1, 2024"

---

## 2. FLIGHTS - Round Trip Test Cases

### Test Case 2.1: Basic Round Trip
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "Round Trip"
2. Origin: `Dallas`
3. Destination: `Los Angeles`
4. Departure Date: `2024-09-01`
5. Return Date: `2024-09-02`
6. Adults: 2, Children: 0, Infants: 0
7. Click "Search Flights"
8. Click "Select Flight" on FL001 (departing)
9. Click "Select Flight" on FL002 (returning)
10. Click "Add Round Trip to Cart"

**Expected Results:**
- ✅ Departing flights section shows FL001
- ✅ Returning flights section shows FL002
- ✅ Selected flights highlighted with ✓ badge
- ✅ "Add Round Trip to Cart" button appears
- ✅ Both flights added to cart
- ✅ Combined price shown: $1,179.96 (2 adults × 2 flights)

---

### Test Case 2.2: Round Trip - Return Before Departure
**URL:** http://localhost:3000/flights

**Steps:**
1. Select "Round Trip"
2. Departure Date: `2024-09-10`
3. Return Date: `2024-09-05` (before departure)
4. Click "Search Flights"

**Expected Results:**
- ✅ Error: "Return date must be after departure date"

---

## 3. HOTELS (STAYS) Test Cases

### Test Case 3.1: Basic Hotel Search
**URL:** http://localhost:3000/stays

**Steps:**
1. City: `Dallas`
2. Check-in: `2024-09-10`
3. Check-out: `2024-09-15`
4. Adults: 2, Children: 0, Infants: 0
5. Click "Search Stays"
6. Click "Select Hotel" on any hotel

**Expected Results:**
- ✅ Shows available hotels in Dallas
- ✅ Displays: Hotel ID, Hotel Name, City, Available Rooms, Nights (5)
- ✅ Price calculation: 5 nights × 1 room × price per night
- ✅ Hotel added to cart with all details

---

### Test Case 3.2: Hotel - Multiple Rooms Needed
**URL:** http://localhost:3000/stays

**Steps:**
1. City: `Houston`
2. Check-in: `2024-09-01`
3. Check-out: `2024-09-05`
4. Adults: 4, Children: 0, Infants: 2
5. Click "Search Stays"

**Expected Results:**
- ✅ Shows "Rooms Needed: 2" (4 adults ÷ 2 per room)
- ✅ Only shows hotels with 2+ available rooms
- ✅ Price calculated for 2 rooms × 4 nights

---

### Test Case 3.3: Hotel Validation - Max 2 Guests Per Room
**URL:** http://localhost:3000/stays

**Steps:**
1. Adults: 2, Children: 1, Infants: 0
2. Click "Search Stays"

**Expected Results:**
- ✅ Error: "Maximum 2 guests (adults + children) per room allowed"
- ✅ Infants are exempt from count

---

### Test Case 3.4: Hotel Validation - Check-out Before Check-in
**URL:** http://localhost:3000/stays

**Steps:**
1. Check-in: `2024-09-15`
2. Check-out: `2024-09-10`
3. Click "Search Stays"

**Expected Results:**
- ✅ Error: "Check-out date must be after check-in date"

---

## 4. CARS Test Cases

### Test Case 4.1: Basic Car Rental
**URL:** http://localhost:3000/cars

**Steps:**
1. City: `Dallas`
2. Car Type: `SUV`
3. Pick-up Date: `2024-09-10`
4. Drop-off Date: `2024-09-15`
5. Click "Submit"
6. Click "Book This Car" on any car

**Expected Results:**
- ✅ Shows available SUVs in Dallas
- ✅ Displays: Car ID, City, Type, Rental Days (5)
- ✅ Price: 5 days × price per day
- ✅ Car added to cart

---

### Test Case 4.2: Car - All Types
**URL:** http://localhost:3000/cars

**Test each car type:**
- Economy
- SUV
- Compact
- Midsize

**Expected Results:**
- ✅ Each type shows matching cars only

---

### Test Case 4.3: Car Validation - Invalid Type
**URL:** http://localhost:3000/cars

**Steps:**
1. Leave "Car Type" as "-- Select Car Type --"
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Car type is required"

---

### Test Case 4.4: Car Personalization (After Booking)
**URL:** http://localhost:3000/cars

**Steps:**
1. Book a car (e.g., Dallas, SUV)
2. Complete the booking through cart
3. Return to /cars page
4. Refresh page

**Expected Results:**
- ✅ "Personalized Recommendations" section appears
- ✅ Shows previously booked city/type combination
- ✅ Displays count of previous bookings

---

## 5. CRUISES Test Cases

### Test Case 5.1: Basic Cruise
**URL:** http://localhost:3000/cruises

**Steps:**
1. Destination: `Bahamas`
2. Start Date: `2024-09-01`
3. End Date: `2024-09-15`
4. Min Duration: 5 days
5. Max Duration: 7 days
6. Adults: 2, Children: 1, Infants: 0
7. Click "Submit"
8. Click "Add to Cart"

**Expected Results:**
- ✅ Cruise summary displayed
- ✅ Shows destination, dates, duration, guests
- ✅ Rooms needed: 2 (3 guests ÷ 2)
- ✅ Price breakdown:
  - Adults (2 × $500): $1,000
  - Children (1 × $350): $350
  - Total: $1,350
- ✅ Cruise added to cart

---

### Test Case 5.2: Cruise - All Destinations
**URL:** http://localhost:3000/cruises

**Test each destination:**
- Alaska
- Bahamas
- Europe
- Mexico

**Expected Results:**
- ✅ Each destination accepted and displayed correctly

---

### Test Case 5.3: Cruise Validation - Min Duration < 3
**URL:** http://localhost:3000/cruises

**Steps:**
1. Min Duration: 2 days
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Minimum duration cannot be less than 3 days"

---

### Test Case 5.4: Cruise Validation - Max Duration > 10
**URL:** http://localhost:3000/cruises

**Steps:**
1. Max Duration: 12 days
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Maximum duration cannot be greater than 10 days"

---

### Test Case 5.5: Cruise Validation - Min > Max
**URL:** http://localhost:3000/cruises

**Steps:**
1. Min Duration: 8 days
2. Max Duration: 5 days
3. Click "Submit"

**Expected Results:**
- ✅ Error: "Maximum duration must be greater than or equal to minimum"

---

## 6. CONTACT FORM Test Cases

### Test Case 6.1: Valid Contact Form
**URL:** http://localhost:3000/contact

**Steps:**
1. First Name: `John`
2. Last Name: `Smith`
3. Phone: `(123)456-7890` (auto-formats as you type)
4. Gender: Select "Male"
5. Email: `john@example.com`
6. Comment: `This is a test message with sufficient characters.`
7. Click "Submit"

**Expected Results:**
- ✅ Success message appears
- ✅ Form data saved to `data/contacts.json`
- ✅ Contact ID generated and displayed

---

### Test Case 6.2: Contact Validation - First Name Not Capitalized
**URL:** http://localhost:3000/contact

**Steps:**
1. First Name: `john` (lowercase)
2. Fill other fields correctly
3. Click "Submit"

**Expected Results:**
- ✅ Error: "First letter of first name must be capital"

---

### Test Case 6.3: Contact Validation - Same First/Last Name
**URL:** http://localhost:3000/contact

**Steps:**
1. First Name: `John`
2. Last Name: `John`
3. Click "Submit"

**Expected Results:**
- ✅ Error: "First name and last name cannot be the same"

---

### Test Case 6.4: Contact Validation - Invalid Phone Format
**URL:** http://localhost:3000/contact

**Steps:**
1. Phone: `123456` (incomplete)
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Phone number must be formatted as (ddd)ddd-dddd"

---

### Test Case 6.5: Contact Validation - Invalid Email
**URL:** http://localhost:3000/contact

**Steps:**
1. Email: `invalidemail` (no @ or .)
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Email address must contain @ and ."

---

### Test Case 6.6: Contact Validation - Short Comment
**URL:** http://localhost:3000/contact

**Steps:**
1. Comment: `Short` (< 10 characters)
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Comment must be at least 10 characters"

---

### Test Case 6.7: Contact Validation - No Gender Selected
**URL:** http://localhost:3000/contact

**Steps:**
1. Fill all fields except Gender
2. Click "Submit"

**Expected Results:**
- ✅ Error: "Gender must be selected"

---

## 7. CART Test Cases

### Test Case 7.1: Empty Cart
**URL:** http://localhost:3000/cart

**Steps:**
1. Clear browser session storage or click "Clear Cart"
2. Navigate to /cart

**Expected Results:**
- ✅ Shows empty cart message with 🛒 icon
- ✅ "Your cart is empty"
- ✅ Links to browse flights and hotels

---

### Test Case 7.2: Cart - Multiple Items
**URL:** http://localhost:3000/cart

**Steps:**
1. Add 1 flight (one-way)
2. Add 1 hotel
3. Add 1 car
4. Add 1 cruise
5. Go to /cart

**Expected Results:**
- ✅ Cart shows 4 sections: ✈️ Flights, 🏨 Hotels, 🚗 Car Rentals, 🚢 Cruises
- ✅ Each item displays correct details
- ✅ "Proceed to Checkout" button visible
- ✅ "Clear Cart" button visible

---

### Test Case 7.3: Cart - Remove Single Item
**URL:** http://localhost:3000/cart

**Steps:**
1. Add 2 items to cart
2. Click "Remove" on one item
3. Confirm alert

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Item removed from cart
- ✅ Other item remains
- ✅ Cart updates immediately

---

### Test Case 7.4: Cart - Clear All Items
**URL:** http://localhost:3000/cart

**Steps:**
1. Add multiple items to cart
2. Click "Clear Cart"
3. Confirm alert

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ All items removed
- ✅ Empty cart message shown

---

### Test Case 7.5: Cart Persistence - Navigation
**URL:** http://localhost:3000

**Steps:**
1. Add flight to cart
2. Navigate to /stays page
3. Navigate to /cars page
4. Go back to /cart

**Expected Results:**
- ✅ Flight still in cart after navigation
- ✅ sessionStorage preserves cart data

---

### Test Case 7.6: Cart Cleared - New Browser Tab
**URL:** http://localhost:3000

**Steps:**
1. Add items to cart in Tab 1
2. Open new tab (Tab 2)
3. Go to http://localhost:3000/cart in Tab 2

**Expected Results:**
- ✅ Cart is empty in Tab 2 (sessionStorage is tab-specific)
- ✅ Cart still has items in Tab 1

---

## 8. FLIGHT BOOKING - Complete Flow Test Cases

### Test Case 8.1: Complete One-Way Flight Booking
**URL:** http://localhost:3000/flights

**Steps:**
1. Search for one-way flight: Dallas → Los Angeles, Sep 1, 2024, 1 Adult
2. Add FL001 to cart
3. In /cart, click "Proceed to Checkout"
4. Fill passenger info:
   - First Name: `John`
   - Last Name: `Doe`
   - DOB: `1990-01-15`
   - SSN: `123-45-6789`
5. Click "Complete Booking"

**Expected Results:**
- ✅ Passenger form appears for 1 passenger
- ✅ SSN auto-formats with dashes
- ✅ Green confirmation appears: "🎉 Booking Confirmed!"
- ✅ Booking number shown (e.g., BKN-1234567890)
- ✅ All flight details displayed
- ✅ Passenger info displayed
- ✅ Booking saved to `data/bookings.json`
- ✅ Flight available seats decreased in `data/flights.json`
- ✅ Cart cleared

---

### Test Case 8.2: Complete Round Trip Booking - Multiple Passengers
**URL:** http://localhost:3000/flights

**Steps:**
1. Search round trip: Houston → San Francisco, Sep 3-7, 2 Adults, 1 Child
2. Select departing flight FL003
3. Select returning flight FL004
4. Add to cart
5. Proceed to checkout
6. Fill 3 passenger forms (2 adults, 1 child)
7. Complete booking

**Expected Results:**
- ✅ 3 passenger forms appear
- ✅ Forms labeled "Adult" and "Child"
- ✅ All passengers saved
- ✅ Both flights show in confirmation
- ✅ Available seats decreased by 3 for both flights

---

### Test Case 8.3: Flight Booking Validation - Missing Passenger Info
**URL:** http://localhost:3000/cart

**Steps:**
1. Add flight to cart
2. Proceed to checkout
3. Leave First Name blank
4. Click "Complete Booking"

**Expected Results:**
- ✅ Alert: "Please fill out all passenger information correctly."
- ✅ Booking not created

---

### Test Case 8.4: Flight Booking Validation - Invalid SSN
**URL:** http://localhost:3000/cart

**Steps:**
1. Add flight to cart
2. Proceed to checkout
3. SSN: `123` (incomplete)
4. Click "Complete Booking"

**Expected Results:**
- ✅ Alert: "Please fill out all passenger information correctly."
- ✅ SSN must match XXX-XX-XXXX format

---

## 9. HOTEL BOOKING - Complete Flow Test Cases

### Test Case 9.1: Complete Hotel Booking
**URL:** http://localhost:3000/stays

**Steps:**
1. Search: Dallas, Sep 10-15, 2 Adults
2. Select a hotel
3. In /cart, click "Proceed to Checkout"
4. Click "Complete Booking"

**Expected Results:**
- ✅ No passenger forms (hotels don't require passenger info)
- ✅ Booking confirmed immediately
- ✅ Booking saved to `data/bookings.json`
- ✅ Hotel available rooms decreased in `data/hotels.xml`
- ✅ Booking shows: User ID, Booking Number, Hotel details, Price

---

## 10. CAR BOOKING - Complete Flow Test Cases

### Test Case 10.1: Complete Car Booking
**URL:** http://localhost:3000/cars

**Steps:**
1. Search: Dallas, SUV, Sep 10-15
2. Book a car
3. Complete booking in cart

**Expected Results:**
- ✅ Booking confirmed
- ✅ Booking saved to `data/bookings.json`
- ✅ Car marked as unavailable in `data/cars.xml`

---

## 11. CRUISE BOOKING - Complete Flow Test Cases

### Test Case 11.1: Complete Cruise Booking
**URL:** http://localhost:3000/cruises

**Steps:**
1. Search: Bahamas, Sep 1-15, 5-7 days, 2 Adults
2. Add to cart
3. Complete booking

**Expected Results:**
- ✅ Booking confirmed
- ✅ Booking saved to `data/bookings.json`
- ✅ All cruise details saved

---

## 12. UI/SETTINGS Test Cases

### Test Case 12.1: Font Size Change
**URL:** Any page

**Steps:**
1. In sidebar, change "Font Size" to "Large" (18px)

**Expected Results:**
- ✅ Main content font size increases
- ✅ Change applies immediately
- ✅ Sidebar not affected

---

### Test Case 12.2: Background Color Change
**URL:** Any page

**Steps:**
1. Click "Background Color" color picker
2. Select a color (e.g., light blue)

**Expected Results:**
- ✅ Main content background changes
- ✅ Change applies immediately
- ✅ Sidebar not affected

---

### Test Case 12.3: Date/Time Display
**URL:** Any page

**Steps:**
1. Observe header date/time
2. Wait 1 second

**Expected Results:**
- ✅ Date/time shown in format: "Monday, November 30, 2025, 7:45:30 PM"
- ✅ Updates every second

---

## 13. DATA PERSISTENCE Test Cases

### Test Case 13.1: Verify Bookings Saved
**Terminal Command:**
```bash
cat data/bookings.json
```

**Expected Results:**
- ✅ JSON file contains all completed bookings
- ✅ Each booking has: bookingId, bookingNumber, userId, type, status, etc.

---

### Test Case 13.2: Verify Contacts Saved
**Terminal Command:**
```bash
cat data/contacts.json
```

**Expected Results:**
- ✅ JSON file contains all contact form submissions
- ✅ Each contact has: contactId, firstName, lastName, phone, email, etc.

---

### Test Case 13.3: Verify Flight Seats Updated
**Steps:**
1. Note FL001 available seats (originally 150)
2. Book FL001 with 2 adults
3. Check file:
```bash
grep -A 8 "FL001" data/flights.json
```

**Expected Results:**
- ✅ Available seats decreased by 2 (now 148)

---

### Test Case 13.4: Verify Hotel Rooms Updated
**Steps:**
1. Note hotel H001 available rooms (originally 50)
2. Book hotel with 2 rooms
3. Check file:
```bash
grep -A 8 "H001" data/hotels.xml
```

**Expected Results:**
- ✅ Available rooms decreased by 2 (now 48)

---

## 14. ERROR HANDLING Test Cases

### Test Case 14.1: Server Not Running
**Steps:**
1. Stop server (Ctrl+C)
2. Try to access http://localhost:3000

**Expected Results:**
- ✅ Browser shows "Cannot connect" or "Site can't be reached"

---

### Test Case 14.2: Invalid API Response
**Steps:**
1. Manually corrupt `data/flights.json` (add invalid JSON)
2. Try to search flights

**Expected Results:**
- ✅ Error message shown
- ✅ Console shows error details

---

## 15. INTEGRATION Test Cases

### Test Case 15.1: Book Complete Trip
**Steps:**
1. Book round-trip flight
2. Book hotel at destination
3. Book car at destination
4. Book cruise
5. Complete all bookings

**Expected Results:**
- ✅ All 4 bookings saved
- ✅ All availability updated
- ✅ Unique booking numbers for each

---

### Test Case 15.2: Multiple Users (Simulate with Different Tabs)
**Steps:**
1. Tab 1: Book FL001 with 100 passengers (if possible)
2. Tab 2: Search for FL001

**Expected Results:**
- ✅ Tab 2 shows reduced available seats
- ✅ If seats < requested, flight not shown

---

## Summary Checklist

### ✅ Required Features (Assignment Rubric)

- [ ] 7 web pages exist (Home, Stays, Flights, Cars, Cruises, Contact, Cart)
- [ ] External CSS (mystyle.css) used
- [ ] Navigation bar on all pages
- [ ] Current date/time displayed
- [ ] Font size and background color changeable
- [ ] Contact form with regex validation
- [ ] Contact data saved to JSON
- [ ] Flight page - one-way and round-trip
- [ ] Flight passenger icon and form
- [ ] Flight validation (dates, cities, passenger limits)
- [ ] Flight JSON file with 50+ flights
- [ ] Flight search with ±3 day flexibility
- [ ] Flight cart functionality
- [ ] Flight booking with passenger details (name, DOB, SSN)
- [ ] Flight booking number generation
- [ ] Flight seats updated in JSON
- [ ] Hotel validation (no regex required)
- [ ] Hotel XML file with 20+ hotels
- [ ] Hotel cart and booking
- [ ] Hotel rooms updated in XML
- [ ] Car page uses DOM methods
- [ ] Car XML file with 20+ cars
- [ ] Car personalization based on history
- [ ] Car cart and booking
- [ ] Car availability updated in XML
- [ ] Cruise page uses jQuery
- [ ] Cruise validation (destinations, duration)
- [ ] Cruise cart and booking
- [ ] All bookings saved with unique booking numbers and user IDs

---

## Quick Test Script

Run these commands in order for comprehensive testing:

```bash
# 1. Start server
npm run dev

# 2. Open browser
# Go through each test case above

# 3. Verify data files
cat data/bookings.json
cat data/contacts.json
grep "availableSeats" data/flights.json
grep "available-rooms" data/hotels.xml
grep "available" data/cars.xml

# 4. Clean up for fresh testing (if needed)
rm data/bookings.json data/contacts.json
# Then restart server
```

---

**Total Test Cases: 75+**

Good luck with testing! 🚀
