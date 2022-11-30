import GraphqlProvider from "../graphql/GraphqlProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-white text-gray-900">
        <div className="mx-auto h-screen flex flex-col items-center max-w-[970px]">
          <main className="px-3 py-2 flex flex-col w-full">
            <GraphqlProvider>{children}</GraphqlProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
