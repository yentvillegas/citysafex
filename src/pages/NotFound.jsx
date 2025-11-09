import PageCS from "../components/PageCS";

function NotFound() {
  return (
     <PageCS>
       <h1 className="text-3xl font-bold text-red-600 mb-2">404</h1>
      <p className="text-gray-600">Página no encontrada</p>
    </PageCS>
  );
}
export default NotFound