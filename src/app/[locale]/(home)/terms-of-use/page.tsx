import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("termsofuse");
  const termsofuse = {
    title: t("title"),
    contentEs: `<p>Los presentes términos de uso (en lo adelante, los "Términos de Uso") regulan los servicios del portal de Internet<strong><u> <a href="https://www.prodominicana.gob.do">www.prodominicana.gob.do</a> </u></strong> (en lo adelante, el "Portal") del Centro de Exportación e Inversión de la República Dominicana (ProDominicana) (en lo adelante,"ProDominicana"), institución pública, autónoma y descentralizada, creada mediante la promulgación de la Ley No. 98-03, de fecha diecisiete (17) de junio del año 2003, con su domicilio y oficinas principales en la Avenida 27 de Febrero esquina Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, Distrito Nacional, Capital de la República Dominicana.</p>

<p>El uso del Portal le otorga la condición de usuario del Portal (en lo adelante, el "Usuario") e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones establecidas en los términos de uso y las políticas publicadas por ProDominicana al momento en que el usuario acceda al portal. Por lo tanto, se requiere que el usuario lea estos términos en cada ocasión en que use el portal, ya que puede sufrir modificaciones sin previo aviso.</p>

<h1><strong>1. Descripción del Servicio</strong></h1>
<p>A través de nuestro portal, ProDominicana pone a disposición de los Usuarios una amplia gama de servicios, información y contenidos, colectivamente denominados "Servicios". Estos recursos, tanto los proporcionados directamente por ProDominicana como por terceros, están diseñados para ofrecer a los usuarios una plataforma integral.</p>

<p>Este espacio está diseñado para facilitar el acceso y el uso eficiente de recursos que incluyen guías especializadas para la exportación e inversión, así como información, herramientas interactivas y apoyo empresarial. Nos esforzamos por brindar a los usuarios una experiencia integral y conveniente al interactuar con los diversos recursos disponibles en nuestro portal.</p>

<h1><strong>2. Condiciones de Uso</strong></h1>
<p>La utilización del portal <a href="https://www.prodominicana.gob.do">ProDominicana</a> está sujeta a la aceptación y estricto cumplimiento de los siguientes términos. Al utilizar nuestros servicios, los usuarios confirman haber leído, comprendido y aceptado íntegramente estas condiciones. Se advierte que cualquier uso no autorizado o en infracción de estos términos podría resultar en la terminación del acceso a nuestros servicios. Es fundamental adherirse rigurosamente a estas normativas para garantizar una experiencia transparente y segura.</p>

<h1><strong>3. Propiedad Intelectual</strong></h1>
<p>Todo el contenido provisto por ProDominicana, que abarca textos, gráficos, logotipos, imágenes y software, está protegido por las leyes de propiedad intelectual.</p>

<p>Queda prohibido usar cualquier componente de dicho contenido. Este compromiso reafirma nuestra dedicación a salvaguardar la integridad de nuestra propiedad intelectual y garantizar el respeto a los derechos que amparan dichos materiales.</p>

<h1><strong>4. Limitación de Responsabilidad</strong></h1>
<p>ProDominicana se compromete a ofrecer información precisa; sin embargo, no garantiza la exactitud, integridad o actualidad del contenido. Declinamos cualquier responsabilidad por pérdidas o daños que puedan surgir del uso de nuestro servicio. Nuestra intención es proporcionar información fiable, pero los usuarios deben ejercer su juicio y evaluar la aplicabilidad de dicha información a sus circunstancias específicas.</p>

<h1><strong>5. Enlaces a Terceros</strong></h1>
<p>ProDominicana puede proporcionar enlaces a sitios web de terceros como parte de nuestro servicio. No ejercemos control sobre el contenido ni las prácticas de privacidad de estos sitios, y no asumimos responsabilidad por ellos. La inclusión de enlaces a terceros tiene el propósito de brindar información adicional, pero los usuarios deben ser conscientes de que están sujetos a las políticas y términos de uso de esos sitios al hacer clic en los enlaces correspondientes.</p>

<h1><strong>6. Cambios en los Términos</strong></h1>
<p>ProDominicana se reserva el derecho de actualizar y modificar estos Términos de Uso en cualquier momento. Cualquier cambio será comunicado a través de nuestro sitio web. La continuidad en el uso del servicio después de dichas modificaciones implicará la aceptación de los Términos actualizados por parte del usuario. Te recomendamos revisar periódicamente los Términos de Uso para mantenerte informado sobre cualquier cambio que pueda afectar tu interacción con nuestro servicio.</p>

<h1><strong>7. Normativas Legales</strong></h1>
<p>Al hacer uso de ProDominicana, aceptas cumplir con todas las leyes y regulaciones aplicables. Te comprometes a no utilizar nuestro servicio de manera que infrinja ninguna ley o regulación. Nosotros, como entidad proveedora del servicio, esperamos que los usuarios se adhieran a estándares éticos y legales al interactuar con nuestra plataforma. Cualquier actividad contraria a las leyes o regulaciones aplicables puede resultar en medidas adecuadas por parte de ProDominicana.</p>

<h1><strong>8. Contacto</strong></h1>
<p>Para consultas, preguntas o comentarios relacionados con estos Términos de Uso, te invitamos a ponerte en contacto con nosotros a través de los siguientes canales:</p>
<ul>
    <li>Vía correo electrónico: <a href="mailto:servicios@prodominicana.gob.do">servicios@prodominicana.gob.do</a></li>
    <li>Vía telefónica: (809) 530-5505</li>
</ul>
<p>Estamos aquí para atender sus consultas y colaborar de manera efectiva.</p>`,
    contentEn: `<p>The present terms of use (hereinafter, the "Terms of Use") regulate the services of the Internet portal <a href="https://www.prodominicana.gob.do">ProDominicana</a> (hereinafter, the "Portal") of the Center for Export and Investment of the Dominican Republic (ProDominicana) (hereinafter, "ProDominicana"), a public, autonomous, and decentralized institution, created by Law No. 98-03, dated June seventeen (17), of the year 2003, with its main office and offices at Avenida 27 de Febrero corner Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, National District, Capital of the Dominican Republic.</p>

<p>Use of the Portal grants the user of the Portal status (hereinafter, the "User") and implies full and unconditional acceptance of each and every one of the provisions established in the terms of use and policies published by ProDominicana at the time the user accesses the portal. Therefore, it is required that the user read these terms on each occasion they use the portal, as they may undergo modifications without prior notice.</p>

<h1><strong>1. Description of Service</strong></h1>
<p>Through our portal, ProDominicana offers Users a wide range of services, information, and content, collectively referred to as "Services." These resources, both those provided directly by ProDominicana and by third parties, are designed to offer users a comprehensive platform.</p>

<p>This space is designed to facilitate access and efficient use of resources, including specialized guides for export and investment, as well as information, interactive tools, and business support. We strive to provide users with a comprehensive and convenient experience when interacting with the various resources available on our portal.</p>

<h1><strong>2. Terms of Use</strong></h1>
<p>Use of the <a href="https://www.prodominicana.gob.do">ProDominicana</a> portal is subject to acceptance and strict compliance with the following terms. By using our services, users confirm that they have read, understood, and fully accepted these conditions. It is warned that any unauthorized or infringing use of these terms could result in the termination of access to our services. It is essential to adhere strictly to these regulations to ensure a transparent and safe experience.</p>

<h1><strong>3. Intellectual Property</strong></h1>
<p>All content provided by ProDominicana, including texts, graphics, logos, images, and software, is protected by intellectual property laws.</p>

<p>It is prohibited to use any component of said content. This commitment reaffirms our dedication to safeguarding the integrity of our intellectual property and ensuring respect for the rights that protect such materials.</p>

<h1><strong>4. Limitation of Liability</strong></h1>
<p>ProDominicana is committed to providing accurate information; however, it does not guarantee the accuracy, completeness, or timeliness of the content. We disclaim any liability for losses or damages that may arise from the use of our service. Our intention is to provide reliable information, but users must exercise their judgment and assess the applicability of such information to their specific circumstances.</p>

<h1><strong>5. Third-Party Links</strong></h1>
<p>ProDominicana may provide links to third-party websites as part of our service. We do not exercise control over the content or privacy practices of these sites, and we do not assume responsibility for them. The inclusion of links to third parties is intended to provide additional information, but users should be aware that they are subject to the policies and terms of use of those sites when clicking on the corresponding links.</p>

<h1><strong>6. Changes to the Terms</strong></h1>
<p>ProDominicana reserves the right to update and modify these Terms of Use at any time. Any changes will be communicated through our website. Continued use of the service after such modifications will imply acceptance of the updated Terms by the user. We recommend periodically reviewing the Terms of Use to stay informed about any changes that may affect your interaction with our service.</p>

<h1><strong>7. Legal Regulations</strong></h1>
<p>By using ProDominicana, you agree to comply with all applicable laws and regulations. You agree not to use our service in a manner that violates any law or regulation. We, as the service provider entity, expect users to adhere to ethical and legal standards when interacting with our platform. Any activity contrary to applicable laws or regulations may result in appropriate measures by ProDominicana.</p>

<h1><strong>8. Contact</strong></h1>
<p>For inquiries, questions, or comments related to these Terms of Use, we invite you to contact us through the following channels:</p>
<ul>
    <li>By email: <a href="mailto:servicios@prodominicana.gob.do">servicios@prodominicana.gob.do</a></li>
    <li>By phone: (809) 530-5505</li>
</ul>
<p>We are here to assist you with your inquiries and collaborate effectively.</p>`,
  };
  return (
    <div className="flex justify-center py-10 bg-white">
      <div className="w-10/12 sm:w-8/12 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{termsofuse.title}</h1>
        <div
          className="flex flex-col gap-3"
          dangerouslySetInnerHTML={{
            __html:
              locale === "es" ? termsofuse.contentEs : termsofuse.contentEn,
          }}
        ></div>
      </div>
    </div>
  );
}
