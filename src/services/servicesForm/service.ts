
import axios from "axios";
import { toast } from "sonner";

export async function createServiceForm(FormData: any, clear: () => void, contactCode: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/servicesform `;
    const data = FormData;
    data.contactCode = contactCode;
    //  console.log("data", data);

    const response = await axios.post(url, data);

    if (response.status === 201) {
      toast.success("Los datos se han enviado correctamente");
      console.log("Usuario Creado correctamente");
      //Los datos se han enviado correctamente
      clear();
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    toast.error("Error al enviar los datos. Por favor, inténtalo de nuevo más tarde.");

    clear();
  }
}
export async function createServiceUser(email: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/servicesUsers `;
    const response = await axios.post(url, email);

    if (response.status === 201) {
      toast.success("Usuario Creado correctamente");
      
    }
  } catch (error) {
    console.log("error service:", error);
    toast.error("Error al crear el usuario. Por favor, inténtalo de nuevo más tarde.");
  }
}
