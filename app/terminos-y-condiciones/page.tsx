import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso del sitio y los servicios de ${site.legalName}.`,
};

export default function TerminosCondiciones() {
  return (
    <LegalShell title="Términos y Condiciones" updated="1 de julio de 2026">
      <p>
        Los presentes Términos y Condiciones (en adelante, los
        &ldquo;Términos&rdquo;) regulan el acceso y uso del sitio web de{" "}
        <strong>{site.legalName}</strong> (en adelante, &ldquo;Koi Labs&rdquo;) y
        establecen el marco general de nuestros servicios. Al utilizar este sitio
        o contactarnos, aceptas estos Términos.
      </p>

      <h2>1. Identificación</h2>
      <p>
        Este sitio es operado por {site.legalName}, con domicilio en{" "}
        {site.location}. Puedes contactarnos en{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Objeto y servicios</h2>
      <p>
        Koi Labs se dedica al desarrollo de software, páginas web, aplicaciones
        móviles y soluciones tecnológicas a medida. La información publicada en
        este sitio tiene carácter general e informativo y no constituye una
        oferta contractual vinculante. Todo proyecto se rige por una propuesta o
        contrato específico acordado entre las partes.
      </p>

      <h2>3. Uso del sitio</h2>
      <p>Al utilizar este sitio te comprometes a:</p>
      <ul>
        <li>Entregar información veraz y actualizada en los formularios.</li>
        <li>No utilizar el sitio con fines ilícitos o no autorizados.</li>
        <li>
          No intentar dañar, sobrecargar o vulnerar la seguridad del sitio ni de
          sus sistemas.
        </li>
      </ul>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Todos los contenidos de este sitio (textos, diseño, logotipos, gráficos y
        código) son propiedad de {site.legalName} o de sus respectivos titulares
        y están protegidos por la legislación de propiedad intelectual. Queda
        prohibida su reproducción total o parcial sin autorización previa y por
        escrito.
      </p>
      <p>
        La titularidad de los desarrollos entregados a nuestros clientes se
        regirá por lo pactado en cada contrato de servicio.
      </p>

      <h2>5. Propuestas y presupuestos</h2>
      <p>
        Las cotizaciones y propuestas que emitamos tienen la validez y las
        condiciones que se indiquen en cada documento. Los plazos, alcances y
        precios definitivos se establecen en el contrato o propuesta aceptada por
        el cliente.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        Nos esforzamos por mantener el sitio disponible y con información
        actualizada, pero no garantizamos que esté libre de errores o
        interrupciones. Koi Labs no será responsable por daños indirectos
        derivados del uso o imposibilidad de uso del sitio. Nada en estos
        Términos limita responsabilidades que no puedan excluirse conforme a la
        ley.
      </p>

      <h2>7. Enlaces a terceros</h2>
      <p>
        Este sitio puede contener enlaces a servicios de terceros (como
        WhatsApp). No somos responsables del contenido ni de las políticas de
        dichos sitios, que se rigen por sus propios términos.
      </p>

      <h2>8. Protección de datos</h2>
      <p>
        El tratamiento de tus datos personales se rige por nuestra{" "}
        <a href="/politica-de-privacidad">Política de Privacidad</a>, que forma
        parte integrante de estos Términos.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        Podremos modificar estos Términos en cualquier momento. La versión
        vigente será siempre la publicada en esta página, con su fecha de
        actualización.
      </p>

      <h2>10. Legislación y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República de Chile.
        Cualquier controversia se someterá a los tribunales competentes de{" "}
        {site.location}.
      </p>

      <p className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
        <strong>Nota:</strong> este documento es una plantilla informativa. Te
        recomendamos revisarla con un abogado para adaptarla a la realidad
        específica de tu empresa antes de publicarla.
      </p>
    </LegalShell>
  );
}
