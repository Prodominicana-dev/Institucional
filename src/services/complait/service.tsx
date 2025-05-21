import axios from "axios";
import { toast } from "sonner";

export async function createcomplaint(
  FormDataNew: any,
  contactCode: any,
  clear: () => void
) {
  const formData = new FormData();

  for (const key in FormDataNew) {
    if (FormDataNew.hasOwnProperty(key)) {
      formData.append(key, FormDataNew[key]);
    }
  }

  formData.append("contactCode", contactCode);

  const data = Object.fromEntries(formData.entries());

  const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/mail/complaint `;
  const response = await axios.post(url, data);

  if (response.status === 201 || response.status === 200) {
    console.log(
      "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto."
    );
  } else {
    console.error("Error al enviar el formulario:", response.status);
  }
}
