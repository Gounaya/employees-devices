# Device Management System

![Device Management System Screenshot](/animation.gif)

## Overview

This Device Management System is a web application built with Next.js that allows companies to manage their employees and devices efficiently. It provides a user-friendly interface for adding, updating, and deleting both employees and devices, as well as associating devices with employees.

## Features

- Employee Management:
  - Add new employees
  - Update existing employee information
  - Delete employees
  - Filter employees by role

- Device Management:
  - Add new devices
  - Update existing device information
  - Delete devices
  - Filter devices by type and owner
  - Search devices by name

- Responsive design for various screen sizes
- Toast notifications for user feedback
- Server-side rendering for improved performance
- Error handling and validation

## Future Features

![Device Management System Screenshot](/futurefeatures.PNG)

The following features are planned for future development:

1. Maintenance Management:
   - Schedule and track device maintenance
   - Record repair history
   - Manage device warranties

2. Inventory Control:
   - Monitor real-time stock levels
   - Manage orders for new devices
   - Set up low stock alerts

3. Advanced Reporting:
   - Generate detailed usage reports
   - Perform cost analysis
   - Visualize device allocation trends

4. Customizable Settings:
   - Configure device types
   - Manage employee roles and permissions
   - Customize user interface settings

5. Device Request System:
   - Allow employees to submit device requests
   - Implement an approval process
   - Track request status

These planned features will enhance the functionality of the Device Management System, providing a more comprehensive solution for managing company devices and related processes.


## Technologies Used

- Next.js 13 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- shadcn/ui components
- SQLite 3 (for the backend database)
- Express.js 4 (for the backend API)


## Install Dependencies

Open your terminal and run:
```bash
npm install
```

## Usage

### Install All Dependencies

To install all dependencies for both the client and the server, run:
```bash
npm run install-all
```

### Start the Front-End and Back-End

To start both the front-end and the back-end simultaneously, run:
```bash
npm run start-all
```

## Performance

The application has been optimized for performance, with excellent local metrics:

### Largest Contentful Paint (LCP)
- **Value**: 0.66s
- **Status**: Good

Largest Contentful Paint (LCP) is a user-centric metric for measuring perceived load speed. It marks the point in the page load timeline when the page's main content has likely loaded.

### Cumulative Layout Shift (CLS)
- **Value**: 0
- **Status**: Good

Cumulative Layout Shift (CLS) is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

These metrics indicate that the application loads quickly and provides a stable user experience without unexpected layout shifts.
