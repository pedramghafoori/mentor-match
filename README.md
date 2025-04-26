# MentorMatch - Mentorship Platform

A full-stack web application connecting mentors and mentees in a clean, scalable platform.

## Project Structure

```
/mentorship-platform
├── /frontend           # React frontend application
├── /backend           # Node.js/Express backend
└── /external-scraper-api  # Python API for certification verification
```

## Features

- User authentication (mentors and mentees)
- Profile management with certifications
- Mentor search and filtering
- Booking system
- Review system
- Dashboard for both mentors and mentees

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **External Service**: Python API for certification verification
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install

   # External Scraper API
   cd ../external-scraper-api
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create `.env` files in each directory
   - See `.env.example` files for required variables

4. Start the development servers:
   ```bash
   # Frontend
   cd frontend
   npm start

   # Backend
   cd ../backend
   npm run dev

   # External Scraper API
   cd ../external-scraper-api
   python src/api/main.py
   ```

## Development

- Follow the established folder structure
- Use TypeScript for type safety
- Follow the API documentation for endpoints
- Maintain clean, modular code

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 