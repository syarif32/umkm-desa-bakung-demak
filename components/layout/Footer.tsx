export function PublicFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Portal UMKM Desa Bakung. Dikelola oleh Tim KKN.
        </p>
      </div>
    </footer>
  );
}