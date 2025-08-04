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

  const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/complaint `;
  const response = await axios.post(url, data);

  if (response.status === 201 || response.status === 200) {
    console.log(
      "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto."
    );

    toast.success("Tu denuncia fue enviada correctamente");
    clear();
  } else {
    console.error("Error al enviar la denuncia:", response.statusText);
    toast.error("Error al enviar la denuncia. Por favor, inténtalo de nuevo más tarde.");
    clear();
  }
}
