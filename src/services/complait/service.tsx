import { notifications } from "@mantine/notifications";
import axios from "axios";

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
      notifications.show({
        id: "contact",
        autoClose: 5000,
        withCloseButton: false,
        title: "Denuncia creada",
        message: "Los datos se ha enviado correctamente.",
        color: "green",
        loading: false,
      });

      clear();
    }
  } catch (error) {
    console.log("error contact:", error);
    notifications.show({
      id: "contact",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al enviar los datos.",
      color: "red",
      loading: false,
    });

    clear();
  }
}
