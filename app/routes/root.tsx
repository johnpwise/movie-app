// routes/root.tsx
import {
    Meta,
    Outlet,
    ScrollRestoration,
    Scripts,
} from "react-router-dom";

export function links() {
    return [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
        },
    ];
}

export default function RootLayout() {
    return (
        <html lang="en" data-bs-theme="auto">
            <head>
                <Meta />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
