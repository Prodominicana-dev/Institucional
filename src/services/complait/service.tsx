import axios from "axios";
import { toast } from "sonner";

export async function createcomplaint(
  FormDataNew: any,
  contactCode: any,
  clear: () => void
) {
  try {
    const formData = new FormData();

    for (const key in FormDataNew) {
      if (FormDataNew.hasOwnProperty(key)) {
        formData.append(key, FormDataNew[key]);
      }
    }

    formData.append("contactCode", contactCode);

    const data = Object.fromEntries(formData.entries());

    // console.log("data", data);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/mail/complaint `;
    const response = await axios.post(url, data);

    if (response.status === 201) {
      toast.success(
        "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto."
      );
    }
  } catch (error) {
    console.log("error contact:", error);
    toast.error(
      "¡Lo sentimos! No hemos podido enviar tu mensaje. Por favor, inténtalo de nuevo más tarde."
    );
  }
}
