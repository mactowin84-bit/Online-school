import { storage } from './storage.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method === 'POST') {
        const { name, phone, grade, subject, date, time, contactMethod, comments } = req.body;
        
        const booking = {
            id: Date.now().toString(),
            student_name: name,
            student_phone: phone,
            grade: parseInt(grade),
            subject,
            date,
            time,
            contact_method: contactMethod,
            comments: comments || '',
            status: 'pending',
            created_at: new Date().toISOString()
        };
        
        await storage.addBooking(booking);
        
        res.json({ success: true, id: booking.id });
    } else if (req.method === 'GET') {
        const bookings = await storage.getBookings();
        res.json(bookings);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}