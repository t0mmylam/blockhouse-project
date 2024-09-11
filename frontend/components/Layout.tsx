import React from "react";
import Head from "next/head";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

/**
 * Layout component that wraps all pages
 * @param {React.ReactNode} children - The content to be wrapped by the layout
 * @param {string} [title] - The title of the page (optional)
 */
const Layout: React.FC<LayoutProps> = ({ children, title = "Dashboard" }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <div className="min-h-screen flex flex-col bg-gray-100">
                <header>
                    <nav className="bg-white shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            {title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="flex-grow">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>

                <footer className="bg-white shadow-sm mt-auto">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-gray-500">
                            © {new Date().getFullYear()} Thomas Lam
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Layout;
