import { toast } from "sonner";
import axios from "axios";

export async function createcontact(
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
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/contact `;
    const response = await axios.post(url, data);
    // console.log("this is the status code: " + response.status);
    if (response.status === 201) {
      toast.success("Datos enviados correctamente");

      clear();
    }
  } catch (error) {
    toast.error("Error al enviar los datos. Por favor, inténtalo de nuevo más tarde.");
    clear();
  }
}
