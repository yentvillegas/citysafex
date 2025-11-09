import PageCS from "../components/PageCS"

function Home(params) {
    return <PageCS>
        <div className="p-6">
        
        <h1 className="text-3xl font-bold mb-6 text-center">BIENVENIDO A CITYSAFEX</h1>

        <div className="max-w-2xl mx-auto text-justify p-4 bg-gray-100 p-4 rounded-2xl shadow mb-4">
          <p>
            CitySafeX es una innovadora plataforma digital de seguridad ciudadana diseñada para fortalecer la conexión entre los ciudadanos y las fuerzas del orden. Su propósito es brindar una herramienta accesible, rápida y confiable que permita solicitar ayuda en situaciones de emergencia o riesgo. A través de su aplicación móvil, los usuarios pueden enviar alertas instantáneas con su ubicación exacta, reportar incidentes de forma manual y visualizar zonas de riesgo mediante mapas interactivos. CitySafeX busca reducir los tiempos de respuesta ante emergencias, promover la participación ciudadana y crear una red solidaria de apoyo que contribuya a la protección colectiva. Su funcionamiento se basa en la integración de tecnologías de geolocalización, comunicación en tiempo real y verificación por SMS y correo electrónico, garantizando la autenticidad de los reportes y la seguridad de los datos. Más que una app, CitySafeX representa un compromiso con la vida, la prevención y la tranquilidad de toda la comunidad.
          </p>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">USO RESPONSABLE</h1>
        <div className="max-w-2xl mx-auto text-justify p-4 bg-gray-100 p-4 rounded-2xl shadow">
          <p>
            El uso de CitySafeX implica un compromiso serio y consciente con la seguridad de todos. Esta aplicación debe emplearse únicamente en casos reales de emergencia o para reportar situaciones que representen un riesgo genuino. El envío de alertas falsas, pruebas innecesarias o uso inadecuado del sistema puede generar confusión, saturar los canales de atención y afectar la capacidad de respuesta ante casos verdaderos. Por ello, cada usuario es responsable de utilizar la plataforma con ética, respeto y responsabilidad, comprendiendo que detrás de cada alerta hay personal policial y recursos destinados a salvar vidas. CitySafeX confía en la buena voluntad de sus usuarios para mantener un entorno seguro, colaborativo y eficiente, donde la tecnología se utilice con el propósito de proteger, asistir y cuidar a quienes más lo necesitan.
          </p>
        </div>
      </div>
    </PageCS>
}
export default Home