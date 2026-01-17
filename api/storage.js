// Simple storage using GitHub Gist as database
const GIST_ID = 'demo-bookings'; // In production, use real Gist ID
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set in Vercel environment

class SimpleStorage {
    constructor() {
        this.data = {
            bookings: [],
            students: [
                {
                    id: '1',
                    name: 'Айдар Нурланов',
                    phone: '+7 (701) 234-56-78',
                    grade: 8,
                    contact_method: 'whatsapp',
                    status: 'active'
                },
                {
                    id: '2',
                    name: 'Асель Каримова',
                    phone: '+7 (702) 345-67-89',
                    grade: 9,
                    contact_method: 'telegram',
                    status: 'active'
                }
            ],
            lessons: [],
            transactions: []
        };
    }

    async loadData() {
        // For demo, return mock data
        // In production, load from Gist or database
        return this.data;
    }

    async saveData(data) {
        this.data = { ...this.data, ...data };
        // In production, save to Gist or database
        return true;
    }

    async addBooking(booking) {
        this.data.bookings.push(booking);
        return booking;
    }

    async getBookings() {
        return this.data.bookings;
    }

    async addStudent(student) {
        this.data.students.push(student);
        return student;
    }

    async getStudents() {
        return this.data.students;
    }

    async addLesson(lesson) {
        this.data.lessons.push(lesson);
        return lesson;
    }

    async getLessons() {
        return this.data.lessons;
    }

    async getStats() {
        const pendingBookings = this.data.bookings.filter(b => b.status === 'pending');
        return {
            totalStudents: this.data.students.length,
            todayLessons: this.data.lessons.filter(l => l.date === new Date().toISOString().split('T')[0]).length,
            expectedIncome: 35000,
            trialRequests: pendingBookings.length
        };
    }
}

export const storage = new SimpleStorage();