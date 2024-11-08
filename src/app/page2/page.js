import Link from "next/link";

export default function Page2() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Page 2</h1>
        <div className="text-center">
          <p className="mb-8">This is page 2 of our application</p>
          <div className="flex justify-between">
            <Link
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            >
              ← Previous Page
            </Link>
            <Link
              href="/page3"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Next Page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
