# GoRide - Taxi & Rideshare Platform

GoRide is a feature-rich, responsive web application for booking and sharing taxi rides. Built with Next.js (App Router), TypeScript, Clerk for authentication, Mapbox for maps and navigation, and Stripe for secure payments, GoRide offers a modern and reliable platform for users to book rides quickly and conveniently.

## Table of Contents

- [GoRide - Taxi \& Rideshare Platform](#goride---taxi--rideshare-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
    - [Key Files \& Directories](#key-files--directories)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Technical Details](#technical-details)
  - [Acknowledgements](#acknowledgements)
  - [Gif](#gif)
  - [](#)
  - [Start](#start)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Features

- **User Authentication**: Powered by Clerk, supporting secure sign-in and sign-up.
- **Real-Time Maps & Navigation**: Integrated with Mapbox for accurate, dynamic map displays and route planning.
- **Secure Payments**: Stripe integration for handling ride payments with secure checkout options.
- **Ride Search & Booking**: Users can enter start and destination points, select a car, and get real-time route and pricing information.

## Project Structure

The project follows a modular structure, with separate directories for components, pages, contexts, and utilities.

```
.next
📁 app
├── 📁 api
│   ├── 📁 create-payment-intent
│   │   └── route.tsx
│   ├── 📁 search-address
│   │   └── route.tsx
├── 📁 payment
│   └── page.tsx
├── 📁 payment-success
│   └── page.tsx
├── 📁 sign-in
│   └── 📁 [[...sign-in]]
│       └── page.tsx
├── 📁 sign-up
│   └── 📁 [[...sign-up]]
│       └── page.tsx
├── globals.css
├── icon.png
├── layout.tsx
└── page.tsx
📁 components
├── 📁 Booking
│   ├── autocomplete-address.tsx
│   ├── booking.tsx
│   ├── cars.tsx
│   └── payment-cards.tsx
├── 📁 Map
│   ├── distanceTime.tsx
│   ├── mapbox-map.tsx
│   ├── mapbox-route.tsx
│   └── markers.tsx
├── 📁 Payment
│   └── check-out-form.tsx
└── navbar.tsx
📁 context
├── destination-coordinates-context.ts
├── directions-data-context.ts
├── selected-car-amount-context.ts
├── source-coordinates-context.ts
└── user-location-context.ts
📁 data
├── CardsList.tsx
└── CarsList.tsx
📁 utils
└── subCurrency.tsx
public
├── 0.png, 1.png, 11.png, etc.
├── apple-pay.png
├── card.png
├── cash.png
├── google-pay.png
├── location.png
└── logo.png
.env.local
.eslintrc.json
.gitignore
middleware.ts
next-env.d.ts
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
tailwind.config.ts
tsconfig.json
```

### Key Files & Directories

- **app/api**: Contains API endpoints for Stripe payment intent creation (`create-payment-intent/route.tsx`) and address search via Mapbox (`search-address/route.tsx`).
- **app/payment**: The main payment page (`page.tsx`), displaying Stripe-powered checkout for ride payments.
- **app/payment-success**: Displays a success message and details after a successful payment.
- **app/sign-in** and **app/sign-up**: Handles user authentication through Clerk's `SignIn` and `SignUp` components.
- **components**: Modular components for booking, map, and payment forms, including `Booking` (for ride booking), `Map` (for displaying maps and routes), and `Payment` (for Stripe checkout).
- **context**: Context providers for managing state across the app, including user location, coordinates, selected car amount, and directions data.
- **utils/subCurrency.tsx**: Utility for currency conversion, ensuring consistent currency handling across the app.

## Getting Started

### Prerequisites

- **Node.js** (version 14 or higher recommended)
- **npm** or **yarn** for package management
- **Mapbox Account** for map-related features
- **Clerk Account** for user authentication
- **Stripe Account** for payment processing

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/goride.git
   cd goride
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local` (see [Environment Variables](#environment-variables) section).

### Environment Variables

Create a `.env.local` file at the project root with the following variables:

```plaintext
NEXT_PUBLIC_STRIPE_PUBLIC_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
MAPBOX_PUBLIC_ACCESS_TOKEN=your_mapbox_access_token
MAPBOX_BASE_SUGGEST_URL=mapbox_base_url
MAPBOX_SESSION_TOKEN=mapbox_session_token
```

## Usage

1. **Run Development Server**:

   ```bash
   npm run dev
   ```

   Go to `http://localhost:3000` to see the app in action.

2. **User Authentication**: Users can sign up or log in via Clerk's authentication pages at `/sign-in` and `/sign-up`.

3. **Booking a Ride**: Navigate to the homepage to input pickup and drop-off locations, select a car type, and view estimated fare and time.

4. **Payment**: After selecting a ride, users proceed to the `/payment` page for secure checkout via Stripe.

5. **Successful Payment**: Upon successful payment, users are redirected to `/payment-success`.

## Technical Details

- **Stripe Integration**: Payment functionality is set up in `app/api/create-payment-intent/route.tsx` to handle payment intent creation, while `app/payment/page.tsx` manages the Stripe Elements UI.
- **Mapbox Integration**: Map-related features, including address search and navigation, are handled with Mapbox in `app/api/search-address/route.tsx` and components in the `Map` folder.
- **State Management**: The app uses React's Context API to manage state, passing location, direction, and booking details across components.
- **Responsive Design**: The app uses Tailwind CSS for styling and supports both desktop and mobile views.

## Acknowledgements

- [Clerk](https://clerk.dev/) for user authentication
- [Mapbox](https://www.mapbox.com/) for map and navigation
- [Stripe](https://stripe.com/) for payment processing
- [Next.js](https://nextjs.org/) for the foundational web framework

## Gif

Here is an expected gif/photos of the preview of the App(Next TaxiGo Rideshare)

## ![Next TaxiGo Rideshare gif](./public/next-authentication.gif)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Start

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
