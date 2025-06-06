# Career Management System

A modern career management application built with the RILT stack (React, Inertia, Laravel, Tailwind).

## Tech Stack

**Frontend:**
- React.js with TypeScript
- Inertia.js for seamless SPA experience
- Tailwind CSS v4 for styling
- Vite for fast development and building

**Backend:**
- Laravel v12
- PHPUnit for testing

## Prerequisites

Before running this project, ensure you have the following installed:

- **PHP** (8.1 or higher recommended)
- **Node.js** (18.x or higher recommended)
- **Composer** (PHP dependency manager)
- **Database** (SQLite, MySQL, or PostgreSQL)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/amirulabdlatib/career-management-system.git
cd career-management-system
```

### 2. Install Dependencies

Install PHP dependencies:
```bash
composer install
```

Install Node.js dependencies:
```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your settings:
```bash
cp .env.example .env
```

Generate application key:
```bash
php artisan key:generate
```

Configure your database connection in the `.env` file.

### 4. Database Setup

Run migrations:
```bash
php artisan migrate
```

(Optional) Seed the database with sample data:
```bash
php artisan db:seed
```

### 5. Storage Link

Create the symbolic link for file storage:
```bash
php artisan storage:link
```

## Running the Application

### Option 1: Multiple Terminals

Start the Laravel development server:
```bash
php artisan serve
```

In a separate terminal, start the Vite development server:
```bash
npm run dev
```

### Option 2: Single Command

Run both servers with a single command:
```bash
composer run dev
```

The application will be available at `http://localhost:8000`.

## Development Status

🚧 **This project is currently under active development.**

## Contributing

Please feel free to submit issues and pull requests. Make sure to follow the existing code style and include tests for new features.

## Testing

Run the test suite:
```bash
php artisan test
```

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).