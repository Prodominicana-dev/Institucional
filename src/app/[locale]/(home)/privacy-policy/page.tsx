import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("privacypolicy");
  const privacypolicy = {
    title: t("title"),
    contentEs: `<p>Bienvenido al Portal de ProDominicana. A continuación, te presentamos nuestra Política de Privacidad, que describe cómo manejamos la información personal y los datos recopilados a través de este sitio.</p>

<p>Estas Políticas (en lo adelante, las "Políticas") condicionan el uso de los servicios del Portal de Internet <a href="https://www.prodominicana.gob.do/">ProDominicana</a> (en lo adelante, el "Portal") del Centro de Exportación e Inversión de la República Dominicana (en lo adelante, el "ProDominicana"), institución pública autónoma y descentralizada, creada mediante la promulgación de la Ley No. 98-03, de fecha diecisiete (17) de junio del año 2003, con su domicilio y oficinas principales en la Avenida 27 de Febrero esquina Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, Distrito Nacional, Capital de la República Dominicana.</p>

<h2><strong>1. Descripción del manejo de la Información Personal</strong></h2>

<p>El portal web <a href="https://prodominicana.gob.do/">ProDominicana</a> respeta la privacidad de sus usuarios y asume el compromiso de salvaguardar la información personal que pudiera recopilar. Aseguramos un tratamiento responsable y seguro de los datos personales, en estricto cumplimiento de la Ley No. 172-13 sobre protección de datos de carácter personal, que establece las normas para la protección de datos personales en la República Dominicana.</p>

<h2><strong>2. Recopilación de Datos:</strong></h2>

<p>ProDominicana efectúa la recopilación de información personal en situaciones específicas, como cuando los usuarios interactúan con el sitio web, completan formularios, se registran para recibir información o participan en encuestas. La información recopilada puede abarcar, entre otros datos, nombres, direcciones de correo electrónico y datos de contacto relevantes.</p>

<p>Este proceso de recopilación tiene como finalidad facilitar la prestación de servicios personalizados, mejorar la calidad de la interacción en el sitio web y responder de manera efectiva a las necesidades y preferencias de los usuarios. ProDominicana garantiza el manejo confidencial y seguro de la información personal recopilada, conforme a las disposiciones legales y a los más altos estándares de privacidad.</p>

<h2><strong>3. Uso de la Información.</strong></h2>

<p>En ProDominicana, valoramos la confianza que depositas en nosotros al proporcionarnos tus datos personales. A continuación, detallamos cómo utilizamos la información recopilada:</p>

<p>Utilizamos los datos para ofrecerte los servicios que has solicitado a través del Portal. Esto puede incluir procesar solicitudes, proporcionar información relevante o gestionar trámites específicos.</p>

<p>Como entidad pública, tenemos responsabilidades y funciones específicas. Utilizamos los datos para cumplir con nuestros objetivos institucionales, como promover la inversión y las exportaciones en la República Dominicana.</p>

<p>Esto puede incluir la elaboración de informes, análisis estadísticos o la toma de decisiones basada en datos.</p>

<h2><strong>4. Almacenamiento y Seguridad:</strong></h2>

<p>En ProDominicana, la información personal recopilada se resguarda con cuidado en servidores altamente seguros. Implementamos medidas de seguridad rigurosas para prevenir accesos no autorizados, alteraciones o divulgación indebida de los datos. Este enfoque en la seguridad informática se traduce en un compromiso sólido con la protección integral de la información confiada a nosotros, garantizando la confidencialidad y la integridad de los datos almacenados. Nuestro objetivo es mantener la confianza de nuestros usuarios y continuar siendo un referente en seguridad de la información en el ámbito digital.</p>

<h2><strong>5. Cookies y Tecnologías Similares:</strong></h2>

<p>ProDominicana implementa cookies y tecnologías similares con el propósito de mejorar la experiencia del usuario al navegar por el sitio web. Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario y permiten el seguimiento de cierta información para facilitar funciones específicas del sitio.</p>

<p>Estas tecnologías nos ayudan a entender cómo los usuarios interactúan con ProDominicana, permitiendo personalizar la navegación, recordar preferencias y realizar análisis para mejorar continuamente nuestros servicios.</p>

<h2><strong>6. Terceros y Compartir Información:</strong></h2>

<p>ProDominicana, en estricto apego a los principios de privacidad, puede compartir información personal con terceros únicamente en circunstancias autorizadas por la ley o cuando sea esencial para cumplir con los propósitos explícitos establecidos en esta política de privacidad.</p>

<p>Esta compartición de información se realiza con el compromiso de salvaguardar la confidencialidad y privacidad de los usuarios.</p>

<p>La política de ProDominicana es transparente en relación con la divulgación de información personal, y cualquier acción en este sentido se realiza con la debida diligencia y consideración de la privacidad del usuario. Para más detalles sobre cómo se comparte y protege la información personal, se recomienda revisar la totalidad de nuestra Política de Privacidad en el sitio web.</p>

<h2><strong>7. Derechos y Opciones del Usuario:</strong></h2>

<p>En cumplimiento con los principios de privacidad, ProDominicana reconoce y respeta los derechos de los usuarios sobre su información personal. Los usuarios tienen la facultad de ejercer sus derechos de corrección o eliminación de su información personal.</p>

<p>Para ejercer estos derechos, los usuarios pueden ponerse en contacto con ProDominicana a través de la información de contacto proporcionada en la sección 11 de esta política de privacidad. ProDominicana se compromete a responder de manera oportuna y diligente a las solicitudes relacionadas con los derechos de los usuarios, asegurando el cumplimiento de las disposiciones legales y normativas aplicables.</p>

<h2><strong>9. Cambios en las Políticas:</strong></h2>

<p>ProDominicana se reserva el derecho de actualizar y modificar esta política de privacidad en cualquier momento, reflejando así nuestro compromiso de adaptarnos a las mejores prácticas y a los cambios normativos.</p>

<p>Cualquier cambio sustancial en nuestras políticas será comunicado de manera transparente a los usuarios a través de avisos publicados en nuestro sitio web. Se recomienda a los usuarios a revisar periódicamente esta política para estar informados sobre cómo ProDominicana maneja y protege su información personal.</p>

<p>El uso continuado del sitio web tras la publicación de cambios en estas políticas implicará la aceptación de las nuevas políticas por parte de los usuarios.</p>

<h2><strong>10. Cumplimiento Legal:</strong></h2>

<p>ProDominicana reafirma su compromiso con la integridad y la legalidad al comprometerse a cumplir con Ley 172-13, la cual tiene como objetivo la protección integral de los datos personales y las regulaciones de privacidad aplicables. Nuestro actuar se ajusta de manera rigurosa a las normativas vigentes, asegurando que todas las prácticas de recopilación, almacenamiento y uso de información personal estén en plena conformidad con los estándares legales establecidos.</p>

<h2><strong>11. Contacto para Consultas sobre Privacidad:</strong></h2>

<p>ProDominicana valora la transparencia y la comunicación abierta con nuestros usuarios en temas relacionados con la privacidad. Para cualquier consulta, solicitud de información o ejercicio de derechos de privacidad, los usuarios pueden ponerse en contacto con nosotros a través de la siguiente información:</p>

<ul>
    <li>Por correo electrónico: <a href="mailto:servicios@ProDominicana.gob.do">servicios@ProDominicana.gob.do</a></li>
    <li>Visitando esta página en nuestro sitio web: <a href="https://prodominicana.gob.do/contacto">Contacto</a></li>
    <li>Llamándonos al teléfono: (809) 530 5505</li>
</ul>

<p>Agradecemos la confianza que depositan en ProDominicana y estamos dedicados a garantizar la protección y privacidad de la información personal de nuestros usuarios.</p>
`,
    contentEn: `<p>Welcome to the ProDominicana Portal. Below, we present our Privacy Policy, which describes how we handle personal information and data collected through this site.</p>

<p>These Policies (hereinafter, the "Policies") govern the use of the services of the Internet Portal <a href="https://www.prodominicana.gob.do/">ProDominicana</a> (hereinafter, the "Portal") of the Center for Export and Investment of the Dominican Republic (hereinafter, "ProDominicana"), an autonomous and decentralized public institution, created by Law No. 98-03, dated June 17, 2003, with its main address and offices at Avenida 27 de Febrero esquina Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, Distrito Nacional, Capital of the Dominican Republic.</p>

<h2><strong>1. Description of Personal Information Handling</strong></h2>

<p>The website <a href="https://prodominicana.gob.do/">ProDominicana</a> respects the privacy of its users and is committed to safeguarding the personal information it may collect. We ensure responsible and secure treatment of personal data, in strict compliance with Law No. 172-13 on the protection of personal data, which establishes the rules for the protection of personal data in the Dominican Republic.</p>

<h2><strong>2. Data Collection:</strong></h2>

<p>ProDominicana collects personal information in specific situations, such as when users interact with the website, complete forms, register to receive information, or participate in surveys. The information collected may include, among other data, names, email addresses, and relevant contact information.</p>

<p>This collection process aims to facilitate the provision of personalized services, improve the quality of interaction on the website, and effectively respond to the needs and preferences of users. ProDominicana guarantees the confidential and secure handling of the personal information collected, in accordance with legal provisions and the highest privacy standards.</p>

<h2><strong>3. Use of Information.</strong></h2>

<p>At ProDominicana, we value the trust you place in us by providing us with your personal data. Below, we detail how we use the information collected:</p>

<p>We use the data to provide you with the services you have requested through the Portal. This may include processing requests, providing relevant information, or managing specific procedures.</p>

<p>As a public entity, we have specific responsibilities and functions. We use the data to fulfill our institutional objectives, such as promoting investment and exports in the Dominican Republic.</p>

<p>This may include preparing reports, statistical analysis, or decision-making based on data.</p>

<h2><strong>4. Storage and Security:</strong></h2>

<p>At ProDominicana, the personal information collected is carefully safeguarded on highly secure servers. We implement rigorous security measures to prevent unauthorized access, alterations, or improper disclosure of data. This focus on computer security translates into a strong commitment to the comprehensive protection of the information entrusted to us, ensuring the confidentiality and integrity of the data stored. Our goal is to maintain the trust of our users and continue to be a reference in information security in the digital sphere.</p>

<h2><strong>5. Cookies and Similar Technologies:</strong></h2>

<p>ProDominicana implements cookies and similar technologies to improve the user experience while browsing the website. Cookies are small text files stored on the user's device that allow tracking of certain information to facilitate specific functions of the site.</p>

<p>These technologies help us understand how users interact with ProDominicana, allowing us to customize navigation, remember preferences, and perform analysis to continuously improve our services.</p>

<h2><strong>6. Third Parties and Information Sharing:</strong></h2>

<p>ProDominicana, in strict compliance with privacy principles, may share personal information with third parties only in circumstances authorized by law or when essential to fulfill the explicit purposes established in this privacy policy.</p>

<p>This sharing of information is done with a commitment to safeguarding the confidentiality and privacy of users.</p>

<p>ProDominicana's policy is transparent regarding the disclosure of personal information, and any action in this regard is carried out with due diligence and consideration for user privacy. For more details on how personal information is shared and protected, it is recommended to review our full Privacy Policy on the website.</p>

<h2><strong>7. User Rights and Options:</strong></h2>

<p>In compliance with privacy principles, ProDominicana recognizes and respects users' rights to their personal information. Users have the ability to exercise their rights to correct or delete their personal information.</p>

<p>To exercise these rights, users can contact ProDominicana through the contact information provided in section 11 of this privacy policy. ProDominicana is committed to responding promptly and diligently to requests related to users' rights, ensuring compliance with applicable legal and regulatory provisions.</p>

<h2><strong>9. Policy Changes:</strong></h2>

<p>ProDominicana reserves the right to update and modify this privacy policy at any time, reflecting our commitment to adapting to best practices and regulatory changes.</p>

<p>Any substantial changes to our policies will be transparently communicated to users through notices posted on our website. Users are advised to periodically review this policy to stay informed about how ProDominicana handles and protects their personal information.</p>

<p>The continued use of the website after the publication of changes in these policies will imply the acceptance of the new policies by users.</p>

<h2><strong>10. Legal Compliance:</strong></h2>

<p>ProDominicana reaffirms its commitment to integrity and legality by committing to comply with Law 172-13, which aims to provide comprehensive protection for personal data and applicable privacy regulations. Our actions adhere rigorously to current regulations, ensuring that all practices related to the collection, storage, and use of personal information are in full compliance with established legal standards.</p>

<h2><strong>11. Contact for Privacy Inquiries:</strong></h2>

<p>ProDominicana values transparency and open communication with our users on privacy-related issues. For any inquiries, requests for information, or exercise of privacy rights, users can contact us through the following information:</p>

<ul>
    <li>By email: <a href="mailto:servicios@ProDominicana.gob.do">servicios@ProDominicana.gob.do</a></li>
    <li>Visiting this page on our website: <a href="https://prodominicana.gob.do/contacto">Contacto</a></li>
    <li>Calling us at: (809) 530 5505</li>
</ul>

<p>We appreciate the trust you place in ProDominicana and are dedicated to ensuring the protection and privacy of our users' personal information.</p>
`,
  };
  return (
    <div className="flex justify-center py-10 bg-white">
      <div className="w-10/12 sm:w-8/12 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{privacypolicy.title}</h1>
        <div
          className="flex flex-col gap-3"
          dangerouslySetInnerHTML={{
            __html:
              locale === "es"
                ? privacypolicy.contentEs
                : privacypolicy.contentEn,
          }}
        ></div>
      </div>
    </div>
  );
}
