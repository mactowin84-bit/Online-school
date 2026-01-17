// Simple storage using GitHub Gist as database
const GIST_ID = 'demo-bookings'; // In production, use real Gist ID
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set in Vercel environment

class SimpleStorage {
    constructor() {
        this.data = {
            bookings: [],
            students: [],
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

    async getStats() {
        return {
            totalStudents: this.data.students.length || 12,
            todayLessons: 5,
            expectedIncome: 35000,
            trialRequests: this.data.bookings.length || 0
        };
    }
}

export const storage = new SimpleStorage();