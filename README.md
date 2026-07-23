# CV AI – AI-Powered CV Builder (CVForge AI)

CVForge AI is a full-stack SaaS-style web application developed for practical university project demonstration. It allows users to input unstructured career and educational text in natural language, automatically extracts and structures the information into professional CV sections using OpenAI AI integration, enables interactive review and multi-section editing, renders the CV into 4 customizable templates, and exports high-resolution printable A4 PDFs.

---

## 1. Project Overview & Features

- **Modern SaaS Landing Page**: Hero section ("Turn Your Story Into Your Professional CV"), live AI preview, How It Works, Features grid, Template showcases, Pricing table, and FAQs.
- **Secure Authentication**: User Registration and Login with `password_hash()` and `password_verify()`, session validation, and authorization guards.
- **User Dashboard**: Welcome stats banner displaying:
  - Total CVs Created
  - Free CVs Remaining (e.g. `Free CVs Remaining: 2 / 3`)
  - Free CVs Used
  - Paid CVs Created
  - Recent CV cards with **View**, **Edit**, **Download PDF**, and **Delete** actions.
- **Multi-Step AI CV Builder**:
  - **Step 1 (Input)**: Large prompt textarea + "✨ Generate CV Information with AI" button.
  - **Step 2 (Review & Edit)**: Interactive form fields for Personal Information, Professional Summary, Education (multi-item), Work Experience (multi-item), Key Projects (multi-item), Skills (pill list), Certifications, Achievements, Languages, and Interests.
  - **Step 3 (Template Selection)**: Choose between 4 distinct templates.
- **4 Professional CV Templates**:
  1. `TEMPLATE 1: MODERN` – Clean tech layout with accent bar.
  2. `TEMPLATE 2: CLASSIC` – Traditional serif layout with double divider rules for corporate roles.
  3. `TEMPLATE 3: MINIMAL` – Simple high-contrast monochrome design optimized for ATS.
  4. `TEMPLATE 4: CREATIVE` – Modern sidebar design with skill pills for designers & marketers.
- **Printable A4 CV Viewer & PDF Export**: Real A4 aspect-ratio paper previewer with zoom control, on-the-fly template switcher, and PDF download via `html2pdf.js`.
- **3 Free CV Generations Quota & Stripe $3 Payment**:
  - Every user gets 3 free CV generations enforced strictly on the PHP backend.
  - After 3 free generations, triggers $3 payment prompt with Stripe Test Mode integration.

---

## 2. Technology Stack

- **FRONTEND**: React.js (v18), Vite, Plain CSS (Design Tokens, Glassmorphism, Responsive Grid), React Router (v6), Axios, `html2pdf.js`.
- **BACKEND**: Core PHP REST API architecture (PDO, prepared statements, native sessions, CORS headers).
- **DATABASE**: MySQL (`cvforge_ai` database compatible with XAMPP and phpMyAdmin).
- **AI**: OpenAI API called securely from PHP backend (`backend/helpers/openai.php`).
- **PAYMENT**: Stripe Test Mode (`backend/helpers/stripe.php`).

---

## 3. Directory Structure

```
cvforge-ai/
├── backend/
│   ├── api/
│   │   ├── register.php
│   │   ├── login.php
│   │   ├── logout.php
│   │   ├── user.php
│   │   ├── analyze-cv.php
│   │   ├── create-cv.php
│   │   ├── get-cvs.php
│   │   ├── get-cv.php
│   │   ├── update-cv.php
│   │   ├── delete-cv.php
│   │   ├── create-payment.php
│   │   ├── payment-success.php
│   │   └── payment-cancel.php
│   ├── config/
│   │   ├── config.php
│   │   └── database.php
│   ├── database/
│   │   └── schema.sql
│   └── helpers/
│       ├── response.php
│       ├── openai.php
│       └── stripe.php
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── CVCard.jsx
│       │   ├── TemplateCard.jsx
│       │   ├── LoadingSpinner.jsx
│       │   └── Notification.jsx
│       ├── templates/
│       │   ├── ModernTemplate.jsx
│       │   ├── ClassicTemplate.jsx
│       │   ├── MinimalTemplate.jsx
│       │   └── CreativeTemplate.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── CreateCV.jsx
│       │   ├── EditCV.jsx
│       │   ├── Templates.jsx
│       │   ├── CVPreview.jsx
│       │   ├── Pricing.jsx
│       │   └── PaymentSuccess.jsx
│       ├── services/
│       │   └── api.js
│       └── styles/
│           ├── global.css
│           ├── landing.css
│           ├── dashboard.css
│           ├── cv-builder.css
│           └── templates.css
└── README.md
```

---

## 4. XAMPP & MySQL Database Setup

1. Start Apache and MySQL in the **XAMPP Control Panel**.
2. Open **phpMyAdmin** in your web browser: `http://localhost/phpmyadmin/`.
3. Click on **Databases** -> Create a database named `cvforge_ai`.
4. Select `cvforge_ai` -> Click **Import** -> Choose file `backend/database/schema.sql` -> Click **Go**.
5. Alternatively, the PHP backend auto-creates the database and tables if missing upon first connection!

### Database Schema Tables

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  free_cv_limit INT DEFAULT 3,
  free_cv_used INT DEFAULT 0,
  paid_cv_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cvs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  raw_input TEXT DEFAULT NULL,
  structured_data LONGTEXT NOT NULL,
  template_name VARCHAR(50) DEFAULT 'modern',
  is_paid TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  stripe_session_id VARCHAR(255) NOT NULL UNIQUE,
  amount DECIMAL(10, 2) DEFAULT 3.00,
  currency VARCHAR(10) DEFAULT 'usd',
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 5. OpenAI API & Stripe Configuration

Open `backend/config/config.php`:

```php
// Define your OpenAI API Key (or set environment variable OPENAI_API_KEY)
define('OPENAI_API_KEY', 'your_openai_api_key_here');

// Define your Stripe Secret Key (or set environment variable STRIPE_SECRET_KEY)
define('STRIPE_SECRET_KEY', 'sk_test_your_stripe_key_here');
```

*Note: If no OpenAI API Key is provided, an intelligent structured regex parser automatically handles text extraction so the full application workflow can be demonstrated out-of-the-box!*

---

## 6. How to Run the Project

### Option A: Using XAMPP (Recommended)
1. Copy the `cvforge-ai` project folder to `C:\xampp\htdocs\cvforge-ai`.
2. Start Apache and MySQL in XAMPP.
3. Open a terminal in `C:\xampp\htdocs\cvforge-ai\frontend`:
   ```bash
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

### Option B: PHP Built-in Web Server
1. In `backend/`:
   ```bash
   php -S localhost:8000 -t .
   ```
2. Set `VITE_API_URL=http://localhost:8000/api` in `frontend/.env`.

---

## 7. Core PHP REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register.php` | User Registration (`name`, `email`, `password`) |
| `POST` | `/api/login.php` | User Login (`email`, `password`) |
| `POST` | `/api/logout.php` | Destroy User Session |
| `GET` | `/api/user.php` | Get Current User Profile & Quota Stats |
| `POST` | `/api/analyze-cv.php` | Send text to OpenAI API, return structured JSON |
| `POST` | `/api/create-cv.php` | Save CV & update user quota on backend |
| `GET` | `/api/get-cvs.php` | List all CVs for authenticated user |
| `GET` | `/api/get-cv.php?id=1` | Get specific CV details by ID |
| `PUT / POST` | `/api/update-cv.php` | Update CV details and active template |
| `DELETE` | `/api/delete-cv.php` | Delete CV by ID |
| `POST` | `/api/create-payment.php` | Create Stripe $3 Checkout Session |
| `GET` | `/api/payment-success.php` | Verify Stripe session and grant +1 CV slot |
| `GET` | `/api/payment-cancel.php` | Handle payment cancellation |

---

## 8. Quota & Payment Verification Logic

```
IF user.free_cv_used < user.free_cv_limit:
    Allow CV generation
    free_cv_used += 1
ELSE IF user.paid_cv_count > 0:
    Allow CV generation
    paid_cv_count -= 1
ELSE:
    Deny generation (HTTP 403)
    Prompt user to pay $3 via Stripe Checkout
```

All quota checks are evaluated on the PHP backend using atomic database updates and prepared statements.
