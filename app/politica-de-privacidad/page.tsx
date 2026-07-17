import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad y tratamiento de datos personales de ${site.legalName}.`,
};

export default function PoliticaPrivacidad() {
  return (
    <LegalShell title="Política de Privacidad" updated="1 de julio de 2026">
      <p>
        En <strong>{site.legalName}</strong> (en adelante &ldquo;Koi Labs&rdquo;,
        &ldquo;nosotros&rdquo; o &ldquo;la Empresa&rdquo;) respetamos tu
        privacidad y nos comprometemos a proteger los datos personales que nos
        entregas. Esta Política explica qué información recopilamos, con qué
        finalidad y cuáles son tus derechos, de acuerdo con la Ley N° 19.628
        sobre Protección de la Vida Privada y la Ley N° 21.719 que regula el
        tratamiento de datos personales en Chile.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos es {site.legalName}, con
        domicilio en {site.location}. Para cualquier consulta relacionada con
        tus datos personales puedes escribirnos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <p>Podemos recopilar los siguientes datos cuando interactúas con nosotros:</p>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, correo electrónico y/o
          número de teléfono que ingresas voluntariamente en nuestro formulario
          de contacto o al escribirnos por WhatsApp.
        </li>
        <li>
          <strong>Información del proyecto:</strong> los detalles que decidas
          compartir sobre tu consulta o requerimiento.
        </li>
        <li>
          <strong>Datos técnicos de navegación:</strong> información anónima como
          tipo de dispositivo, navegador y páginas visitadas, obtenida mediante
          herramientas de analítica (si estuvieran habilitadas).
        </li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Utilizamos tus datos únicamente para:</p>
      <ul>
        <li>Responder tus consultas y elaborar propuestas comerciales.</li>
        <li>Prestarte los servicios que nos contrates y gestionar su ejecución.</li>
        <li>Enviarte información relevante sobre tu proyecto o servicio.</li>
        <li>Mejorar nuestro sitio web y la calidad de nuestra atención.</li>
      </ul>
      <p>
        No vendemos, arrendamos ni cedemos tus datos personales a terceros con
        fines comerciales.
      </p>

      <h2>4. Base de legitimación</h2>
      <p>
        El tratamiento de tus datos se basa en tu consentimiento (al enviarnos
        tu información), en la ejecución de un contrato o medidas
        precontractuales, y en nuestro interés legítimo de responder tus
        solicitudes.
      </p>

      <h2>5. Conservación de los datos</h2>
      <p>
        Conservamos tus datos personales solo durante el tiempo necesario para
        cumplir las finalidades descritas y las obligaciones legales aplicables.
        Cuando ya no sean necesarios, serán eliminados o anonimizados de forma
        segura.
      </p>

      <h2>6. Comunicación de datos a terceros</h2>
      <p>
        Podemos utilizar proveedores tecnológicos que actúan como encargados de
        tratamiento (por ejemplo, servicios de hosting, correo o mensajería como
        WhatsApp), quienes solo acceden a los datos necesarios para prestar su
        servicio y bajo estrictas obligaciones de confidencialidad.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Como titular de los datos, puedes ejercer en cualquier momento tus
        derechos de acceso, rectificación, cancelación (supresión) y oposición,
        así como revocar tu consentimiento. Para ello, escríbenos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> indicando tu solicitud.
        Responderemos dentro de los plazos que establece la ley.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus
        datos frente a accesos no autorizados, pérdida o alteración. Sin
        embargo, ningún sistema es completamente infalible, por lo que no podemos
        garantizar una seguridad absoluta.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Este sitio puede utilizar cookies o tecnologías similares con fines de
        funcionamiento y analítica. Puedes configurar tu navegador para
        rechazarlas; ten en cuenta que ello podría afectar algunas funciones del
        sitio.
      </p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Podremos actualizar esta Política de Privacidad para reflejar cambios
        legales o de nuestros servicios. Publicaremos siempre la versión vigente
        en esta página, indicando la fecha de última actualización.
      </p>

      <p className="mt-10 rounded-xl border border-hair/10 bg-veil/[0.05] p-4 text-sm text-junco">
        <strong>Nota:</strong> este documento es una plantilla informativa. Te
        recomendamos revisarla con un abogado para adaptarla a la realidad
        específica de tu empresa antes de publicarla.
      </p>
    </LegalShell>
  );
}
