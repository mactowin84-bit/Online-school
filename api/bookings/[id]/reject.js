import { storage } from '../../storage.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method === 'POST') {
        const { id } = req.query;
        
        try {
            const bookings = await storage.getBookings();
            const booking = bookings.find(b => b.id === id);
            
            if (!booking) {
                res.status(404).json({ error: 'Booking not found' });
                return;
            }
            
            // Update booking status
            booking.status = 'rejected';
            booking.rejected_at = new Date().toISOString();
            
            res.json({ 
                success: true, 
                message: 'Booking rejected'
            });
        } catch (error) {
            console.error('Error rejecting booking:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}