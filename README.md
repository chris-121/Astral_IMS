# Inventory Management System

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://npmjs.com/)
- PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chris-121/Astral_IMS.git
   cd Astral_IMS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create .env file and in the .env file, set the DATABASE_URL variable with your database connection string.
   
4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start server:
   ```bash
   npm run dev
   ```
   You should see the following message in your terminal:
   "App listening on http://localhost:3000"

   Visit http://localhost:3000 in your browser to access the application.

## Features
   Add Products: Easily add new products along with their quantities.
   
   Edit Products: Modify existing product details and update quantities.
   
   Delete Products: Remove products from the inventory.
   
   User-friendly UI: Built with Shopify Polaris for a clean and intuitive user interface.

## Implementation details
   This Inventory Management System (IMS) is built with a combination of React, Remix, Shopify Polaris, and Prisma. The web application provides two key pages:
   
   Product Listing Page: Displays all products in the inventory.
   
   Product Management Page: Allows users to create, edit, and delete products.

   A video demonstrating the features of web application: https://drive.google.com/file/d/1XIAEBTAgv5PnWpbEGHCKNUOCVwDNhpnK/view?usp=sharing

   
