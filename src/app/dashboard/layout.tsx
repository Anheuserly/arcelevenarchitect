// src/app/dashboard/layout.jsx


export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/amcmep.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:opsz,wght@14..32,100..900&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-amcmep-bg font-inter text-sm text-amcmep-text antialiased">
        {children}
      </body>
    </html>
  );
}