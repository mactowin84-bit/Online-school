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
            booking.status = 'accepted';
            booking.accepted_at = new Date().toISOString();
            
            // Add to lessons
            const lesson = {
                id: `lesson_${Date.now()}`,
                student_id: booking.id,
                student_name: booking.student_name,
                subject: booking.subject,
                date: booking.date,
                time: booking.time,
                status: 'scheduled',
                created_at: new Date().toISOString()
            };
            
            await storage.addLesson(lesson);
            
            // Add to students if not exists
            const students = await storage.getStudents();
            const existingStudent = students.find(s => s.phone === booking.student_phone);
            
            if (!existingStudent) {
                const newStudent = {
                    id: `student_${Date.now()}`,
                    name: booking.student_name,
                    phone: booking.student_phone,
                    grade: booking.grade,
                    contact_method: booking.contact_method,
                    status: 'active',
                    created_at: new Date().toISOString()
                };
                
                await storage.addStudent(newStudent);
            }
            
            res.json({ 
                success: true, 
                message: 'Booking accepted and added to schedule',
                lesson: lesson
            });
        } catch (error) {
            console.error('Error accepting booking:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}